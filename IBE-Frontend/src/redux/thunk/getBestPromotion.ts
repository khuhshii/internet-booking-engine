import { createAsyncThunk } from "@reduxjs/toolkit";
import { BEST_PROMOTION_URL } from "../../constants/routes/routes";

export const getBestPromotionDetails = createAsyncThunk(
    "getBestPromotionDetails",
    async ({
      propertyId,
      roomTypeId,
      checkInDate,
      checkOutDate,
      seniorCitizen
    }: {
      propertyId: number;
      roomTypeId: number;
      checkInDate: string;
      checkOutDate: string;
      seniorCitizen: number;
    }) => {
      const requestBody = {
        propertyId,
        roomTypeId,
        checkInDate,
        checkOutDate,
        seniorCitizen
      };
  
      try {
        const response = await fetch(
          BEST_PROMOTION_URL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
        const data = await response.json();
        console.log(data);
        return data;
      } catch {
        throw new Error("Error in making the api call for best promotion details");
      }
    }
  );
  