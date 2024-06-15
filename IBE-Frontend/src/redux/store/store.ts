import { configureStore } from "@reduxjs/toolkit";
import { landingPageReducer } from "../slice/LandingPageSlice";
import { roomSearchReducer } from "../slice/RoomSearchSlice";
import { roomPageReducer } from "../slice/RoomPageSlice";
import { itineraryReducer } from "../slice/ItineararySlice";
import { bookingSliceReducer } from "../slice/BookingSlice";
import { roomRatingReducers } from "../slice/RoomRatings";





export const store=configureStore({
    reducer:{
        landing:landingPageReducer,
        roomSearch:roomSearchReducer,
        roomPage:roomPageReducer,
        itinerary: itineraryReducer,
        booking:bookingSliceReducer,
        roomRatings:roomRatingReducers,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;