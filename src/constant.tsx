export const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const TIMEOUT_SHOW_ERROR = 2000;

export const endPoints = {
  OFFERS: '/offers',
  OFFER: '/offers/:offerId',
  NEARBY: '/offers/:offerId/nearby',
  FAVORITE: '/favorite',
  FAVORITE_STATUS: '/favorite/:offerId/:status',
  COMMENTS: '/comments/:offerId',
  LOGIN: '/login',
  LOGOUT: '/logout',
};

export const URL_MARKER_DEFAULT = '../public/img/pin.svg';

export const URL_MARKER_CURRENT = '../public/img/pin-active.svg';

export const cities = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  },
];

export const initFavorites = {
  'Paris': [],
  'Cologne': [],
  'Brussels': [],
  'Amsterdam': [],
  'Hamburg': [],
  'Dusseldorf': [],
};

export enum AppRoute {
  Login = '/login',
  Main = '/',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  App = 'APP',
  Main = 'MAIN',
  Offer = 'OFFER',
  User = 'USER',
  Comments = 'COMMENTS',
  Map = 'MAP',
}

export const reviewRatings = [
  {
    rating: 5,
    title: 'perfect'
  },
  {
    rating: 4,
    title: 'good'
  },
  {
    rating: 3,
    title: 'not bad'
  },
  {
    rating: 2,
    title: 'badly'
  },
  {
    rating: 1,
    title: 'terribly'
  },
];

export const initReview = {
  rating: 0,
  comment: ''
};
