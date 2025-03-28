import { useAppSelector } from '../hooks';
import { Link } from 'react-router-dom';
import CardList from '../card-list/card-list';
import { getFilterFavoriteOffers } from '../../store/main-data/selectors';


function FavoriteList(): JSX.Element {
  const favorites = useAppSelector(getFilterFavoriteOffers);
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(favorites).map(([city, citiFavorites]) => {
          if (citiFavorites.length){
            return (
              <li className="favorites__locations-items" key={city}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link to="#" className="locations__item-link">
                      <span>{city}</span>
                    </Link>
                  </div>
                </div>
                <CardList offers={citiFavorites} typeContent='favorites'/>
              </li>
            );
          }
        })}
      </ul>
    </section>
  );
}

export default FavoriteList;
