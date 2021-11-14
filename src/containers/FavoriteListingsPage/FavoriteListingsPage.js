import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Footer, LayoutSingleColumn, LayoutWrapperFooter, LayoutWrapperMain, LayoutWrapperTopbar, Page } from '../../components';
import { TopbarContainer } from '../../containers';
import { getLSItem } from '../../services/localstorageService';
import { types as sdkTypes } from '../../util/sdkLoader';
import css from './FavoriteListingPage.module.css';
import SingleListing from './SingleListing';
const { UUID } = sdkTypes;

const FavoriteListingsPage = () => {
    const [favoriteListingIDs, setFavoriteListingIDs] = useState([]);
    const [allFavoriteItems, setAllFavoriteItems] = useState({})

    // Redux states
    const state = useSelector(state => state)

    // necessary variables
    const currentUserId = state?.user?.currentUser?.id?.uuid;

    // updating favorite listings ids
    useEffect(() => {
        setFavoriteListingIDs(getLSItem("favoriteItems")?.[currentUserId]?.filter(id => new UUID(id)))
    }, [currentUserId])

    // updating favorite items
    useEffect(() => { setAllFavoriteItems(getLSItem("favoriteItems")) }, [currentUserId,favoriteListingIDs])

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
                        {
                            favoriteListingIDs?.map(favoriteListingId => <SingleListing
                                key={favoriteListingId}
                                setFavoriteListingIDs={setFavoriteListingIDs}
                                favoriteListingId={favoriteListingId}
                                allFavoriteItems={allFavoriteItems} />)
                        }
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