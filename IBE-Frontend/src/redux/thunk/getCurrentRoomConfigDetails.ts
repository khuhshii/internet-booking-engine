import { createAsyncThunk } from "@reduxjs/toolkit";

import { ROOM_CONFIG_URL } from "../../constants/routes/routes";

export const getCurrentRoomConfigDetails = createAsyncThunk(
  "getCurrentRoomConfigDetails",
  async ({ roomTypeId }: { roomTypeId: string }) => {
    try {
      const response = await fetch(
        `${ROOM_CONFIG_URL}?roomTypeId=${roomTypeId}`
      );

      const data = await response.json();
      console.log(data);
      return data;
    } catch {
      throw new Error("Error in making the api call for getting room configs");
    }
  }
);
