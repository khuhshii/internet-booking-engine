import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  setActiveStepper,
  setShowIteanary,
} from "../../redux/slice/RoomSearchSlice";
import { FormattedMessage, FormattedNumber, IntlProvider } from "react-intl";
import {
  setDueAtResort,
  setDueNow,
  setPriceModal,
  setPromoModal,
  setSubtotal,
  setTaxes,
  setTotalPrice,
  setVat,
} from "../../redux/slice/ItineararySlice";
import PromotionModal from "../BookingPage/PromotionModal";
import PriceModal from "../BookingPage/PriceBreakdownModal";
import { useEffect, useState } from "react";
import paymentInfo from "../BookingPage/info.json";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button id="checkout" onClick={onClick} style={{cursor:"pointer"}}>
      {/* {text} */}
      <FormattedMessage id={text} />
    </button>
  );
};
interface IteanaryContainerProps {
  buttonText: string;
  onButtonClick: () => void;
}



const IteanaryContainer: React.FC<IteanaryContainerProps> = ({
  buttonText,
  onButtonClick,
}) => {
  const showIteanary = useSelector(
    (store: RootState) => store.roomSearch.showIteanary
  );
  const appDispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();
  function handleRemoveButton() {
    appDispatch(setActiveStepper(0));
    appDispatch(setShowIteanary(false));
    
    navigator("/");
  }

  const selectedRoom = useSelector(
    (store: RootState) => store.roomPage.selectedRoom
  );

  const selectedPropertyName = useSelector(
    (state: RootState) => state.itinerary.propertyName
  );

  const checkInDate = useSelector(
    (state: RootState) => state.itinerary.checkInDate
  );
  const checkOutDate = useSelector(
    (state: RootState) => state.itinerary.checkOutDate
  );

  const initialGuestStates = useSelector(
    (store: RootState) => store.itinerary.combinedGuest
  );

  console.log(checkInDate, checkOutDate);
  const promo = useSelector(
    (state: RootState) => state.itinerary.selectedPromo
  );
  console.log(promo);

  function handlePromoClick() {
    appDispatch(setPromoModal(true));
  }
  function handlePriceClick() {
    appDispatch(setPriceModal(true));
  }
  const formatDateRange = (
    checkInDate: string,
    checkOutDate: string
  ): string => {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    const startMonth = startDate.toLocaleString("default", { month: "short" });
    const endMonth = endDate.toLocaleString("default", { month: "short" });
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const year = startDate.getFullYear();

    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
  };

  const formattedDateRange = formatDateRange(checkInDate, checkOutDate);
  console.log(formattedDateRange);

  const formatRoomTypeName = (roomTypeName: string): string => {
    return selectedRoom ? roomTypeName.replace(/_/g, " ") : roomTypeName;
  };
  const roomCount = useSelector(
    (state: RootState) => state.itinerary.numberOfRooms
  );

  const dispatch = useDispatch<AppDispatch>();
  const [totalRoomAmount, setTotalRoomAmount] = useState<number>(0);

  const ratesPerDay = useSelector(
    (state: RootState) => state.itinerary.ratesPerDay
  );

  const calculateTotalRoomAmount = () => {
    let total = 0;
    if (selectedRoom) {
      Object.values(ratesPerDay!).forEach((rate: number) => {
        total += rate;
      });
    }
    return total;
  };

  useEffect(() => {
    console.log("SELECTED ROOM", selectedRoom);

    setTotalRoomAmount(calculateTotalRoomAmount());
    dispatch(setTotalPrice(totalRoomAmount));
  }, [showIteanary]);

  const calculateNumberOfDays = (
    checkInDate: string,
    checkOutDate: string
  ): number => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Calculate the difference in milliseconds
    const differenceInMs = checkOut.getTime() - checkIn.getTime();

    // Convert milliseconds to days
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    // Round the number of days to handle any potential daylight saving time issues
    return Math.round(differenceInDays);
  };
  const subtotal = useSelector((state: RootState) => state.itinerary.subtotal);
  const tax = useSelector((state: RootState) => state.itinerary.taxes);
  const vat = useSelector((state: RootState) => state.itinerary.vat);
  const dueAtResort = useSelector(
    (state: RootState) => state.itinerary.dueAtResort
  );
  const dueNow = useSelector((state: RootState) => state.itinerary.dueNow);
  const total = useSelector((state: RootState) => state.itinerary.totalPrice);

  useEffect(() => {
    const numberOfDays = calculateNumberOfDays(checkInDate, checkOutDate);
    console.log("Number of days:", numberOfDays);
    console.log(selectedRoom);

    if (ratesPerDay !== null) {
      const subtotal = calculateTotalRoomAmount();
      const taxes =
        (subtotal * paymentInfo.payment_info.taxes_and_surcharges.tax) / 100;
      const vat =
        (subtotal * paymentInfo.payment_info.taxes_and_surcharges.vat) / 100;
      // const total = subtotal + taxes + vat - ((1 - promo.price_factor) *totalRoomAmount *roomCount);

      let dueNow;
      let dueAtResort;

      if (promo.promotion_id === 5) {
        dueNow = total;
        dueAtResort = 0;
      } else {
        dueAtResort =
          (total * paymentInfo.payment_info.percentage_due_at_resort) / 100;
        dueNow = total - dueAtResort;
      }

      // Dispatch calculated values to Redux store
      dispatch(setSubtotal(subtotal));
      dispatch(setTaxes(taxes));
      dispatch(setVat(vat));
      dispatch(setDueNow(dueNow));
      dispatch(setDueAtResort(parseInt(dueAtResort)));
      dispatch(setTotalPrice(total));
    }
  }, []);
  const exchangeRates = useSelector((state: RootState) => state.landing.rate);

  const currency = useSelector((state: RootState) => state.landing.currency);

  return (
    <div
      className="trip-iteanary-container"
      style={{ display: showIteanary ? "block" : "none" }}
    >
      <div className="trip-itenary">
        <div className="itenary-heading">
          <FormattedMessage
            id="tripItinerary"
            defaultMessage="Your Trip Itinerary"
          />
        </div>
        <div className="hotelname-remove">
          <div className="hotel-name" style={{ fontWeight: "700" }}>
            {selectedPropertyName}
          </div>
          <button className="remove" onClick={handleRemoveButton} style={{cursor:"pointer"}}>
            <FormattedMessage id="remove" defaultMessage="Remove" />
          </button>
        </div>

        <div className="date-details">
          {formattedDateRange} | {initialGuestStates["Adults"]}{" "}
          {initialGuestStates["Adults"] === 1 ? "Adult " : "Adults "}
          {initialGuestStates["Teens"]}{" "}
          {initialGuestStates["Teens"] < 2 ? "Child" : "Children"}
        </div>

        <div className="sub-container-1">
          <div className="item">
            <div className="name">
              {selectedRoom && formatRoomTypeName(selectedRoom?.room_type_name)}
            </div>
            <div className="detail">
              {roomCount} {roomCount === 1 ? "room" : "rooms"}
            </div>
          </div>

          <div className="item">
            <div className="name">
              {promo.promotion_title}&nbsp;
              <button
                className="promo-modal"
                style={{ border: "none",cursor:"pointer" }}
                onClick={handlePromoClick}
                
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.99968 6.3335C6.82287 6.3335 6.6533 6.40373 6.52827 6.52876C6.40325 6.65378 6.33301 6.82335 6.33301 7.00016V9.66683C6.33301 9.84364 6.40325 10.0132 6.52827 10.1382C6.6533 10.2633 6.82287 10.3335 6.99968 10.3335C7.17649 10.3335 7.34606 10.2633 7.47108 10.1382C7.59611 10.0132 7.66634 9.84364 7.66634 9.66683V7.00016C7.66634 6.82335 7.59611 6.65378 7.47108 6.52876C7.34606 6.40373 7.17649 6.3335 6.99968 6.3335ZM7.25301 3.72016C7.0907 3.65348 6.90865 3.65348 6.74634 3.72016C6.66451 3.75189 6.58975 3.79947 6.52634 3.86016C6.46746 3.92496 6.42011 3.99937 6.38634 4.08016C6.34902 4.15928 6.33076 4.24605 6.33301 4.3335C6.3325 4.42123 6.34932 4.50821 6.3825 4.58943C6.41567 4.67066 6.46456 4.74454 6.52634 4.80683C6.59115 4.86572 6.66555 4.91307 6.74634 4.94683C6.84734 4.98832 6.95699 5.00437 7.06564 4.99357C7.1743 4.98277 7.27863 4.94544 7.36949 4.88488C7.46034 4.82431 7.53492 4.74235 7.58668 4.64621C7.63845 4.55007 7.6658 4.44269 7.66634 4.3335C7.66389 4.15698 7.59483 3.98792 7.47301 3.86016C7.40961 3.79947 7.33485 3.75189 7.25301 3.72016ZM6.99968 0.333496C5.68114 0.333496 4.3922 0.724489 3.29588 1.45703C2.19955 2.18957 1.34506 3.23077 0.840481 4.44894C0.335896 5.66711 0.203874 7.00756 0.461109 8.30077C0.718344 9.59397 1.35328 10.7819 2.28563 11.7142C3.21798 12.6466 4.40587 13.2815 5.69908 13.5387C6.99228 13.796 8.33273 13.6639 9.5509 13.1594C10.7691 12.6548 11.8103 11.8003 12.5428 10.704C13.2754 9.60764 13.6663 8.31871 13.6663 7.00016C13.6663 6.12468 13.4939 5.25778 13.1589 4.44894C12.8238 3.6401 12.3328 2.90517 11.7137 2.28612C11.0947 1.66706 10.3597 1.176 9.5509 0.840966C8.74206 0.505935 7.87516 0.333496 6.99968 0.333496ZM6.99968 12.3335C5.94484 12.3335 4.9137 12.0207 4.03664 11.4347C3.15957 10.8486 2.47599 10.0157 2.07232 9.04114C1.66865 8.0666 1.56304 6.99425 1.76882 5.95968C1.97461 4.92512 2.48256 3.97481 3.22844 3.22893C3.97432 2.48305 4.92463 1.9751 5.9592 1.76931C6.99376 1.56352 8.06612 1.66914 9.04066 2.07281C10.0152 2.47647 10.8481 3.16006 11.4342 4.03712C12.0202 4.91418 12.333 5.94533 12.333 7.00016C12.333 8.41465 11.7711 9.77121 10.7709 10.7714C9.77072 11.7716 8.41417 12.3335 6.99968 12.3335Z"
                    fill="#858685"
                  />
                </svg>
              </button>
            </div>
            <IntlProvider locale="en">
              <div className="detail">
                -{" "}
                <FormattedNumber
                  style="currency"
                  currency={currency}
                  value={
                    (1 - promo.price_factor) *
                    total *
                    roomCount *
                    exchangeRates[currency.toUpperCase()]
                  }
                  maximumFractionDigits={0}
                />
              </div>
            </IntlProvider>
          </div>
        </div>

        <div className="sub-container-2">
          <div className="item">
            <div className="name">
              <FormattedMessage id="subtotal" defaultMessage="Subtotal" />
            </div>
            <IntlProvider locale="en">
              <div className="detail">
                <FormattedNumber
                  style="currency"
                  currency={currency}
                  value={subtotal * exchangeRates[currency.toUpperCase()]}
                  maximumFractionDigits={0}
                />
              </div>
            </IntlProvider>
          </div>
          <div className="item">
            <div className="name">
              <FormattedMessage
                id="taxesFees"
                defaultMessage="Taxes, Surcharges, Fees"
              />
              &nbsp;
              <button
                className="promo-modal"
                style={{ border: "none",cursor:"pointer" }}
                onClick={handlePriceClick}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.99968 6.3335C6.82287 6.3335 6.6533 6.40373 6.52827 6.52876C6.40325 6.65378 6.33301 6.82335 6.33301 7.00016V9.66683C6.33301 9.84364 6.40325 10.0132 6.52827 10.1382C6.6533 10.2633 6.82287 10.3335 6.99968 10.3335C7.17649 10.3335 7.34606 10.2633 7.47108 10.1382C7.59611 10.0132 7.66634 9.84364 7.66634 9.66683V7.00016C7.66634 6.82335 7.59611 6.65378 7.47108 6.52876C7.34606 6.40373 7.17649 6.3335 6.99968 6.3335ZM7.25301 3.72016C7.0907 3.65348 6.90865 3.65348 6.74634 3.72016C6.66451 3.75189 6.58975 3.79947 6.52634 3.86016C6.46746 3.92496 6.42011 3.99937 6.38634 4.08016C6.34902 4.15928 6.33076 4.24605 6.33301 4.3335C6.3325 4.42123 6.34932 4.50821 6.3825 4.58943C6.41567 4.67066 6.46456 4.74454 6.52634 4.80683C6.59115 4.86572 6.66555 4.91307 6.74634 4.94683C6.84734 4.98832 6.95699 5.00437 7.06564 4.99357C7.1743 4.98277 7.27863 4.94544 7.36949 4.88488C7.46034 4.82431 7.53492 4.74235 7.58668 4.64621C7.63845 4.55007 7.6658 4.44269 7.66634 4.3335C7.66389 4.15698 7.59483 3.98792 7.47301 3.86016C7.40961 3.79947 7.33485 3.75189 7.25301 3.72016ZM6.99968 0.333496C5.68114 0.333496 4.3922 0.724489 3.29588 1.45703C2.19955 2.18957 1.34506 3.23077 0.840481 4.44894C0.335896 5.66711 0.203874 7.00756 0.461109 8.30077C0.718344 9.59397 1.35328 10.7819 2.28563 11.7142C3.21798 12.6466 4.40587 13.2815 5.69908 13.5387C6.99228 13.796 8.33273 13.6639 9.5509 13.1594C10.7691 12.6548 11.8103 11.8003 12.5428 10.704C13.2754 9.60764 13.6663 8.31871 13.6663 7.00016C13.6663 6.12468 13.4939 5.25778 13.1589 4.44894C12.8238 3.6401 12.3328 2.90517 11.7137 2.28612C11.0947 1.66706 10.3597 1.176 9.5509 0.840966C8.74206 0.505935 7.87516 0.333496 6.99968 0.333496ZM6.99968 12.3335C5.94484 12.3335 4.9137 12.0207 4.03664 11.4347C3.15957 10.8486 2.47599 10.0157 2.07232 9.04114C1.66865 8.0666 1.56304 6.99425 1.76882 5.95968C1.97461 4.92512 2.48256 3.97481 3.22844 3.22893C3.97432 2.48305 4.92463 1.9751 5.9592 1.76931C6.99376 1.56352 8.06612 1.66914 9.04066 2.07281C10.0152 2.47647 10.8481 3.16006 11.4342 4.03712C12.0202 4.91418 12.333 5.94533 12.333 7.00016C12.333 8.41465 11.7711 9.77121 10.7709 10.7714C9.77072 11.7716 8.41417 12.3335 6.99968 12.3335Z"
                    fill="#858685"
                  />
                </svg>
              </button>
            </div>
            <IntlProvider locale="en">
              <div className="detail">
                <FormattedNumber
                  style="currency"
                  currency={currency}
                  value={tax * exchangeRates[currency.toUpperCase()]}
                  maximumFractionDigits={0}
                />{" "}
              </div>
            </IntlProvider>
          </div>
          <div className="item">
            <div className="name">
              <FormattedMessage id="vat" defaultMessage="VAT" />
            </div>
            <IntlProvider locale="en">
              <div className="detail">
                <FormattedNumber
                  style="currency"
                  currency={currency}
                  value={vat * exchangeRates[currency.toUpperCase()]}
                  maximumFractionDigits={0}
                />
              </div>
            </IntlProvider>
          </div>
        </div>

        <div className="sub-container-3">
          <div className="item" style={{ display: "flex", marginTop: "10px" }}>
            <div className="name">
              <FormattedMessage id="total" defaultMessage={"Total"} />
            </div>
            <IntlProvider locale="en">
              <div className="detail">
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

        <div className="sub-container-3">
          <div className="item">
            <div className="name">
              <FormattedMessage id="dueNow" defaultMessage="Due Now" />
            </div>
            <IntlProvider locale="en">
              <div className="detail">
                <FormattedNumber
                  style="currency"
                  currency={currency}
                  value={dueNow * exchangeRates[currency.toUpperCase()]}
                  maximumFractionDigits={0}
                />
              </div>
            </IntlProvider>
          </div>

          <div className="item">
            <div className="name">
              <FormattedMessage
                id="dueAtResort"
                defaultMessage="Due at Resort"
              />
            </div>
            <IntlProvider locale="en">
              <div className="detail">
                <FormattedNumber
                  style="currency"
                  currency={currency}
                  value={dueAtResort * exchangeRates[currency.toUpperCase()]}
                  maximumFractionDigits={0}
                />{" "}
              </div>
            </IntlProvider>
          </div>
        </div>

        <div className="checkout" >
          <Button onClick={onButtonClick} text={buttonText} />
        </div>
      </div>
      <PromotionModal />
      <PriceModal />
    </div>
  );
};

export default IteanaryContainer;
