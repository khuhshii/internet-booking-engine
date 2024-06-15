import { useEffect, useState } from "react";
import "./myBookings.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { getTenantConfiguration } from "../../redux/thunk/getTenantConfiguration";
import { getMybookings } from "../../redux/thunk/getMyBookings";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, FormattedNumber, IntlProvider } from "react-intl";

function MyBookingPage() {
  const appDispatch = useDispatch<AppDispatch>();

  const myBookings = useSelector(
    (store: RootState) => store.booking.myBookings
  );

  const navigator = useNavigate();
  const loginRedux = useSelector((store:RootState)=>store.booking.login);

  const [loggedIn,setLoggedIn] = useState(false);
  useEffect(() => {
    appDispatch(getTenantConfiguration());
    const mailId = localStorage.getItem("userEmail");
    const token = localStorage.getItem("jwtToken")
    if (mailId && token) {
      appDispatch(getMybookings({ emailId: mailId,token:token }));
      setLoggedIn(true);
    }
    else{
      setLoggedIn(false);
    }
  }, [loginRedux]);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const formatRoomTypeName = (roomTypeName: string): string => {
    return roomTypeName.replace(/_/g, " ");
  };
  const exchangeRates = useSelector((state: RootState) => state.landing.rate);

  const currency = useSelector((state: RootState) => state.landing.currency);

  return (
    <div className="myBookings">
      <div
        className="booking-message"
        style={{ display: (myBookings?.length === 0 && loggedIn) ? "block" : "none" }}
      >
        <FormattedMessage
          id="noBookings"
          defaultMessage="No Bookings Available, please make a booking"
        />
      </div>
      <div className="all-bookings-container">
        {!loggedIn && <div className="login-first">Login to see your bookings, get better offers and discounts</div>}
        {myBookings?.map((booking) => {
          return (
            <div
              className="indv-card"
              key={booking.bookingId}
              onClick={() => {
                navigator(`/bookings?bookingId=${booking.bookingId}`);
              }}
            >
              <div className="left-division">
                <img
                  src="https://ibeteam15blobcontainer.blob.core.windows.net/landingimages/hotel1.jpg"
                  alt="hotel"
                  style={{
                    filter: booking.cancelled ? "grayscale(100%)" : "none",
                  }}
                ></img>
              </div>

              <div className="right-division">
                <div className="room-details">
                  <div className="Booking-details">
                    <FormattedMessage
                      id="bookingDetails"
                      defaultMessage="Booking Details:"
                    />
                  </div>
                  <div className="details">
                    <div className="booking-id">
                      <FormattedMessage
                        id="bookingId"
                        defaultMessage="Booking ID:"
                      />
                      &nbsp;{booking.bookingId}
                    </div>
                    <div className="room-type-details">
                      <FormattedMessage
                        id="roomType"
                        defaultMessage="Room Type:"
                      />
                      &nbsp;{formatRoomTypeName(booking.roomType)}
                    </div>
                    <div className="booking-status">
                      <FormattedMessage id="status" defaultMessage="Status:" />
                      &nbsp; &nbsp;
                      <span
                        style={{
                          color: booking.cancelled ? "red" : "green",
                          fontWeight: 700,
                        }}
                      >
                        {booking.cancelled ? (
                          <FormattedMessage
                            id="cancelled"
                            defaultMessage="Cancelled"
                          />
                        ) : (
                          <FormattedMessage
                            id="active"
                            defaultMessage="Active"
                          />
                        )}
                      </span>{" "}
                    </div>
                  </div>
                  <div className="date-details">
                    <div className="check-in-date">
                      <span style={{ fontWeight: "550" }}>
                        <FormattedMessage
                          id="checkIn"
                          defaultMessage="Check-in :"
                        />
                      </span>

                      <br />
                      {new Date(booking.startDate).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </div>

                    <div className="check-in-date">
                      <span style={{ fontWeight: "550" }}>
                        <FormattedMessage
                          id="checkOut"
                          defaultMessage="Check-out :"
                        />
                      </span>

                      <br />
                      {new Date(booking.endDate).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </div>
                  </div>
                </div>

                <div className="cost-details">
                  <div
                    className="cost"
                    style={{
                      backgroundColor: booking.cancelled ? "grey" : "none",
                    }}
                  >
                    <FormattedMessage
                      id="totalCost"
                      defaultMessage="Total Cost:"
                    />{" "}
                    <IntlProvider locale="en">
                      <FormattedNumber
                        style="currency"
                        currency={currency}
                        value={
                          booking.cost.totalCost *
                          exchangeRates[currency.toUpperCase()]
                        }
                        maximumFractionDigits={0}
                      />
                      {/* ${total} */}
                    </IntlProvider>
                    {/* ${booking.cost.totalCost} */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyBookingPage;
