import Header from '../../components/header/header';
import PlaceCard from '../../components/card/card';

import { PlacesOption, cities } from '../../constant';
import { mock } from '../../mocks';

type LocationItemProps = {
  city: string;
}

type PlaceOptionProps = {
  option: string;
}

function LocationItem({city}: LocationItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" href="#">
        <span>{city}</span>
      </a>
    </li>
  );
}

function PlaceOptionItem({option}: PlaceOptionProps): JSX.Element {
  return (<li className="places__option" tabIndex={0}>{option}</li>);
}

function MainScreen(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((city) => <LocationItem key={city} city={city} />)}
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
                  {Object.entries(PlacesOption).map(([key, option]) => <PlaceOptionItem option={option} key={key} />)}
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {mock.map((dataObj) => <PlaceCard dataObj={dataObj} key={dataObj.id} />)}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
