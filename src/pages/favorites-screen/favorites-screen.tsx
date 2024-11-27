import { mock } from '../../mocks';
import PlaceCard from '../../components/card/card';
import Header from '../../components/widgets/header/header';
import Footer from '../../components/widgets/footer/footer';


const pageMocks = [
  {
    city: 'Amsterdam',
    mocks: mock.slice(0, 3)
  },
  {
    city: 'Hamburg',
    mocks: mock.slice(4, 5)
  }
];

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

type CityItemProps = {
  city: string;
  mocks: PlaceCardItem[];
}

function CityItem({ city, mocks }: CityItemProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {mocks.map((cardMocks: PlaceCardItem) => <PlaceCard dataObj={cardMocks} key={cardMocks.id} />)}
      </div>
    </li>
  );
}

function FavoritesScreen(): JSX.Element {
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {pageMocks.map((mockCityItem) => <CityItem city={mockCityItem.city} mocks={mockCityItem.mocks} key={mockCityItem.city} />)}

            </ul>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesScreen;
