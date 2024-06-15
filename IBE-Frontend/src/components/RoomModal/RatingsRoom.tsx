import { useEffect } from "react";
import "./RatingsRoom.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  RatingRequest,
  getRatingsById,
} from "../../redux/thunk/getRatingsById";
import { AppDispatch, RootState } from "../../redux/store/store";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { FormattedMessage } from "react-intl";

interface IRatingsRoomProps {
  readonly ratingRequest: RatingRequest;
}

export default function RatingsRoom({ ratingRequest }: IRatingsRoomProps) {
  const dispatch = useDispatch<AppDispatch>();

  const currentReviews = useSelector(
    (store: RootState) => store.roomRatings.currentReviews
  );

  useEffect(() => {
    dispatch(getRatingsById(ratingRequest));
  }, [dispatch]);

  // Calculate count for each star rating
  const starCounts: number[] = Array(5).fill(0);
  currentReviews.forEach((review) => {
    starCounts[review.rating - 1]++;
  });

  const totalRatings = currentReviews.length;
  const totalStars = starCounts.reduce((acc, count, index) => {
    return acc + (index + 1) * count;
  }, 0);
  const averageRating = totalRatings ? totalStars / totalRatings : 0;

  let ratingDescription = "";
  if (averageRating > 4) {
    ratingDescription = "Excellent";
  } else if (averageRating > 3) {
    ratingDescription = "Good";
  } else {
    ratingDescription = "";
  }
  return (
    <div
      className="ratingsRoom"
      style={{ display: totalRatings === 0 ? "none" : "block" }}
    >
      <div className="rating-heading">
        <FormattedMessage
          id="anonymousRatings"
          defaultMessage="Anonymous Ratings"
        />
      </div>
      <div className="rating-details">
        <div className="average-rating">
          <div>
            <div>
              <StarRoundedIcon
                style={{
                  color: "f8c82c",
                  fontSize: "50px",
                }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              {averageRating.toFixed(2)}
            </div>
          </div>
          {ratingDescription && (
            <div className="rating-description">{ratingDescription}</div>
          )}
        </div>
        <div className="rating-bars">
          {starCounts.map((count, index) => (
            <div key={index} className="rating-count">
              {`${index + 1}  `}
              <StarRoundedIcon
                style={{
                  color: "f8c82c",
                  marginRight: "2px",
                  marginTop: "-5px",
                }}
              />{" "}
              :
              <div className="bar-container">
                <div className="full-bar"></div>
                <div
                  className="bar"
                  style={{ width: `${(count / currentReviews.length) * 100}%` }}
                ></div>
              </div>
              <span style={{ fontSize: "14px" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;{count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rating-container">
        {/* Display count and bar for each star rating */}
        {currentReviews.map((review, index) => (
          <div key={index} className="review">
            <div className="rating">
              {[...Array(review.rating)].map((_, index) => (
                <StarRoundedIcon
                  key={index}
                  style={{ color: "f8c82c", paddingBottom: "3px" }}
                />
              ))}
            </div>
            <div className="review-text">{review.review}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
