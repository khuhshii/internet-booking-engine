import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPromotion } from "../../interfaces/IRoomPage";
import { ICombinedStateGuests } from "../../interfaces/IExchangeRate";
import { fetchRatesPerDay } from "../thunk/getDailyRates";

interface RatesPerDay {
  [date: string]: number;
}

export interface SampleRequestData {
  roomTypeId: string;
  startDate: string;
  endDate: string;
}

interface ItineraryState {
  roomId:string;
  propertyName: string;
  checkInDate: string;
  checkOutDate: string;
  adultCount: number;
  childCount: number;
  minRate: number;
  numberOfRooms: number;
  subtotal: number;
  taxes: number;
  vat: number;
  dueNow: number;
  dueAtResort: number;
  selectedPromo: IPromotion;
  promoModal: boolean;
  priceModal: boolean;
  termModal: boolean;
  cancelModal: boolean;
  combinedGuest: ICombinedStateGuests;
  status: "pending" | "fulfilled" | "error";
  ratesPerDay: RatesPerDay | null;
  loading: boolean;
  error: string | null;
  totalPrice: number;
  nightlyRate:number;
}

const initialState: ItineraryState = {
  roomId:"",
  propertyName: "Team 15 Hotel",
  checkInDate: "2024-04-01",
  checkOutDate: "2024-04-02",
  adultCount: 0,
  childCount: 0,
  minRate: 0,
  numberOfRooms: 0,
  subtotal: 0,
  taxes: 0,
  vat: 0,
  dueNow: 0,
  dueAtResort: 0,
  selectedPromo: {
    promotion_id: 0,
    promotion_title: "",
    promotion_description: "",
    minimum_days_of_stay: 0,
    is_deactivated: false,
    price_factor: 0,
  },
  promoModal: false,
  cancelModal: false,
  priceModal: false,
  termModal: false,
  combinedGuest: {},
  status: "pending",
  ratesPerDay: null,
  loading: false,
  error: null,
  totalPrice: 0,
  nightlyRate:0
};

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    setPropertyName(state, action: PayloadAction<string>) {
      state.propertyName = action.payload;
    },
    setCheckInDate(state, action: PayloadAction<string>) {
      state.checkInDate = action.payload;
    },
    setCheckOutDate(state, action: PayloadAction<string>) {
      state.checkOutDate = action.payload;
    },
    setGuestCount(state, action: PayloadAction<ICombinedStateGuests>) {
      state.combinedGuest = action.payload;
    },
    setMinRate(state, action: PayloadAction<number>) {
      state.minRate = action.payload;
    },
    setNumberOfRooms(state, action: PayloadAction<number>) {
      state.numberOfRooms = action.payload;
    },
    setSubtotal(state, action: PayloadAction<number>) {
      state.subtotal = action.payload;
    },
    setTaxes(state, action: PayloadAction<number>) {
      state.taxes = action.payload;
    },
    setVat(state, action: PayloadAction<number>) {
      state.vat = action.payload;
    },
    setDueNow(state, action: PayloadAction<number>) {
      state.dueNow = action.payload;
    },
    setDueAtResort(state, action: PayloadAction<number>) {
      state.dueAtResort = action.payload;
    },
    setPromotion(state, action) {
      state.selectedPromo = action.payload as IPromotion;
    },
    setPromoModal(state, action: PayloadAction<boolean>) {
      state.promoModal = action.payload;
    },
    setPriceModal(state, action: PayloadAction<boolean>) {
      state.priceModal = action.payload;
    },
    setTermModal(state, action: PayloadAction<boolean>) {
      state.termModal = action.payload;
    },
    setCancelModal(state, action: PayloadAction<boolean>) {
      state.cancelModal = action.payload;
    },
    setTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload;
    },
    setNightlyRate(state, action: PayloadAction<number>) {
      state.nightlyRate = action.payload;
    },
    setRoomTypeId(state, action: PayloadAction<string>) {
      state.roomId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatesPerDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRatesPerDay.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ratesPerDay = action.payload;
      })
      .addCase(fetchRatesPerDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch rates per day";
      });
  },
});

export const {
  setPropertyName,
  setCheckInDate,
  setCheckOutDate,
  setGuestCount,
  setMinRate,
  setNumberOfRooms,
  setSubtotal,
  setTaxes,
  setVat,
  setDueNow,
  setDueAtResort,
  setPromotion,
  setPromoModal,
  setPriceModal,
  setTotalPrice,
  setTermModal,
  setCancelModal,
  setNightlyRate,
  setRoomTypeId
} = itinerarySlice.actions;

export const itineraryReducer = itinerarySlice.reducer;
