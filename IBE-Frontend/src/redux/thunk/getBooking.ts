import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBooking = createAsyncThunk(
    "getBooking",
    async ({ bookingId }: { bookingId: number }) => {
        try {
            // const response = await fetch(`http://localhost:8080/api/v1/booking/getBooking/${bookingId}`);
            // const response = await fetch(`https://team-15-ibe-web-app.azurewebsites.net/api/v1/CBooking/getBooking/${bookingId}`);
            const response = await fetch(`https://ibe-team-15-api-management.azure-api.net/api/v1/booking/getBooking/${bookingId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch booking data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error; // Rethrow the error so that Redux Toolkit can handle it
        }
    }
);