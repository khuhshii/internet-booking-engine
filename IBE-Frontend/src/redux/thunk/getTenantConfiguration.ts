import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITenantConfiguration } from "../../interfaces/IExchangeRate";
import { GLOBAL_CONFIG_API_URL } from "../../constants/routes/routes";


export const getTenantConfiguration = createAsyncThunk(
    "getTenantConfiguration", async ()=>{
        try{
            const response = await fetch(`${GLOBAL_CONFIG_API_URL}/1`);
            const data:ITenantConfiguration = await response.json();
            return data;
            }
            catch{
                throw new Error("Error in fetching the nightly rates");
            }
    }
)