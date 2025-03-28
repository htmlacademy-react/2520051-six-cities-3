import { NameSpace } from '../../constant';
import { mockState } from '../mock';
import {
  getCity,
  getSorting,
  getOffers,
  getFavorites,
  getCountFavorites,
  getDataLoadingStatus,
  getError,
  getFilteredOffers
} from './selectors';


describe('Main selectors', () => {

  it('should get city', () => {
    const city = getCity(mockState);
    expect(city).toBe(mockState[NameSpace.Main].city);
  });

  it('should get sorting', () => {
    expect(getSorting(mockState)).toBe(mockState[NameSpace.Main].sorting);
  });

  it('should get offers', () => {
    expect(getOffers(mockState)).toEqual(mockState[NameSpace.Main].offers);
  });

  it('should get favorites', () => {
    expect(getFavorites(mockState)).toEqual(mockState[NameSpace.Main].favorites);
  });

  it('should get count of favorites', () => {
    expect(getCountFavorites(mockState)).toBe(mockState[NameSpace.Main].countFavorites);
  });

  it('should get data loading status', () => {
    expect(getDataLoadingStatus(mockState)).toBe(mockState[NameSpace.Main].isDataLoading);
  });

  it('should get error', () => {
    expect(getError(mockState)).toBe(mockState[NameSpace.Main].error);
  });


  it('should get filtered offers', () => {
    expect(getFilteredOffers(mockState)).toEqual(
      mockState[NameSpace.Main].offers.filter((offer) => offer.city.name === mockState[NameSpace.Main].city.name)
    );
  });
});
