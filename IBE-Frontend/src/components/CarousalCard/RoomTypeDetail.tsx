import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import "./RoomTypeDetail.scss";
import { DemoCarousel } from "./CarosalComponent";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import { FormattedMessage, FormattedNumber, IntlProvider } from "react-intl";
import {
  setActiveStepper,
  setRoomTypeID,
} from "../../redux/slice/RoomSearchSlice";
import RoomModal from "../RoomModal/RoomModal";
import {
  addSelectedRoom,
  openModal,
  removeSelectedRoom,
  setSelectedRoom,
} from "../../redux/slice/RoomPageSlice";
import { IRoomDetails } from "../../interfaces/IRoomPage";
import { useEffect } from "react";

export function RoomTypeDetails() {
  const currency = useSelector((state: RootState) => state.landing.currency);
  const exchangeRates = useSelector((state: RootState) => state.landing.rate);
  const filterRoomList = useSelector(
    (state: RootState) => state.roomPage.filterRoomList
  );
  const dispatch = useDispatch();

  const formatRoomTypeName = (roomTypeName: string): string => {
    return roomTypeName.replace(/_/g, " ");
  };

  const iteanary = useSelector(
    (store: RootState) => store.roomSearch.showIteanary
  );

  const propertyConfigs = useSelector(
    (store: RootState) => store.landing.initialPropertyConfiguration
  );

  const itemsPerPage = useSelector(
    (store: RootState) => store.roomPage.itemsPerPage
  );

  // const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfLastItem = itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const indexOfFirstItem = 0;
  const currentItems = filterRoomList.roomTypesList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const itemsState = useSelector((store: RootState) => store.roomPage.status);

  const currentBestPromo = useSelector(
    (store: RootState) => store.roomPage.bestPromotion
  );

  const appDispatch = useDispatch<AppDispatch>();

  const handleOpenModal = (room: IRoomDetails) => {
    appDispatch(setSelectedRoom(room));
    appDispatch(setActiveStepper(1));
    appDispatch(setRoomTypeID(room.room_type_id.toString()));
    dispatch(openModal(room));
  };

  const selectedRooms = useSelector(
    (store: RootState) => store.roomPage.selectedRoomsComparison
  );
  const handleCompare = (individual_data: IRoomDetails) => {
    const roomExists = selectedRooms.some(
      (room) => room.room_type_id === individual_data.room_type_id
    );

    if (roomExists) {
      dispatch(removeSelectedRoom(individual_data));
    } else {
      dispatch(addSelectedRoom(individual_data));
    }
  };
  useEffect(() => {
    console.log(selectedRooms);
  }, [selectedRooms]);
  return (
    <div className="roomCardHolder">
      <div
        className="error-message"
        style={{
          display: itemsState === "error" ? "block" : "none",
          color: "red",
        }}
      >
        No such rooms available for provided specifications
      </div>
      <div
        className="roomCards"
        style={{ display: itemsState === "fulfilled" ? "flex" : "none" }}
      >
        {filterRoomList.roomTypesList.length === 0 ? (
          <p style={{ color: "red" }}>No rooms with provided specifications</p>
        ) : (
          ""
        )}
        {currentItems.map((individual_data) => (
          <div
            className={`indiv-card ${iteanary ? "itinerary-class" : ""}`}
            key={individual_data.room_type_name}
          >
            <DemoCarousel
              images={
                propertyConfigs.roomTypes[individual_data.room_type_name]
                  ?.images || []
              }
            />

            <div className="roomcard-details">
              <div className="name-rating">
                <p id="roomName">
                  {formatRoomTypeName(individual_data.room_type_name)}
                </p>
                {/* <p className="ratings">New Property</p> */}
                <div
                  className="rating"
                  style={{
                    display: individual_data.count === 0 ? "none" : "flex",
                  }}
                >
                  <div className="commonstyle">
                    <StarRoundedIcon
                      style={{ color: "#120639", paddingBottom: "3px" }}
                    />
                    &nbsp;{individual_data.ratings.toFixed(2)}
                  </div>
                  <div>
                    {individual_data.count}{" "}
                    <FormattedMessage id="reviews" defaultMessage="reviews" />
                  </div>
                </div>
                <div
                  className="new-property"
                  style={{
                    display: individual_data.count === 0 ? "block" : "none",
                  }}
                >
                  <FormattedMessage
                    id="newProperty"
                    defaultMessage="New Property"
                  />
                </div>
              </div>
              <div>
                <div className="commonstyle">
                  <RoomOutlinedIcon />
                  <p>
                    <FormattedMessage
                      id="nearCityCenter"
                      defaultMessage={"Near City Center"}
                    />
                  </p>
                </div>
                <p>
                  <span style={{ fontStyle: "italic", paddingLeft: "3px" }}>
                    <FormattedMessage
                      id="inclusive"
                      defaultMessage="Inclusive"
                    />
                  </span>
                  : {individual_data.area_in_square_feet} ft
                </p>
                <div className="commonstyle">
                  <PermIdentityOutlinedIcon />
                  <p>
                    {individual_data.max_capacity - 1}-
                    {individual_data.max_capacity}
                  </p>
                </div>
                <div className="commonstyle">
                  <BedOutlinedIcon />
                  {individual_data.double_bed !== 0 &&
                  individual_data.single_bed !== 0 ? (
                    <>
                      {`${individual_data.double_bed} `}
                      <FormattedMessage id="king" defaultMessage="King" />{" "}
                      {`& ${individual_data.single_bed} `}
                      <FormattedMessage
                        id="queen"
                        defaultMessage="Queen"
                      />{" "}
                    </>
                  ) : individual_data.double_bed !== 0 ? (
                    <>
                      {`${individual_data.double_bed} `}
                      <FormattedMessage id="king" defaultMessage="King" />{" "}
                    </>
                  ) : individual_data.single_bed !== 0 ? (
                    <>
                      {`${individual_data.single_bed} `}
                      <FormattedMessage
                        id="queen"
                        defaultMessage="Queen"
                      />{" "}
                    </>
                  ) : null}
                </div>
                {/* {}promotion */}
                <div>
                  <div className="promotions">
                    <FormattedMessage
                      id="specialDeal"
                      defaultMessage="Special Deal"
                    />
                  </div>
                  {`${currentBestPromo.promotion_title} with ${100 -
                    currentBestPromo.price_factor * 100}% discount`}
                </div>
                <div className="price">
                  <IntlProvider locale="en">
                    <span>
                      <FormattedNumber
                        style="currency"
                        currency={currency}
                        value={
                          individual_data.minRates *
                          exchangeRates[currency.toUpperCase()]
                        }
                        maximumFractionDigits={0}
                      />
                    </span>
                  </IntlProvider>
                  {/* <span>${individual_data.minRates}</span> <br /> */}
                  &nbsp;per{" "}
                  <FormattedMessage id="night" defaultMessage="Night" />
                </div>
              </div>

              <div
                className="commonstyle"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                <FormattedMessage id="roomsLeft" defaultMessage="Rooms left"/> : {individual_data.minRoomCount} </div>

                <div>
                  {individual_data.minRoomCount < 7 ? (
                    <span
                      style={{
                        animation: "pulse 1.5s infinite",
                        color: "red",
                        fontSize: "20px",
                        fontWeight: "600",
                        textAlign:"center",
                        lineHeight:"140%"
                      }}
                    >
                      <FormattedMessage id="hurry" defaultMessage="Hurry Filling Fast"/>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="room-btn">
                <button
                  className="select-room"
                  // onClick={selectRoomHandler}
                  onClick={() => handleOpenModal(individual_data)}
                >
                  <FormattedMessage
                    id="selectRoom"
                    defaultMessage="SELECT ROOM"
                  />
                </button>
                <div>
                  <div
                    style={{
                      color: "#120639",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "16px",
                      textAlign:"center",
                      lineHeight:"140%"
                    }}
                    onClick={() => handleCompare(individual_data)}
                  >
                    <FormattedMessage id="addToCompare" defaultMessage="Add to Compare"/>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      <RoomModal />
    </div>
  );
}
