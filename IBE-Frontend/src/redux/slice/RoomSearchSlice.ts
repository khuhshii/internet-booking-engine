import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IRoomSearchSlice {
  initialBedCount: number;
  isCalendarOpen: boolean;
  showIteanary: boolean;
  showItineraryUI: boolean;
  bedTypeFilters: string[];
  roomTypeFilters: string[];
  priceFilters: string[];
  sortType:string;
  guestDropDown:boolean;
  bedDropDown:boolean;
  roomDropDown:boolean;
  activeStepper:number;
  roomTypeID:string;
}

const initialState: IRoomSearchSlice = {
  initialBedCount: 1,
  isCalendarOpen: false,
  showIteanary: false,
  showItineraryUI: false,
  bedTypeFilters: [],
  roomTypeFilters: [],
  priceFilters: [],
  sortType:"none",
  guestDropDown:false,
  bedDropDown:false,
  roomDropDown:false,
  activeStepper:0,
  roomTypeID:"85",
};
const roomSearchSlice = createSlice({
  name: "roomSearchPage",
  initialState: initialState,
  reducers: {
    setInitialBedCount: (state, action: PayloadAction<number>) => {
      state.initialBedCount = action.payload;
    },
    setIscalendarOpen: (state, action: PayloadAction<boolean>) => {
      state.isCalendarOpen = action.payload;
    },
    setShowIteanary: (state, action: PayloadAction<boolean>) => {
      state.showIteanary = action.payload;
    },
    setShowItineraryUI: (state, action: PayloadAction<boolean>) => {
      state.showItineraryUI = action.payload;
    },
    setBedFilter: (state, action: PayloadAction<string>) => {
        if(state.bedTypeFilters.includes(action.payload)){
            state.bedTypeFilters= state.bedTypeFilters.filter((bed)=>bed!==action.payload)
        }
        else{
            state.bedTypeFilters=[...state.bedTypeFilters,action.payload];
        }
        console.log(state.bedTypeFilters);
    },
    setRoomTypeFilter:(state,action:PayloadAction<string>)=>{
         if(state.roomTypeFilters.includes(action.payload)){
            state.roomTypeFilters= state.roomTypeFilters.filter((room)=>room!==action.payload)
        }
        else{
            state.roomTypeFilters=[...state.roomTypeFilters,action.payload];
        }
    },
    setPriceFilters:(state,action:PayloadAction<string>)=>{
         if(state.priceFilters.includes(action.payload)){
            state.priceFilters= []
        }
        else{
            state.priceFilters=[action.payload];
        }
    },
    setSortType:(state,action:PayloadAction<string>)=>{
        state.sortType=action.payload;
        console.log(action.payload);
    },
    setGuestDropDown:(state,action:PayloadAction<boolean>)=>{
      state.guestDropDown=action.payload;
    },
    setBedDropDown:(state,action:PayloadAction<boolean>)=>{
      state.bedDropDown= action.payload;
    },
    setRoomsDropDown:(state,action:PayloadAction<boolean>)=>{
      state.roomDropDown= action.payload;
    },
    setActiveStepper:(state,action:PayloadAction<number>)=>{
      state.activeStepper=action.payload;
    },
    setRoomTypeID:(state,action:PayloadAction<string>)=>{
      state.roomTypeID=action.payload;
    }
  },
});

export const {
  setInitialBedCount,
  setIscalendarOpen,
  setShowIteanary,
  setShowItineraryUI,
  setBedFilter,
  setRoomTypeFilter,
  setPriceFilters,
  setSortType,
  setGuestDropDown,
  setBedDropDown,
  setRoomsDropDown,
  setActiveStepper,
  setRoomTypeID
} = roomSearchSlice.actions;
export const roomSearchReducer = roomSearchSlice.reducer;
