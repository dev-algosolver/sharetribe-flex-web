import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { InlineTextButton } from '../../components';
import config from '../../config';
import { getLSItem, setLSItem } from '../../services/localstorageService';
import { FormattedMessage } from '../../util/reactIntl';
import { types as sdkTypes } from '../../util/sdkLoader';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT } from '../../util/types';
import css from './ListingPage.module.css';
const sharetribeSdk = require('sharetribe-flex-sdk');
const { UUID } = sdkTypes;

const SectionHeading = props => {
  const {
    priceTitle,
    formattedPrice,
    richTitle,
    category,
    hostLink,
    showContactUser,
    onContactUser,
    listingId
  } = props;

  // useStates
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(false)
  const [allFavoriteItems, setAllFavoriteItems] = useState({})

  // Redux states
  const state = useSelector(state => state)

  // necessary variables
  const currentUserId = state?.user?.currentUser?.id?.uuid;

  // updating favorite items
  useEffect(() => { setAllFavoriteItems(getLSItem("favoriteItems")) }, [isAddedToFavorite])

  // updating favorite status
  useEffect(() => {
    setIsAddedToFavorite(allFavoriteItems?.[currentUserId]?.find(itemId => itemId === listingId?.uuid) && true)
  }, [allFavoriteItems])

  // const sdk = sharetribeSdk.createInstance({
  //   clientId: "097107b8-7d47-4e26-8b18-88cd9599357e",
  //   baseUrl: 'https://flex-api.sharetribe.com',
  // });
  // var listingIds = new UUID("617f6b8b-2dac-4e3c-a09b-ac7bf5d242a7");
  // sdk.listings.show({ id: listingIds }).then(res => {
  //   console.log(res);
  // });

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'ListingPage.perNight'
    : isDaily
      ? 'ListingPage.perDay'
      : 'ListingPage.perUnit';

  // For add to favorite
  const addToFavorite = () => {
    setIsAddedToFavorite(true)
    if (allFavoriteItems?.[currentUserId]?.length) {
      const favoriteItems = allFavoriteItems?.[currentUserId];

      setLSItem("favoriteItems", {
        ...allFavoriteItems,
        [currentUserId]: [...favoriteItems, listingId?.uuid]
      })
    } else {
      setLSItem("favoriteItems", { [currentUserId]: [listingId?.uuid] })
    }
  }

  // For delete from favorite
  const deleteFromFavorite = () => {
    setIsAddedToFavorite(false)
    if (allFavoriteItems?.[currentUserId]?.length) {
      const favoriteItems = allFavoriteItems?.[currentUserId]?.filter(item => item !== listingId?.uuid);

      setLSItem("favoriteItems", {
        ...allFavoriteItems,
        [currentUserId]: favoriteItems
      })
    }
  }


  return (
    <div className={css.sectionHeading}>
      <div className={css.desktopPriceContainer}>
        <div className={css.desktopPriceValue} title={priceTitle}>
          {formattedPrice}
        </div>
        <div className={css.desktopPerUnit}>
          <FormattedMessage id={unitTranslationKey} />
        </div>
      </div>
      <div className={css.heading}>
        <div>
          <h1 className={css.title}>{richTitle}</h1>
          <div className={css.author}>
            {category}
            <FormattedMessage id="ListingPage.hostedBy" values={{ name: hostLink }} />
            {showContactUser ? (
              <span className={css.contactWrapper}>
                <span className={css.separator}>•</span>
                <InlineTextButton
                  rootClassName={css.contactLink}
                  onClick={onContactUser}
                  enforcePagePreloadFor="SignupPage"
                >
                  <FormattedMessage id="ListingPage.contactUser" />
                </InlineTextButton>
              </span>
            ) : null}
          </div>
        </div>
        <div>
          {
            state?.Auth?.isAuthenticated &&
            <div
              className={`${css.addToFavorite} ${isAddedToFavorite && css.active}`}
              onClick={isAddedToFavorite ? deleteFromFavorite : addToFavorite}
              title="Add to Favorite">
              <AiFillHeart />
            </div>
          }

        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
