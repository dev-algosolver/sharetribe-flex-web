import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
// import { sharetribeSdk } from 'sharetribe-flex-sdk';
import { types as sdkTypes } from '../../util/sdkLoader';
import css from './FavoriteListingPage.module.css';
const sharetribeSdk = require('sharetribe-flex-sdk');
const { UUID } = sdkTypes;

// sdk 
const sdk = sharetribeSdk.createInstance({
    clientId: "097107b8-7d47-4e26-8b18-88cd9599357e",
    baseUrl: 'https://flex-api.sharetribe.com',
});
const sdkUtil = sharetribeSdk.util;


const SingleListing = ({ favoriteListingId, setFavoriteListingIDs, favoriteListingIDs }) => {
    const [loading, setLoading] = useState(true)
    const [listingData, setListingData] = useState({})

    // Redux states
    const state = useSelector(state => state)

    // necessary variables
    const currentUserId = state?.user?.currentUser?.id?.uuid;

    useEffect(() => {
        sdk.listings.show({
            id: favoriteListingId,
            include: ["images"],
        })
            .then(data => {
                setListingData(data?.data)
                setLoading(false)
            })
    }, [favoriteListingId])

    // For triming text
    const trimLongText = (text, length = 0) => {
        if (length && (text.length > length)) {
            return text.slice(0, (length - 1)) + "..."
        }
        else {
            return text
        }
    }

    // For delete from favorite
    const deleteFromFavorite = () => {
        setLoading(true)
        if (favoriteListingIDs?.length) {
            const favoriteItems = favoriteListingIDs?.filter(item => item !== favoriteListingId);

            sdk.currentUser.updateProfile({
                privateData: {
                    wishlist: favoriteItems
                }
            }).then(res => {
                setLoading(false)
                setFavoriteListingIDs(favoriteItems)
            })
                .catch(() => setLoading(false))
        }
    }
    return (
        <>

            <div className={css.card}>
                {
                    loading
                        ? <Loader />
                        : <div className={css.cardBody}>
                            <div className={css.cardHeaderImg}>
                                <Link to={`/l/${listingData?.data?.attributes?.title}/${listingData?.data?.id?.uuid}`}>
                                    <img src={listingData?.included?.[0]?.attributes?.variants?.default?.url} alt="" />
                                </Link>
                            </div>
                            <div
                                onClick={deleteFromFavorite}
                                className={`${css.favoriteIcon} ${css.active}`}>
                                <AiFillHeart />
                            </div>
                            <div className={css.cardInfo}>
                                <h2 className={css.cardPrice}>$ {(listingData?.data?.attributes?.price?.amount) / 100}</h2>
                                <Link to={`/l/${listingData?.data?.attributes?.title}/${listingData?.data?.id?.uuid}`}>
                                    <p className={css.cardTitle}>{trimLongText(listingData?.data?.attributes?.title, 30)} </p>
                                    <p className={css.cardLocation}>{listingData?.data?.attributes?.publicData?.location?.address}</p>
                                </Link>
                            </div>
                        </div>
                }
            </div>
        </>
    );
};

export default SingleListing;