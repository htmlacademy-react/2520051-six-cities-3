import { mock } from '../../mocks';
import PlaceCard from '../../components/card/card';
import Header from '../../components/widgets/header/header';
import Footer from '../../components/widgets/footer/footer';
import { Helmet } from'react-helmet-async';


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

function FavoritesScreen(): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {pageMocks.map((mockCityItem) => (
                <li className="favorites__locations-items" key={mockCityItem.city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{mockCityItem.city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {mockCityItem.mocks.map((cardMocks: PlaceCardItem) => <PlaceCard cardData={cardMocks} key={cardMocks.id} />)}
                  </div>
                </li>
              ))}

            </ul>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesScreen;
