import React from 'react';
import { Footer, LayoutSingleColumn, LayoutWrapperFooter, LayoutWrapperMain, LayoutWrapperTopbar, Page } from '../../components';
import { TopbarContainer } from '../../containers';
import { types as sdkTypes } from '../../util/sdkLoader';
import css from './FavoriteListingPage.module.css';
import FavoriteListingPageContent from './FavoriteListingPageContent';
const { UUID } = sdkTypes;

const FavoriteListingsPage = () => {
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
                    <FavoriteListingPageContent/>
                </LayoutWrapperMain>
                <LayoutWrapperFooter>
                    <Footer />
                </LayoutWrapperFooter>
            </LayoutSingleColumn>
        </Page>
    );
};

export default FavoriteListingsPage;