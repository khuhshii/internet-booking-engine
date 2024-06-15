// import { useLocation, useNavigate } from "react-router-dom";
// // import "./Timer.scss";
// import { FormattedMessage } from "react-intl";
// import { useTimer } from "react-timer-hook";
// import { useDispatch } from "react-redux";

// import { setShowIteanary } from "../../redux/slice/RoomSearchSlice";
// import { AppDispatch } from "../../redux/store/store";
// import { setTermModal } from "../../redux/slice/ItineararySlice";
// export function Timer() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const pathName = location.pathname;
//   const parts = pathName.split("/");
//   const checkoutPart = parts[parts.length - 1];
//   const expiryTimestamp = new Date();
//   // expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 10);
//   expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 10);

//   const appDispatch = useDispatch<AppDispatch>();
//   const { minutes, seconds } = useTimer({
//     expiryTimestamp,
//     onExpire: () => {
//       navigate("/rooms");
//       appDispatch(setTermModal(false))
//       appDispatch(setShowIteanary(false));
//       //   reduxDispatch(resetSelectedItinerary());
//     },
//   });
//   return (
//     checkoutPart.includes("checkoutPage") && (
//       <div
//         className="timer"
//         style={{
//           width: "100%",
//           backgroundColor: "#26266d",
//           padding: "10px",
//           color: "white",
//           display:"flex",
//           justifyContent:"center",
//           fontSize:"16px"
//         }}
//       >
//         <span>
//           {/* <FormattedMessage id="time" defaultMessage="Time left:" /> */}
//           <FormattedMessage id="timeLeft" defaultMessage="Time left:" /> : &nbsp;
//         </span>
//         <span>
//           {minutes < 10 ? "0" + minutes : minutes}:
//           {seconds < 10 ? "0" + seconds : seconds}
//         </span>
//       </div>
//     )
//   );
// }
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useTimer } from "react-timer-hook";
import { useDispatch } from "react-redux";
import {
  setActiveStepper,
  setShowIteanary,
} from "../../redux/slice/RoomSearchSlice";
import { AppDispatch } from "../../redux/store/store";
import { setTermModal } from "../../redux/slice/ItineararySlice";

export function Timer() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const parts = pathName.split("/");
  const checkoutPart = parts[parts.length - 1];
  const expiryTimestamp = new Date();
  expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 10);
  // expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 5); // Set expiry time

  const appDispatch = useDispatch<AppDispatch>();
  const { minutes, seconds } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      // Display message and redirect to home page after 3 seconds
      setRedirecting(true);
      setTimeout(() => {
        setRedirecting(false);
        appDispatch(setActiveStepper(0));
        navigate("/");
        appDispatch(setTermModal(false));
        appDispatch(setShowIteanary(false));
      }, 2000);
    },
  });

  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (redirecting) {
      setTimeout(() => {
        navigate("/");
        appDispatch(setTermModal(false));
        appDispatch(setShowIteanary(false));
      }, 2000);
    }
  }, [redirecting, navigate, appDispatch]);

  return (
    checkoutPart.includes("checkoutPage") && (
      <div
        className="timer"
        style={{
          width: "100%",
          backgroundColor: "#26266d",
          padding: "10px",
          color: "white",
          display: "flex",
          justifyContent: "center",
          fontSize: "16px",
        }}
      >
        <div style={{textAlign:"center"}}>
          <span>
            <FormattedMessage id="timeLeft" defaultMessage="Time left:" /> :{" "}
            &nbsp;
          </span>
          <span>
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </span>
          <br />
          {redirecting && "Redirecting to home page..."
      }
        </div>
        
      </div>
    )
  );
}
