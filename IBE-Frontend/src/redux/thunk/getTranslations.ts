import { createAsyncThunk } from "@reduxjs/toolkit";
import { TRANSLATIONS_API_URL } from "../../constants/routes/routes";

export const getTranslations = createAsyncThunk("getTranslations", async () => {
  try {
    return fetch(TRANSLATIONS_API_URL)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res;
      });

  } catch {
    throw new Error("Error in fetching the Translations");
  }
});
