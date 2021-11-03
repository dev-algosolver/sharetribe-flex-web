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
        setFavoriteListingIDs(getLSItem("favoriteItems")?.[currentUserId]?.map(id => new UUID(id)))
    }, [currentUserId])

    // updating favorite items
    useEffect(() => { setAllFavoriteItems(getLSItem("favoriteItems")) }, [currentUserId,favoriteListingIDs])

    // const abc = async (id) => {
    //     const data = await sdk.listings.show({ id })
    //     return data
    // }
    // const def = abc("617f6c78-e2b7-45a0-a264-02ee43b4372f");
    // def.then(data => console.log(data))
    // const def = favoriteListingIDs?.map(id => abc(id))
    // console.log(def);


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
                                key={favoriteListingId?.uuid}
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