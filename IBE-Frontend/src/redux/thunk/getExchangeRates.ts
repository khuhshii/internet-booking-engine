import { createAsyncThunk } from "@reduxjs/toolkit";
import { FREE_CURRENCY_API_URL } from "../../constants/routes/routes";

export const getExchangeRates = createAsyncThunk(
    "getExchangeRates",async ()=>{
        try{
            const response = await fetch(FREE_CURRENCY_API_URL);
            const data = await response.json();
            return data.data;
        }
        catch{
            throw new Error("Error in making the api call for currency conversion");
        }
    }
)