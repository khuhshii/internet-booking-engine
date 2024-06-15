import { createAsyncThunk } from "@reduxjs/toolkit";
import { NIGHTLY_RATES_API_URL } from "../../constants/routes/routes";

export const getNightlyRates = createAsyncThunk("getNightlyRates", async () => {
  try {
    const response = await fetch(NIGHTLY_RATES_API_URL);
    const data = await response.json();
    return data;
  } catch {
    throw new Error("Error in fetching the nightly rates");
  }
});
