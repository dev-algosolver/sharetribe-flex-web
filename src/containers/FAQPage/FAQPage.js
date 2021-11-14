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

                <LayoutWrapperMain className={css.mainWrapper}>
                    <h1>Frequently Asked Questions</h1>

                    <div>
                        <h3>Question 1?</h3>
                        <p>Answer: Lorem ipsum</p>
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