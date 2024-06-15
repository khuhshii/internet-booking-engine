import { createAsyncThunk } from "@reduxjs/toolkit";

export const cancelbookingViaMail = createAsyncThunk(
  "cancelbookingViaMail",
  async ({ bookingId, email,token }: { bookingId: number; email: string, token:string}) => {
    try {
      const response = await fetch(
        // `http://localhost:8080/api/v1/booking/user/cancelation/${bookingId}?email=${email}`,
        // `https://team-15-ibe-web-app.azurewebsites.net/api/v1/booking/user/cancelation/${bookingId}?email=${email}`,
        `https://ibe-team-15-api-management.azure-api.net/api/v1/booking/user/cancelation/${bookingId}?email=${email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "jwttoken":token
          },
        }
      );
      const data = await response.text();
      console.log(data);
      if(data.includes("status") && data.includes("404")){
        throw new Error("Booking cancelation faliled");
      }
      return data;
    } catch {
      throw new Error("Booking cancel failed");
    }
  }
);
