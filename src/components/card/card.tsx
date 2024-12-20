import RatingWidget from '../widgets/rating-widget';
import PremiumClass from '../widgets/premium-class';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constant';

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
}

function PlaceCard({cardData, onMouseMove}: PlaceCardProps): JSX.Element {
  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => onMouseMove ? onMouseMove(cardData.id) : null}
      onMouseLeave={() => onMouseMove ? onMouseMove(null) : null}
    >
      {cardData.isPremium && <PremiumClass type='place-card'/>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Offer}>
          <img className="place-card__image" src={cardData.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cardData.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${cardData.isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>

        <RatingWidget type='place-card' rating={cardData.rating}/>

        <h2 className="place-card__name">
          <Link to={AppRoute.Offer}>{cardData.title}</Link>
        </h2>
        <p className="place-card__type">{cardData.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
