import React from 'react';
import { Footer, LayoutSingleColumn, LayoutWrapperFooter, LayoutWrapperMain, LayoutWrapperTopbar } from '../../components';
import { StaticPage, TopbarContainer } from '../../containers';
import css from './FAQPage.module.css';

const FAQPage = () => {
    return (
        <StaticPage
            title="FAQ Page"
            schema={{
                '@context': 'http://schema.org',
                '@type': 'FAQPage',
                description: 'This is a FAQ page Saunatime',
                name: 'FAQ page',
            }}
        >
            <LayoutSingleColumn>
                <LayoutWrapperTopbar>
                    <TopbarContainer />
                </LayoutWrapperTopbar>

                <LayoutWrapperMain  className={css.mainWrapper}>
                    <div>
                        Hello FAQ
                    </div>
                </LayoutWrapperMain>

                <LayoutWrapperFooter>
                    <Footer />
                </LayoutWrapperFooter>
            </LayoutSingleColumn>
        </StaticPage>
    );
};

export default FAQPage;