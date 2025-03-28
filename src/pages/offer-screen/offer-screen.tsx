import Header from '../../components/widgets/header/header';
import RatingWidget from '../../components/widgets/rating-widget';
import PremiumClass from '../../components/widgets/premium-class';
import ReviewsListWidget from '../../components/widgets/review';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import Map from '../../components/map/map';

import { AppRoute, AuthorizationStatus } from '../../constant';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import CardList from '../../components/card-list/card-list';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchCommentsAction, fetchFavoritesStatusAction, fetchNearbyOffersAction, fetchOfferAction } from '../../store/api-actions';
import { memo, useCallback, useEffect } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getNearest, getNearestLoadingStatus, getOffer, getOfferLoadingStatus } from '../../store/offer-data/selectors';
import { getComments, getCommentsLoadingStatus, getCountComments } from '../../store/comments-data/selectors';

function OfferScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const isDataLoading = useAppSelector(getOfferLoadingStatus);
  const isCommentsLoading = useAppSelector(getCommentsLoadingStatus);
  const isNearestLoading = useAppSelector(getNearestLoadingStatus);
  const countComments = useAppSelector(getCountComments);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [dispatch, id]);
  const currentOffer = useAppSelector(getOffer);
  const nearestOffers = useAppSelector(getNearest);
  const comments = useAppSelector(getComments);
  const handleFavoriteClick = useCallback(() => {
    if (!currentOffer) {
      return;
    }
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(fetchFavoritesStatusAction({
      offerId: currentOffer.id,
      isFavorite: !(currentOffer.isFavorite)
    }));
  }, [authorizationStatus, navigate, dispatch, currentOffer]);

  if (isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (!currentOffer) {
    return (
      <NotFoundScreen />
    );
  }
  const centerMap = currentOffer.location;
  const mapData = nearestOffers.map((offer) => ({ 'id': offer.id, 'location': offer.location }));

  return (
    <div className="page">
      <Helmet>
        <title>{currentOffer.title}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((img) => (
                <div className="offer__image-wrapper" key={img}>
                  <img className="offer__image" src={img} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <PremiumClass type='offer' />
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>

                <button
                  className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <RatingWidget rating={currentOffer.rating} type='offer' showValue />

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type[0].toUpperCase() + currentOffer.type.substring(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((item) => (
                    <li className="offer__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {currentOffer.host.isPro ? 'Pro' : null}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                  <p className="offer__text">
                  </p>
                </div>
              </div>
              {isCommentsLoading
                ? <LoadingScreen />
                : (
                  <section className="offer__reviews reviews">
                    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{countComments}</span></h2>
                    <ReviewsListWidget {...comments} />
                    {authorizationStatus === AuthorizationStatus.Auth && <ReviewsForm />}
                  </section>
                )}
            </div>
          </div>
          <Map mapData={mapData} centerMap={centerMap} type='offer' />
        </section>
        <div className="container">
          {isNearestLoading
            ? <LoadingScreen />
            : (
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <CardList offers={nearestOffers} typeContent='offer'></CardList>
              </section>
            )}
        </div>
      </main>
    </div>
  );
}

const MemorizedOfferScreen = memo(OfferScreen);
export default MemorizedOfferScreen;
