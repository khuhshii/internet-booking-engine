import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IReview {
    rating: number;
    review: string;
}

export interface IReviewList {
    reviews: IReview[];
}

export interface RatingRequest {
    tenantId: string;
    propertyId: string;
    roomTypeId: string;
}

export const getRatingsById = createAsyncThunk(
    "getRatings",
    async (ratingRequest: RatingRequest) => {
        try {
            // const response = await fetch("http://localhost:8080/api/v1/ratingById", {
            const response = await fetch("https://ibe-team-15-api-management.azure-api.net/api/v1/ratingById", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ratingRequest)
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data: IReview[] = await response.json();
            return data;
        } catch (error) {
            throw new Error("Error in fetching the reviews and ratings: " + error);
        }
    }
);
