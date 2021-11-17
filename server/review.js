// This dotenv import is required for the `.env` file to be read
require('dotenv').config();

const flexIntegrationSdk = require('sharetribe-flex-integration-sdk');

const integrationSdk = flexIntegrationSdk.createInstance({

    // These two env vars need to be set in the `.env` file.
    clientId: process.env.FLEX_INTEGRATION_CLIENT_ID,
    clientSecret: process.env.FLEX_INTEGRATION_CLIENT_SECRET,

    // Normally you can just skip setting the base URL and just use the
    // default that the `createInstance` uses. We explicitly set it here
    // for local testing and development.
    baseUrl: process.env.FLEX_INTEGRATION_BASE_URL || 'https://flex-integ-api.sharetribe.com',
});

const getAllListingsId = async ()=> {
    const listingsRes = await integrationSdk.listings.query({});
    const listingsIds = listingsRes.data.data.map(listing => listing.id);
    return listingsIds
}
const getAllReviewsOfProvider = async ()=> {
    const reviewsRes = await integrationSdk.events.query({ eventTypes: 'review/created', });
    const tempSortedReviews = reviewsRes.data.data
        .filter(review => review.attributes.resource.attributes.type === 'ofProvider')
        .map(data => {
            const reviewId = data.attributes.resourceId.uuid;
            const listingId = data.attributes.resource.relationships?.listing?.data?.id?.uuid;
            const reviewData = data.attributes.resource.attributes;
            return ({ reviewId, reviewData, listingId });
        });
    return tempSortedReviews;
}
const getFormattedListingsAndReview = async ()=> {
    const listingIDs = await getAllListingsId();
    const reviews = await getAllReviewsOfProvider()
    const data = { listingIDs, reviews }
    return data
}
const updateAvgRatings = async ()=> {
    const { listingIDs, reviews } = await getFormattedListingsAndReview();

    listingIDs.forEach(listingId => {
        // Checking ratings
        const hasReview = reviews.find(rev => rev.listingId === listingId.uuid) ? true : false;
        // Calculating Avg Rating
        const ratingSum = hasReview && reviews.reduce((total, review) => {
            return review.listingId === listingId.uuid ? total + review.reviewData.rating : total + 0;
        }, 0);
        const reviewCount = reviews.filter((rev) => rev.listingId === listingId.uuid).length;
        const avgRating = parseFloat((ratingSum / reviewCount).toFixed(2)) || 0;
        // Sending response to api
        const response = hasReview && integrationSdk.listings
            .update({
                id: listingId,
                metadata: { rating: avgRating },
            }, { expand: true })
            .then(res => {
                // res.data 
            });
    })
}

module.exports = {
    getAllListingsId,
    getAllReviewsOfProvider,
    getFormattedListingsAndReview,
    updateAvgRatings
}

