import React, { useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  setGuestDropDown,
  setInitialProperties,
  setInitialPropertyConfiguration,
  setInitialRoomCount,
  setIsCalendarOpen,
  setPropertyDropDown,
  setRoomsDropDown,
  setShowCalendarDropDown,
} from "../../redux/slice/LandingPageSlice";

function PropertContainer() {

  const propertyDropdown = useSelector((store:RootState)=>store.landing.propertyDropDown);
  const initialProperties = useSelector(
    (state: RootState) => state.landing.initialProperties
  );
  const appDispatch = useDispatch<AppDispatch>();
  const configDetails = useSelector(
    (state: RootState) => state.landing.initialTenantConfiguration
  );
  const propertiesList = useSelector(
    (state: RootState) => state.landing.propertiesList
  );

  const propertyRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    if (propertyRef.current && !propertyRef.current.contains(event.target as Node)) {
        appDispatch(setPropertyDropDown(false));
    }
};

useEffect(() => {
  document.addEventListener('click', handleClickOutsideDropdown);
  return () => {
      document.removeEventListener('click', handleClickOutsideDropdown);
  };
}, []);

  useEffect(() => {}, [initialProperties]);
  function propertyDropDownHandler() {
    appDispatch(setPropertyDropDown(!propertyDropdown));
    appDispatch(setShowCalendarDropDown(false));
    appDispatch(setIsCalendarOpen(false))
    appDispatch(setGuestDropDown(false));
    appDispatch(setRoomsDropDown(false));
  }
  function addPropertyHandler(e: React.ChangeEvent<HTMLInputElement>) {
    appDispatch(setPropertyDropDown(false))
    appDispatch(setInitialRoomCount(1));
    if (e.currentTarget.checked) {
      fetch(
        // `https://team-15-ibe-web-app.azurewebsites.net/api/v1/propertyConfig/1?propertyName=${e.currentTarget.name}`
        `https://ibe-team-15-api-management.azure-api.net/api/v1/propertyConfig/1?propertyName=${e.currentTarget.name}`
        // `http://localhost:8080/api/v1/propertyConfig/1?propertyName=${e.currentTarget.name}`
      )
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          console.log(res);
          appDispatch(setInitialPropertyConfiguration(res));
        });
      if (!initialProperties.includes(e.currentTarget.name)) {
        appDispatch(
          setInitialProperties(
            // [...initialProperties, e.currentTarget.name])
            [e.currentTarget.name]
        ))
      }
    } else {
      appDispatch(
        setInitialProperties(
          []
        )
      );
    }
  }

  function addPropertyHandlerOnClick(propertyName:string){
    appDispatch(setPropertyDropDown(false))
    appDispatch(setInitialRoomCount(1));
    if (!initialProperties.includes(propertyName)) {
      fetch(
        // `https://team-15-ibe-web-app.azurewebsites.net/api/v1/propertyConfig/1?propertyName=${propertyName}`
        `https://ibe-team-15-api-management.azure-api.net/api/v1/propertyConfig/1?propertyName=${propertyName}`
        // `http://localhost:8080/api/v1/propertyConfig/1?propertyName=${e.currentTarget.name}`
      )
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          appDispatch(setInitialPropertyConfiguration(res));
        });
      if (!initialProperties.includes(propertyName)) {
        appDispatch(
          setInitialProperties(
            // [...initialProperties, e.currentTarget.name])
            [propertyName]
        ))
      }
    } else {
      appDispatch(
        setInitialProperties(
          // initialProperties.filter(
          //   (property) => property !== e.currentTarget.name
          // )
          []
        )
      );
    }
  }
  return (
    <div className="property-container" ref={propertyRef}>
      <div className="property-tag-name">
        <FormattedMessage id="propertyName" defaultMessage={"Property name*"} />
      </div>
      <button
        className="properties-select-dropdown"
        onClick={propertyDropDownHandler}
      >
        <div
          className="select-placeholder"
          style={{
            color: initialProperties.length === 0 ? "#c1c2c2" : "black",
          }}
        >
          {initialProperties.length === 0 ? (
            <i>
              <FormattedMessage
                id="allProperties"
                defaultMessage={"Search all properties"}
              />
            </i>
          ) : (
            initialProperties.toString()
          )}
        </div>
        <div className="dropdown-image">
          <img src="dropdown.png" alt="dropdown"></img>
        </div>
      </button>

      <div
        className="properties-dropdown"
        style={{
          display: propertyDropdown === true ? "block" : "none",
        }}
      >
        {/* configDetails.properties.map((property) */}
        {propertiesList.data.listProperties.map((property) => {
          return configDetails.properties.includes(property.property_name) ? (
            <div key={property.property_id} className="property-item">
              <input
                type="checkbox"
                className="property-check-box"
                name={property.property_name}
                // disabled={((initialProperties.length==1 && initialProperties.includes(property.property_name)) || initialProperties.length==0)?false:true }
                checked={initialProperties.includes(property.property_name)?true:false}
                onChange={(e) => addPropertyHandler(e)}
              />
              <div className="property-item-name" onClick={()=>(addPropertyHandlerOnClick(property.property_name))}>{property.property_name}</div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default PropertContainer;
