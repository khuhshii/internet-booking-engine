import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchRatesPerDay = createAsyncThunk(
  'api/fetchRatesPerDay',
  async ({ roomTypeId, startDate, endDate }: { roomTypeId: string; startDate: string; endDate: string }) => {
    // const response = await fetch('http://localhost:8080/api/v1/ratesPerDay', {
    // const response = await fetch('https://team-15-ibe-web-app.azurewebsites.net/api/v1/ratesPerDay', {
    const response = await fetch('https://ibe-team-15-api-management.azure-api.net/api/v1/ratesPerDay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomTypeId, startDate, endDate }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch rates per day');
    }
    console.log(response);
    
    return response.json();
  }
);
