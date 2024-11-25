
export const PremiumClass = ({ type }: { type: string }) => (
  <div className={`${type}__mark`}>
    <span>Premium</span>
  </div>
);

type RatingWidgetProps = {
  rating: number;
  type: string;
  showValue?: boolean;
}
export const RatingWidget = ({ rating, type, showValue = false}: RatingWidgetProps) => (
  <div className={`${type}__rating rating`}>
    <div className={`${type}__stars rating__stars`}>
      <span style={{ width: `${rating * 20}%` }}></span>
      <span className="visually-hidden">Rating</span>
    </div>
    {showValue && <span className={`${type}__rating-value rating__value`}>{rating}</span >}
  </div >

);
