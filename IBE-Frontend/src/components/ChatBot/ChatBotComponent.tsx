import ChatBot from "react-simple-chatbot";
import './ChatBot.style.scss'
import Review from "./Review";
import CancellationMessage from "./CancellationMessage";
import BookingMessage from "./BookingMessage";
import HelplineMessages from "./HelplineMessages";


function ChatBotComponent() {


  return (
    
    <div className="chatbot-container">
      <ChatBot
        steps={[
          {
            id: "0",
            message: "Hello! How can I assist you today?",
            trigger: "options",
          },
          {
            id: "options",
            options: [
              { value: "select_room", label: "Select a suitable room", trigger: "1" },
              { value: "cancellation", label: "Cancellation", trigger: "cancellation_message" },
              { value: "booking", label: "Booking", trigger: "booking_message" },
              { value: "helpline", label: "Helpline number", trigger: "helpline_message" },
            ],
          },
          {
            id: "cancellation_message",
            // message: "If you are a logged-in user, you can go to 'My Bookings' and then click on the booking you want to cancel and click on 'Cancel'. If you are a guest user, please use the booking link you received in the mail and click on 'Cancel'. You will receive an OTP, enter the OTP, and the booking will be cancelled. Still need support? Please contact our support team at sasi.rachapotu@gmail.com for assistance with cancellation.",
            component: <CancellationMessage />,
            asMessage: true,
            trigger: "0",
          },
          {
            id: "booking_message",
            // message: "To book a room, please visit our website at https://calm-bay-0d02db810.4.azurestaticapps.net/, then select the property, dates, and other fields as per requirements. You will be redirected to the room results page. Choose a room you want to book, select the deal and package, and then enter booking details. Hurray!! You are done with your booking.",
            component: <BookingMessage />,
            asMessage: true,
            trigger: "0",
          },
          {
            id: "helpline_message",
            // message: "For immediate assistance, please call our helpline number at +91 7020341552 or contact us at sasi.rachapotu@gmail.com.",
            component: <HelplineMessages />,
            asMessage: true,
            trigger: "0",
          },
          {
            id: "1",
            message: "Hii!! I am here to assist you, give some details and i will help to select the best suitable room for you!!",
            trigger: "2",
          },
          {
            id: "2",
            message: "What is your name?",
            trigger: "name",
          },
          {
            id: "name",
            user: true,
            trigger: "3",
          },
          {
            id: "3",
            message: "Hi {previousValue}! What is your gender?",
            trigger: "gender",
          },
          {
            id: "gender",
            options: [
              { value: "male", label: "Male", trigger: "5" },
              { value: "female", label: "Female", trigger: "5" },
            ],
          },
          {
            id: "5",
            message: "How old are you?",
            trigger: "age",
          },
          {
            id: "age",
            user: true,
            trigger: "7",
            validator: (value:number) => {
              if (isNaN(value)) {
                return "value must be a number";
              } else if (value < 0) {
                return "value must be positive";
              } else if (value > 120) {
                return `${value}? Come on!`;
              }

              return true;
            },
          },

          {
            id:"7",
            message:"What is the max amount of money($) you would like to spend for stay per room??",
            trigger:"amount"
          },
          {
            id:"amount",
            user:true,
            trigger:"8",
            validator: (value:number) => {
                if (isNaN(value)) {
                  return "value must be a number";
                } else if (value < 0) {
                  return "value must be positive";
                }
                return true;
              },
          },
          {
            id:"8",
            message:"What number of people will stay along with you??",
            trigger:"people"
          },
          {
            id:"people",
            user:true,
            trigger:"9",
            validator: (value:number) => {
                if (isNaN(value)) {
                  return "value must be a number";
                } else if (value < 0) {
                  return "value must be positive";
                }
                return true;
              },
          },
          {
            id: "9",
            message: "How do you want your room to be?",
            trigger: "roomArea",
          },
          {
            id: "roomArea",
            options: [
              { value: "Extra Spacious", label: "Extra Spacious", trigger: "10" },
              { value: "Comfortable", label: "Comfortable", trigger: "10" },
            ],
          },
          {
            id: "10",
            message: "which bed do you prefer?",
            trigger: "bedType",
          },
          {
            id: "bedType",
            options: [
              { value: "King", label: "King", trigger: "11" },
              { value: "Queen", label: "Queen", trigger: "11" },
              { value: "Any", label: "Any", trigger: "11" },
            ],
          },
          {
            id: "11",
            message: "Great! Check out your summary",
            trigger: "review",
          },
          {
            id: "review",
            component: <Review />,
            asMessage: true,
            trigger: "update",
          },
          {
            id: "update",
            message: "Would you like to update some field?",
            trigger: "update-question",
          },
          {
            id: "update-question",
            options: [
              { value: "yes", label: "Yes", trigger: "update-yes" },
              { value: "no", label: "No", trigger: "end-message" },
            ],
          },
          {
            id: "update-yes",
            message: "What field would you like to update?",
            trigger: "update-fields",
          },
          {
            id: "update-fields",
            options: [
              { value: "name", label: "Name", trigger: "update-name" },
              { value: "gender", label: "Gender", trigger: "update-gender" },
              { value: "age", label: "Age", trigger: "update-age" },
              { value: "amount", label: "amount", trigger: "update-amount" },
              { value: "people", label: "people", trigger: "update-people" },
              { value: "roomArea", label: "roomArea", trigger: "update-roomArea" },
              { value: "bedType", label: "bedType", trigger: "update-bedType" },
            ],
          },
          {
            id: "update-name",
            update: "name",
            trigger: "11",
          },
          {
            id: "update-gender",
            update: "gender",
            trigger: "11",
          },
          {
            id: "update-age",
            update: "age",
            trigger: "11",
          },
          {
            id: "update-amount",
            update: "amount",
            trigger: "11",
          },
          {
            id: "update-people",
            update: "people",
            trigger: "11",
          },
          {
            id: "update-roomArea",
            update: "roomArea",
            trigger: "11",
          },
          {
            id: "update-bedType",
            update: "bedType",
            trigger: "11",
          },
          {
            id: "end-message",
            message: "Thanks! for choosing us!!",
            trigger:"0"
          },
          
        ]}
      />
    </div>
  );
}



export default ChatBotComponent;
