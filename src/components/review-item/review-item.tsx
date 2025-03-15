import { Review } from '../../types/camera';
import { formatReviewDate } from '../../utils/format';

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
    </li>
  );
}


export default ReviewItem;

