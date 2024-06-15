import "../../styles/Header.style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { FaBars } from "react-icons/fa";
import { IntlProvider, FormattedMessage } from "react-intl";
// import translations from "../../translations/Translation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  setCurrencyFunction,
  setLanguageFunction,
} from "../../redux/slice/LandingPageSlice";
import { jwtDecode } from "jwt-decode";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
// import { getBooking } from "../../redux/thunk/getBooking";
// import { getMybookings } from "../../redux/thunk/getMyBookings";
import {
  setLoginRedux,
  setMyBookingsToNull,
} from "../../redux/slice/BookingSlice";
import { closeModal } from "../../redux/slice/RoomPageSlice";

const currencyMap = new Map([
  ["USD", "\u0024"], // US Dollar ($)
  ["INR", "\u20B9"], // Indian Rupee (₹)
  ["EUR", "\u20AC"], // Euro (€)
]);

interface DecodedJwtToken {
  ver: string;
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  auth_time: number;
  emails: string[];
  family_name: string;
  given_name: string;
  iat: number;
  nbf: number;
  nonce: string;
  tfp: string;
}

export function Header() {
  const { instance } = useMsal();
  // const [idToken, setIdToken] = useState("");

  const Login = async () => {
    console.log("login clicked");
    try {
      let { idToken } = await instance.loginPopup();
      // setIdToken(idToken);
      const decoded: DecodedJwtToken = jwtDecode(idToken);
      localStorage.setItem("decodedToken", JSON.stringify(decoded));
      localStorage.setItem("userEmail", decoded.emails[0]);
      localStorage.setItem("jwtToken", idToken);

      // fetch(`http://localhost:8080/api/v1/CBooking/user/addUser/${decoded.emails[0]}`).then((response)=>{
      fetch(
        // `https://team-15-ibe-web-app.azurewebsites.net/api/v1/CBooking/user/addUser/${decoded.emails[0]}`
        `https://ibe-team-15-api-management.azure-api.net/api/v1/booking/user/addUser/${decoded.emails[0]}`,
        // `http://localhost:8080/api/v1/booking/user/addUser/${decoded.emails[0]}`,
        {
          method: "GET",
          headers: {
            jwtToken: idToken,
          },
        }
      )
        .then((response) => {
          return response.text();
        })
        .then(() => {
          console.log("User logs in and is in database");
          appDispatch(setLoginRedux(true));
        });
    } catch (error) {
      console.error(error);
    }
  };

  const Logout = async () => {
    try {
      await instance.logoutPopup();
      localStorage.setItem("decodedToken", "");
      localStorage.setItem("userEmail", "");
      localStorage.setItem("jwtToken", "");
      // setIdToken("");
      appDispatch(setLoginRedux(false));
      appDispatch(setMyBookingsToNull());
    } catch (error) {
      console.error(error);
    }
  };
  const appDispatch = useDispatch<AppDispatch>();

  const tenantConfig = useSelector(
    (store: RootState) => store.landing.initialTenantConfiguration
  );

  const language = useSelector((store: RootState) => store.landing.language);
  const currency = useSelector((store: RootState) => store.landing.currency);
  const handleLanguageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    appDispatch(setLanguageFunction(event.currentTarget.value));
    setLanguageDropDown(false);
  };

  const handleCurrencyChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    appDispatch(setCurrencyFunction(event.currentTarget.value));
    setCurrencyDropDown(false);
  };

  const handleLanguageChangeMobile = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    appDispatch(setLanguageFunction(event.target.value));
  };
  const handleCurrencyChangeMobile = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    appDispatch(setCurrencyFunction(event.target.value));
  };

  const [languageDropDown, setLanguageDropDown] = useState(false);
  const [currencyDropDown, setCurrencyDropDown] = useState(false);

  const [toggle, setToggle] = useState<boolean>(false);
  const toggleHamburger = () => {
    console.log(toggle);
    setToggle(!toggle);
  };

  function toggleLanguageDropDown() {
    setLanguageDropDown(!languageDropDown);
    setCurrencyDropDown(false);
  }

  function toggleCurrencyDropDown() {
    setCurrencyDropDown(!currencyDropDown);
    setLanguageDropDown(false);
  }

  const languageRef = useRef<HTMLDivElement | null>(null);
  const currencyRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    if (
      languageRef.current &&
      !languageRef.current.contains(event.target as Node)
    ) {
      setLanguageDropDown(false);
    }
    if (
      currencyRef.current &&
      !currencyRef.current.contains(event.target as Node)
    ) {
      setCurrencyDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown);
    };
  }, []);

  const navigator = useNavigate();
  function handleMyBookings() {
    navigator("/myBookings");
  }

  const navRef = useRef<HTMLDivElement>(null);
  const translations = useSelector(
    (store: RootState) => store.landing.translations
  );
  return (
    <IntlProvider locale={language} messages={translations[language]}>
      <div className="header">
        <div className="header-container">
          <div className="heading-subheading">
            <div
              className="heading"
              onClick={() => appDispatch(closeModal(false))}
            >
              <Link className="linkToHome" to={"/"}>
                <img src={tenantConfig.tenantLogo} alt="" />
              </Link>
            </div>

            <div className="subheading">
              <FormattedMessage
                id="subheading"
                defaultMessage={"Internet Booking Engine"}
              />
            </div>
          </div>

          <div className="middle">
            {/* <AuthenticatedTemplate> */}
            <div className="bookings" onClick={handleMyBookings}>
              <FormattedMessage
                id="myBookings"
                defaultMessage={"MY BOOKINGS"}
              />
            </div>
            {/* </AuthenticatedTemplate> */}
          </div>
          <div className="right-section" ref={navRef}>
            {/* <div className="bookings">
              <FormattedMessage
                id="myBookings"
                defaultMessage={"MY BOOKINGS"}
              />
            </div> */}

            <div className="custom-language-currency">
              <div className="custom-language" ref={languageRef}>
                <button
                  className="custom-language-dropdown"
                  onClick={() => {
                    toggleLanguageDropDown();
                  }}
                >
                  <LanguageIcon
                    style={{ color: "#120639", marginRight: "1px" }}
                  />
                  <div className="language-display">
                    {language === "en" ? "En" : "Ita"}
                  </div>
                </button>
                <div
                  className="custom-language-drop-down-menu"
                  style={{ display: languageDropDown ? "flex" : "none" }}
                >
                  <button
                    className="language-drop-down-option"
                    value="en"
                    onClick={(e) => handleLanguageChange(e)}
                  >
                    <FormattedMessage id="en" defaultMessage={"En"} />
                  </button>
                  <button
                    className="language-drop-down-option"
                    value="it"
                    onClick={(e) => handleLanguageChange(e)}
                  >
                    <FormattedMessage id="it" defaultMessage={"Ita"} />
                  </button>
                </div>
              </div>
              <div className="custom-currency" ref={currencyRef}>
                <button
                  className="custom-currency-dropdown"
                  onClick={() => toggleCurrencyDropDown()}
                >
                  <div className="currency-symbol">
                    {currencyMap.get(currency.toUpperCase())}
                  </div>
                  <div className="currency-display">
                    {currency.toUpperCase()}
                  </div>
                </button>
                <div
                  className="custom-currency-drop-down-menu"
                  style={{ display: currencyDropDown ? "flex" : "none" }}
                >
                  <button
                    className="currency-drop-down-option"
                    value="usd"
                    onClick={(e) => handleCurrencyChange(e)}
                  >
                    &#36; USD
                  </button>
                  <button
                    className="currency-drop-down-option"
                    value="inr"
                    onClick={(e) => handleCurrencyChange(e)}
                  >
                    &#8377; INR
                  </button>
                  <button
                    className="currency-drop-down-option"
                    value="eur"
                    onClick={(e) => handleCurrencyChange(e)}
                  >
                    &#8364; EUR
                  </button>
                </div>
              </div>
            </div>
            <div className="login-section">
              <UnauthenticatedTemplate>
                <button className="login" onClick={() => Login()}>
                  <FormattedMessage id="login" defaultMessage={"LOGIN"} />
                </button>
              </UnauthenticatedTemplate>
              <AuthenticatedTemplate>
                <button className="login" onClick={() => Logout()}>
                  LOGOUT
                </button>
              </AuthenticatedTemplate>
            </div>
          </div>
        </div>
        <div className="toggle-btn">
          <button className="nav-btn" onClick={toggleHamburger}>
            <FaBars style={{ margin: 0 }} />
          </button>
          {toggle && (
            <div className="language-currency mobile-view">
              <div className="language">
                <LanguageIcon style={{ color: "#120639" }} />
                <select
                  className="language language-select select-mobile"
                  value={language}
                  onChange={handleLanguageChangeMobile}
                >
                  <option value="en">
                    <FormattedMessage id="en" defaultMessage={"En"} />
                  </option>
                  <option value="it">
                    <FormattedMessage id="it" defaultMessage={"Ita"} />
                  </option>
                </select>
              </div>

              <div className="currency">
                <select
                  className="currency currency-select"
                  value={currency}
                  onChange={handleCurrencyChangeMobile}
                >
                  <option value="usd">&#36; USD</option>
                  <option value="inr">&#8377; INR</option>
                  <option value="eur">&#8364; EUR</option>
                </select>
              </div>
              <div className="login-section">
                <UnauthenticatedTemplate>
                  <button
                    className="login"
                    disabled={false}
                    onClick={() => Login()}
                  >
                    <FormattedMessage id="login" defaultMessage={"LOGIN"} />
                  </button>
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                  <button className="login" onClick={() => Logout()}>
                    LOGOUT
                  </button>
                </AuthenticatedTemplate>
              </div>

              <div className="bookings" onClick={handleMyBookings}>
                <FormattedMessage
                  id="myBookings"
                  defaultMessage={"MY BOOKINGS"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </IntlProvider>
  );
}

export default Header;
