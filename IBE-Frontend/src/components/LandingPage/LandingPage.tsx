import { FormattedMessage, IntlProvider } from "react-intl";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/LandingPage.style.scss";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

// import translations from "../../translations/Translation";
import PropertContainer from "./PropertContainer";
import SelectDatesContainer from "./SelectDatesContainer";
import ConfigurableFields from "./ConfigurableFields";
import { CSSProperties, useEffect } from "react";
import { getTenantConfiguration } from "../../redux/thunk/getTenantConfiguration";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { setPropertyID } from "../../redux/slice/LandingPageSlice";
import { setCheckInDate, setCheckOutDate, setGuestCount, setNumberOfRooms, setPropertyName } from "../../redux/slice/ItineararySlice";
import { setShowIteanary } from "../../redux/slice/RoomSearchSlice";

export interface QueryParams {
  startDate: string;
  endDate: string;
  propertyName: string;
  roomCount: number;
  accessible: boolean;
  [key: string]: Date | string | number | boolean | null; // Index signature
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  border: "5px solid white",
  marginTop: "200px",
};

export function LandingPage() {
  const translations = useSelector(
    (store: RootState) => store.landing.translations
  );
  const language = useSelector((store: RootState) => store.landing.language);
  const appDispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    appDispatch(getTenantConfiguration());
    appDispatch(setShowIteanary(false));
  }, []);
  const tenantConfig = useSelector(
    (store: RootState) => store.landing.initialTenantConfiguration
  );
  const configurationsLoadingState = useSelector(
    (store: RootState) => store.landing.tenantConfigurationsLoadingState
  );
  const startDateStore = useSelector(
    (store: RootState) => store.landing.startDate
  );
  const endDateStore = useSelector((store: RootState) => store.landing.endDate);
  const initialProperties = useSelector(
    (state: RootState) => state.landing.initialProperties
  );

  const roomCount = useSelector(
    (store: RootState) => store.landing.initialRoomCount
  );

  const initialCombinedGuestStates = useSelector(
    (store: RootState) => store.landing.initialCombinedStateGuests
  );
  const handleaccesible = useSelector(
    (store: RootState) => store.landing.accesibleCheckbox
  );
  const navigator = useNavigate();

  const allProperties = useSelector(
    (store: RootState) => store.landing.propertiesList
  );

  useEffect(() => {
    if (allProperties !== null) {
      const property = allProperties.data.listProperties.filter(
        (property) => property.property_name === initialProperties[0]
      );

      if (property[0]) {
        console.log(property[0].property_id);
        appDispatch(setPropertyID(property[0].property_id.toString()));
      }
    }
  }, [allProperties, initialProperties]);

  const startDateString = useSelector((store:RootState)=>store.landing.startDateString);
  const endDateString = useSelector((store:RootState)=>store.landing.endDateString);

  function handleSearchButton() {
    console.log(initialProperties[0]);
    const selectedPropertyId = initialProperties[0].substring(5, 8);
    console.log(selectedPropertyId);

    const queryParamsObject: QueryParams = {
      startDate: startDateString
        ? startDateString
        : "",
      endDate: endDateString
        ? endDateString
        : "",
      propertyName: initialProperties[0],
      roomCount: roomCount,
      accessible: handleaccesible,
      bedCount:1,
      ...initialCombinedGuestStates,
    };

    const queryString = Object.keys(queryParamsObject)
      .map((key) => key + "=" + queryParamsObject[key])
      .join("&");

    localStorage.setItem("prevPath", queryString);
    navigator(`/rooms?${queryString}`, {
      state: {
        propertyName: initialProperties[0],
        startDate: startDateString,
        endDate: endDateString,
      },
    });
    appDispatch(setCheckInDate(startDateString as string))
    appDispatch(setCheckOutDate(endDateString as string))
    appDispatch(setNumberOfRooms(roomCount))
    appDispatch(setGuestCount(initialCombinedGuestStates))
  }
  //------------------------------------
  
    // localStorage.setItem("selectedPropertyName", JSON.stringify(initialProperties[0]));
    // localStorage.setItem("checkInDate", JSON.stringify(startDateStore));
    // localStorage.setItem("checkOutDate", JSON.stringify(endDateStore));
  
    appDispatch(setPropertyName(initialProperties[0]));
    
    // appDispatch(setCheckInDate(startDateString as string))
    
    // appDispatch(setCheckOutDate(endDateString as string))

  //------------------------------------
  return (
    <IntlProvider locale={language} messages={translations[language]}>
      <div
        className="clipLoader"
        style={{ display: configurationsLoadingState ? "block" : "none" }}
      >
        <ClipLoader
          color={"#120639"}
          loading={configurationsLoadingState}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <div
        className="main-app-landing-page"
        style={{ display: configurationsLoadingState ? "none" : "block" }}
      >
        <div
          className="landing-page"
          style={{ backgroundImage: `url("${tenantConfig.backgroundImage}")` }}
        >
          <div className="search-form-container">
            <div className="search-form">
              <div className="search-details">
                <PropertContainer />
                <SelectDatesContainer />
                <ConfigurableFields />
              </div>
              <button
                id="search-button"
                disabled={
                  initialProperties.length === 0 ||
                  startDateStore === null ||
                  endDateStore === null
                    ? true
                    : false
                }
                style={{
                  backgroundColor:
                    initialProperties.length === 0 ||
                    startDateStore === null ||
                    endDateStore === null
                      ? "gray"
                      : "#26266D",
                }}
                onClick={handleSearchButton}
              >
                <FormattedMessage id="search" defaultMessage={"Search"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
}
