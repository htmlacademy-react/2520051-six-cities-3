import { AuthorizationStatus } from '../constant';
import { store } from '../store/index';
import { City, Offers } from './main';
import { OfferInfo, Comment } from './offer';
import { User } from './user';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  error: string | null;
};

export type MainData = {
  offers: Offers;
  favorites: Record<string, Offers>;
  countFavorites: number;
  isDataLoading: boolean;
  isFavoritesStatusLoading: boolean;
  error: string | null;
  city: City;
  sorting: string;
}

export type OfferData = {
  currentOffer: OfferInfo | null;
  nearestOffers: Offers;
  isDataLoading: boolean;
  isNearestLoading: boolean;
  error: string | null;
}

export type MapProcess = {
  activeCardId: string | null;
}

export type CommentsProcess = {
  comments: Comment[];
  countComments: number;
  review: {
    rating: number;
    comment: string;
  };
  isCommentsLoading: boolean;
  isReviewLoading: boolean;
  error: string | null;
}


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
