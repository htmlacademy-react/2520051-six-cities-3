import Header from '../../components/widgets/header/header';
import PlaceCard from '../../components/card/card';
import { PremiumClass, RatingWidget } from '../../components/widgets/widgets';
import ReviewsListWidget from '../../components/widgets/review';

import { mock, mockItem, mockComments } from '../../mocks';

const nearestMocks = mock.slice(7, 10);

function GaleryItem({img}: {img: string}): JSX.Element {
  return (
    <div className="offer__image-wrapper" >
      <img className="offer__image" src={img} alt="Photo studio" />
    </div>
  );
}

type OfferFeaturesProps = {
  entire: string;
  bedrooms: number;
  adults: number;
}

function OfferFeatures({ entire, bedrooms, adults }: OfferFeaturesProps) {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">
        {entire[0].toUpperCase() + entire.substring(1)}
      </li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedrooms} Bedrooms
      </li>
      <li className="offer__feature offer__feature--adults">
        Max {adults} adults
      </li>
    </ul>
  );
}

function OfferGoods({ item }: { item: string }) {
  return (
    <li className="offer__inside-item">
      {item}
    </li>

  );
}

function OfferScreen(): JSX.Element {
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {mockItem.images.map((img) => <GaleryItem img={img} key={img} />)}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <PremiumClass type='offer' />
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {mockItem.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <RatingWidget rating={mockItem.rating} type='offer' showValue />
              <OfferFeatures entire={mockItem.type} bedrooms={mockItem.bedrooms} adults={mockItem.maxAdults} />
              <div className="offer__price">
                <b className="offer__price-value">&euro;{mockItem.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {mockItem.goods.map((item) => <OfferGoods item={item} key={item} />)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={mockItem.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {mockItem.host.name}
                  </span>
                  <span className="offer__user-status">
                    {mockItem.host.isPro ? 'Pro' : null}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {mockItem.description}
                  </p>
                  <p className="offer__text">
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <ReviewsListWidget {...mockComments} />
                <form className="reviews__form form" action="#" method="post">
                  <label className="reviews__label form__label" htmlFor="review">Your review</label>
                  <div className="reviews__rating-form form__rating">
                    <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
                    <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
                    <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
                    <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
                    <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>

                    <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
                    <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                      <svg className="form__star-image" width="37" height="33">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </label>
                  </div>
                  <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                  <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearestMocks.map((dataObj) => <PlaceCard dataObj={dataObj} key={dataObj.id} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
