import "./room.style.scss";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SearchComponent from "./SearchComponent";
import FilterContainer from "./FilterContainer";
import IteanaryContainer from "./IteanaryContainer";
import MobileFilterComponent from "./MobileFilterComponent";
import { RoomTypeDetails } from "../CarousalCard/RoomTypeDetail";
import { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { getRoomDetails } from "../../redux/thunk/getRoomDetails";
import ClipLoader from "react-spinners/ClipLoader";
import {
  setActiveStepper,
  setInitialBedCount,
  setShowIteanary,
  setSortType,
} from "../../redux/slice/RoomSearchSlice";
import {
  setCurrentpage,
  setSnackbarOpen,
} from "../../redux/slice/RoomPageSlice";
import { getTenantConfiguration } from "../../redux/thunk/getTenantConfiguration";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { getBestPromotionDetails } from "../../redux/thunk/getBestPromotion";
import MobileItenaryComponent from "./MobileItenary";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { RoomComparison } from "./RoomComparison";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  border: "5px solid white",
  marginTop: "200px",
};

function RoomResults() {
  const steps = [
    <FormattedMessage id="chooseRoom" defaultMessage={"Choose Room"} />,
    <FormattedMessage id="chooseAddon" defaultMessage={"Choose Add On"} />,
    <FormattedMessage id="checkout" defaultMessage={"Check Out"} />,
  ];
  const snackBarOpen = useSelector(
    (store: RootState) => store.roomPage.snackBarOpen
  );


  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    console.log(event);
    if (reason === "clickaway") {
      return;
    }

    appDispatch(setSnackbarOpen(false));
  };

  const snackBarMesage = useSelector(
    (store: RootState) => store.roomPage.currentSnackBarMessage
  );
  const snackBarStatus = useSelector(
    (store: RootState) => store.roomPage.currentRoomSnackBarStatus
  );
  const appDispatch = useDispatch<AppDispatch>();
  const [priceDropDown, setPriceDropDown] = useState(false);
  const roomListSize = useSelector(
    (store: RootState) => store.roomPage.roomList
  );
  function handlePriceDropDown() {
    setPriceDropDown(!priceDropDown);
  }

  function handleSortOptions(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    appDispatch(setSortType(e.currentTarget.name));
    setPriceDropDown(!priceDropDown);
  }

  const roomDetailsLoadinState = useSelector(
    (store: RootState) => store.roomPage.status
  );

  const roomTypeFilter = useSelector(
    (store: RootState) => store.roomSearch.roomTypeFilters
  );
  const priceFilter = useSelector(
    (store: RootState) => store.roomSearch.priceFilters
  );
  const bedTypeFilters = useSelector(
    (store: RootState) => store.roomSearch.bedTypeFilters
  );

  const initialProperties = useSelector(
    (store: RootState) => store.landing.initialProperties
  );
  // const startDateStore = useSelector(
  //   (store: RootState) => store.landing.startDate
  // );
  // const endDateStore = useSelector((store: RootState) => store.landing.endDate);
  const initialRoomCount = useSelector(
    (store: RootState) => store.landing.initialRoomCount
  );

  const totalGuestCountStore = useSelector(
    (store: RootState) => store.landing.totalGuestCount
  );

  const navigator = useNavigate();

  const itemsPerPage = useSelector(
    (store: RootState) => store.roomPage.itemsPerPage
  );
  const currentPage = useSelector(
    (store: RootState) => store.roomPage.currentPage
  );

  const startDateString = useSelector((store:RootState)=>store.landing.startDateString);
  const endDateString = useSelector((store:RootState)=>store.landing.endDateString);

  // Function to check if a given date string is a valid date
  function isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  // Function to check if check-in is before checkout
  function isCheckInBeforeCheckOut(checkIn: string, checkOut: string): boolean {
    return new Date(checkIn) < new Date(checkOut);
  }

  // Function to check if the difference between check-in and checkout is within 14 days
  function isWithin14Days(checkIn: string, checkOut: string): boolean {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const differenceInDays = Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        millisecondsPerDay
    );
    return differenceInDays <= 14;
  }

  // const initialCombinedGuestStates = useSelector((store:RootState)=>store.landing.initialCombinedStateGuests);

  const priceType = useSelector(
    (store: RootState) => store.roomSearch.sortType
  );

  const initialBedCount = useSelector(
    (store: RootState) => store.roomSearch.initialBedCount
  );
  useEffect(() => {
    const prevPath = localStorage.getItem("prevPath");
    const searchItems = window.location.search;

    const queryParams = new URLSearchParams(searchItems);

    if (
      (!prevPath || prevPath.length === 0) &&
      (!searchItems || searchItems.length === 0)
    ) {
      navigator("/");
      return;
    }

    if (!searchItems || searchItems == "" || searchItems.length === 0) {
      navigator("/rooms?" + prevPath);
      return;
    }

    // Extracting parameters from query string
    let checkInDate = queryParams.get("startDate")!;
    let checkOutDate = queryParams.get("endDate")!;
    let propertyName = queryParams.get("propertyName")!;

    let bedCount = 1;
    if (
      queryParams.get("bedCount") !== null &&
      parseInt(queryParams.get("bedCount")!) < 4 &&
      parseInt(queryParams.get("bedCount")!) > 0
    ) {
      bedCount = parseInt(queryParams.get("bedCount")!);
      appDispatch(setInitialBedCount(bedCount));
    }

    let roomCount: number;

    if (
      !isValidDate(checkInDate) ||
      !isValidDate(checkOutDate) ||
      !isCheckInBeforeCheckOut(checkInDate, checkOutDate) ||
      !isWithin14Days(checkInDate, checkOutDate)
    ) {
      // Navigate to home page
      navigator("/");
    }

    if (propertyName === null) {
      navigator("/");
    }

    if (queryParams.get("roomCount") !== null) {
      roomCount = parseInt(queryParams.get("roomCount")!);
    } else {
      roomCount = initialRoomCount;
    }

    let guestCount: number;

    if (queryParams.size !== 0) {
      guestCount =
        parseInt(queryParams.get("Adults")!) +
        parseInt(queryParams.get("Teens")!) +
        parseInt(queryParams.get("Kids")!);
    } else {
      guestCount = totalGuestCountStore;
    }

    if (propertyName === null || undefined) {
      propertyName = initialProperties[0];
    }

    // if (startDateStore !== null) {
    //   if (checkInDate === null || undefined) {
    //     checkInDate = new Date(startDateStore).toISOString().split("T")[0];
    //   }
    // }

    // if (endDateStore !== null) {
    //   if (checkOutDate === null || undefined) {
    //     checkOutDate = new Date(endDateStore).toISOString().split("T")[0]!;
    //   }
    // }
    if (startDateString !== null) {
      if (checkInDate === null || undefined) {
        checkInDate = startDateString;
      }
    }

    if (endDateString !== null) {
      if (checkOutDate === null || undefined) {
        checkOutDate = endDateString;
      }
    }

    let propertyId = 0;
    appDispatch(getTenantConfiguration());
    propertyId = parseInt(propertyName?.slice(5, 7));
    if (propertyId === undefined || null) {
      propertyId = 10000;
    }
    let minRate = 0;
    let maxRate = parseInt(priceFilter[0]);
    if (!maxRate) {
      maxRate = 99999999;
    }
    let bedType = bedTypeFilters;
    let roomType = roomTypeFilter;

    if (bedCount > 3) {
      bedCount = initialBedCount;
    }



    console.log(checkInDate,checkOutDate);
    // Dispatching the thunk action creator with parameters
    appDispatch(
      getRoomDetails({
        propertyId,
        checkInDate,
        checkOutDate,
        minRate,
        maxRate,
        bedType,
        roomType,
        guestCount,
        roomCount,
        currentPage,
        priceType,
        bedCount,
      })
    );

    let seniorCitizen = 0;

    if (queryParams.get("Senior Citizens") != null) {
      seniorCitizen = parseInt(queryParams.get("Senior Citizens")!);
    }

    const roomTypeId = 85;

    appDispatch(
      getBestPromotionDetails({
        propertyId,
        roomTypeId,
        checkInDate,
        checkOutDate,
        seniorCitizen,
      })
    );
  }, [
    roomTypeFilter,
    priceFilter,
    bedTypeFilters,
    priceType,
    window.location.search,
    currentPage,
  ]);

  const showIteanary = useSelector(
    (store: RootState) => store.roomSearch.showIteanary
  );

  // Pagination on frontend side

  const indexOfLastItem = currentPage * itemsPerPage;
  const filterRoomList = useSelector(
    (store: RootState) => store.roomPage.filterRoomList
  );
  const handlePageChange = (pageNumber: number) => {
    appDispatch(setCurrentpage(pageNumber));
  };

  const handleStepClick = (stepIndex: number) => {
    // Perform different actions based on the step clicked
    switch (stepIndex) {
      case 0:
        window.location.href = "/";
        break;
      case 1:
        console.log("Step 2 clicked!");
        break;
      case 2:
        if (showIteanary === true) {
          appDispatch(setActiveStepper(2));

          navigator("/checkoutPage");
        }
        break;
      default:
        console.log("Unknown step clicked!");
    }
  };

  const activeStepper = useSelector(
    (store: RootState) => store.roomSearch.activeStepper
  );
  const handleCheckOut = () => {
    appDispatch(setShowIteanary(true));
    appDispatch(setActiveStepper(2));
    navigator("/checkoutPage");
  };
  return (
    <div className="room-results-container">
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarStatus === "error" ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMesage}
        </Alert>
      </Snackbar>
      <div
        className="banner-image"
        style={{ backgroundImage: "url(testbanner.jpg)" }}
      ></div>
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

      <div className="room-results-filter-container">
        <div className="room-results-sub-container">
          <SearchComponent />
          <MobileFilterComponent />
          {/* <MobileItenaryComponent buttonText="CHECKOUT" onButtonClick={handleCheckOut}/> */}

          {showIteanary ? (
            <MobileItenaryComponent
              buttonText="CHECKOUT"
              onButtonClick={handleCheckOut}
            />
          ) : (
            ""
          )}

          <div className="filter-room-result">
            <div className="filter-container">
              <div className="narrow-results">
                <FormattedMessage
                  id="narrow"
                  defaultMessage={"Narrow your results"}
                />
              </div>
              <FilterContainer />
            </div>

            <div className="room-results-header-content">
              <div className="room-results-heading-container">
                <div className="room-results-heading">
                  <FormattedMessage
                    id="roomResult"
                    defaultMessage={"Room Results"}
                  />
                </div>
                <div className="trip-iteanary-heading">
                  <div className="showing-results">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      style={{ marginRight: "5px" }}
                    >
                      <img
                        src="/pagination/icons8-chevron-left-50.png"
                        alt="left"
                        style={{ height: "15px", width: "15px", cursor:"pointer" }}
                      ></img>
                    </button>
                    <FormattedMessage id="showing" defaultMessage={"Showing"} />{" "}
                    {(currentPage - 1) * itemsPerPage + 1} -
                    {(currentPage - 1) * itemsPerPage +
                      filterRoomList.roomTypesList.length}
                    &nbsp;
                    <FormattedMessage id="of" defaultMessage={"of"} />{" "}
                    {roomListSize.size}{" "}
                    <FormattedMessage id="result" defaultMessage={"Results"} />
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={indexOfLastItem >= filterRoomList.size}
                      style={{ marginLeft: "5px" }}
                    >
                      <img
                        src="/pagination/icons8-chevron-right-50.png"
                        alt="right"
                        style={{ height: "15px", width: "15px", cursor:"pointer" }}
                      ></img>
                    </button>
                  </div>
                  <button
                    className="price-iteanary"
                    onClick={handlePriceDropDown}
                  >
                    <div className="price" 
                    style={{ cursor:"pointer" }}
                    >
                      <FormattedMessage id="price" defaultMessage={"Price"} />:
                      {priceType}
                    </div>
                    <div className="drop-down">
                      <img
                        src={
                          priceDropDown
                            ? "up-arrow.png"
                            : "room-search-drop-down.png"
                        }
                        style={{ cursor:"pointer" }}
                        alt="drop-down"
                      ></img>
                    </div>
                    <div
                      className="price-options"
                      style={{ display: priceDropDown ? "block" : "none" }}
                    >
                      <button
                        className="option"
                        name="high"
                        onClick={(e) => handleSortOptions(e)}
                      >
                        <FormattedMessage
                          id="high"
                          defaultMessage={"Price High"}
                        />
                      </button>
                      <button
                        className="option"
                        name="low"
                        onClick={(e) => handleSortOptions(e)}
                      >
                        <FormattedMessage
                          id="low"
                          defaultMessage={"Price Low"}
                        />
                      </button>
                      <button
                        className="option"
                        name="none"
                        onClick={(e) => handleSortOptions(e)}
                      >
                        <FormattedMessage
                          id="none"
                          defaultMessage={"Default"}
                        />
                      </button>
                    </div>
                  </button>
                </div>
              </div>

              <div className="rooms-iteanary-container">
                <div
                  className="room-results-container"
                  style={{ flexGrow: showIteanary ? 0 : 1 }}
                >
                  <div
                    className="clipLoader"
                    style={{
                      display:
                        roomDetailsLoadinState === "pending" ? "block" : "none",
                    }}
                  >
                    <ClipLoader
                      color={"#120639"}
                      loading={
                        roomDetailsLoadinState === "fulfilled" ? false : true
                      }
                      cssOverride={override}
                      size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                  <div className="room-results">
                    <RoomTypeDetails />
                  </div>
                </div>
                <IteanaryContainer
                  buttonText="CHECKOUT"
                  // buttonText=<FormattedMessage id="checkout"/>
                  onButtonClick={handleCheckOut}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RoomComparison/>
      </div>
    </div>
  );
}

export default RoomResults;
