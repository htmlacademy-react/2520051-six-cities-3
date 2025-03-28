import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cities, initFavorites, NameSpace } from '../../constant';
import { fetchFavoritesAction, fetchFavoritesStatusAction, fetchOffersAction } from '../api-actions';
import { MainData } from '../../types/state';
import { PlacesOption } from '../../transfers';
import { groupFavoritesByCity } from '../../utils';

const initialState: MainData = {
  city: cities[0],
  sorting: PlacesOption.POPULAR,
  offers: [],
  favorites: initFavorites,
  countFavorites: 0,
  isDataLoading: false,
  isFavoritesStatusLoading: false,
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
      state.favorites = initFavorites;
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
        state.favorites = groupFavoritesByCity(action.payload);
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
        const updatedOffer = action.payload;
        const indexOffer = state.offers.findIndex(
          (offer) => offer.id === updatedOffer.id,
        );
        state.offers[indexOffer].isFavorite = updatedOffer.isFavorite;
        if (updatedOffer.isFavorite === true) {
          state.favorites[updatedOffer.city.name].push(updatedOffer);
          state.countFavorites++;
        } else {
          const index = state.favorites[updatedOffer.city.name].findIndex(
            (offer) => offer.id === updatedOffer.id,
          );
          if (index !== -1) {
            state.favorites[updatedOffer.city.name].splice(index, 1);
            state.countFavorites--;
          }
        }
        state.isFavoritesStatusLoading = false;
      })
      .addCase(fetchFavoritesStatusAction.pending, (state) => {
        state.isFavoritesStatusLoading = true;
      })
      .addCase(fetchFavoritesStatusAction.rejected, (state) => {
        state.isFavoritesStatusLoading = false;
      });
  }
});

export const { setCity, setSorting, resetFavorites } = mainData.actions;
