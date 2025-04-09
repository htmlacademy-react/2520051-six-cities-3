import Footer from '../../components/widgets/footer/footer';
import Header from '../../components/widgets/header/header';
import { Link } from 'react-router-dom';
import { Helmet } from'react-helmet-async';
import { AppRoute } from '../../constant';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <Helmet>
        <title>404-not found</title>
      </Helmet>
      <Header navbar={false}/>
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">404 Not found</b>
              <p className="favorites__status-description">Head back to the
                <Link to={AppRoute.Main}> homepage</Link>
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default NotFoundScreen;
