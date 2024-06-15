import React, { useEffect, useRef, useState } from "react";
import {
  setEndDateString,
  setInitialCombinedStateGuests,
  setInitialPropertyConfiguration,
  setInitialRoomCount,
  setStartDateString,
  setTotalGuestCount,
} from "../../redux/slice/LandingPageSlice";
import { Button, IconButton, Snackbar } from "@mui/material";
import {
  setInitialBedCount,
  setIscalendarOpen,
  setShowIteanary,
} from "../../redux/slice/RoomSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import CloseIcon from "@mui/icons-material/Close";
import { FormattedMessage } from "react-intl";
import DateRangePickerComponent from "../LandingPage/DateRangePickerComponent";
import { QueryParams } from "../LandingPage/LandingPage";
import { useNavigate } from "react-router-dom";
import { setCheckInDate, setCheckOutDate, setGuestCount, setNumberOfRooms } from "../../redux/slice/ItineararySlice";

function SearchComponent() {
  const initialProperties = useSelector(
    (store: RootState) => store.landing.initialProperties
  );
  const configDetails = useSelector(
    (state: RootState) => state.landing.initialPropertyConfiguration
  );
  const [guestDropDown, setGuestDropDown] = useState(false);

  const initialCombinedGuestStates = useSelector(
    (state: RootState) => state.landing.initialCombinedStateGuests
  );
  const [allGuests, setAllGuests] = useState("1 Adult");

  const totalGuestCount = useSelector(
    (store: RootState) => store.landing.totalGuestCount
  );
  const initialRoomCount = useSelector(
    (state: RootState) => state.landing.initialRoomCount
  );

  const [snackbarOpenMaxPeople, setSnackbarOpenMaxPeople] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [roomsDropDown, setRoomsDropDown] = useState(false);

  const [knownQueryParameters, setKnownQueryParameters] = useState<{
    [key: string]: string | null;
  }>({});
  const [unknownQueryParameters, setUnknownQueryParameters] = useState<{
    [key: string]: number | null;
  }>({});

  // const initialStartDate = useSelector(
  //   (store: RootState) => store.landing.startDate
  // );
  // const initialEndDate = useSelector(
  //   (store: RootState) => store.landing.endDate
  // );

  const [bedsDropdown, setBedsDropdown] = useState(false);

  const initialBedCount = useSelector(
    (store: RootState) => store.roomSearch.initialBedCount
  );

  const isCalendarOpen = useSelector(
    (store: RootState) => store.roomSearch.isCalendarOpen
  );

  // let currentUrl
  const currentUrl = window.location.href;
  const queryParams = new URLSearchParams(currentUrl.split("?")[1]);

  useEffect(() => {
    // Iterate over all keys in the queryParams object
    for (const key of queryParams.keys()) {
      // Retrieve the value of each query parameter by its key
      const value = queryParams.get(key);

      // Check if the key is one of the known keys
      if (
        [
          "startDate",
          "endDate",
          "propertyName",
          "roomCount",
          "accessible",
          "bedCount",
        ].includes(key)
      ) {
        // Store the key-value pair in the knownQueryParameters object
        setKnownQueryParameters((prevKnownQueryParameters) => ({
          ...prevKnownQueryParameters,
          [key]: value,
        }));
      } else if (
        key === "Adults" ||
        key === "Teens" ||
        key === "Kids" ||
        key === "Senior Citizens"
      ) {
        // Store the key-value pair in the unknownQueryParameters object
        setUnknownQueryParameters((prevUnknownQueryParameters) => ({
          ...prevUnknownQueryParameters,
          [key]: parseInt(value!), // Parsing value to integer if it exists
        }));
      }
    }
  }, [currentUrl]);

  useEffect(() => {
    knownQueryParameters["propertyName"] &&
      fetch(
        // `http://localhost:8080/api/v1/propertyConfig/1?propertyName=${knownQueryParameters["propertyName"]}`
        // `https://team-15-ibe-web-app.azurewebsites.net/api/v1/propertyConfig/1?propertyName=${knownQueryParameters["propertyName"]}`
        `https://ibe-team-15-api-management.azure-api.net/api/v1/propertyConfig/1?propertyName=${knownQueryParameters["propertyName"]}`
      )
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          appDispatch(setInitialPropertyConfiguration(res));
        });
    if (knownQueryParameters["roomCount"]) {
      appDispatch(
        setInitialRoomCount(parseInt(knownQueryParameters["roomCount"]))
      );
    }
    knownQueryParameters["startDate"] &&
      // appDispatch(setStartDateString(knownQueryParameters["startDate"]))
      appDispatch(setStartDateString(knownQueryParameters["startDate"]));
    knownQueryParameters["endDate"] &&
      // appDispatch(setEndDate(new Date(knownQueryParameters["endDate"])));
      appDispatch(setEndDateString(knownQueryParameters["endDate"]));

    if (
      knownQueryParameters["bedCount"] &&
      parseInt(knownQueryParameters["bedCount"]) > 0 &&
      parseInt(knownQueryParameters["bedCount"]) < 4
    ) {
      appDispatch(
        setInitialBedCount(parseInt(knownQueryParameters["bedCount"]))
      );
    }
  }, [knownQueryParameters]);

  useEffect(() => {
    let guests: string = "";
    const guestTypes = Object.keys(initialCombinedGuestStates);
    const nonZeroCounts = guestTypes.filter(
      (guestType) => initialCombinedGuestStates[guestType] !== 0
    );

    nonZeroCounts.forEach((guestType, index) => {
      const count = initialCombinedGuestStates[guestType];
      if (count == 1) {
        guests += `${count} ${guestType.slice(0, -1)}`;
      } else {
        guests += `${count} ${guestType}`;
      }
      // Add comma if it's not the last guest type
      if (index !== nonZeroCounts.length - 1) {
        guests += ", ";
      }
    });

    setAllGuests(guests);
  }, [initialCombinedGuestStates]);

  useEffect(() => {
    // Calculate the total guest count
    if (Object.keys(unknownQueryParameters).length !== 0) {
      let totalCount = 0;

      Object.values(unknownQueryParameters).forEach((count) => {
        if (count !== null) {
          totalCount += count;
        }
      });

      // Dispatch an action to set the total guest count
      appDispatch(setTotalGuestCount(totalCount));

      // Iterate over each key-value pair in unknownQueryParameters
      Object.entries(unknownQueryParameters).forEach(([key, count]) => {
        // Check if count is not null
        if (count !== null) {
          // Dispatch an action to set the initial combined state for each guest type
          appDispatch(setInitialCombinedStateGuests({ [key]: count }));
        }
      });
    }
  }, [unknownQueryParameters]);

  const appDispatch = useDispatch<AppDispatch>();
  const updateGuestCount = (guestType: string, count: number) => {
    appDispatch(
      setInitialCombinedStateGuests({
        [guestType]: initialCombinedGuestStates[guestType] + count,
      })
    );
  };
  const updateGuestCountDecrement = (guestType: string, count: number) => {
    if (guestType === "Adults") {
      if (initialCombinedGuestStates[guestType] == initialRoomCount) {
        appDispatch(setInitialRoomCount(initialRoomCount - 1));
      }
    }
    appDispatch(
      setInitialCombinedStateGuests({
        [guestType]: initialCombinedGuestStates[guestType] - count,
      })
    );
  };
  function guestClickHandler() {
    setGuestDropDown(!guestDropDown);
    setBedsDropdown(false);
    setRoomsDropDown(false);
    appDispatch(setIscalendarOpen(false));
  }
  function incrementCounterFunction(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (totalGuestCount < initialRoomCount * configDetails.maxPeoplePerRoom) {
      if (e.currentTarget.name === "Adults") {
        updateGuestCount("Adults", 1);
      } else {
        updateGuestCount(e.currentTarget.name, 1);
      }
      appDispatch(setTotalGuestCount(totalGuestCount + 1));
    } else {
      setSnackbarOpenMaxPeople(true);
    }
  }

  function decrementCounterFunction(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (e.currentTarget.name === "Adults") {
      if (initialCombinedGuestStates["Adults"] !== 1) {
        updateGuestCountDecrement("Adults", 1);
        appDispatch(setTotalGuestCount(totalGuestCount - 1));
      }
    } else if (initialCombinedGuestStates[e.currentTarget.name] !== 0) {
      updateGuestCountDecrement(e.currentTarget.name, 1);
      appDispatch(setTotalGuestCount(totalGuestCount - 1));
    }
  }

  function roomDropDownClickHandler() {
    setRoomsDropDown(!roomsDropDown);
    setBedsDropdown(false);
    setGuestDropDown(false);
    appDispatch(setIscalendarOpen(false));
  }
  function bedsDropDownClickHandler() {
    setBedsDropdown(!bedsDropdown);
    setGuestDropDown(false);
    setRoomsDropDown(false);
    appDispatch(setIscalendarOpen(false));
  }
  const handleSnackBar = () => {
    setSnackbarOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    console.log(event);
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
    setSnackbarOpenMaxPeople(false);
  };
  const handleCloseMaxPeople = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    console.log(event);
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpenMaxPeople(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function selectBedsHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    appDispatch(setInitialBedCount(parseInt(e.currentTarget.innerText)));
    setBedsDropdown(false);
  }

  function selectRoomHandler(e: React.MouseEvent<HTMLButtonElement>) {
    if (
      parseInt(e.currentTarget.innerText) > initialCombinedGuestStates["Adults"]
    ) {
      let value = parseInt(e.currentTarget.innerText);
      appDispatch(setInitialRoomCount(parseInt(e.currentTarget.innerText)));
      appDispatch(
        setTotalGuestCount(
          totalGuestCount - initialCombinedGuestStates["Adults"] + value
        )
      );
      appDispatch(setInitialCombinedStateGuests({ ["Adults"]: value }));

      setRoomsDropDown(false);
      handleSnackBar();
    } else {
      appDispatch(setInitialRoomCount(parseInt(e.currentTarget.innerText)));
      setRoomsDropDown(false);
    }
  }

  function roomCalendarHandler() {
    appDispatch(setIscalendarOpen(!isCalendarOpen));
    setBedsDropdown(false);
    setGuestDropDown(false);
    setRoomsDropDown(false);
  }

  const navigator = useNavigate();

  const startDateString = useSelector(
    (store: RootState) => store.landing.startDateString
  );
  const endDateString = useSelector(
    (store: RootState) => store.landing.endDateString
  );
  function searchDatesHandler() {
    const queryParamsObject: QueryParams = {
      // startDate: initialStartDate
      //   ? new Date(initialStartDate).toISOString().split("T")[0]
      //   : "", // Include startDateStore
      // endDate: initialEndDate
      //   ? new Date(initialEndDate).toISOString().split("T")[0]
      //   : "", // Include endDateStore
      startDate: startDateString ?? "", // Include startDateStore
      endDate: endDateString ?? "", // Include endDateStore
      propertyName:
        knownQueryParameters["propertyName"] !== undefined
          ? knownQueryParameters["propertyName"]!
          : initialProperties[0]!, // Include initialProperties[0]
      roomCount: initialRoomCount,
      bedCount: initialBedCount,
      accessible: knownQueryParameters["accessible"] === "false" ? false : true, // Include roomCount
      ...initialCombinedGuestStates, // Include initialCombinedGuestStates
    };

    const queryString = Object.keys(queryParamsObject)
      .map((key) => key + "=" + queryParamsObject[key])
      .join("&");
    localStorage.setItem("prevPath", queryString);

    appDispatch(setCheckInDate(startDateString as string));
    appDispatch(setCheckOutDate(endDateString as string));
    appDispatch(setNumberOfRooms(initialRoomCount));
    appDispatch(setGuestCount(initialCombinedGuestStates))
    appDispatch(setShowIteanary(false))
    navigator(`/rooms?${queryString}`);
  }

  const guestsRef = useRef<HTMLDivElement | null>(null);

  const roomsRef = useRef<HTMLDivElement | null>(null);

  const bedsRef = useRef<HTMLDivElement | null>(null);

  const datesRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    if (
      guestsRef.current &&
      !guestsRef.current.contains(event.target as Node)
    ) {
      setGuestDropDown(false);
    }
    if (roomsRef.current && !roomsRef.current.contains(event.target as Node)) {
      setRoomsDropDown(false);
    }
    if (bedsRef.current && !bedsRef.current.contains(event.target as Node)) {
      setBedsDropdown(false);
    }
    if (datesRef.current && !datesRef.current.contains(event.target as Node)) {
      appDispatch(setIscalendarOpen(false));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  
  return (
    <div className="search-container">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          <FormattedMessage
            id="minimumAdult"
            defaultMessage={
              "Each room should have atleast one adult so adult count increased"
            }
          />
        }
        action={action}
      />
      <Snackbar
        open={snackbarOpenMaxPeople}
        autoHideDuration={6000}
        onClose={handleCloseMaxPeople}
        message={
          <FormattedMessage
            id="maximumPeople"
            defaultMessage={"Each room should contain only 3 people"}
          />
        }
        action={action}
      />
      <div className="guests-rooms-container">
        <div className="guest-room-bed">
          <div className="guests-container" ref={guestsRef}>
            <button className="guests-dropdown" onClick={guestClickHandler}>
              <div className="guestname-count">
                <div className="guests-tag-name">
                  <FormattedMessage id="guests" defaultMessage={"Guests"} />
                </div>
                <div className="guests-placeholder">{allGuests}</div>
              </div>
              <div className="drop-down-image">
                <img
                  src={
                    guestDropDown ? "up-arrow.png" : "room-search-drop-down.png"
                  }
                  alt="dropdown"
                ></img>
              </div>
            </button>
            <div className="guests-drop-down-menu">
              <div
                className="guest-category-container"
                style={{
                  display: guestDropDown === true ? "block" : "none",
                }}
              >
                {configDetails.guests
                  .filter((guest) => guest.active)
                  .map((guest) => {
                    // Determine count based on guest name
                    let count: number;
                    count = initialCombinedGuestStates[guest.name];
                    return (
                      <div className="guest-category" key={guest.name}>
                        <div className="category-name-count">
                          <div className="category-name">{guest.name}</div>
                          <div className="category-count">
                            <button
                              className="category-dec inc-dec-buttons"
                              name={guest.name}
                              onClick={(e) => decrementCounterFunction(e)}
                            >
                              -
                            </button>
                            <div className="category-count-display">
                              {count}
                            </div>

                            <button
                              className="category-inc inc-dec-buttons"
                              name={guest.name}
                              onClick={(e) => incrementCounterFunction(e)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="age-category">{guest.age}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div
            className="rooms-container"
            ref={roomsRef}
            // style={{
            //   display: configDetails.fields.find(
            //     (field) => field.title === "Rooms" && field.active
            //   )
            //     ? "block"
            //     : "none",
            // }}
          >
            <button
              className="rooms-drop-down"
              onClick={roomDropDownClickHandler}
            >
              <div className="rooms-name-placeholder">
                <div className="rooms-tag-name">
                  <FormattedMessage id="rooms" defaultMessage={"Rooms"} />
                </div>
                <div className="rooms-place-holder">{initialRoomCount}</div>
              </div>
              <div className="rooms-drop-down-arrow">
                <img
                  src={
                    roomsDropDown ? "up-arrow.png" : "room-search-drop-down.png"
                  }
                  alt="dropdown"
                ></img>
              </div>
            </button>
            <div
              className="rooms-options-container"
              style={{
                display: roomsDropDown === true ? "block" : "none",
              }}
            >
              {[...Array(configDetails.rooms)].map((_, index) => (
                <button
                  key={index + 1}
                  className="rooms-option"
                  onClick={(e) => selectRoomHandler(e)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="beds-container" ref={bedsRef}>
            <button
              className="beds-drop-down"
              onClick={bedsDropDownClickHandler}
            >
              <div className="beds-name-placeholder">
                <div className="beds-tag-name">
                  <FormattedMessage id="beds" defaultMessage={"Beds"} />
                </div>
                <div className="rooms-place-holder">{initialBedCount}</div>
              </div>
              <div className="rooms-drop-down-arrow">
                <img
                  src={
                    bedsDropdown ? "up-arrow.png" : "room-search-drop-down.png"
                  }
                  alt="dropdown"
                ></img>
              </div>
            </button>
            <div
              className="beds-options-container"
              style={{
                display: bedsDropdown === true ? "block" : "none",
              }}
            >
              {[1, 2, 3].map((_, index) => (
                <button
                  key={index + 1}
                  className="beds-option"
                  onClick={(e) => selectBedsHandler(e)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="date-search">
          <div className="dates-container" ref={datesRef}>
            <button className="dates-drop-down" onClick={roomCalendarHandler}>
              <div className="check-in-between">
                <div className="check-in-label">
                  {
                    <FormattedMessage
                      id="checkInBetween"
                      defaultMessage={"Check In Between"}
                    />
                  }
                </div>
                <div className="check-in-date">
                  {/* {initialStartDate
                    ? new Date(initialStartDate).toLocaleDateString()
                    : "Check in Date"} */}
                  {startDateString
                    ? new Date(startDateString).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "Check in Date"}
                </div>
              </div>
              <div className="check-out-between">
                <div className="check-out-label">
                  {
                    <FormattedMessage
                      id="checkOutBetween"
                      defaultMessage={"Check Out Between"}
                    />
                  }
                </div>
                <div className="check-out-date">
                  {/* {initialEndDate
                    ? new Date(initialEndDate).toLocaleDateString()
                    : "Check out date"} */}
                  {endDateString
                    ? new Date(endDateString).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "Check out date"}
                </div>
              </div>
              <div className="calendar-image">
                <img
                  src={
                    isCalendarOpen
                      ? "up-arrow.png"
                      : "room-search-drop-down.png"
                  }
                  alt="calendar"
                ></img>
              </div>
            </button>

            <div
              className="date-range-picker-calendar"
              style={{ display: isCalendarOpen ? "flex" : "none" }}
            >
              <DateRangePickerComponent page="room result" />
            </div>
          </div>

          <div className="search-container">
            <button className="room-search-button" onClick={searchDatesHandler}>
              {
                <FormattedMessage
                  id="searchDates"
                  defaultMessage={"Search Dates"}
                />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
