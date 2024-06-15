import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getBooking } from "../thunk/getBooking";
import { sendBookingCancellationMail } from "../thunk/sendBookingCancellationMail";
import { cancelBooking } from "../thunk/cancelBooking";
import { cancelbookingViaMail } from "../thunk/cancelBookingViaMail";
import { mailBookingConfirmation } from "../thunk/mailBookingConfirmation";
import { getMybookings } from "../thunk/getMyBookings";


export interface User {
    userId: number;
    emailId: string;
    hasSubscribed: boolean;
    firstName: string;
    lastName: string;
    phone: string;
    tenantId: number;
}

export interface Promotion {
    promotionIdGenerated: number;
    promotionId: number;
    promotionTitle: string;
    priceFactor: string;
    promotionDescription: string;
}

export interface Billing {
    billingId: number;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    zipcode: string;
    state: string;
    country: string;
    phone: string;
    emailId: string;
}

export interface Payment {
    paymentId: number;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
}

export interface Cost {
    costId: number;
    totalCost: number;
    amountDueAtResort: number;
    nightlyRate: number;
    taxes: number;
    vat: number;
}

export interface BookingData {
    bookingId: number;
    startDate: string;
    endDate: string;
    roomCount: number;
    adultCount: number;
    teenCount: number;
    kidCount: number;
    propertyId: number;
    roomType:string,
    user: User;
    promotion: Promotion;
    billing: Billing;
    payment: Payment;
    cost: Cost;
    cancelled: boolean;
}
interface IBookingSliceData{
    bookingData: BookingData | null;
    loading:boolean;
    emailSendingStatus:boolean;
    emailMessage:string,
    cancelBookingStatus:boolean;
    cancelBookingMessage:string;
    snackBarCancelation:boolean;
    mailbookingSnackBar:boolean;
    mailbookingSnackBarMessage:string;
    myBookings:BookingData[]|null;
    purchaseStateSnackBar:boolean;
    login:boolean;
}

const initialState:IBookingSliceData={
    bookingData:null,
    loading:true,
    emailSendingStatus:false,
    emailMessage:"Pending",
    cancelBookingMessage:"pending",
    cancelBookingStatus:false,
    snackBarCancelation:false,
    mailbookingSnackBar:false,
    mailbookingSnackBarMessage:"pending",
    myBookings:null,
    purchaseStateSnackBar:false,
    login:false,
}

const BookingSlice = createSlice({
    name:"BookingSlice",
    initialState,
    reducers:{
        setSnackBarCancelation(state,action:PayloadAction<boolean>){
            state.snackBarCancelation=action.payload;
        },

        setMailBookingSnackbar(state,action:PayloadAction<boolean>){
            state.mailbookingSnackBar=action.payload;
        },
        setPurchaseStateSnackBar(state,action:PayloadAction<boolean>){
            state.purchaseStateSnackBar=action.payload;
        },

        setLoginRedux(state,action:PayloadAction<boolean>){
            state.login=action.payload;
        },

        setMyBookingsToNull(state){
            state.myBookings=[];
        }


    },
    extraReducers:(builder)=>{
        builder.addCase(getBooking.pending,(state)=>{
            state.loading=true;
            
        })

        builder.addCase(getBooking.fulfilled,(state,action)=>{
            state.loading=false;
            state.bookingData = action.payload as BookingData;
            console.log(state.bookingData);
        })

        builder.addCase(getBooking.rejected,(state)=>{
            state.loading=false;
            state.bookingData=null;
        })

        builder.addCase(sendBookingCancellationMail.rejected,(state)=>{
            state.emailSendingStatus=false;
        })

        builder.addCase(sendBookingCancellationMail.fulfilled,(state)=>{
            console.log("successs");
            state.emailSendingStatus=true;
            state.emailMessage="successfull"
        })
        builder.addCase(sendBookingCancellationMail.pending,(state)=>{
            state.emailSendingStatus=false;
            state.emailMessage="pending"
        })

        builder.addCase(cancelBooking.fulfilled,(state)=>{
            state.cancelBookingMessage="success";
            state.cancelBookingStatus=true;
            state.snackBarCancelation=true;
        })

        builder.addCase(cancelBooking.rejected,(state)=>{
            console.log("error otp invalid");
            state.cancelBookingMessage="error";
            state.cancelBookingStatus=false;
            state.snackBarCancelation=true;
        })

        builder.addCase(cancelBooking.pending,(state)=>{
            state.cancelBookingMessage="pending";
            state.cancelBookingStatus=false;
            state.snackBarCancelation=false;
        })

        builder.addCase(cancelbookingViaMail.fulfilled,(state)=>{
            state.cancelBookingMessage="success";
            state.cancelBookingStatus=true;
            state.snackBarCancelation=true;
        })

        builder.addCase(cancelbookingViaMail.rejected,(state)=>{
            state.cancelBookingMessage="error";
            state.cancelBookingStatus=false;
            state.snackBarCancelation=true;
        })

        builder.addCase(cancelbookingViaMail.pending,(state)=>{
            state.cancelBookingMessage="pending";
            state.cancelBookingStatus=false;
            state.snackBarCancelation=false;
        })


        builder.addCase(mailBookingConfirmation.fulfilled,(state)=>{
            state.mailbookingSnackBarMessage="success";
            state.mailbookingSnackBar=true;
        })

        builder.addCase(mailBookingConfirmation.rejected,(state)=>{
            state.mailbookingSnackBarMessage="error";
            state.mailbookingSnackBar=true;
        })

        builder.addCase(mailBookingConfirmation.pending,(state)=>{
            state.mailbookingSnackBarMessage="pending";
            state.mailbookingSnackBar=false;
        })

        builder.addCase(getMybookings.fulfilled,(state,action)=>{
            console.log("my bookings ==========",action.payload);
            state.myBookings=action.payload as BookingData[];
        })
    }

})

export const {setSnackBarCancelation,setMailBookingSnackbar,setPurchaseStateSnackBar,setLoginRedux,setMyBookingsToNull} = BookingSlice.actions;

export const bookingSliceReducer = BookingSlice.reducer;