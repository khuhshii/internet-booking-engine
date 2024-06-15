import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { AppDispatch, RootState } from "../../redux/store/store";
import { setPriceModal } from "../../redux/slice/ItineararySlice";
// import paymentInfo from "../BookingPage/info.json";
import "./PromotionModal.style.scss";
import { FormattedMessage, FormattedNumber, IntlProvider } from "react-intl";
const PriceModal = () => {
  const isOpen = useSelector((state: RootState) => state.itinerary.priceModal);
  const appDispatch = useDispatch<AppDispatch>();
  const closeModal = () => {
    appDispatch(setPriceModal(false));
  };

  // Retrieve rates per day from Redux store
  const ratesPerDay = useSelector(
    (state: RootState) => state.itinerary.ratesPerDay
  );

  // Function to format date string
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const selectedRoom = useSelector(
    (state: RootState) => state.roomPage.selectedRoom
  );
  const promo = useSelector(
    (state: RootState) => state.itinerary.selectedPromo
  );
  const total = useSelector((state: RootState) => state.itinerary.totalPrice);

  const rooms = useSelector(
    (state: RootState) => state.itinerary.numberOfRooms
  );
  const subtotal = useSelector((state: RootState) => state.itinerary.subtotal);
  const dueAtResort = useSelector(
    (state: RootState) => state.itinerary.dueAtResort
  );
  const dueNow = useSelector((state: RootState) => state.itinerary.dueNow);

  const exchangeRates = useSelector((state: RootState) => state.landing.rate);

  const currency = useSelector((state: RootState) => state.landing.currency);

  // const total = useSelector((state: RootState) => state.itinerary.totalPrice);

  return (
    <Modal open={isOpen} onClose={closeModal} center>
      <div className="main-pricemodal">
        <h2>
          <FormattedMessage
            id="roomBreakdown"
            defaultMessage={"Rate Breakdown"}
          />
        </h2>
        <div className="name">
          <p>{selectedRoom?.room_type_name}</p>
          <p>
            <FormattedMessage
              id="nightlyRate"
              defaultMessage={"Nightly Rate(per night)"}
            />
          </p>
        </div>
        <div
          className="promo"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>{promo.promotion_title}</div>
          <IntlProvider locale="en">
            <div>
              -
              <FormattedNumber
                style="currency"
                currency={currency}
                value={
                  (1 - promo.price_factor) *
                  total *
                  rooms *
                  exchangeRates[currency.toUpperCase()]
                }
                maximumFractionDigits={0}
              />
            </div>
          </IntlProvider>
        </div>
        <div className="rates">
          {ratesPerDay &&
            Object.entries(ratesPerDay).map(([dateString, rate]) => (
              <div key={dateString} className="indiv-rates">
                <div>{formatDate(dateString)}</div>
                <IntlProvider locale="en">
                  <div>
                    <FormattedNumber
                      style="currency"
                      currency={currency}
                      value={rate * exchangeRates[currency.toUpperCase()]}
                      maximumFractionDigits={0}
                    />
                  </div>
                </IntlProvider>
              </div>
            ))}
        </div>
        <div className="rates">
          <div className="indiv-rates">
            <div className="promo">
              {" "}
              <FormattedMessage id="subtotal" defaultMessage={"Room Total"} />
            </div>
            <IntlProvider locale="en">
              <div>
                <FormattedNumber
                  style="currency"
                  currency={currency}
                  value={subtotal * exchangeRates[currency.toUpperCase()]}
                  maximumFractionDigits={0}
                />
              </div>
            </IntlProvider>
          </div>
          <div
            className="rates"
            style={{ borderTop: "1px solid rgb(61, 61, 61" }}
          >
            <div className="promo">
              <FormattedMessage
                id="taxesFeesPerNight"
                defaultMessage={"Taxes and fees(per room)"}
              />
            </div>
            <div className="indiv-rates">
              <div>
                <FormattedMessage
                  id="resortFee"
                  defaultMessage={"Resort Fee"}
                />
              </div>
              <IntlProvider locale="en">
                <div>
                  <FormattedNumber
                    style="currency"
                    currency={currency}
                    value={0.1 * total * exchangeRates[currency.toUpperCase()]}
                    maximumFractionDigits={0}
                  />
                </div>
              </IntlProvider>
            </div>
            <div className="indiv-rates">
              <div>
                <FormattedMessage
                  id="occupanceTax"
                  defaultMessage={"Occupance tax"}
                />
              </div>
              <IntlProvider locale="en">
                <div>
                  <FormattedNumber
                    style="currency"
                    currency={currency}
                    value={0.1 * total * exchangeRates[currency.toUpperCase()]}
                    maximumFractionDigits={0}
                  />
                </div>
              </IntlProvider>
            </div>
          </div>
        </div>
        <div
          className="rates"
          style={{ borderTop: "1px solid rgb(61, 61, 61" }}
        >
          <div className="indiv-rates">
            <div>
              <FormattedMessage id="packageTotal" defaultMessage={"Total"} />
            </div>
            <IntlProvider locale="en">
              <div>
                <FormattedNumber
                  style="currency"
                  currency={currency}
                  value={total * exchangeRates[currency.toUpperCase()]}
                  maximumFractionDigits={0}
                />
              </div>
            </IntlProvider>
          </div>
        </div>
        <div
          className="rates"
          style={{ borderTop: "1px solid rgb(61, 61, 61" }}
        >
          <div className="indiv-rates">
            <div>
              <FormattedMessage id="dueNow" defaultMessage={"Due Now"} />
            </div>
            <IntlProvider locale="en">
              <div>
                <FormattedNumber
                  style="currency"
                  currency={currency}
                  value={dueNow * exchangeRates[currency.toUpperCase()]}
                  maximumFractionDigits={0}
                />
              </div>
            </IntlProvider>
          </div>
          <div className="indiv-rates">
            <div>
              <FormattedMessage
                id="dueAtResort"
                defaultMessage={"Due at Resort"}
              />
            </div>
            <IntlProvider locale="en">
              <div>
                <FormattedNumber
                  style="currency"
                  currency={currency}
                  value={dueAtResort * exchangeRates[currency.toUpperCase()]}
                  maximumFractionDigits={0}
                />
              </div>
            </IntlProvider>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PriceModal;
