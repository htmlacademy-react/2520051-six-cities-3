import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cities, NameSpace } from '../../constant';
import { fetchFavoritesAction, fetchFavoritesStatusAction, fetchOffersAction } from '../api-actions';
import { MainData } from '../../types/state';
import { PlacesOption } from '../../transfers';

const initialState: MainData = {
  city: cities[0],
  sorting: PlacesOption.POPULAR,
  offers: [],
  favorites: [],
  countFavorites: 0,
  isDataLoading: false,
  error: null,
};

export const mainData = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<MainData['city']>) {
      state.city = action.payload;
    },
    setSorting(state, action: PayloadAction<string>) {
      state.sorting = action.payload;
    },
    resetFavorites(state) {
      state.favorites = [];
      state.countFavorites = 0;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoading = false;
        state.error = 'Ошибка загрузки';
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.countFavorites = action.payload.length;
        state.isDataLoading = false;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isDataLoading = false;
        state.error = 'Ошибка загрузки';
      })
      .addCase(fetchFavoritesStatusAction.fulfilled, (state, action) => {
        const indexOffers = state.offers.findIndex((offer) => offer.id === action.payload.id);
        if(indexOffers !== -1){
          state.offers[indexOffers].isFavorite = action.payload.isFavorite;
        }
        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
          state.countFavorites++;
        }else{
          const index = state.favorites.findIndex((favorite) => favorite.id === action.payload.id);
          if (index !== -1) {
            state.favorites.splice(index, 1);
          }
          state.countFavorites--;
        }

      });
  }
});

export const { setCity, setSorting, resetFavorites } = mainData.actions;
