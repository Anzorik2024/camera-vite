import { Review } from '../../types/camera';
import { formatReviewDate } from '../../utils/format';
import StarsRating from '../stars-rating/stars-rating';

type ReviewItemProps = {
  reviewData: Review;
}


function ReviewItem({ reviewData }: ReviewItemProps): JSX.Element {
  const {userName, advantage, disadvantage, createAt, rating, review} = reviewData ;

  const date = new Date(createAt);

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={date.toISOString()}>
          {formatReviewDate(date)}
        </time>
      </div>
      <div className="rate review-card__rate">
        <StarsRating
          rating={rating}
        />
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
    </li>
  );
}


export default ReviewItem;

