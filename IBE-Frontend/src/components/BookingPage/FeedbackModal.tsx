import { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "./FeedbackModal.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store/store";
import { closeFeedbackModal } from "../../redux/slice/RoomPageSlice";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import { submitFeedback } from "../../redux/thunk/getFeedback";
import { FormattedMessage, useIntl } from "react-intl";

export function FeedbackModal() {
  const intl = useIntl();
  const isOpen = useSelector(
    (state: RootState) => state.roomPage.isFeedbackModalOpen
  );
  const dispatch: AppDispatch = useDispatch();
  const [value, setValue] = useState<number>(4);
  const [hover, setHover] = useState<number>(-1);
  const [reviewText, setReviewText] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // State to store error message

  const roomTypeID = useSelector(
    (state: RootState) => state.roomSearch.roomTypeID
  );
  const propertyID = useSelector((state: RootState) => state.landing.properyID);
  useEffect(() => {
    if (isOpen) {
      setValue(4);
      setHover(-1);
      setReviewText("");
      setSubmitted(false);
      setError(null);
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    dispatch(closeFeedbackModal(false));
  };

  const handleSubmit = () => {
    if (value !== null || reviewText.trim() !== "") {
      dispatch(
        submitFeedback({
          tenantId: "1",
          propertyId: propertyID,
          roomTypeId: roomTypeID,
          rating: value,
          review: reviewText,
          token:"test",
        })
      )
        .then((response) => {
          if (response.payload) {
            setSubmitted(true);
          } else {
            console.log("Error Receiving Response");
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const labels: { [key: number]: string } = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        center
        closeIcon={<CloseIcon />}
      >
        <div className="feedback-modal-container">
          {submitted ? (
            <div className="feedback-message">
              <div>
                <p><FormattedMessage id="thankYouFeedback" defaultMessage="Thank you for your feedback"/></p>
              </div>
            </div>
          ) : (
            <div className="feedback-message">
              <p><FormattedMessage id="yourFeedback" defaultMessage="Your Feedback"/></p>

              <div className="stars">
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={1}
                  size="large"
                  onChange={(_, newValue) => {
                    setValue(newValue ?? 4);
                  }}
                  onChangeActive={(_, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
              <p className="rating-text">
                {value !== null && labels[hover !== -1 ? hover : value]}
              </p>
              <textarea
                className="review-textarea"
                placeholder={intl.formatMessage({
                  id: "writeReview",
                  defaultMessage: "Write your review here...",
                })}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>

              {error && <p className="error-message">{error}</p>}
              
              <button className="submit-button" onClick={handleSubmit}>
                <FormattedMessage id="submit" defaultMessage="SUBMIT" />
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
