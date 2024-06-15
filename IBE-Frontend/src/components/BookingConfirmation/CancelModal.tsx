// import { useDispatch, useSelector } from "react-redux";
// import Modal from "react-responsive-modal";
// import "react-responsive-modal/styles.css";
// import { AppDispatch, RootState } from "../../redux/store/store";
// import { setCancelModal } from "../../redux/slice/ItineararySlice";
// import { CSSProperties, useEffect, useState } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
// import { cancelBooking } from "../../redux/thunk/cancelBooking";
// import { getBooking } from "../../redux/thunk/getBooking";

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   border: "5px solid white",
//   marginTop: "80px",
// };
// const CancelModal = () => {
//   const isOpen = useSelector((state: RootState) => state.itinerary.cancelModal);
//   const appDispatch = useDispatch<AppDispatch>();
//   const closeModal = () => {
//     appDispatch(setCancelModal(false));
//   };

//   const cancelBookingStatus = useSelector(
//     (store: RootState) => store.booking.cancelBookingStatus
//   );
//   const cancelBookingMessage = useSelector(
//     (store: RootState) => store.booking.cancelBookingMessage
//   );

//   function otpVerificationHandler() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const bookingIdParam = urlParams.get("bookingId");
//     if (bookingIdParam === null || bookingIdParam === undefined) {
//       throw new Error("Invalid booking id");
//     }
//     const bookingId = parseInt(bookingIdParam);
//     console.log(otpInput);
//     appDispatch(cancelBooking({ bookingId: bookingId, otp: otpInput }));
//     setOtpInput("");
//   }
//   useEffect(()=>{
//     if (cancelBookingStatus === true) {
//       closeModal();
//       const urlParams = new URLSearchParams(window.location.search);
//     const bookingIdParam = urlParams.get("bookingId");
//     if (bookingIdParam === null || bookingIdParam === undefined) {
//       throw new Error("Invalid booking id");
//     }
//     const bookingId = parseInt(bookingIdParam!);
//     console.log("Booking id==========", bookingId);
//       appDispatch(getBooking({ bookingId }));
//     }
//   },[cancelBookingStatus])

//   const emailSendingStatus = useSelector(
//     (store: RootState) => store.booking.emailSendingStatus
//   );
//   const emailSendingMessage = useSelector(
//     (store: RootState) => store.booking.emailMessage
//   );

//   const [otpInput, setOtpInput] = useState("");

