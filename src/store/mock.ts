import { name, image, random, datatype, lorem, date, internet } from 'faker';
import { AuthorizationStatus, cities, NameSpace } from '../constant';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { PlacesOption } from '../transfers';
import { groupFavoritesByCity } from '../utils';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const generateMockOffer = () => ({
  id: datatype.uuid(),
  title: lorem.sentence(),
  type: random.arrayElement(['apartment', 'room', 'house', 'hotel']),
  price: datatype.number({ min: 50, max: 500 }),
  previewImage: image.imageUrl(640, 480, 'city', true),
  city: {
    name: random.arrayElement(cities).name,
    location: {
      latitude: datatype.float({ min: 40, max: 60, precision: 0.0001 }),
      longitude: datatype.float({ min: -10, max: 10, precision: 0.0001 }),
      zoom: datatype.number({ min: 10, max: 15 }),
    },
  },
  location: {
    latitude: datatype.float({ min: 40, max: 60, precision: 0.0001 }),
    longitude: datatype.float({ min: -10, max: 10, precision: 0.0001 }),
    zoom: datatype.number({ min: 10, max: 15 }),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.float({ min: 1, max: 5, precision: 0.1 }),
});

export const generateOfferInfo = () => ({
  ...generateMockOffer(),
  description: lorem.paragraph(),
  images: Array.from({ length: 6 }, () => image.imageUrl(640, 480, 'city', true)),
  goods: random.arrayElements(
    ['Wi-Fi', 'Heating', 'Kitchen', 'TV', 'Coffee machine', 'Towels', 'Fridge', 'Washing machine'],
    datatype.number({ min: 3, max: 6 })
  ),
  host: {
    isPro: datatype.boolean(),
    name: name.firstName(),
    avatarUrl: image.avatar(),
  },
  bedrooms: datatype.number({ min: 1, max: 5 }),
  maxAdults: datatype.number({ min: 1, max: 4 }),
});

export const generateMockComment = () => ({
  id: datatype.uuid(),
  comment: lorem.sentences(2),
  date: date.past().toISOString(),
  rating: datatype.number({ min: 1, max: 5 }),
  user: {
    name: name.firstName(),
    avatarUrl: image.avatar(),
    isPro: datatype.boolean(),
  },
});

export const generateMockUser = () => ({
  id: datatype.uuid(),
  email: internet.email(),
  token: datatype.uuid(),
  name: name.firstName(),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
});


const mockOffers = Array.from({ length: 5 }, generateMockOffer);
const mockFavorites = mockOffers.filter((offer) => offer.isFavorite);
const mockComments = Array.from({ length: 10 }, generateMockComment);
const mockOffer = generateOfferInfo();
const mockNearest = Array.from({ length: 3 }, generateMockOffer);
const mockUser = generateMockUser();

export const mockState = {
  [NameSpace.Main]: {
    city: cities[0],
    sorting: PlacesOption.POPULAR,
    offers: mockOffers,
    favorites: groupFavoritesByCity(mockFavorites),
    countFavorites: mockFavorites.length,
    isDataLoading: false,
    isFavoritesStatusLoading: false,
    error: null,
  },
  [NameSpace.Offer]: {
    currentOffer: mockOffer,
    nearestOffers: mockNearest,
    isDataLoading: false,
    isNearestLoading: false,
    error: null,
  },
  [NameSpace.Comments]: {
    comments: mockComments,
    countComments: mockComments.length,
    review: { rating: 5, comment: 'Great place!' },
    isCommentsLoading: false,
    isReviewLoading: false,
    error: null,
  },
  [NameSpace.Map]: {
    activeCardId: null,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: mockUser,
    error: null,
  },
};
