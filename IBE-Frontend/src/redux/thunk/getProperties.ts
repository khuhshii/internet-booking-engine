import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPropertiesList } from "../../interfaces/IExchangeRate";
import { PROPERTY_LIST_API_URL } from "../../constants/routes/routes";

export const getProperties  = createAsyncThunk(
    "getProperties", async ()=>{
        try{
            const response = await fetch(PROPERTY_LIST_API_URL);
            const data:IPropertiesList = await response.json();
            return data;
            }
            catch{
                throw new Error("Error in fetching the nightly rates");
            }
    }
)
