import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRoomDetails = createAsyncThunk(
  "getRoomDetails",
  async ({
    propertyId,
    checkInDate,
    checkOutDate,
    minRate,
    maxRate,
    bedType,
    roomType,
    roomCount,
    guestCount,
    currentPage,
    priceType,
    bedCount
  }: {
    propertyId: number;
    checkInDate: string;
    checkOutDate: string;
    minRate: number;
    maxRate: number;
    bedType: string[];
    roomType: string[];
    roomCount: number;
    guestCount: number;
    currentPage: number;
    priceType: string;
    bedCount:number;
  }) => {
    try {
      const requestBody = {
        propertyId,
        checkInDate,
        checkOutDate,
        minRate,
        maxRate,
        bedType,
        roomType,
        roomCount,
        guestCount,
        priceType,
        bedCount,
      };

      // const response = await fetch(`https://team-15-ibe-web-app.azurewebsites.net/api/v1/roomDetailsPag?pageSize=3&page=${currentPage}`, {
      const response = await fetch(
        // `http://localhost:8080/api/v1/roomDetailsPag?pageSize=3&page=${currentPage}`,
        // `https://team-15-ibe-web-app.azurewebsites.net/api/v1/roomDetailsPag?pageSize=3&page=${currentPage}`,
        `https://ibe-team-15-api-management.azure-api.net/api/v1/roomDetailsPag?pageSize=3&page=${currentPage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch room details");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(
        `Error fetching room details: Failed to get details of room types`
      );
    }
  }
);
