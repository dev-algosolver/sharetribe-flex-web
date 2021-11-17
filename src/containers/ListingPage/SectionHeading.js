import React, { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { InlineTextButton } from '../../components';
import Loader from '../../components/Loader/Loader';
import config from '../../config';
import { FormattedMessage } from '../../util/reactIntl';
import { types as sdkTypes } from '../../util/sdkLoader';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT } from '../../util/types';
import css from './ListingPage.module.css';
const sharetribeSdk = require('sharetribe-flex-sdk');
const { UUID } = sdkTypes;

// sdk 
const sdk = sharetribeSdk.createInstance({
  clientId: "097107b8-7d47-4e26-8b18-88cd9599357e",
  baseUrl: 'https://flex-api.sharetribe.com',
});

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
  const [allFavoriteItems, setAllFavoriteItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Redux states
  const state = useSelector(state => state)

  // necessary variables
  const currentUserId = state?.user?.currentUser?.id?.uuid;

  // updating favorite items
  useEffect(() => {
    sdk.currentUser.show()
      .then(res => {
        setLoading(false)
        setAllFavoriteItems(res?.data?.data?.attributes?.profile?.privateData?.wishlist);
      })
      .catch(() => setLoading(false))
  }, [isAddedToFavorite])

  // updating favorite status
  useEffect(() => {
    setIsAddedToFavorite(allFavoriteItems?.find(itemId => itemId === listingId?.uuid) && true)
  }, [allFavoriteItems])

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
    setLoading(true)
    const favoriteItems = allFavoriteItems?.length
      ? [...allFavoriteItems, listingId?.uuid]
      : [listingId?.uuid];
    sdk.currentUser.updateProfile({
      privateData: {
        wishlist: favoriteItems
      }
    }).then(res => {
      setLoading(false)
      setIsAddedToFavorite(true)
    })
      .catch(() => setLoading(false))
  }

  // For delete from favorite
  const deleteFromFavorite = () => {
    setLoading(true)
    if (allFavoriteItems?.length) {
      const favoriteItems = allFavoriteItems?.filter(item => item !== listingId?.uuid);

      sdk.currentUser.updateProfile({
        privateData: {
          wishlist: favoriteItems
        }
      }).then(res => {
        setLoading(false)
        setIsAddedToFavorite(false)
      })
        .catch(() => setLoading(false))
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
            state?.Auth?.isAuthenticated
              ? <div
                className={`${css.addToFavorite} ${isAddedToFavorite && css.active}`}
                onClick={isAddedToFavorite ? deleteFromFavorite : addToFavorite}
                title="Add to Favorite">
                {
                  loading
                    ? <Loader />
                    : <>
                      <AiFillHeart />
                      <h4>{isAddedToFavorite ? "Added to wishlist" : "Add to wishlist"}</h4>
                    </>
                }
              </div>
              :
              <Link to="/login"
                className={`${css.addToFavorite}`}
                title="Add to Favorite">
                <AiFillHeart />
                <h4>{isAddedToFavorite ? "Added to wishlist" : "Add to wishlist"}</h4>
              </Link>
          }

        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
