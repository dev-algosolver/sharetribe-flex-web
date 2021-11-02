import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Footer, LayoutSingleColumn, LayoutWrapperFooter, LayoutWrapperMain, LayoutWrapperTopbar, Page } from '../../components';
import { TopbarContainer } from '../../containers';
import { getLSItem } from '../../services/localstorageService';
import { types as sdkTypes } from '../../util/sdkLoader';
import css from './FavoriteListingPage.module.css';
const sharetribeSdk = require('sharetribe-flex-sdk');
const { UUID } = sdkTypes;

// sdk 
const sdk = sharetribeSdk.createInstance({
    clientId: "097107b8-7d47-4e26-8b18-88cd9599357e",
    baseUrl: 'https://flex-api.sharetribe.com',
});

const FavoriteListingsPage = () => {
    const [favoriteListingIDs, setFavoriteListingIDs] = useState([]);
    const [favoriteListings, setFavoriteListings] = useState([]);

    // Redux states
    const state = useSelector(state => state)

    // necessary variables
    const currentUserId = state?.user?.currentUser?.id?.uuid;

    // updating favorite listings ids
    useEffect(() => {
        setFavoriteListingIDs(getLSItem("favoriteItems")?.[currentUserId]?.map(id => new UUID(id)))
    }, [currentUserId])

    useEffect(() => {

    }, [])

    const abc = async () => {
        const data = await favoriteListingIDs?.map(id => {
            return sdk.listings.show({ id }).then(res => {
                return res?.data?.data;
            });
        })
        return data
    }



    const trimLongText = (text, length = 0) => {
        if (length && (text.length > length)) {
            return text.slice(0, (length - 1)) + "..."
        }
        else {
            return text
        }
    }
    return (
        <Page
            title={"Favorite Listings Page"}
            scrollingDisabled={false}
            schema={{
                '@context': 'http://schema.org',
                '@type': 'ItemPage',
                name: "Favorite Listings Page",
            }}>
            <LayoutSingleColumn>
                <LayoutWrapperTopbar>
                    <TopbarContainer />
                </LayoutWrapperTopbar>
                <LayoutWrapperMain className={css.contentContainer}>
                    <h2 className={css.contentTitle}>Favourites</h2>
                    <div className={css.cardContainer}>
                        <div className={css.card}>
                            <div className={css.cardBody}>
                                <div className={css.cardHeaderImg}>
                                    <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                                </div>
                                <div className={css.favoriteIcon}>
                                    <AiFillHeart />
                                </div>
                                <div className={css.cardInfo}>
                                    <h2 className={css.cardPrice}>$ 3000</h2>
                                    <p className={css.cardTitle}>{trimLongText("Lorem ipsum dolor sit amet consectetur", 30)} </p>
                                    <p className={css.cardLocation}>Vancouver, BC, Canada</p>
                                </div>
                            </div>
                        </div>

                        <div className={css.card}>
                            <div className={css.cardBody}>
                                <div className={css.cardHeaderImg}>
                                    <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                                </div>
                            </div>
                        </div>

                        <div className={css.card}>
                            <div className={css.cardBody}>
                                <div className={css.cardHeaderImg}>
                                    <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                                </div>
                            </div>
                        </div>

                        <div className={css.card}>
                            <div className={css.cardBody}>
                                <div className={css.cardHeaderImg}>
                                    <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutWrapperMain>
                <LayoutWrapperFooter>
                    <Footer />
                </LayoutWrapperFooter>
            </LayoutSingleColumn>
        </Page>
    );
};

export default FavoriteListingsPage;