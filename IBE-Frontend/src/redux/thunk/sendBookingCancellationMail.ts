import { createAsyncThunk } from "@reduxjs/toolkit";


export const sendBookingCancellationMail = createAsyncThunk("sendBookingCancellation",async ({bookingId}:{bookingId:number})=>{
    try{
        const response = await fetch(
            // `http://localhost:8080/api/v1/booking/guest/${bookingId}`
            // `https://team-15-ibe-web-app.azurewebsites.net/api/v1/booking/guest/${bookingId}`
            `https://ibe-team-15-api-management.azure-api.net/api/v1/booking/guest/${bookingId}`
            );
            const data = await response.text();
            return data;
    }
    catch{
        throw new Error("There was a problem in sending email");
    }
})