import { createAsyncThunk } from "@reduxjs/toolkit";
import { MAIL_URL } from "../../constants/routes/routes";

export const sendEmail = createAsyncThunk(
  "sendEmail",
  async ({ email, data }: { email: string; data: string }) => {
    const requestBody = {
      email,
      data: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Stay Feedback</title>
    <style>
        /* Reset CSS */
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.6;
        }

        /* Container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 5px;
        }

        /* Header */
        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        /* Body */
        .body-content {
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
        }

        /* Footer */
        .footer {
            text-align: center;
            margin-top: 20px;
        }

        /* Button */
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>We'd love to hear about your stay!</h1>
        </div>
        <div class="body-content">
            <img src="https://ibeteam15blobcontainer.blob.core.windows.net/landingimages/hotel1.jpg" alt="kickdrum hotels" width="100%">
            <p>Dear valued guest,</p>
            <p>Thank you for choosing to stay with us at Kickdrum hotels. We hope you had a pleasant experience during your recent visit. Your feedback is important to us and will help us improve our services.</p>
            <p>Please take a moment to share your thoughts by clicking the button below:</p>
            <p><a href="${data}" class="button" style="color: white;">Give Feedback</a></p>
            <p>If you have any further questions or concerns, please don't hesitate to contact us.</p>
            <p>Thank you once again for choosing [Hotel Name]. We look forward to welcoming you back in the future!</p>
            <p>Best regards,<br> The Kickdrum Team</p>
        </div>
        <div class="footer">
            <p>© 2024 Kickdrum Hotels. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`,
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
