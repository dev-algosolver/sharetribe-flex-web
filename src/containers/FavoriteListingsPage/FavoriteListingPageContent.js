import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { types as sdkTypes } from '../../util/sdkLoader';
import css from './FavoriteListingPage.module.css';
import SingleListing from './SingleListing';
const { UUID } = sdkTypes;
const sharetribeSdk = require('sharetribe-flex-sdk');

// sdk 
const sdk = sharetribeSdk.createInstance({
    clientId: "097107b8-7d47-4e26-8b18-88cd9599357e",
    baseUrl: 'https://flex-api.sharetribe.com',
});


const FavoriteListingPageContent = () => {
    const [favoriteListingIDs, setFavoriteListingIDs] = useState([]);

    // Redux states
    const state = useSelector(state => state)

    // necessary variables
    const currentUserId = state?.user?.currentUser?.id?.uuid;

    // updating favorite listings ids
    useEffect(() => {
        sdk.currentUser.show()
            .then(res => {
                setFavoriteListingIDs(res?.data?.data?.attributes?.profile?.privateData?.wishlist);
            })
            .catch(() => console.log(""))
    }, [currentUserId])

    return (
        <>
            <h2 className={css.contentTitle}>Wishlist ({favoriteListingIDs?.length || 0})</h2>
            <div className={css.cardContainer}>
                {
                    favoriteListingIDs?.map(favoriteListingId => <SingleListing
                        key={favoriteListingId}
                        favoriteListingId={favoriteListingId}
                        setFavoriteListingIDs={setFavoriteListingIDs}
                        favoriteListingIDs={favoriteListingIDs} />)
                }
            </div>
        </>
    );
};

export default FavoriteListingPageContent;