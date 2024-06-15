import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_RATING_API_URL } from "../../constants/routes/routes";

interface SubmitFeedbackResponse {
  message: string; 
}
export const submitFeedback = createAsyncThunk<
  SubmitFeedbackResponse,
  {
    tenantId: string;
    propertyId: string;
    roomTypeId: string;
    token:string;
    rating: number;
    review: string;
    
  },
  { rejectValue: string }
>(
  "feedback/submit",
  async (
    {
      tenantId,
      propertyId,
      roomTypeId,
      token,
      rating,
      review,
    }: {
      tenantId: string;
      propertyId: string;
      roomTypeId: string;
      token:string;
      rating: number;
      review: string;
    },
    { rejectWithValue }
  ) => {
    try {
        const response = await fetch(ADD_RATING_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenantId,
          propertyId,
          roomTypeId,
          token,
          rating,
          review,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
