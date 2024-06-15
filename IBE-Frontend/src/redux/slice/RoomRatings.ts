import { createSlice } from "@reduxjs/toolkit";
import { IReview, getRatingsById } from "../thunk/getRatingsById";

interface IRoomRatingsInitialState{
    currentReviews:IReview[]
}

const initialState:IRoomRatingsInitialState={
    currentReviews:[],
}

const RoomRatings = createSlice({
    name:"Room Ratings",
    initialState:initialState,
    reducers:{

    },

    extraReducers:(builder)=>{
        builder.addCase(getRatingsById.fulfilled,(state,action)=>{
            state.currentReviews=action.payload;
            console.log(action.payload);
        })
    }
})


export const roomRatingReducers = RoomRatings.reducer;