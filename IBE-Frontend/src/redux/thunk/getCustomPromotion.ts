import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_PROMO_BY_PROMO_CODE_URL } from "../../constants/routes/routes";


export const getCustomPromotion=createAsyncThunk(
    "getCustomPromotion",async ({promoCode,roomTypeId}:{promoCode:string,roomTypeId:string})=>{
        try{
            const response = await fetch(GET_PROMO_BY_PROMO_CODE_URL(promoCode,roomTypeId));
            const data = await response.json();
            console.log(data);
            if(data.status === 400){
                console.log("No such promo");
                throw new Error("No such Promo")
            }
            return data;
        }
        catch{
            throw new Error("Error in making the api call for Promotion");
        }
    }
)