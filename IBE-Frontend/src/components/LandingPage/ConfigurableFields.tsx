import React, { useEffect, useRef, useState } from "react";
// import configDetails from "./config.json";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  setAccessibleCheckBox,
  setGuestDropDown,
  setInitialCombinedStateGuests,
  setInitialRoomCount,
  setIsCalendarOpen,
  setPropertyDropDown,
  setRoomsDropDown,
  setShowCalendarDropDown,
  setTotalGuestCount,
} from "../../redux/slice/LandingPageSlice";

function ConfigurableFields() {
  const configDetails = useSelector((state:RootState)=>state.landing.initialPropertyConfiguration);
  const guestDropDown = useSelector((store:RootState)=>store.landing.guestDropDown);
  const [allGuests, setAllGuests] = useState("1 Adult");
  const initialCombinedGuestStates = useSelector(
    (state: RootState) => state.landing.initialCombinedStateGuests
  );
  
  const roomsDropDown = useSelector((store:RootState)=>store.landing.roomsDropDown);
  const initialRoomCount = useSelector(
    (state: RootState) => state.landing.initialRoomCount
  );
  const [snackbarOpenMaxPeople, setSnackbarOpenMaxPeople] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    let guests: string = "";
    const guestTypes = Object.keys(initialCombinedGuestStates);
    const nonZeroCounts = guestTypes.filter(
      (guestType) => initialCombinedGuestStates[guestType] !== 0
    );

    nonZeroCounts.forEach((guestType, index) => {
      const count = initialCombinedGuestStates[guestType];
      if(count==1){
        guests += `${count} ${guestType.slice(0, -1)}`;
      }
      else{
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
    appDispatch(setTotalGuestCount(1))
    configDetails.guests.forEach((guest) => {
      if (guest.name == "Adults") {
        appDispatch(setInitialCombinedStateGuests({ ["Adults"]: 1 }));
      } else {
        appDispatch(setInitialCombinedStateGuests({ [guest.name]: 0 }));
      }
    });
  }, [configDetails]);
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

  const updateGuestCount = (guestType: string, count: number) => {
    appDispatch(
      setInitialCombinedStateGuests({
        [guestType]: initialCombinedGuestStates[guestType] + count,
      })
    );
  };
  const updateGuestCountDecrement = (guestType: string, count: number) => {

    if(guestType==="Adults"){
      if(initialCombinedGuestStates[guestType]==initialRoomCount){
        appDispatch(setInitialRoomCount(initialRoomCount-1));
      }
    }
    appDispatch(
      setInitialCombinedStateGuests({
        [guestType]: initialCombinedGuestStates[guestType] - count,
      })
    );
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

  const appDispatch = useDispatch<AppDispatch>();

  const totalGuestCount = useSelector(
    (store: RootState) => store.landing.totalGuestCount
  );

  function guestClickHandler() {
    appDispatch(setGuestDropDown(!guestDropDown));
    appDispatch(setPropertyDropDown(false));
    appDispatch(setShowCalendarDropDown(false));
    appDispatch(setIsCalendarOpen(false))
    appDispatch(setRoomsDropDown(false));
  }

  function incrementCounterFunction(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (
      totalGuestCount <
      initialRoomCount * configDetails.maxPeoplePerRoom
    ) {
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
    appDispatch(setRoomsDropDown(!roomsDropDown));
    appDispatch(setGuestDropDown(false));
    appDispatch(setPropertyDropDown(false));
    appDispatch(setShowCalendarDropDown(false));
    appDispatch(setIsCalendarOpen(false))
  }

  // function selectRoomHandler(e: React.MouseEvent<HTMLButtonElement>) {
  //   if (
  //     parseInt(e.currentTarget.innerText) > initialCombinedGuestStates["Adults"]
  //   ) {
  //     let value = parseInt(e.currentTarget.innerText);
  //     appDispatch(setInitialRoomCount(parseInt(e.currentTarget.innerText)));
  //     appDispatch(
  //       setTotalGuestCount(
  //         totalGuestCount - initialCombinedGuestStates["Adults"] + value
  //       )
  //     );
  //     appDispatch(setInitialCombinedStateGuests({ ["Adults"]: value }));

  //     setRoomsDropDown(false);
  //     handleSnackBar();
  //   } else {
  //     appDispatch(setInitialRoomCount(parseInt(e.currentTarget.innerText)));
  //     setRoomsDropDown(false);
  //   }
  // }
  function selectRoomHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const selectedRoomCount = parseInt(e.currentTarget.innerText);
    let newInitialCombinedStateGuests: {[key: string]: number} = {};

    // Manually set the "Adults" key to the selected room count
    newInitialCombinedStateGuests["Adults"] = selectedRoomCount;

    // Set all other keys to 0
    const keysToSetToZero = Object.keys(initialCombinedGuestStates).filter(key => key !== "Adults");
    keysToSetToZero.forEach(key => {
        newInitialCombinedStateGuests[key] = 0;
    });

    // Calculate the new total guest count
    const newTotalGuestCount = selectedRoomCount;

    // Dispatch actions to update Redux state
    appDispatch(setInitialRoomCount(selectedRoomCount));
    appDispatch(setTotalGuestCount(newTotalGuestCount));
    appDispatch(setInitialCombinedStateGuests(newInitialCombinedStateGuests));

    // Close the room dropdown and show snackbar
    appDispatch(setRoomsDropDown(false));
    handleSnackBar();
}


  function handleAccessibleCheckbox(e:React.ChangeEvent<HTMLInputElement>){
    if(e.currentTarget.checked===true){
      appDispatch(setAccessibleCheckBox(true));
    }
    else{
      appDispatch(setAccessibleCheckBox(false));
    }
  }

  const guestsRef = useRef<HTMLDivElement | null>(null)

  const roomsRef =  useRef<HTMLDivElement | null>(null)

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        appDispatch(setGuestDropDown(false));
    }
    if (roomsRef.current && !roomsRef.current.contains(event.target as Node)) {
        appDispatch(setRoomsDropDown(false));
    }
};

useEffect(() => {
  document.addEventListener('click', handleClickOutsideDropdown);
  return () => {
      document.removeEventListener('click', handleClickOutsideDropdown);
  };
}, []);

  return (
    <div className="configurable-fields">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Each room should have atleast one adult so adult count adjusted"
        action={action}
      />
      <Snackbar
        open={snackbarOpenMaxPeople}
        autoHideDuration={6000}
        onClose={handleCloseMaxPeople}
        message="Each room should contain only 3 people"
        action={action}
      />
      <div
        className="guests-rooms-container"
        style={{
          width: configDetails.fields.find(
            (field) => field.title === "Guests" && field.active
          )
            ? "100%"
            : "25%",
        }}
      >
        <div
          className="guests-container"
          ref={guestsRef}
          style={{
            display: configDetails.fields.find(
              (field) => field.title === "Guests" && field.active
            )
              ? "block"
              : "none",
            flexGrow: configDetails.fields.find(
              (field) => field.title === "Rooms" && field.active
            )
              ? 0
              : 1,
          }}
        >
          <div className="guests-tag-name">
            <FormattedMessage id="guests" defaultMessage={"Guests"}/>
          </div>
          <button className="guests-dropdown" onClick={guestClickHandler}>
            <div className="guests-placeholder">{allGuests}</div>
            <div className="drop-down-image">
              <img src="dropdown.png" alt="dropdown"></img>
            </div>
          </button>
          <div className="guests-drop-down-menu">
            <div
              className="guest-category-container"
              style={{
                display: guestDropDown === true ? "block" : "none",
              }}
            >
              {configDetails.guests.filter((guest) => guest.active).map(
                (guest) => {
                  

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
                          <div className="category-count-display">{count}</div>
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
                }
              )}
            </div>
          </div>
        </div>
        <div
          className="rooms-container"
          ref={roomsRef}
          style={{
            display: configDetails.fields.find(
              (field) => field.title === "Rooms" && field.active
            )
              ? "block"
              : "none",
            flexGrow: configDetails.fields.find(
              (field) => field.title === "Guests" && field.active
            )
              ? 0
              : 1,
          }}
        >
          <div className="rooms-tag-name">
            <FormattedMessage id="rooms" defaultMessage={"Rooms"}/>
          </div>
          <button
            className="rooms-drop-down"
            onClick={roomDropDownClickHandler}
          >
            <div className="rooms-place-holder">{initialRoomCount}</div>
            <div className="rooms-drop-down-arrow">
              <img src="dropdown.png" alt="dropdown"></img>
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
      </div>

      <div
        className="accessible-container"
        style={{
          display: configDetails.fields.find(
            (field) => field.title === "Accessible" && field.active
          )
            ? "flex"
            : "none",
        }}
      >
        <input type="checkbox" id="accessible-checkbox" onChange={(e)=>handleAccessibleCheckbox(e)}></input>
        <div className="accessible-message">
          <img src="wheelchair.png" alt="wheelchair"></img>
          <div className="message">
            <FormattedMessage id="access" defaultMessage={"I need an Accesible Room"}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigurableFields;
