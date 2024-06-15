import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppDispatch, RootState } from "./redux/store/store";
import { getExchangeRates } from "./redux/thunk/getExchangeRates";
import { useEffect, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
// import translations from "./translations/Translation";
import { getTranslations } from "./redux/thunk/getTranslations";
import { getProperties } from "./redux/thunk/getProperties";
import RoomResults from "./components/RoomResults/RoomResults";
import { MsalProvider } from "@azure/msal-react";
import { BookingPage } from "./components/BookingPage/BookingPage";
import Reviews from "./components/ReviewsPage/Reviews";
import BookingConfirmation from "./components/BookingConfirmation/BookingConfirmation";
import { Timer } from "./components/BookingPage/Timer";
import MyBookingPage from "./components/MyBookingPage/MyBookingPage";
import ChatBotComponent from "./components/ChatBot/ChatBotComponent";

function App({ instance }:any) {
  // console.log(import.meta.env.VITE_HELLO);

  const [showChat, setShowChat] = useState(false);

  const startChat = () => { setShowChat(true); }
  const hideChat = () => { setShowChat(false); }

  const reduxDispatch = useDispatch<AppDispatch>();
  const translations = useSelector((store:RootState)=>store.landing.translations);
  useEffect(() => {
    reduxDispatch(getExchangeRates());
    reduxDispatch(getTranslations());
    reduxDispatch(getProperties());
  }, []);

const showIteanary=useSelector((state: RootState) => state.roomSearch.showIteanary);
  const language = useSelector((state: RootState) => state.landing.language);
  return (
    <IntlProvider locale={language} messages={translations[language]}>
    <div className="main-app" >
      <BrowserRouter>
      <MsalProvider instance={instance}>
        <Header />
        {showIteanary && <Timer></Timer>}
       {/* <button onClick={() => methodDoesNotExist()}>Break the world</button> */}
       <div className="content-footer">
       
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/rooms" element={<RoomResults />} />
          <Route path="/checkoutPage" element={<BookingPage />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/bookings" element={<BookingConfirmation />} />
          <Route path="/mybookings" element={<MyBookingPage/>}/>
        </Routes>
        <div className = "bot">
        <div style ={{display: showChat ? "" : "none"}}>
          <ChatBotComponent></ChatBotComponent>
        </div>      
        {/* <div> {showChat ? <SimpleForm></SimpleForm> : null} </div> */}
        <div>
          {!showChat 
            ? <button className="btn" onClick={() => startChat()}>
              <FormattedMessage id="wantAssistClickToChat" defaultMessage="Want assist ?? Click to chat... "/></button> 
            : <button className="btn" onClick={() => hideChat()}>
              <FormattedMessage id="clickToHide" defaultMessage="Click to hide..."/> </button>}
        </div>
      </div>  
        <Footer />
        </div>
        </MsalProvider>
      </BrowserRouter>
    </div>
    </IntlProvider>
  );
}

export default App;