import { cities } from '../../constant';
import { PlacesOption } from '../../transfers';
import { generateMockOffer } from '../mock';
import { mainData, resetFavorites, setCity, setSorting } from './main-data';

describe('MainData Slice', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: cities[0],
      sorting: PlacesOption.POPULAR,
      offers: [],
      favorites: [],
      countFavorites: 0,
      isDataLoading: false,
      error: null,
    };

    const result = mainData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      city: cities[0],
      sorting: PlacesOption.POPULAR,
      offers: [],
      favorites: [],
      countFavorites: 0,
      isDataLoading: false,
      error: null,
    };

    const result = mainData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should reset favorites with "resetFavorites" action', () => {
    const mockFavorites = Array.from({ length: 7 }, generateMockOffer)
      .filter((offer) => offer.isFavorite);

    const initialState = {
      city: cities[0],
      sorting: PlacesOption.POPULAR,
      offers: [],
      favorites: mockFavorites,
      countFavorites: mockFavorites.length,
      isDataLoading: false,
      error: null,
    };
    const expectedState = {
      city: cities[0],
      sorting: PlacesOption.POPULAR,
      offers: [],
      favorites: [],
      countFavorites: 0,
      isDataLoading: false,
      error: null,
    };

    const result = mainData.reducer(initialState, resetFavorites);

    expect(result).toEqual(expectedState);
  });

  it('should set sorting with "setSorting" action', () => {
    const initialState = {
      city: cities[0],
      sorting: PlacesOption.POPULAR,
      offers: [],
      favorites: [],
      countFavorites: 0,
      isDataLoading: false,
      error: null,
    };

    const result = mainData.reducer(initialState, setSorting(PlacesOption.PRICE_DOWN));

    expect(result.sorting).toEqual(PlacesOption.PRICE_DOWN);
  });

  it('should set city with "setCity" action', () => {
    const initialState = {
      city: cities[0],
      sorting: PlacesOption.POPULAR,
      offers: [],
      favorites: [],
      countFavorites: 0,
      isDataLoading: false,
      error: null,
    };

    const result = mainData.reducer(initialState, setCity(cities[2]));

    expect(result.city).toEqual(cities[2]);
  });

});
