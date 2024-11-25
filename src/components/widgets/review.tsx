import { RatingWidget } from './widgets';
import { getDatetimeFormat } from '../../utils';
import {DateFormat} from '../../constant';

type ReviewItemProps = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
}

function ReviewItem(props: ReviewItemProps) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={props.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {props.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <RatingWidget rating={props.rating} type='reviews' />
        <p className="reviews__text">
          {props.comment}
        </p>
        <time className="reviews__time" dateTime={getDatetimeFormat(props.date, DateFormat.DATE_DB)}>{getDatetimeFormat(props.date, DateFormat.MONTH_YEAR)}</time>
      </div>
    </li>
  );
}

function ReviewsListWidget(commentList: Array<ReviewItemProps>) {
  return (
    <ul className="reviews__list">
      {Object.values(commentList).map((comment) => <ReviewItem {...comment} key={comment.id} />)}
    </ul>
  );
}

export default ReviewsListWidget;
