import { generateMockOffer } from '../mock';
import { mapProcess, setActiveCardId } from './map-process';

describe('MapProcess Slice', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      activeCardId: null,
    };

    const result = mapProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      activeCardId: null,
    };

    const result = mapProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set ActiveCardId with "setActiveCardId" action', () => {
    const initialState = {
      activeCardId: null,
    };
    const uuid = generateMockOffer().id;

    const result = mapProcess.reducer(initialState, setActiveCardId(uuid));

    expect(result.activeCardId).toEqual(uuid);
  });
});
