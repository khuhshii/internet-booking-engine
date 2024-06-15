import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingData } from "../slice/BookingSlice";

export const mailBookingConfirmation = createAsyncThunk(
  "sendMailConfirmation",
  async ({ bookingDetails }: { bookingDetails: BookingData }) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const startDate = new Date(bookingDetails.startDate);
    const dayOfMonth = startDate.getDate();
    const month = months[startDate.getMonth()];
    const year = startDate.getFullYear();
    const endDate = new Date(bookingDetails.endDate);
    const endDayOfMonth = endDate.getDate();
    const endMonth = months[endDate.getMonth()];
    const endYear = endDate.getFullYear();
    const requestBody = {
      email: bookingDetails.user.emailId,
      data: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Confirmation</title>
            </head>
            <body>
            <div class="booking-confirmation-container" style="font-family: 'Poppins', sans-serif; margin: 0; max-width: 425px;">
              <div class="booking-id" style="font-size: 24px; font-weight: 700;">Upcoming reservation #${
                bookingDetails.bookingId
              }</div>
              <div class="room-details" style="width: 100%; margin-top: 20px; border: 1px solid #c1c2c2; border-radius: 5px; padding: 30px 20px;">
                <div class="room-heading-cancel-room">
                  <div class="room-name-guest-details" style="width: 420px; justify-content: space-between; flex-wrap: wrap; align-items: baseline;">
                    <div class="room-name" style="font-size: 24px; font-weight: 700;">Room 1: ${
                      bookingDetails.roomType
                    }</div>
                    <div class="guest-details" style="display: inline;">
                      <div class="guest-image"></div>
                      <div class="guest-names" style="font-size: 14px;"> Adults:${
                        bookingDetails.adultCount
                      }, Child: ${bookingDetails.kidCount}</div>
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
                        <div class="date" style="font-size: 16px; font-weight: 700; color: #2f2f2f;">${
                          dayOfMonth
                        }</div>
                        <div class="month-year" style="font-size: 16px; font-weight: 700; color: #2f2f2f;">${month}&nbsp;${year}</div>
                      </div>
                      <div class="check-in" style="display: inline; text-align: center; height: 70px; align-items: center; padding: 10px; border: 1px solid #858685; margin-right: 10px; border-radius: 5px;">
                        <div class="name" style="font-size: 14px; color: #858685;">Check out</div>
                        <div class="date" style="font-size: 16px; font-weight: 700; color: #2f2f2f;">${endDayOfMonth}</div>
                        <div class="month-year" style="font-size: 16px; font-weight: 700; color: #2f2f2f;">${endMonth}&nbsp;${endYear}</div>
                      </div>
                    </div>
                    <div class="package-amount-details" style="width: 100%;">
                      <div class="package-details" style="font-size: 20px; font-weight: 700;"> $${(
                        (1 - parseFloat(bookingDetails.promotion.priceFactor)) *
                        bookingDetails.cost.totalCost
                      ).toFixed(2)}&nbsp;${
        bookingDetails.promotion.promotionTitle
      }</div>
                      <div class="amount-details" style="margin-top: 5px; font-size: 16px; line-height: 22.4px;">$${
                        bookingDetails.promotion.promotionDescription
                      }</div>
                    </div>
                    <div class="package-final-amount" style="margin-top: 20px; display: flex; align-items: baseline; justify-content: space-between;">
                      <div class="cancelation-policy" style="width: 50%;text-align: left;font-size: 16px;">Copy explaining the cancellation policy, if applicable</div>
                      <div class="final-amount" style="width: 50%;text-align: right;font-size: 20px;">$${
                        bookingDetails.cost.nightlyRate
                      }/Night</div>
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
                      <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">$${
                        bookingDetails.cost.nightlyRate
                      }</div>
                    </div>
                  </div>
                  <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                    <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                      <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Subtotal</div>
                      <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">$${bookingDetails
                        .cost.totalCost -
                        bookingDetails.cost.taxes -
                        bookingDetails.cost.vat}</div>
                    </div>
                  </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                    <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                      <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Taxes, Surcharges, Fees</div>
                      <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">$${
                        bookingDetails.cost.taxes
                      }</div>
                    </div>
                  </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                    <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                      <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">VAT</div>
                      <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">$${
                        bookingDetails.cost.vat
                      }</div>
                    </div>
                  </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                    <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                      <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Total for stay</div>
                      <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">$${
                        bookingDetails.cost.totalCost
                      }</div>
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
                    <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                      bookingDetails.user.firstName
                    }</div>
                  </div>
                </div>
                <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                  <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                    <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Last Name</div>
                    <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                      bookingDetails.user.lastName
                    }</div>
                  </div>
                </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                  <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                    <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Phone</div>
                    <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                      bookingDetails.user.phone
                    }</div>
                  </div>
                </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                  <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                    <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Email</div>
                    <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                      bookingDetails.user.emailId
                    }</div>
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
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.billing.firstName
                  }</div>
                </div>
              </div>
            
            
              
              <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                  <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Last Name</div>
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.billing.lastName
                  }</div>
                </div>
              </div>
              
              <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                  <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Mailing Address 1</div>
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.billing.address1
                  }</div>
                </div>
              </div>
              <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                  <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Mailing Address 1</div>
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.billing.address2
                  }</div>
                </div>
              </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                  <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Country</div>
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.billing.country
                  }</div>
                </div>
              </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                  <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">State</div>
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.billing.emailId
                  }</div>
                </div>
              </div>
              <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                  <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">City</div>
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.billing.city
                  }</div>
                </div>
              </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                  <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Zip</div>
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.billing.zipcode
                  }</div>
                </div>
              </div>
              
              <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                  <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Phone</div>
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.billing.phone
                  }</div>
                </div>
              </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                  <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">Email</div>
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.billing.emailId
                  }</div>
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
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.payment.cardNumber
                  }</div>
                </div>
              </div>
              <div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                  <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">ExpMM</div>
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.payment.expiryMonth
                  }</div>
                </div>
              </div><div class="room-total-summary-details" style="padding-left: 35px; width: 100%; padding-bottom: 5px;">
                <div class="indv-detail" style="display: flex; width: 90%; margin-top: 5px; ">
                  <div class="detail-name" style="color: #5d5d5d; width:50%; font-size: 16px; left:0;">ExpYY</div>
                  <div class="amount" style="font-size: 16px; width:50%;color: #2f2f2f;  text-align: right;">${
                    bookingDetails.payment.expiryYear
                  }</div>
                </div>
              </div>
            </div>
              
            </div>
            </body>
            </html>
            `,
    };

    try {
      // const response = await fetch("http://localhost:8080/api/v1/confirmationEmail", {
      // const response = await fetch(
      //   "https://team-15-ibe-web-app.azurewebsites.net/api/v1/confirmationEmail",
      //   {
      const response = await fetch(
        "https://ibe-team-15-api-management.azure-api.net/api/v1/confirmationEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.text();
      console.log(data);

      if (data.includes("status") && data.includes("400")) {
        throw new Error("Error sending mail");
      }
      return data;
    } catch {
      throw new Error("Error in sending the mail");
    }
  }
);
