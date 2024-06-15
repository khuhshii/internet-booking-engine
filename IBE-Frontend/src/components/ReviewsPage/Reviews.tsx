import { CSSProperties, useEffect, useState } from "react";
import "./reviews.scss";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { getTenantConfiguration } from "../../redux/thunk/getTenantConfiguration";
import { submitFeedback } from "../../redux/thunk/getFeedback";
import { Link } from "react-router-dom";
import CircleCheck from "./CircleCheck";
import { FormattedMessage, useIntl } from "react-intl";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  border: "5px solid white",
  marginTop: "200px",
};

function Reviews() {
  const intl = useIntl();
  const [value, setValue] = useState<number>(4);
  const [hover, setHover] = useState<number>(-1);
  const [reviewText, setReviewText] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tenantId, setTenantId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [roomTypeId, setRoomTypeId] = useState("");
  const [token, setToken] = useState("");

  const [feedbackGiven, setFeedBackGiven] = useState(false);

  const [loader, setLoader] = useState(false);
  const labels: { [key: number]: string } = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };
  const dispatch = useDispatch<AppDispatch>();
  interface IReviewResponse {
    validity: boolean;
    message: string;
  }
  const handleSubmit = async () => {
    setLoader(true);
    if (
      (value !== null || reviewText.trim() !== "") &&
      tenantId !== "" &&
      roomTypeId !== "" &&
      propertyId !== "" &&
      token !== ""
    ) {
      try {
        const response = await fetch(
          `https://ibe-team-15-api-management.azure-api.net/api/v1/getToken/${token}`
        );
        const data = (await response.json()) as IReviewResponse;

        if (!data.validity) {
          setFeedBackGiven(true);
          setLoader(false);
          throw new Error();
        }
        dispatch(
          submitFeedback({
            tenantId: tenantId,
            propertyId: propertyId,
            roomTypeId: roomTypeId,
            token: token,
            rating: value,
            review: reviewText,
          })
        )
          .then((response) => {
            if (response.payload) {
              setSubmitted(true);
              setLoader(false);
            } else {
              console.log("Error Receiving Response");
            }
          })
          .catch((error) => {
            setError(error.message);
          });
      } catch {
        console.log(
          "You have already Given feedback, Thanks for your valuable feedback"
        );
      }
    }
    setReviewText("");
  };
  const appDispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    appDispatch(getTenantConfiguration());
    const searchItems = window.location.search;
    const queryParams = new URLSearchParams(searchItems);

    if (
      queryParams.get("tenantId") !== null &&
      queryParams.get("propertyId") !== null &&
      queryParams.get("roomTypeId") !== null &&
      queryParams.get("token") !== null
    ) {
      setTenantId(queryParams.get("tenantId")!);
      setPropertyId(queryParams.get("propertyId")!);
      setRoomTypeId(queryParams.get("roomTypeId")!);
      setToken(queryParams.get("token")!);
    }
  }, []);
  return (
    <div className="reviews">
      <ClipLoader
        color={"#120639"}
        loading={loader}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      { !loader &&
      <div className="feedback-modal-container">
        {(submitted || feedbackGiven) ? (
          <div className="feedback-message">
            <div>
              <p>
                <FormattedMessage
                  id="thankYouFeedback"
                  defaultMessage="Thank you for your feedback"
                />
              </p>
            </div>
            <div className="circle-check">
              <CircleCheck />
            </div>

            <Link
              to="/"
              className="return-to-home"
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  fontSize: "14px",
                  color: "blue",
                }}
              >
                {feedbackGiven?"You have already given feedback":""}<br></br>
                Click here to return to homepage
              </div>
            </Link>
          </div>
        ) : (
          <div className="feedback-message">
            <p>
              <FormattedMessage
                id="yourFeedback"
                defaultMessage="Your Feedback"
              />
            </p>
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

}
    </div>
  );
}

export default Reviews;
