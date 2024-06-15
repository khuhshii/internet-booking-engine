import { Modal } from "react-responsive-modal";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  RoomPromotionDetails,
  closeModal,
} from "../../redux/slice/RoomPageSlice";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-modal/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./RoomModal.style.scss";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Card from "./DealCard";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import { getCurrentRoomConfigDetails } from "../../redux/thunk/getCurrentRoomConfigDetails";
import { getCurrentRoomPromotionDetails } from "../../redux/thunk/getCurrentRoomPromotionDetails";
import { getCustomPromotion } from "../../redux/thunk/getCustomPromotion";
import paymentInfo from "../BookingPage/info.json";
import {
  setActiveStepper,
  // setRoomTypeID,
  setShowIteanary,
  setShowItineraryUI,
} from "../../redux/slice/RoomSearchSlice";
import { FormattedMessage } from "react-intl";
import ClipLoader from "react-spinners/ClipLoader";
import {
  setCheckInDate,
  setCheckOutDate,
  setDueAtResort,
  setDueNow,
  setGuestCount,
  setNightlyRate,
  setNumberOfRooms,
  setPromotion,
  setSubtotal,
  setTaxes,
  setTotalPrice,
  setVat,
} from "../../redux/slice/ItineararySlice";
import { setSelectedRoom } from "../../redux/slice/RoomPageSlice";
import { fetchRatesPerDay } from "../../redux/thunk/getDailyRates";
import RatingsRoom from "./RatingsRoom";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  border: "5px solid white",
  marginTop: "200px",
};

