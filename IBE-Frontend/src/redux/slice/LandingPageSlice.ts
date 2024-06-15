import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getExchangeRates } from "../thunk/getExchangeRates";
import {
  ICombinedStateGuests,
  IExchangeRate,
  ILandingState,
  IPropertiesList,
  IPropertyConfiguration,
  ITenantConfiguration,
} from "../../interfaces/IExchangeRate";
import { getNightlyRates } from "../thunk/getNightlyRates";
import { getTenantConfiguration } from "../thunk/getTenantConfiguration";
import { getTranslations } from "../thunk/getTranslations";
import { translationInterface } from "../../interfaces/ITranslation";
import { getProperties } from "../thunk/getProperties";
import { getPropertyConfiguration } from "../thunk/getPropertyConfiguration";

const initialState: ILandingState = {
  language: "en",
  currency: "USD",
  rate: { USD: 1 },
  state: "pending",
  startDate: null,
  endDate: null,
  startDateString:null,
  endDateString:null,
  isCalendarOpen: false,
  nightlyRates: {},
  totalGuestCount: 1,
  initialCombinedStateGuests: {},
  initialRoomCount: 1,
  initialProperties: [],
  initialTenantConfiguration: {
    tenantId: "",
    tenantLogo: "",
    tenantName: "",
    backgroundImage: "",
    properties: [],
  },
  translations: {},
  tenantConfigurationsLoadingState: true,
  propertiesList: {
    data: {
      listProperties: [],
    },
  },
  initialPropertyConfiguration: {
    fields: [],
    guests: [],
    rooms: 3,
    maxPeoplePerRoom: 3,
    maxLengthOfStay: 14,
    filterTypes: [],
    bedType: [],
    roomType: [],
    price: [],
    roomTypes: {},
  },
  accesibleCheckbox: false,
  propertyDropDown:false,
  showCalendarDropDown:false,
  guestDropDown:false,
  roomsDropDown:false,
  properyID:"15"
};

const landingPageSlice = createSlice({
  name: "landingPage",
  initialState,
  reducers: {
    setLanguageFunction: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setCurrencyFunction: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setStartDate: (state, action: PayloadAction<Date>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<Date>) => {
      state.endDate = action.payload;
    },
    setIsCalendarOpen: (state, action: PayloadAction<boolean>) => {
      state.isCalendarOpen = action.payload;
    },
    setTotalGuestCount: (state, action: PayloadAction<number>) => {
      state.totalGuestCount = action.payload;
    },
    setInitialCombinedStateGuests(
      state,
      action: PayloadAction<ICombinedStateGuests>
    ) {
      state.initialCombinedStateGuests = {
        ...state.initialCombinedStateGuests,
        ...action.payload,
      };
    },
    setInitialRoomCount(state, action: PayloadAction<number>) {
      state.initialRoomCount = action.payload;
    },
    setInitialProperties(state, action: PayloadAction<string[]>) {
      state.initialProperties = action.payload;
    },
    setInitialPropertyConfiguration(
      state,
      action: PayloadAction<IPropertyConfiguration>
    ) {
      console.log(action.payload);
      state.initialPropertyConfiguration = action.payload;
    },
    setAccessibleCheckBox(state, action: PayloadAction<boolean>) {
      state.accesibleCheckbox = action.payload;
    },
    setPropertyDropDown(state,action:PayloadAction<boolean>){
      state.propertyDropDown=action.payload;
    },
    setShowCalendarDropDown(state,action:PayloadAction<boolean>){
      state.showCalendarDropDown=action.payload;
    },
    setGuestDropDown(state,action:PayloadAction<boolean>){
      state.guestDropDown=action.payload;
    },
    setRoomsDropDown(state,action:PayloadAction<boolean>){
      state.roomsDropDown=action.payload;
    },
    setPropertyID(state,action:PayloadAction<string>){
      state.properyID=action.payload;
    },
    setStartDateString(state,action:PayloadAction<string>){
      state.startDateString=action.payload;
    },
    setEndDateString(state,action:PayloadAction<string>){
      state.endDateString=action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getExchangeRates.pending, (state) => {
        state.state = "pending";
      })
      .addCase(
        getExchangeRates.fulfilled,
        (state, action: PayloadAction<IExchangeRate>) => {
          state.state = "fulfilled";
          state.rate = action.payload;
        }
      )
      .addCase(getExchangeRates.rejected, (state) => {
        state.state = "error";
      });

    builder.addCase(
      getNightlyRates.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.nightlyRates = action.payload;
      }
    );

    builder.addCase(
      getTenantConfiguration.fulfilled,
      (state, action: PayloadAction<ITenantConfiguration>) => {
        state.initialTenantConfiguration = action.payload;
        state.tenantConfigurationsLoadingState = false;
      }
    );

    builder.addCase(
      getTranslations.fulfilled,
      (state, action: PayloadAction<translationInterface>) => {
        state.translations = action.payload;
      }
    );

    builder.addCase(
      getProperties.fulfilled,
      (state, action: PayloadAction<IPropertiesList>) => {
        state.propertiesList = action.payload;
      }
    );

    builder.addCase(
      getPropertyConfiguration.fulfilled,
      (state, action: PayloadAction<IPropertyConfiguration>) => {
        state.initialPropertyConfiguration = action.payload;
      }
    );
  },
});

export const {
  setLanguageFunction,
  setCurrencyFunction,
  setStartDate,
  setEndDate,
  setIsCalendarOpen,
  setTotalGuestCount,
  setInitialCombinedStateGuests,
  setInitialRoomCount,
  setInitialProperties,
  setInitialPropertyConfiguration,
  setAccessibleCheckBox,
  setPropertyDropDown,
  setShowCalendarDropDown,
  setGuestDropDown,
  setRoomsDropDown,
  setPropertyID,
  setStartDateString,
  setEndDateString
} = landingPageSlice.actions;
export const landingPageReducer = landingPageSlice.reducer;
