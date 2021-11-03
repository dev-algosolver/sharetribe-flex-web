import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLSItem } from '../../services/localstorageService';
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

const SingleListing = ({ favoriteListingId, setFavoriteListingIDs, allFavoriteItems }) => {
    const [loading, setLoading] = useState(true)
    const [listingData, setListingData] = useState({})

    // Redux states
    const state = useSelector(state => state)

    // necessary variables
    const currentUserId = state?.user?.currentUser?.id?.uuid;

    useEffect(() => {
        sdk.listings.show({ id: favoriteListingId })
            .then(data => {
                setListingData(data?.data?.data)
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
        if (allFavoriteItems?.[currentUserId]?.length) {
            const favoriteItems = allFavoriteItems?.[currentUserId]?.filter(item => item !== favoriteListingId?.uuid);

            // set in state
            setFavoriteListingIDs(favoriteItems)
            // set in local storage
            setLSItem("favoriteItems", {
                ...allFavoriteItems,
                [currentUserId]: favoriteItems
            })
        }
    }
    return (
        <>

            <div className={css.card}>
                {
                    loading
                        ? <div className={css.loaderContainer}>
                            <p className={css.cardLoading}></p>
                        </div>
                        : <div className={css.cardBody}>
                            <div className={css.cardHeaderImg}>
                                <Link to={`/l/${listingData?.attributes?.title}/${listingData?.id?.uuid}`}>
                                    <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                                </Link>
                            </div>
                            <div
                                onClick={deleteFromFavorite}
                                className={`${css.favoriteIcon} ${css.active}`}>
                                <AiFillHeart />
                            </div>
                            <div className={css.cardInfo}>
                                <h2 className={css.cardPrice}>$ {listingData?.attributes?.price?.amount}</h2>
                                <Link to={`/l/${listingData?.attributes?.title}/${listingData?.id?.uuid}`}>
                                    <p className={css.cardTitle}>{trimLongText(listingData?.attributes?.title, 30)} </p>
                                    <p className={css.cardLocation}>{listingData?.attributes?.publicData?.location?.address}</p>
                                </Link>
                            </div>
                        </div>
                }
            </div>
        </>
    );
};

export default SingleListing;