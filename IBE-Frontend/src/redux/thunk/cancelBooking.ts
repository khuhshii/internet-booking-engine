import { createAsyncThunk } from "@reduxjs/toolkit";

export const cancelBooking = createAsyncThunk(
  "canclebooking",
  async ({ bookingId, otp }: { bookingId: number; otp: string }) => {
    try {
      const response = await fetch(
        // `http://localhost:8080/api/v1/booking/guest/cancelation/${bookingId}?otp=${otp}`,
        // `https://team-15-ibe-web-app.azurewebsites.net/api/v1/booking/guest/cancelation/${bookingId}?otp=${otp}`,
        `https://ibe-team-15-api-management.azure-api.net/api/v1/booking/guest/cancelation/${bookingId}?otp=${otp}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
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
