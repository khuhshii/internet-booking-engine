import "./BookingPage.style.scss";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import IteanaryContainer from "../RoomResults/IteanaryContainer";
import { useNavigate } from "react-router-dom";
import {
  setActiveStepper,
  setShowIteanary,
} from "../../redux/slice/RoomSearchSlice";
import { closeModal } from "../../redux/slice/RoomPageSlice";
// import { useState } from "react";
import MobileItenaryComponent from "../RoomResults/MobileItenary";
import { FeedbackModal } from "./FeedbackModal";
// import { sendEmail } from "../../redux/thunk/sendEmail";
import { FormattedMessage } from "react-intl";
// import { Snackbar } from "@mui/material";
import { Forms } from "./Form";

export function BookingPage() {
  const steps = [
    <FormattedMessage id="chooseRoom" defaultMessage={"Choose Room"} />,
    <FormattedMessage id="chooseAddon" defaultMessage={"Choose Add On"} />,
    <FormattedMessage id="checkout" defaultMessage={"Check Out"} />,
  ];
  const showIteanary = useSelector(
    (store: RootState) => store.roomSearch.showIteanary
  );
  const navigator = useNavigate();
  const appDispatch = useDispatch<AppDispatch>();

  if (showIteanary === false) {
    appDispatch(closeModal(false))
    navigator(`/`);
  }

  const handleStepClick = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        appDispatch(setActiveStepper(0));
        appDispatch(closeModal(false));
        navigator(`/rooms?${localStorage.getItem("prevPath")}`);
        break;
      case 1:
        appDispatch(setActiveStepper(1));
        navigator(`/rooms?${localStorage.getItem("prevPath")}`);
        break;
      case 2:
        console.log("Step 3 clicked!");
        break;
      default:
        console.log("Unknown step clicked!");
    }
  };
  const activeStepper = useSelector(
    (store: RootState) => store.roomSearch.activeStepper
  );

  const handleContinueShopping = () => {
    appDispatch(setActiveStepper(1));
    appDispatch(setShowIteanary(true));
    appDispatch(closeModal(false));
    navigator(`/rooms?${localStorage.getItem("prevPath")}`);
  };

  // const handleOpenFeedbackModal = () => {
  //   appDispatch(openFeedbackModal());
  // };

  // function validateEmail(email: string) {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }

  // const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  // const [snackbarMessage, setSnackbarMessage] = useState<String>("");
  // const [snackbarType, setSnackbarType] = useState<String>("");

  // const [emailInput, setEmailInput] = useState<string>("");
  // function purchaseHandler() {
  //   if (!validateEmail(emailInput)) {
  //     console.error("Invalid email address");
  //     setSnackbarMessage("Invalid email address");
  //     setSnackbarType("error");
  //     setSnackbarOpen(true);
  //     return;
  //   }

  //   const propertyId = useSelector(
  //     (store: RootState) => store.landing.properyID
  //   );
  //   const roomTypeId = useSelector(
  //     (store: RootState) => store.roomSearch.roomTypeID
  //   );
  //   console.log("email sending initiated");
  //   appDispatch(
  //     sendEmail({
  //       email: emailInput,
  //       data: `Please give your feedback on this link : https://calm-bay-0d02db810.4.azurestaticapps.net/reviews?tenantId=${1}&propertyId=${propertyId}&roomTypeId=${roomTypeId}`,
  //     })
  //   );
  //   setEmailInput("");
  //   setSnackbarMessage("Email sent successfully");
  //   setSnackbarType("success");
  //   setSnackbarOpen(true);
  // }

  return (
    <div className="main">
      <div className="user-flow-div">
        <div className="user-flow-content">
          <Stepper activeStep={activeStepper} alternativeLabel>
            {steps.map((label, index) => (
              // <Step key={label} onClick={() => handleStepClick(index)}>
              <Step onClick={() => handleStepClick(index)}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
      {/* <div className="timer">
        <Timer />
      </div> */}
      <div className="room-results-filter-container">
        <div
          className="room-results-sub-container"
          style={{ margin: "0 10px" }}
        >
          {showIteanary ? (
            <MobileItenaryComponent
              buttonText="CONTINUESHOPPING"
              onButtonClick={handleContinueShopping}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="form-itenary-section">
        <div className="form-section">
          <Forms />
        </div>
        <div className="itenary">
          <div style={{ width: "80%" }}>
            <IteanaryContainer
              buttonText="CONTINUESHOPPING"
              onButtonClick={handleContinueShopping}
            />
            <div className="need-help-container">
              <div className="heading">
                <FormattedMessage id="needHelp" defaultMessage="Need Help?" />
              </div>
              <div className="number">
                {" "}
                <FormattedMessage
                  id="callNumber"
                  defaultMessage="Call 1-800-555-5555"
                />
              </div>
              <div className="time">
                {" "}
                <FormattedMessage
                  id="officeHours"
                  defaultMessage="Mon-Fri 8a-5p EST"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="feedback-div">
        <button className="feedback" onClick={handleOpenFeedbackModal}>
          <FormattedMessage id="feedback" defaultMessage={"Feedback"} />
        </button>
      </div> */}
      <FeedbackModal />
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        ContentProps={{
          style: {
            backgroundColor: snackbarType === "error" ? "#ff3333" : "#4caf50",
          },
        }}
      /> */}
    </div>
  );
}
