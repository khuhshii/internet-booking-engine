import { createAsyncThunk } from "@reduxjs/toolkit";
import { MAIL_URL } from "../../constants/routes/routes";
import details from "./details.json";

export const sendEmailBooking = createAsyncThunk(
  "sendEmail",
  async () => {
    const { room, guest, billing, payment } = details;
console.log(guest.email);

    const requestBody = {
      email: guest.email,
      data:  
      `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      </head>
      <body>
      <div class="booking-confirmation-container" style="font-family: 'Poppins', sans-serif; margin: 0; max-width: 425px;">
        <div class="booking-id" style="font-size: 24px; font-weight: 700;">Upcoming reservation #XXXXXXXXX</div>
        <div class="room-details" style="width: 100%; margin-top: 20px; border: 1px solid #c1c2c2; border-radius: 5px; padding: 30px 20px;">
          <div class="room-heading-cancel-room">
            <div class="room-name-guest-details" style="width: 420px; justify-content: space-between; flex-wrap: wrap; align-items: baseline;">
              <div class="room-name" style="font-size: 24px; font-weight: 700;">Room 1: ${room.name}</div>
              <div class="guest-details" style="display: inline;">
                <div class="guest-image"></div>
                <div class="guest-names" style="font-size: 14px;">${room.guests}</div>
              </div>
            </div>
          </div>
          <div class="room-image-booking-information" style="margin-top: 15px; padding-bottom: 40px; border-bottom: 1px solid #c1c2c2; flex-wrap: wrap;">
            <div class="room-image" style="width: 100%;">
              <img src="https://ibeteam15blobcontainer.blob.core.windows.net/landingimages/hotel1.jpg" alt="booking-img" style="width: 100%;">
            </div>
            <div class="booking-information" style="width: 100%;">
              <div class="check-in-check-out" style="display: flex;">
                <div class="check-in" style="display: inline; text-align: center; height: 70px; align-items: center; padding: 10px; border: 1px solid #858685; margin-right: 10px; border-radius: 5px;">
                  <div class="name" style="font-size: 14px; color: #858685;">Check in</div>
                  <div class="date" style="font-size: 16px; font-weight: 700; color: #2f2f2f;">9</div>
                  <div class="month-year" style="font-size: 16px; font-weight: 700; color: #2f2f2f;">May 2024</div>
                </div>
                <div class="check-in" style="display: inline; text-align: center; height: 70px; align-items: center; padding: 10px; border: 1px solid #858685; margin-right: 10px; border-radius: 5px;">
                  <div class="name" style="font-size: 14px; color: #858685;">Check out</div>
                  <div class="date" style="font-size: 16px; font-weight: 700; color: #2f2f2f;">16</div>
                  <div class="month-year" style="font-size: 16px; font-weight: 700; color: #2f2f2f;">May 2024</div>
                </div>
              </div>
              <div class="package-amount-details" style="width: 100%;">
                <div class="package-details" style="font-size: 20px; font-weight: 700;">$${room.packageDetails}</div>
                <div class="amount-details" style="margin-top: 5px; font-size: 16px; line-height: 22.4px;">${room.amountDetails}</div>
              </div>
              <div class="package-final-amount" style="margin-top: 20px; display: flex; align-items: baseline; justify-content: space-between;">
                <div class="cancelation-policy" style="width: 50%;text-align: left;font-size: 16px;">Copy explaining the cancellation policy, if applicable</div>
                <div class="final-amount" style="width: 50%;text-align: right;font-size: 20px;">${room.finalAmount}Night</div>
              </div>
            </div>
          </div>
          <div class="room-total-summary" style="margin-top: 10px;border-bottom: 1px solid #c1c2c2;">
            <div class="room-details-drop-down" style="display: flex; align-items: center;">
              <div class="drop-down-image" style="margin-right: 10px;"></div>
              <div class="room-heading" style="font-size: 16px; font-weight: 700;">Room total summary</div>
            </div>
      
            <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
              <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Nightly rate</div>
                <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">$XXX.xx</div>
              </div>
            </div>
            <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
              <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Subtotal</div>
                <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">$XXX.xx</div>
              </div>
            </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
              <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Taxes, Surcharges, Fees</div>
                <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">$XXX.xx</div>
              </div>
            </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
              <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">VAT</div>
                <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">$XXX.xx</div>
              </div>
            </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
              <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Total for stay</div>
                <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">$XXX.xx</div>
              </div>
            </div>
      
          
        </div>
      
        <div class="room-total-summary" style="margin-top: 10px;border-bottom: 1px solid #c1c2c2;">
          <div class="room-details-drop-down" style="display: flex; align-items: center;">
            <div class="drop-down-image" style="margin-right: 10px;"></div>
            <div class="room-heading" style="font-size: 16px; font-weight: 700;">Guest Information</div>
          </div>
      
          <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
            <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
              <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">First Name</div>
              <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${guest.firstName}</div>
            </div>
          </div>
          <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
            <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
              <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Last Name</div>
              <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${guest.lastName}</div>
            </div>
          </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
            <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
              <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Phone</div>
              <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${guest.phone}</div>
            </div>
          </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
            <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
              <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Email</div>
              <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${guest.email}</div>
            </div>
          </div>
      
        
      </div>
      <div class="room-total-summary" style="margin-top: 10px;border-bottom: 1px solid #c1c2c2;">
        <div class="room-details-drop-down" style="display: flex; align-items: center;">
          <div class="drop-down-image" style="margin-right: 10px;"></div>
          <div class="room-heading" style="font-size: 16px; font-weight: 700;">Billing Address</div>
        </div>
      
        <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">First Name</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${billing.firstName}</div>
          </div>
        </div>
      
      
        
        <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Last Name</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">Last Name</div>
          </div>
        </div>
        
        <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Mailing Address 1</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">xyz</div>
          </div>
        </div>
        <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Mailing Address 1</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">abc</div>
          </div>
        </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Country</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">1234567891</div>
          </div>
        </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">State</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">demo@gmail.com</div>
          </div>
        </div>
        <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">City</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">Bangalore</div>
          </div>
        </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Zip</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">560060</div>
          </div>
        </div>
        
        <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Phone</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">1234567891</div>
          </div>
        </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Email</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">demo@gmail.com</div>
          </div>
        </div>
      
      
      </div><div class="room-total-summary" style="margin-top: 10px;border-bottom: 1px solid #c1c2c2;">
        <div class="room-details-drop-down" style="display: flex; align-items: center;">
          <div class="drop-down-image" style="margin-right: 10px;"></div>
          <div class="room-heading" style="font-size: 16px; font-weight: 700;">Payment Information</div>
        </div>
      
        <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Card Number</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">1234567654321</div>
          </div>
        </div>
        <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">ExpMM</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">$XXX.xx</div>
          </div>
        </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">ExpYY</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">$XXX.xx</div>
          </div>
        </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
          <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
            <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">CVV code</div>
            <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${payment.cardNumber}</div>
          </div>
        </div>
      
      
      </div>
        
      </div>
      </body>
      </html>
      `,
    };

    try {
      const response = await fetch(MAIL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch {
      throw new Error("Error in sending the mail");
    }
  }
);
