import {createAsyncThunk} from '@reduxjs/toolkit';
import { State, AppDispatch } from '../types/state';
import { AxiosInstance } from 'axios';
import {
  AppRoute,
  endPoints,
} from '../constant';
import { Offer, Offers} from '../types/main';
import { redirectToRoute } from './action';
import { AuthData, User } from '../types/user';
import { dropToken, saveToken } from '../services/token';
import { OfferInfo, Comment } from '../types/offer';
import { sortByDateDescending } from '../utils';
import { resetFavorites } from './main-data/main-data';


export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(endPoints.OFFERS);
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(endPoints.FAVORITE);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<OfferInfo, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, {extra: api}) => {
    const { data } = await api.get<OfferInfo>(endPoints.OFFER.replace(':offerId', offerId));
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offers, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Offers>(endPoints.NEARBY.replace(':offerId', offerId));
    return(data);
  },
);

export const fetchCommentsAction = createAsyncThunk<Comment[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Comment[]>(endPoints.COMMENTS.replace(':offerId', offerId));
    return(sortByDateDescending(data));
  },
);

type FavoriteStatusPayload = {
  'offerId': string;
  'isFavorite': boolean;
};

export const fetchFavoritesStatusAction = createAsyncThunk<Offer, FavoriteStatusPayload, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoritesStatus',
  async ({offerId, isFavorite}, {extra: api}) => {

    const {data} = await api.post<Offer>(endPoints.FAVORITE_STATUS
      .replace(':offerId', offerId)
      .replace(':status', isFavorite ? '1' : '0')
    );
    return(data);
  },
);

type AddingCommentPayload = {
  'offerId': string;
  'comment': string;
  'rating': number;
};

export const addCommentAction = createAsyncThunk<Comment, AddingCommentPayload, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addComment',
  async ({offerId, comment, rating}, {extra: api}) => {
    const {data} = await api.post<Comment>(endPoints.COMMENTS.replace(':offerId', offerId), { comment, rating });
    return(data);
  },
);

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<User>(endPoints.LOGIN);
    dispatch(fetchFavoritesAction());
    return data;
  },
);

export const loginAction = createAsyncThunk<User, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<User>(endPoints.LOGIN, {email, password});
    saveToken(data.token);
    dispatch(fetchFavoritesAction());
    dispatch(redirectToRoute(AppRoute.Favorites));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(endPoints.LOGOUT);
    dropToken();
    dispatch(resetFavorites());
    dispatch(fetchOffersAction());
  },
);