//   return (
//     <div className="main-promo">
//       <Modal open={isOpen} onClose={closeModal} center>
//         {emailSendingStatus && (
//           <div style={{ margin: "10px", padding: "20px 10px" }}>
//             <h3>Enter OTP for Cancelling the Room Booking</h3>
//             <div className="input">
//               <div
//                 style={{ fontSize: "18px", color: "grey", padding: "8px 0" }}
//               >
//                 Enter the OTP:
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   style={{
//                     fontSize: "16px",
//                     color: "grey",
//                     padding: "8px",
//                     margin: "5px 0",
//                     width: "100%",
//                   }}
//                   value={otpInput}
//                   onChange={(e) => setOtpInput(e.currentTarget.value)}
//                 />
//               </div>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//               }}
//             >
//               <button
//                 style={{
//                   border: "none",
//                   color: "white",
//                   background: "#120639",
//                   padding: "10px",
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   borderRadius: "5px",
//                   marginTop: "10px",
//                 }}
//                 // onClick={closeModal}
//                 onClick={otpVerificationHandler}
//               >
//                 CONFIRM OTP{" "}
//               </button>
//             </div>
//             <div className="bookingMessage" style={{display:cancelBookingStatus?"none":"block"}}>{cancelBookingMessage==="pending"?"Otp verification in process":"Otp Invalid"}</div>
//           </div>
//         )}

//         {emailSendingMessage === "pending" && (
//           <>
//             <div style={{ marginTop: "20px" }}>Email is being sent</div>
//             <ClipLoader
//               color={"#120639"}
//               loading={!emailSendingStatus}
//               cssOverride={override}
//               size={100}
//               aria-label="Loading Spinner"
//               data-testid="loader"
//             />
//           </>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default CancelModal;
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { AppDispatch, RootState } from "../../redux/store/store";
import { setCancelModal } from "../../redux/slice/ItineararySlice";
import { CSSProperties, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { cancelBooking } from "../../redux/thunk/cancelBooking";
import { getBooking } from "../../redux/thunk/getBooking";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  border: "5px solid white",
  marginTop: "80px",
};
const CancelModal = () => {
  const isOpen = useSelector((state: RootState) => state.itinerary.cancelModal);
  const appDispatch = useDispatch<AppDispatch>();
  const [otpVerificationAttempted, setOtpVerificationAttempted] =useState<boolean>(false);

  const closeModal = () => {
    appDispatch(setCancelModal(false));
    setOtpVerificationAttempted(false)
  };

  const cancelBookingStatus = useSelector(
    (store: RootState) => store.booking.cancelBookingStatus
  );
  const cancelBookingMessage = useSelector(
    (store: RootState) => store.booking.cancelBookingMessage
  );

  function otpVerificationHandler() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookingIdParam = urlParams.get("bookingId");
    if (bookingIdParam === null || bookingIdParam === undefined) {
      throw new Error("Invalid booking id");
    }
    const bookingId = parseInt(bookingIdParam);
    console.log(otpInput);
    appDispatch(cancelBooking({ bookingId: bookingId, otp: otpInput }));
    setOtpInput("");
    setOtpVerificationAttempted(true);
  }
  useEffect(() => {
    if (cancelBookingStatus === true) {
      closeModal();
      const urlParams = new URLSearchParams(window.location.search);
      const bookingIdParam = urlParams.get("bookingId");
      if (bookingIdParam === null || bookingIdParam === undefined) {
        throw new Error("Invalid booking id");
      }
      const bookingId = parseInt(bookingIdParam!);
      console.log("Booking id==========", bookingId);
      appDispatch(getBooking({ bookingId }));
    }
  }, [cancelBookingStatus]);

  const emailSendingStatus = useSelector(
    (store: RootState) => store.booking.emailSendingStatus
  );
  const emailSendingMessage = useSelector(
    (store: RootState) => store.booking.emailMessage
  );

  const [otpInput, setOtpInput] = useState("");
    

  return (
    <div className="main-promo">
      <Modal open={isOpen} onClose={closeModal} center>
        {emailSendingStatus && (
          <div style={{ margin: "10px", padding: "20px 10px" }}>
            <h3>Cancelling the Room Booking</h3>
            <div className="input">
              <div
                style={{ fontSize: "18px", color: "grey", padding: "8px 0" }}
              >
                Enter the One Time Password received on your Email:
              </div>
              <div>
                <input
                  type="text"
                  style={{
                    fontSize: "16px",
                    color: "grey",
                    padding: "8px",
                    margin: "5px 0",
                    width: "100%",
                  }}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.currentTarget.value)}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{width:"40%"}}>
              {otpVerificationAttempted && (
                <div
                  className="bookingMessage"
                  style={{
                    fontSize:"14px",
                    display: cancelBookingStatus ? "none" : "block",
                    color: cancelBookingMessage === "pending" ? "black" : "red",
                  }}
                >
                  {cancelBookingMessage === "pending"
                    ? "OTP verification in process..."
                    : "Invalid OTP"}
                </div>
              )}
              </div>
              <div style={{width:"60%",display:"flex",justifyContent:"flex-end"}}>
              <button
                style={{
                  border: "none",
                  color: "white",
                  background: "#120639",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
                // onClick={closeModal}
                onClick={otpVerificationHandler}
              >
                CONFIRM OTP{" "}
              </button>
              </div>
            </div>
          </div>
        )}

        {emailSendingMessage === "pending" && (
          <>
            <div style={{ margin: "20px", textAlign: "center" }}>
              <h3>Sending OTP on your email, please wait...</h3>
            </div>
            <div style={{ padding: " 0px 100px", marginBottom: "60px" }}>
              <ClipLoader
                color={"#120639"}
                loading={!emailSendingStatus}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CancelModal;