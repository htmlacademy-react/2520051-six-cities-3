type RatingWidgetProps = {
  rating: number;
  type: string;
  showValue?: boolean;
}
const RatingWidget = ({ rating, type, showValue = false}: RatingWidgetProps) => (
  <div className={`${type}__rating rating`}>
    <div className={`${type}__stars rating__stars`}>
      <span style={{ width: `${rating * 20}%` }}></span>
      <span className="visually-hidden">Rating</span>
    </div>
    {showValue && <span className={`${type}__rating-value rating__value`}>{rating}</span >}
  </div >

);

export default RatingWidget;
