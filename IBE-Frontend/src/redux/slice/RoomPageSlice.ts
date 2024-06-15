import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRoomDetails } from "../../interfaces/IRoomPage";
import { getRoomDetails } from "../thunk/getRoomDetails";
import { getCurrentRoomConfigDetails } from "../thunk/getCurrentRoomConfigDetails";
import { getCurrentRoomPromotionDetails } from "../thunk/getCurrentRoomPromotionDetails";
import { getCustomPromotion } from "../thunk/getCustomPromotion";
import { getBestPromotionDetails } from "../thunk/getBestPromotion";

interface IRoomTypesResponse {
  size: number;
  roomTypesList: IRoomDetails[];
}

interface RoomTypeConfigDetails {
  description: string;
  amenities: string[];
}

export interface RoomPromotionDetails {
  promotion_id: string;
  minimum_days_of_stay: number;
  price_factor: number;
  promotion_description: string;
  promotion_title: string;
  is_deactivated: boolean;
}

interface ICustomPromo {
  promoCode: string;
  minimumDaysOfStay: number;
  priceFactor: number;
  promotionDescription: string;
  promotionTitle: string;
  deactivated: boolean;
}
interface IRoomDetailsList {
  roomList: IRoomTypesResponse;
  filterRoomList: IRoomTypesResponse;
  status: "pending" | "fulfilled" | "error";
  error?: string;
  itemsPerPage: number;
  currentPage: number;
  selectedRoom: IRoomDetails | null;
  isModalOpen: boolean;
  currentRoomDetails: RoomTypeConfigDetails;
  currenRoomPromotionDetails: RoomPromotionDetails[];
  initialCustomPromo: ICustomPromo;
  bestPromotion: RoomPromotionDetails;
  isFeedbackModalOpen: boolean;
  currentRoomSnackBarStatus: string;
  currentSnackBarMessage: string;
  snackBarOpen: boolean;
  roomModalLoadinState: string;
  selectedRoomsComparison:IRoomDetails[];
}

const initialState: IRoomDetailsList = {
  roomList: { size: 0, roomTypesList: [] },
  filterRoomList: { size: 0, roomTypesList: [] },
  status: "pending",
  itemsPerPage: 3,
  currentPage: 1,
  selectedRoom: null,
  isModalOpen: false,
  currentRoomDetails: { description: "", amenities: [] },
  currenRoomPromotionDetails: [],
  initialCustomPromo: {
    promoCode: "",
    minimumDaysOfStay: 0,
    priceFactor: 0,
    promotionDescription: "",
    promotionTitle: "",
    deactivated: false,
  },
  bestPromotion: {
    promotion_id: "",
    minimum_days_of_stay: 0,
    price_factor: 1,
    promotion_description: "",
    promotion_title: "",
    is_deactivated: false,
  },
  isFeedbackModalOpen: false,
  currentRoomSnackBarStatus: "pending",
  currentSnackBarMessage: "",
  snackBarOpen: false,
  roomModalLoadinState: "pending",
  selectedRoomsComparison:[]
};

const roomPageSlice = createSlice({
  name: "roomPageCard",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.roomList = action.payload;
      state.status = "fulfilled";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = "error";
      state.error = action.payload;
    },
    setFilterList: (state, action: PayloadAction<IRoomTypesResponse>) => {
      state.filterRoomList = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setCurrentpage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    openModal: (state, action: PayloadAction<IRoomDetails>) => {
      state.isModalOpen = true;
      state.selectedRoom = action.payload;
    },
    closeModal: (state, action: PayloadAction<boolean>) => {
      // state.isModalOpen = false;
      state.isModalOpen = action.payload;
      console.log("state.isModalOpen", state.isModalOpen);
    },
    openFeedbackModal: (state) => {
      state.isFeedbackModalOpen = true;
    },
    closeFeedbackModal: (state, action: PayloadAction<boolean>) => {
      state.isFeedbackModalOpen = action.payload;

      // state.selectedRoom = null;
    },

    setSnackbarOpen: (state, action: PayloadAction<boolean>) => {
      state.snackBarOpen = action.payload;
    },
    setSelectedRoom: (state, action: PayloadAction<IRoomDetails>) => {
      state.selectedRoom = action.payload;
    },
    addSelectedRoom:(state, action: PayloadAction<IRoomDetails>)=>{
      state.selectedRoomsComparison.push(action.payload)
    },
    removeSelectedRoom(state, action: PayloadAction<IRoomDetails>) {
      const index = state.selectedRoomsComparison.findIndex(room => room.room_type_id === action.payload.room_type_id);
      if (index !== -1) {
        state.selectedRoomsComparison.splice(index, 1);
      }
    },
    clearSelectedRooms(state){
      state.selectedRoomsComparison=[];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoomDetails.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getRoomDetails.fulfilled, (state, action) => {
        state.roomList = action.payload as IRoomTypesResponse;
        state.filterRoomList = action.payload as IRoomTypesResponse;
        console.log(action.payload);
        state.status = "fulfilled";
      })
      .addCase(getRoomDetails.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "error";
      });

    builder.addCase(getCurrentRoomConfigDetails.fulfilled, (state, action) => {
      state.currentRoomDetails = action.payload as RoomTypeConfigDetails;
      state.roomModalLoadinState = "fulfilled";
    });
    builder.addCase(getCurrentRoomConfigDetails.pending, (state) => {
      state.roomModalLoadinState = "pending";
    });

    builder.addCase(
      getCurrentRoomPromotionDetails.fulfilled,
      (state, action) => {
        state.currenRoomPromotionDetails =
          action.payload as RoomPromotionDetails[];
      }
    );

    builder.addCase(getBestPromotionDetails.fulfilled, (state, action) => {
      state.bestPromotion = action.payload as RoomPromotionDetails;
      console.log(action.payload);
    });

    builder.addCase(getCustomPromotion.fulfilled, (state, action) => {
      state.initialCustomPromo = action.payload as ICustomPromo;

      const existingPromotion = state.currenRoomPromotionDetails.find(
        (promo) =>
          promo.promotion_title === state.initialCustomPromo.promotionTitle
      );

      if (!existingPromotion) {
        state.currenRoomPromotionDetails = [
          ...state.currenRoomPromotionDetails,
          {
            promotion_id: (
              state.currenRoomPromotionDetails.length + 2
            ).toString(),
            minimum_days_of_stay: state.initialCustomPromo.minimumDaysOfStay,
            price_factor: state.initialCustomPromo.priceFactor,
            promotion_description:
              state.initialCustomPromo.promotionDescription,
            promotion_title: state.initialCustomPromo.promotionTitle,
            is_deactivated: state.initialCustomPromo.deactivated,
          },
        ];

        state.currentRoomSnackBarStatus = "success";
        state.currentSnackBarMessage = "Promo added succesfully";
      } else {
        state.currentRoomSnackBarStatus = "success";
        state.currentSnackBarMessage = "Promo already exists";
      }

      state.snackBarOpen = true;
    });

    builder.addCase(getCustomPromotion.rejected, (state) => {
      state.currentRoomSnackBarStatus = "error";
      state.currentSnackBarMessage = "Invalid promo code";
      state.snackBarOpen = true;
    });
  },
});

export const {
  setData,
  setError,
  setFilterList,
  setItemsPerPage,
  setCurrentpage,
  openModal,
  closeModal,
  openFeedbackModal,
  closeFeedbackModal,
  setSnackbarOpen,
  setSelectedRoom,
  addSelectedRoom,
  removeSelectedRoom,
  clearSelectedRooms
} = roomPageSlice.actions;
export const roomPageReducer = roomPageSlice.reducer;