const modalStyles = {
  modal: {
    maxWidth: "85%",
    maxHeight: "auto",
    overflow: "auto",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    background: "white",
    padding: "0px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const RoomModal = () => {
  const desc: string =
    "Privi di fumo e decorati con tonalità contemporanee di gioielli e terre, le camere della Torre del Casinò di 15 piani sono situate direttamente sopra il casinò. Le camere della Torre del Casinò, di 364 piedi quadrati, sono arredate con mobili classici e includono materassi con cuscini, TV al plasma a schermo piatto da 40 pollici e accesso a internet Wi-Fi";
  const language = useSelector((state: RootState) => state.landing.language);

  const isOpen = useSelector((state: RootState) => state.roomPage.isModalOpen);
  const selectedRoom = useSelector(
    (state: RootState) => state.roomPage.selectedRoom
  );

  const currentRoomDetails = useSelector(
    (store: RootState) => store.roomPage.currentRoomDetails
  );

  const dispatch = useDispatch<AppDispatch>();

  const currentPromotionDetails = useSelector(
    (store: RootState) => store.roomPage.currenRoomPromotionDetails
  );

  const initialCombinedGuestStates = useSelector(
    (store: RootState) => store.landing.initialCombinedStateGuests
  );

  const startDateString = useSelector(
    (store: RootState) => store.landing.startDateString
  );
  const endDateString = useSelector(
    (store: RootState) => store.landing.endDateString
  );
  const roomTypeIdRef = useRef<string | null>(null);

  useEffect(() => {
    console.log(selectedRoom);

    if (selectedRoom?.room_type_id) {
      roomTypeIdRef.current = selectedRoom.room_type_id.toString();

      dispatch(setSelectedRoom(selectedRoom));

      let roomTypeId = selectedRoom.room_type_id.toString();
      dispatch(getCurrentRoomConfigDetails({ roomTypeId }));
      const propertyId = 15;
      if (startDateString != null && endDateString !== null) {
        const checkInDate = startDateString;
        const checkOutDate = endDateString;
        let seniorCitizen = 0;

        console.log(startDateString, endDateString, "=========");

        if (initialCombinedGuestStates["Senior Citizens"] != null) {
          seniorCitizen = initialCombinedGuestStates["Senior Citizens"];
        }
        // const sampleRequestData: SampleRequestData = {
        //   startDate: checkInDate,
        //   endDate: checkOutDate,
        //   roomTypeId: selectedRoom.room_type_id.toString(),
        //   // startDate: "2024-04-01",
        //   // endDate: "2024-04-03",
        // };

        dispatch(
          fetchRatesPerDay({
            startDate: checkInDate,
            endDate: checkOutDate,
            roomTypeId: roomTypeIdRef.current,
            // startDate: "2024-04-01",
            // endDate: "2024-04-03",
          })
        );

        dispatch(
          getCurrentRoomPromotionDetails({
            propertyId,
            roomTypeId: parseInt(roomTypeId),
            checkInDate,
            checkOutDate,
            seniorCitizen,
          })
        );
      }
    }
  }, [selectedRoom]);

  const handleCloseModal = () => {
    dispatch(closeModal(false));
  };

  const propertyConfigs = useSelector(
    (store: RootState) => store.landing.initialPropertyConfiguration
  );

  const formatRoomTypeName = (roomTypeName: string): string => {
    return roomTypeName.replace(/_/g, " ");
  };
  const closeIcon = (
    <svg fill="white" viewBox="0 0 20 20" width={28} height={28}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
  );

  useEffect(() => {
    console.log("open ", isOpen);
  }, [isOpen]);

  const navigator = useNavigate();
  const iniitialRooms = useSelector(
    (store: RootState) => store.landing.initialRoomCount
  );
  const checkInDatestring = useSelector(
    (store: RootState) => store.landing.startDateString
  );
  const checkoutDateString = useSelector(
    (store: RootState) => store.landing.endDateString
  );

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

  const propertyId = useSelector((store: RootState) => store.landing.properyID);

  const handleSelectDeal = (dealName: string, deal: RoomPromotionDetails) => {
    dispatch(setPromotion(deal));
    console.log(`Selected deal: ${dealName}`);
    dispatch(setActiveStepper(2));
    navigator("/checkoutPage");
    dispatch(setShowIteanary(true));
    dispatch(setShowItineraryUI(true));
    dispatch(setNumberOfRooms(iniitialRooms));
    dispatch(setGuestCount(initialCombinedGuestStates));
    dispatch(setCheckInDate(checkInDatestring!));
    dispatch(setCheckOutDate(checkoutDateString!));
    dispatch(
      fetchRatesPerDay({
        roomTypeId: selectedRoom?.room_type_id.toString()!,
        startDate: startDateString!,
        endDate: endDateString!,
      })
    );
    const numberOfDays = calculateNumberOfDays(
      checkInDatestring!,
      checkoutDateString!
    );
    const totalRoomAmount = calculateTotalRoomAmount();
    if (ratesPerDay !== null) {
      const subtotal = calculateTotalRoomAmount();
      const taxes =
        (subtotal * paymentInfo.payment_info.taxes_and_surcharges.tax) / 100;
      const vat =
        (subtotal * paymentInfo.payment_info.taxes_and_surcharges.vat) / 100;
      const total =
        subtotal +
        taxes +
        vat -
        (1 - deal.price_factor) * totalRoomAmount * iniitialRooms;

      let dueNow;
      let dueAtResort;

      if (parseInt(deal.promotion_id) === 5) {
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
      dispatch(setNightlyRate(totalRoomAmount / numberOfDays + 1));
      dispatch(setTotalPrice(total));
    }
  };

  const renderArrowNext = (clickHandler: () => void) => {
    return (
      <div onClick={clickHandler} className="carousel-arrow next">
        <ArrowForwardIosOutlinedIcon />
      </div>
    );
  };
  const renderArrowPrev = (clickHandler: () => void) => {
    return (
      <div onClick={clickHandler} className="carousel-arrow prev">
        <ArrowBackIosNewOutlinedIcon />
      </div>
    );
  };

  const [promoCodeInput, setPromoCodeInput] = useState("");

  function hanldeApplyPromoInput() {
    const promoCode = promoCodeInput;
    let roomTypeId = selectedRoom?.room_type_id.toString();
    if (roomTypeId === undefined) {
      roomTypeId = "all";
    }
    dispatch(getCustomPromotion({ promoCode, roomTypeId }));
    setPromoCodeInput("");
    // dispatch(setSnackbarOpen(true));
  }

  const roomModalLoadingState = useSelector(
    (store: RootState) => store.roomPage.roomModalLoadinState
  );

  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      // center
      // blockScroll={false}
      classNames={{
        modal: "custom-modal",
        overlay: "custom-overlay",
        closeButton: "custom-close",
      }}
      styles={modalStyles}
      closeOnOverlayClick={true}
      showCloseIcon={true}
      closeIcon={closeIcon}
    >
      {selectedRoom && (
        <>
          <div className="room-info">
            <p>{formatRoomTypeName(selectedRoom.room_type_name)}</p>
          </div>
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={3000}
            showStatus={false}
            renderArrowPrev={renderArrowPrev}
            renderArrowNext={renderArrowNext}
          >
            {propertyConfigs.roomTypes[selectedRoom.room_type_name]?.images.map(
              (image) => (
                <div key={selectedRoom.room_type_id} className="carousel-item">
                  <img src={image} className="carousel-image" alt="img" />
                </div>
              )
            )}
          </Carousel>
          <div
            className="cliploader-container"
            style={{
              display: roomModalLoadingState === "fulfilled" ? "none" : "block",
            }}
          >
            <ClipLoader
              color={"#120639"}
              loading={roomModalLoadingState !== "fulfilled"}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          <div className="room-details-amenities">
            <div
              className="room-details"
              style={{
                display:
                  roomModalLoadingState === "fulfilled" ? "block" : "none",
              }}
            >
              <div className="desc-amenities">
                <div className="left-section">
                  <div className="svgs">
                    <div className="commonstyle">
                      <PermIdentityOutlinedIcon />
                      {selectedRoom.max_capacity - 1}-
                      {selectedRoom.max_capacity}
                    </div>
                    <div className="commonstyle">
                      <BedOutlinedIcon />
                      {selectedRoom.double_bed !== 0 &&
                      selectedRoom.single_bed !== 0 ? (
                        <div>
                          {`${selectedRoom.double_bed} `}
                          <FormattedMessage id="king" defaultMessage="King" />
                          {" & "}
                          {`${selectedRoom.single_bed} `}
                          <FormattedMessage
                            id="queen"
                            defaultMessage="Queen"
                          />{" "}
                        </div>
                      ) : selectedRoom.double_bed !== 0 ? (
                        <div>
                          {`${selectedRoom.double_bed} `}
                          <FormattedMessage
                            id="king"
                            defaultMessage="King"
                          />{" "}
                        </div>
                      ) : selectedRoom.single_bed !== 0 ? (
                        <div>
                          {`${selectedRoom.single_bed} `}
                          <FormattedMessage
                            id="queen"
                            defaultMessage="Queen"
                          />{" "}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="commonstyle">
                      <p>{selectedRoom.area_in_square_feet} ft</p>
                    </div>
                  </div>
                  {/* <div className="desc">{currentRoomDetails.description}</div> */}
                  <div className="desc">
                    {language === "en" ? currentRoomDetails.description : desc}
                  </div>
                </div>

                <div className="right-section">
                  <div className="amenities">
                    <p>
                      <FormattedMessage
                        id="amenities"
                        defaultMessage={"Amenities"}
                      />
                    </p>
                    <div>
                      <ul>
                        {currentRoomDetails?.amenities?.map((amenity) => (
                          <li key={amenity} className="amenities-list">
                            <CheckCircleOutlineIcon className="tick-icon" />{" "}
                            &nbsp;
                            {amenity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rates">
                <span className="rate-heading">
                  <FormattedMessage
                    id="standardRate"
                    defaultMessage="Standard Rate"
                  />
                </span>
                <Card
                  dealName="Standard Rate"
                  description="The standard rate without applying any promo code or discount"
                  price={selectedRoom.minRates}
                  onSelectDeal={() =>
                    handleSelectDeal("Standard Room Deal", {
                      is_deactivated: false,
                      minimum_days_of_stay: 0,
                      price_factor: 1,
                      promotion_description: "Standard Room Deal",
                      promotion_id: "0",
                      promotion_title: "Standard Deal",
                    })
                  }
                />
                <span className="rate-heading">
                  <FormattedMessage
                    id="dealsAndPackages"
                    defaultMessage="Deals & Packages"
                  />
                </span>
                {currentPromotionDetails?.map((promo) => {
                  return (
                    <Card
                      key={promo.promotion_id}
                      dealName={promo.promotion_title}
                      description={promo.promotion_description}
                      price={selectedRoom.minRates * promo.price_factor}
                      onSelectDeal={() =>
                        handleSelectDeal(promo.promotion_title, promo)
                      }
                      isDisabled={
                        promo.promotion_title === "Military personnel discount"
                      }
                      disabledMessage="NOT APPLICABLE"
                    />
                  );
                })}
              </div>
              <div className="promocode">
                <FormattedMessage
                  id="enterPromoCode"
                  defaultMessage="Enter a promo code"
                />
                <div className="promo-form">
                  <input
                    type="text"
                    className="promocode-input"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.currentTarget.value)}
                  />
                  <button className="apply" onClick={hanldeApplyPromoInput}>
                    <FormattedMessage id="apply" defaultMessage="APPLY" />
                  </button>
                </div>
              </div>
              <RatingsRoom
                ratingRequest={{
                  tenantId: "1",
                  propertyId: propertyId.toString(),
                  roomTypeId: selectedRoom.room_type_id.toString(),
                }}
              ></RatingsRoom>{" "}
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default RoomModal;
