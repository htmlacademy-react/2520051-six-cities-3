import { initReview } from '../../constant';
import { commentsData, setReviewComment, setReviewRaiting } from './conmments-data';

describe('commentsData Slice', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      comments: [],
      countComments: 0,
      review: {
        rating: initReview.rating,
        comment: initReview.comment
      },
      isCommentsLoading: false,
      isReviewLoading: false,
      error: null,
    };

    const result = commentsData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      comments: [],
      countComments: 0,
      review: {
        rating: initReview.rating,
        comment: initReview.comment
      },
      isCommentsLoading: false,
      isReviewLoading: false,
      error: null,
    };

    const result = commentsData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set comment with "setReviewComment" action', () => {
    const initialState = {
      comments: [],
      countComments: 0,
      review: {
        rating: initReview.rating,
        comment: initReview.comment
      },
      isCommentsLoading: false,
      isReviewLoading: false,
      error: null,
    };
    const expectedReviewComment = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia nostrum facere vero deleniti recusandae alias dolor repellat ex quidem! Corporis rem perferendis porro doloremque? Consequuntur nam necessitatibus amet beatae nobis.';

    const result = commentsData.reducer(initialState, setReviewComment(expectedReviewComment));

    expect(result.review.comment).toEqual(expectedReviewComment);
  });

  it('should set raiting with "setReviewRaiting" action', () => {
    const initialState = {
      comments: [],
      countComments: 0,
      review: {
        rating: initReview.rating,
        comment: initReview.comment
      },
      isCommentsLoading: false,
      isReviewLoading: false,
      error: null,
    };
    const expectedReviewRaiting = 3;
    const result = commentsData.reducer(initialState, setReviewRaiting(expectedReviewRaiting));

    expect(result.review.rating).toEqual(expectedReviewRaiting);
  });


});
