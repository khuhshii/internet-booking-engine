import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPropertyConfiguration } from "../../interfaces/IExchangeRate";
import { PROPERTY_CONFIG_API_URL } from "../../constants/routes/routes";

export const getPropertyConfiguration = createAsyncThunk(
    "getPropertyConfigurations", async ()=>{
        try{
            const response = await fetch(PROPERTY_CONFIG_API_URL);
            const data:IPropertyConfiguration = await response.json();
            return data;
            }
            catch{
                throw new Error("Error in fetching the nightly rates");
            }
    }
)