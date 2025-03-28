import RatingWidget from '../widgets/rating-widget';
import PremiumClass from '../widgets/premium-class';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constant';
import classNames from 'classnames';
import { fetchFavoritesStatusAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../hooks';
import { memo, useCallback } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getFavoritesStatusLoadingStatus } from '../../store/main-data/selectors';

type PlaceCardItem = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

type PlaceCardProps = {
  cardData: PlaceCardItem;
  onMouseMove?: (cardId: string | null) => void;
  type?: 'vertical' | 'horizontal';
}

function PlaceCard({ cardData, onMouseMove, type = 'vertical' }: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFavoritesStatusLoading = useAppSelector(getFavoritesStatusLoadingStatus);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const handleFavoriteClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    if (isFavoritesStatusLoading) {
      return;
    }
    dispatch(fetchFavoritesStatusAction({offerId: cardData.id,
      isFavorite: !(cardData.isFavorite)}));
  }, [authorizationStatus, navigate, dispatch, cardData, isFavoritesStatusLoading]);
  return (
    <article
      className={classNames(
        { 'cities__card': type === 'vertical' },
        { 'favorites__card': type === 'horizontal' },
        'place-card'
      )}
      onMouseEnter={() => onMouseMove ? onMouseMove(cardData.id) : null}
      onMouseLeave={() => onMouseMove ? onMouseMove(null) : null}
    >
      {cardData.isPremium && <PremiumClass type='place-card' />}
      <div className={classNames(
        {'cities__image-wrapper': type === 'vertical'},
        {'favorites__image-wrapper': type === 'horizontal'},
        'place-card__image-wrapper',
      )}
      >
        <Link to={AppRoute.Offer.replace(':id', cardData.id)}>
          <img className="place-card__image"
            src={cardData.previewImage}
            width={type === 'vertical' ? '260' : '150'}
            height={type === 'vertical' ? '200' : '110'}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={classNames(
        {'favorites__card-info': type === 'horizontal'},
        'place-card__info',
      )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cardData.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${cardData.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleFavoriteClick}
            disabled={isFavoritesStatusLoading}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>

        <RatingWidget type='place-card' rating={cardData.rating} />

        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', cardData.id)}>{cardData.title}</Link>
        </h2>
        <p className="place-card__type">{cardData.type}</p>
      </div>
    </article>
  );
}

const MemorizedPlaceCard = memo(PlaceCard);
export default MemorizedPlaceCard;
