import { useEffect, useRef, useState } from "react";
import "./bookingconfirmation.style.scss";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import { setCancelModal } from "../../redux/slice/ItineararySlice";
import CancelModal from "./CancelModal";
import { getBooking } from "../../redux/thunk/getBooking";
import { AppDispatch, RootState } from "../../redux/store/store";
import { getTenantConfiguration } from "../../redux/thunk/getTenantConfiguration";
import { sendBookingCancellationMail } from "../../redux/thunk/sendBookingCancellationMail";
import { Alert, Snackbar } from "@mui/material";
import {
  setMailBookingSnackbar,
  setSnackBarCancelation,
} from "../../redux/slice/BookingSlice";
import { cancelbookingViaMail } from "../../redux/thunk/cancelBookingViaMail";
import { mailBookingConfirmation } from "../../redux/thunk/mailBookingConfirmation";
import { FormattedMessage, FormattedNumber, IntlProvider } from "react-intl";
// import { jwtDecode } from "jwt-decode";

function BookingConfirmation() {
  const bookingBoxRef = useRef(null);

  const [dropDowns, setDropDowns] = useState([1]);

  function dropDownClickHandler(instance: number) {
    if (dropDowns.includes(instance)) {
      setDropDowns([]);
    } else {
      setDropDowns([instance]);
    }
  }

  const handlePrint2 = () => {
    setDropDowns([1, 2, 3, 4]);

    setTimeout(() => {
      handlePrint(null, () => bookingBoxRef.current);
    }, 500);
  };

  const handlePrint = useReactToPrint({
    documentTitle: "IBE Team 15 Booking details",
    onBeforePrint: () => console.log("printing initiated..."),
    onAfterPrint: () => {
      setDropDowns([1]);
    },
    removeAfterPrint: true,
  });

  const dispatch = useDispatch<AppDispatch>();
  const handleCancelModal = () => {
    dispatch(setCancelModal(true));
  };

  const bookingData = useSelector(
    (store: RootState) => store.booking.bookingData
  );

  useEffect(() => {
    dispatch(getTenantConfiguration());
    const urlParams = new URLSearchParams(window.location.search);
    const bookingIdParam = urlParams.get("bookingId");
    if (bookingIdParam === null || bookingIdParam === undefined) {
      throw new Error("Invalid booking id");
    }
    const bookingId = parseInt(bookingIdParam!);
    dispatch(getBooking({ bookingId }));
  }, []);

  function handleCancleRoom() {
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("jwtToken");
    if (email == "" || email == null || email == undefined || token =="" || token==null || token =="undefined") {
      if (bookingData?.bookingId) {
        dispatch(
          sendBookingCancellationMail({ bookingId: bookingData?.bookingId })
        );
        handleCancelModal();
      } else {
        console.log("booking id not found");
      }
    } else {
      if (bookingData?.bookingId) {
        dispatch(
          cancelbookingViaMail({
            bookingId: bookingData?.bookingId,
            email: email,
            token:token
          })
        );
        dispatch(getBooking({ bookingId: bookingData?.bookingId }));
      }
    }
  }

  const cancelBookingMessage = useSelector(
    (store: RootState) => store.booking.cancelBookingMessage
  );

  function handleCloseSnackbar() {
    dispatch(setSnackBarCancelation(false));
  }

  function handleCloseMailConfirmation() {
    dispatch(setMailBookingSnackbar(false));
  }
  const snackbarcancellation = useSelector(
    (store: RootState) => store.booking.snackBarCancelation
  );

  function sendMailForBooking() {
    if (bookingData != null) {
      dispatch(mailBookingConfirmation({ bookingDetails: bookingData }));
    }
  }

  const mailBookingSnackBarMessage = useSelector(
    (store: RootState) => store.booking.mailbookingSnackBarMessage
  );
  const mailBookingSnackbarStatus = useSelector(
    (store: RootState) => store.booking.mailbookingSnackBar
  );
  const exchangeRates = useSelector((state: RootState) => state.landing.rate);

  const currency = useSelector((state: RootState) => state.landing.currency);

  return (
    <div className="booking-confirmation" ref={bookingBoxRef}>
      {bookingData ? (
        <div className="booking-confirmation-container">
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={snackbarcancellation}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={cancelBookingMessage === "error" ? "error" : "success"}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {cancelBookingMessage === "success"
                ? "Booking Cancelled successfully"
                : "Booking Cancelation failed"}
            </Alert>
          </Snackbar>

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={mailBookingSnackbarStatus}
            autoHideDuration={6000}
            onClose={handleCloseMailConfirmation}
          >
            <Alert
              onClose={handleCloseMailConfirmation}
              severity={
                mailBookingSnackBarMessage === "error" ? "error" : "success"
              }
              variant="filled"
              sx={{ width: "100%" }}
            >
              {mailBookingSnackBarMessage === "success"
                ? "Mail Sent Successfully"
                : "Mail sending failed, try again"}
            </Alert>
          </Snackbar>
          <div className="upcoming-reservation">
            <div className="booking-id">
              <FormattedMessage
                id="upcomingReservation"
                defaultMessage="Upcoming reservation "
              />
              &nbsp;#{bookingData?.bookingId}
            </div>
            <div className="print-email">
              <div
                className="print"
                onClick={() => {
                  handlePrint2();
                }}
                style={{
                  display: bookingData.cancelled ? "none" : "block",
                  cursor: "pointer",
                }}
              >
                <FormattedMessage id="print" defaultMessage="Print" />
                &nbsp;&nbsp;&nbsp;
              </div>
              {/* <ReactToPrint
                        trigger={() => <div className='print'>Print</div>}
                        content={() => bookingBoxRef.current}
                        onBeforeGetContent={()=>{
                            setDropDowns([1,2,3,4])
                        }}
                        onAfterPrint={()=>{
                            setDropDowns([1]);
                        }}
                    /> */}
              <div
                className="email"
                onClick={sendMailForBooking}
                style={{
                  display: bookingData.cancelled ? "none" : "block",
                  cursor: "pointer",
                }}
              >
                <FormattedMessage id="email" defaultMessage="Email" />
              </div>
            </div>
          </div>

          <div className="room-details">
            <div className="room-heading-cancel-room">
              <div className="room-name-guest-details">
                <div className="room-name">
                  {bookingData?.roomCount > 1 ? "Rooms" : "Room"} &nbsp;
                  {bookingData?.roomCount}: {bookingData?.roomType}
                </div>
                <div className="guest-details">
                  <div className="guest-image">
                    <img src="./guestimage.png" alt="guest"></img>
                  </div>
                  <div className="guest-names">
                    {bookingData.adultCount}
                    &nbsp;adult{bookingData.adultCount <= 1 ? "" : "s"} ,{" "}
                    {bookingData.kidCount + bookingData.teenCount}
                    &nbsp;child{bookingData.kidCount <= 1 ? "" : "ren"}
                  </div>
                </div>
              </div>
              {bookingData.cancelled ? (
                <FormattedMessage
                  id="bookingCancelled"
                  defaultMessage="Booking Cancelled"
                />
              ) : (
                <div
                  className="cancel-room"
                  onClick={handleCancleRoom}
                  style={{ cursor: "pointer" }}
                >
                  <FormattedMessage
                    id="cancelRoom"
                    defaultMessage="Cancel Room"
                  />
                </div>
              )}
            </div>

            <div className="room-image-booking-information">
              <div className="room-image">
                <img
                  src="https://ibeteam15blobcontainer.blob.core.windows.net/landingimages/hotel1.jpg"
                  alt="booking-img"
                ></img>
              </div>
              <div className="booking-information">
                <div className="check-in-check-out">
                  <div className="check-in">
                    <div className="name">
                      <FormattedMessage
                        id="checkIn"
                        defaultMessage="Check in"
                      />
                    </div>
                    <div className="date">
                      {bookingData.startDate.substring(8, 10)}
                    </div>
                    <div className="month-year">
                      {new Date(bookingData.startDate).toLocaleString("en-US", {
                        month: "long",
                      })}{" "}
                      &nbsp; {new Date(bookingData.startDate).getFullYear()}
                    </div>
                  </div>
                  <div className="check-out">
                    <div className="name">
                      <FormattedMessage
                        id="checkOut"
                        defaultMessage="Check out"
                      />
                    </div>
                    <div className="date">
                      {bookingData.endDate.substring(8, 10)}
                    </div>
                    <div className="month-year">
                      {new Date(bookingData.endDate).toLocaleString("en-US", {
                        month: "long",
                      })}{" "}
                      &nbsp; {new Date(bookingData.endDate).getFullYear()}
                    </div>
                  </div>
                </div>
                <div className="package-amount-details">
                  <div className="package-details">
                    <IntlProvider locale="en">
                      <div>
                        <FormattedNumber
                          style="currency"
                          currency={currency}
                          value={
                            (1 -
                              parseFloat(bookingData.promotion.priceFactor)) *
                            bookingData.cost.totalCost *
                            exchangeRates[currency.toUpperCase()]
                          }
                          maximumFractionDigits={0}
                        />
                        {/* ${total} */}
                      </div>
                    </IntlProvider>{" "}
                    {bookingData.promotion.promotionTitle} Package
                  </div>
                  <div className="amount-details">
                    {bookingData.promotion.promotionDescription}
                  </div>
                </div>
                <div className="package-final-amount">
                  <div className="cancelation-policy">
                    <FormattedMessage
                      id="cancellationPolicy"
                      defaultMessage="Cancellations made 10 days before the check-in date are
                    fully refundable."
                    />
                  </div>
                  <div className="final-amount">
                    <IntlProvider locale="en">
                      <FormattedNumber
                        style="currency"
                        currency={currency}
                        value={
                          bookingData.cost.nightlyRate *
                          exchangeRates[currency.toUpperCase()]
                        }
                        maximumFractionDigits={0}
                      />
                      {/* ${total} */}
                    </IntlProvider>
                    /night
                  </div>
                </div>
              </div>
            </div>

            <div className="room-total-summary booking-details-column">
              <div
                className="room-details-drop-down booking-details-drop-down"
                onClick={() => {
                  dropDownClickHandler(1);
                }}
              >
                <div className="drop-down-image booking-drop-down-image">
                  <img
                    src={
                      dropDowns.includes(1)
                        ? "up-booking-conf.png"
                        : "down-booking-cnf.png"
                    }
                    alt="up-booking"
                  ></img>
                </div>
                <div className="room-heading booking-heading">
                  <FormattedMessage
                    id="roomTotalSummary"
                    defaultMessage="Room total summary"
                  />
                </div>
              </div>
              {dropDowns.includes(1) && (
                <div className="room-total-summary-details booking-option-details">
                  <div className="indv-detail">
                    <div className="detail-name">
                      <FormattedMessage
                        id="nightlyRate"
                        defaultMessage="Nightly rate"
                      />
                    </div>
                    <div className="amount">
                      <IntlProvider locale="en">
                        <FormattedNumber
                          style="currency"
                          currency={currency}
                          value={
                            bookingData.cost.nightlyRate *
                            exchangeRates[currency.toUpperCase()]
                          }
                          maximumFractionDigits={0}
                        />
                        {/* ${total} */}
                      </IntlProvider>
                      {/* ${bookingData.cost.nightlyRate} */}
                    </div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      <FormattedMessage
                        id="subtotal"
                        defaultMessage="Subtotal"
                      />
                    </div>
                    <div className="amount">
                      <IntlProvider locale="en">
                        <FormattedNumber
                          style="currency"
                          currency={currency}
                          value={
                            bookingData.cost.totalCost -
                            bookingData.cost.taxes -
                            bookingData.cost.vat *
                              exchangeRates[currency.toUpperCase()]
                          }
                          maximumFractionDigits={0}
                        />
                        {/* ${total} */}
                      </IntlProvider>
                    </div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      <FormattedMessage
                        id="taxesFees"
                        defaultMessage="Taxes, Surcharges, Fees"
                      />
                    </div>
                    <div className="amount">
                      <IntlProvider locale="en">
                        <FormattedNumber
                          style="currency"
                          currency={currency}
                          value={
                            bookingData.cost.taxes *
                            exchangeRates[currency.toUpperCase()]
                          }
                          maximumFractionDigits={0}
                        />
                      </IntlProvider>

                      {/* ${bookingData.cost.taxes} */}
                    </div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      <FormattedMessage id="vat" defaultMessage="VAT" />
                    </div>
                    <div className="amount">
                      <IntlProvider locale="en">
                        <FormattedNumber
                          style="currency"
                          currency={currency}
                          value={
                            bookingData.cost.vat *
                            exchangeRates[currency.toUpperCase()]
                          }
                          maximumFractionDigits={0}
                        />
                        {/* ${total} */}
                      </IntlProvider>
                    </div>
                  </div>
                  <div className="total-for-stay">
                    <div className="detail-name">
                      <FormattedMessage
                        id="totalForStay"
                        defaultMessage="Total for stay"
                      />
                    </div>
                    <div className="amount">
                      <IntlProvider locale="en">
                        <FormattedNumber
                          style="currency"
                          currency={currency}
                          value={
                            bookingData.cost.totalCost *
                            exchangeRates[currency.toUpperCase()]
                          }
                          maximumFractionDigits={0}
                        />
                        {/* ${total} */}
                      </IntlProvider>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="guest-information booking-details-column">
              <div
                className="Guest-details-drop-down booking-details-drop-down"
                onClick={() => {
                  dropDownClickHandler(2);
                }}
              >
                <div className="drop-down-image booking-drop-down-image">
                  <img
                    src={
                      dropDowns.includes(2)
                        ? "up-booking-conf.png"
                        : "down-booking-cnf.png"
                    }
                    alt="up-booking"
                  ></img>
                </div>
                <div className="guest-heading booking-heading">
                  <FormattedMessage
                    id="guestInfo"
                    defaultMessage="Guest Information"
                  />
                </div>
              </div>
              {dropDowns.includes(2) && (
                <div className="booking-option-details">
                  <div className="indv-detail">
                    <div className="detail-name">
                      <FormattedMessage
                        id="firstName"
                        defaultMessage="First Name"
                      />
                    </div>
                    <div className="amount">{bookingData.user.firstName}</div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      <FormattedMessage
                        id="lastName"
                        defaultMessage="Last Name"
                      />
                    </div>
                    <div className="amount">{bookingData.user.lastName}</div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      {" "}
                      <FormattedMessage id="phone" defaultMessage="Phone" />
                    </div>
                    <div className="amount">{bookingData.user.phone}</div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      {" "}
                      <FormattedMessage id="email" defaultMessage="Email" />
                    </div>
                    <div className="amount">{bookingData.user.emailId}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="billing-information booking-details-column">
              <div
                className="billing-details-drop-down booking-details-drop-down"
                onClick={() => {
                  dropDownClickHandler(3);
                }}
              >
                <div className="drop-down-image booking-drop-down-image">
                  <img
                    src={
                      dropDowns.includes(3)
                        ? "up-booking-conf.png"
                        : "down-booking-cnf.png"
                    }
                    alt="up-booking"
                  ></img>
                </div>
                <div className="billing-heading booking-heading">
                  <FormattedMessage
                    id="billingInfo"
                    defaultMessage={"Billing Info"}
                  />{" "}
                </div>
              </div>
              {dropDowns.includes(3) && (
                <div className="booking-option-details">
                  <div className="indv-detail">
                    <div className="detail-name">
                      {" "}
                      <FormattedMessage
                        id="firstName"
                        defaultMessage="First Name"
                      />
                    </div>
                    <div className="amount">
                      {bookingData.billing.firstName}
                    </div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      <FormattedMessage
                        id="lastName"
                        defaultMessage="Last Name"
                      />
                    </div>
                    <div className="amount">{bookingData.billing.lastName}</div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      <FormattedMessage
                        id="address"
                        defaultMessage="Mailing Address"
                      />{" "}
                      1
                    </div>
                    <div className="amount">{bookingData.billing.address1}</div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      <FormattedMessage
                        id="address"
                        defaultMessage="Mailing Address"
                      />{" "}
                      2
                    </div>
                    <div className="amount">{bookingData.billing.address2}</div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      {" "}
                      <FormattedMessage id="country" defaultMessage="Country" />
                    </div>
                    <div className="amount">{bookingData.billing.country}</div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      {" "}
                      <FormattedMessage id="city" defaultMessage="City" />
                    </div>
                    <div className="amount">{bookingData.billing.city}</div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      {" "}
                      <FormattedMessage id="state" defaultMessage="State" />
                    </div>
                    <div className="amount">{bookingData.billing.state}</div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      <FormattedMessage
                        id="zipCode"
                        defaultMessage="Zip Code"
                      />
                    </div>
                    <div className="amount">{bookingData.billing.zipcode}</div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      {" "}
                      <FormattedMessage id="phone" defaultMessage="Phone" />
                    </div>
                    <div className="amount">{bookingData.billing.phone}</div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">
                      {" "}
                      <FormattedMessage id="email" defaultMessage="Email" />
                    </div>
                    <div className="amount">{bookingData.billing.emailId}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="payment-information booking-details-column">
              <div
                className="payment-details-drop-down booking-details-drop-down"
                onClick={() => {
                  dropDownClickHandler(4);
                }}
              >
                <div className="drop-down-image booking-drop-down-image">
                  <img
                    src={
                      dropDowns.includes(4)
                        ? "up-booking-conf.png"
                        : "down-booking-cnf.png"
                    }
                    alt="up-booking"
                  ></img>
                </div>
                <div className="payment-heading booking-heading">
                  <FormattedMessage
                    id="paymentInfo"
                    defaultMessage={"Payment Info"}
                  />
                </div>
              </div>
              {dropDowns.includes(4) && (
                <div className="booking-option-details">
                  <div className="indv-detail">
                    <div className="detail-name">
                      <FormattedMessage
                        id="cardNumber"
                        defaultMessage="Card Number"
                      />
                    </div>
                    <div className="amount">
                      {"X".repeat(bookingData.payment.cardNumber.length - 8) +
                        bookingData.payment.cardNumber.slice(-4)}
                    </div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">ExpMM</div>
                    <div className="amount">
                      {bookingData.payment.expiryMonth}
                    </div>
                  </div>
                  <div className="indv-detail">
                    <div className="detail-name">Exp YY</div>
                    <div className="amount">
                      {bookingData.payment.expiryYear}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{width:"100%",textAlign:"center"}}>No Such booking available</div>
      )}
      <CancelModal />
    </div>
  );
}

export default BookingConfirmation;
