export const PlacesOption = {
  POPULAR: 'Popular',
  PRICE_UP: 'Price: low to high',
  PRICE_DOWN: 'Price: high to low',
  RAITNG: 'Top rated first'
};

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const DateFormat = {
  DATE_DB: 'YYYY-MM-DD',
  MONTH_YEAR: 'MMMM YYYY',
  DAY: 'D'
};

export enum AppRoute {
  Login = '/login',
  Main = '/',
  Favorites = '/favorites',
  Offer = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
