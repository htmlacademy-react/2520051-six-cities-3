import { NameSpace } from '../../constant';
import { generateMockOffer, generateOfferInfo } from '../mock';
import { getNearest, getNearestLoadingStatus, getOffer, getOfferLoadingStatus } from './selectors';

const mockOffer = generateOfferInfo();
const mockNearest = Array.from({ length: 3 }, generateMockOffer);

describe('Offer selectors', () => {

  const mockState = {
    [NameSpace.Offer]: {
      currentOffer: mockOffer,
      nearestOffers: mockNearest,
      isDataLoading: false,
      isNearestLoading: false,
      error: null,
    }
  };

  it('should get current offer', () => {
    expect(getOffer(mockState)).toEqual(mockState[NameSpace.Offer].currentOffer);
  });

  it('should get nearest offers', () => {
    expect(getNearest(mockState)).toEqual(mockState[NameSpace.Offer].nearestOffers.slice(0, 3));
  });

  it('should get nearest loading status', () => {
    expect(getNearestLoadingStatus(mockState)).toBe(mockState[NameSpace.Offer].isNearestLoading);
  });

  it('should get offer loading status', () => {
    expect(getOfferLoadingStatus(mockState)).toBe(mockState[NameSpace.Offer].isDataLoading);
  });
});
