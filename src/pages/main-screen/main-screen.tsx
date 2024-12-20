import { useState } from 'react';
import Header from '../../components/widgets/header/header';
import PlaceCard from '../../components/card/card';
import Map from '../../components/map/map';
import { Helmet } from 'react-helmet-async';

import { cities } from '../../constant';
import { PlacesOption } from '../../transfers';
import { mock } from '../../mocks';

function MainScreen(): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  function handleCardHover(cardId: string | null): void {
    setActiveCardId(cardId);
  }
  const cityLocation = mock[0].city.location;
  const mapData = mock.map((offer) => ({'id': offer.id, 'location': offer.location}));
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{mock[0].city.name}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((city) => (
                <li className="locations__item" key={city}>
                  <a className="locations__item-link tabs__item" href="#">
                    <span>{city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  {Object.entries(PlacesOption).map(([key, option]) => <li className="places__option" tabIndex={0} key={key}>{option}</li>)}
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {mock.map((cardData) => (
                  <PlaceCard
                    cardData={cardData}
                    key={cardData.id}
                    onMouseMove={handleCardHover}
                  />)
                )}
              </div>
            </section>
            <div className="cities__right-section">
              <Map mapData={mapData} activeCardId={activeCardId} cityLocation={cityLocation}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
