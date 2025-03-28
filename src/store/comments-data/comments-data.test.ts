import { NameSpace } from '../../constant';
import { mockState } from '../mock';
import {
  getComments,
  getReviewLoadingStatus,
  getCountComments,
  getCommentsLoadingStatus,
  getErrorMessage,
  getReview,
} from './selectors';


describe('Comments selectors', () => {

  it('should get comments', () => {
    expect(getComments(mockState)).toEqual(mockState[NameSpace.Comments].comments.slice(0, 10));
  });

  it('should get review loading status', () => {
    expect(getReviewLoadingStatus(mockState)).toBe(mockState[NameSpace.Comments].isReviewLoading);
  });

  it('should get count of comments', () => {
    expect(getCountComments(mockState)).toBe(mockState[NameSpace.Comments].countComments);
  });

  it('should get comments loading status', () => {
    expect(getCommentsLoadingStatus(mockState)).toBe(mockState[NameSpace.Comments].isCommentsLoading);
  });

  it('should get error message', () => {
    expect(getErrorMessage(mockState)).toBe(mockState[NameSpace.Comments].error);
  });

  it('should get review', () => {
    expect(getReview(mockState)).toEqual(mockState[NameSpace.Comments].review);
  });

});
