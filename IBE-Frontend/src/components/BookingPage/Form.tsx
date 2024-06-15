import { CSSProperties, useEffect, useRef, useState } from "react";
import { FormattedMessage, FormattedNumber, IntlProvider } from "react-intl";
import "./Input.style.scss";
import "react-country-state-city/dist/react-country-state-city.css";
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { setTermModal } from "../../redux/slice/ItineararySlice";
import Terms from "./Terms";
import { AppDispatch, RootState } from "../../redux/store/store";
import ClipLoader from "react-spinners/ClipLoader";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { setPurchaseStateSnackBar } from "../../redux/slice/BookingSlice";
import { sendEmail } from "../../redux/thunk/sendEmail";
// import { getBooking } from "../../redux/thunk/getBooking";
import { mailBookingConfirmation } from "../../redux/thunk/mailBookingConfirmation";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  border: "5px solid white",
  marginTop: "5px",
};

export function Forms() {
  const formikRef = useRef<any>();

  const [countryid, setCountryid] = useState<number>(0);
  const [stateid, setStateid] = useState<number>(0);

  const [countriesList, setCountriesList] = useState<
    { id: number; name: string }[]
  >([]);
  const [stateList, setStateList] = useState<{ id: number; name: string }[]>(
    []
  );
  const [cityList, setCityList] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [firstNameBilling, setFirstNameBilling] = useState<string>("");
  const [lastNameBilling, setLastNameBilling] = useState<string>("");
  const [phoneBilling, setPhoneBilling] = useState<string>("");
  const [emailBilling, setEmailBilling] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [selectedCityName, setSelectedCityName] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");

  const [cardNumber, setCardNumber] = useState<string>("");
  const [expMonth, setExpMonth] = useState<string>("");
  const [expYear, setExpYear] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [specialOffers, setSpecialOffers] = useState<boolean>(false);
  const [termsAgreed, setTermsAgreed] = useState<boolean>(true);

  const handleTravellersInfo = () => {
    if (formikRef.current) {
      setFirstName(formikRef.current.values.firstName);
      setLastName(formikRef.current.values.lastName);
      setEmail(formikRef.current.values.email);
      setPhone(formikRef.current.values.phone);
      formikRef.current.submitForm().then(() => {
        if (formikRef.current.isValid) {
          const travellersInfo = document.querySelector(
            ".travellers-info"
          ) as HTMLElement;
          const billingInfo = document.querySelector(
            ".billing-info"
          ) as HTMLElement;

          if (travellersInfo && billingInfo) {
            travellersInfo.style.display = "none";
            billingInfo.style.display = "flex";
          }
        }
      });
    }
    console.log("form 1", firstName, lastName, phone, email);
  };
  const handleBillingInfoPrev = () => {
    const travellersInfo = document.querySelector(
      ".travellers-info"
    ) as HTMLElement;
    const billingInfo = document.querySelector(".billing-info") as HTMLElement;

    if (travellersInfo && billingInfo) {
      travellersInfo.style.display = "flex";
      billingInfo.style.display = "none";
    }
  };
  const formRef = useRef<any>();

  const handleBillingInfoNext = () => {
    if (formRef.current) {
      setFirstNameBilling(formRef.current.values.firstName);
      setLastNameBilling(formRef.current.values.lastName);
      setAddress1(formRef.current.values.address1);
      setAddress2(formRef.current.values.address2);
      setZipCode(formRef.current.values.zipCode);
      setEmailBilling(formRef.current.values.email);
      setPhoneBilling(formRef.current.values.phone);
      formRef.current.submitForm().then(() => {
        if (formRef.current.isValid) {
          const paymentInfo = document.querySelector(
            ".payment-info"
          ) as HTMLElement;
          const billingInfo = document.querySelector(
            ".billing-info"
          ) as HTMLElement;

          if (paymentInfo && billingInfo) {
            paymentInfo.style.display = "flex";
            billingInfo.style.display = "none";
          }
        }
      });
    }
  };

  const handlePaymentInfoPrev = () => {
    const paymentInfo = document.querySelector(".payment-info") as HTMLElement;
    const billingInfo = document.querySelector(".billing-info") as HTMLElement;

    if (paymentInfo && billingInfo) {
      paymentInfo.style.display = "none";
      billingInfo.style.display = "flex";
    }
  };

  const navigator = useNavigate();
  const formikRef2 = useRef<any>();

  const checkInDate = useSelector(
    (store: RootState) => store.itinerary.checkInDate
  );
  const checkOutDate = useSelector(
    (store: RootState) => store.itinerary.checkOutDate
  );
  const numberOfRooms = useSelector(
    (store: RootState) => store.itinerary.numberOfRooms
  );
  const combinedGuest = useSelector(
    (store: RootState) => store.itinerary.combinedGuest
  );
  const propertyId = useSelector((store: RootState) => store.landing.properyID);
  const roomTypeId = useSelector(
    (store: RootState) => store.roomSearch.roomTypeID
  );
  const totalCost = useSelector(
    (store: RootState) => store.itinerary.totalPrice
  );
  const amountDueAtResort = useSelector(
    (store: RootState) => store.itinerary.dueAtResort
  );
  const nightlyRate = useSelector(
    (store: RootState) => store.itinerary.nightlyRate
  );
  const taxes = useSelector((store: RootState) => store.itinerary.taxes);
  const vat = useSelector((store: RootState) => store.itinerary.vat);
  const selectedPromo = useSelector(
    (store: RootState) => store.itinerary.selectedPromo
  );
  const roomTypeName = useSelector(
    (store: RootState) => store.roomPage.selectedRoom
  );
  const [loader, setLoader] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("");
  const openSnackbar = useSelector(
    (store: RootState) => store.booking.purchaseStateSnackBar
  );
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const handleTnC = () => {
    setCardNumber(formikRef2.current.values.cardNumber);
    setExpMonth(formikRef2.current.values.expMonth);
    setExpYear(formikRef2.current.values.expYear);
    setCvv(formikRef2.current.values.cvv);
    setTermsAgreed(formikRef2.current.values.termsAgreed);
    setSpecialOffers(formikRef2.current.values.specialOffers);
  };

  const generateToken = (length) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        token += charset[randomIndex];
    }
    return token;
}


  const handleSubmit = async () => {
    if (formikRef2.current) {
      try {
        await formikRef2.current.submitForm();
        if (formikRef2.current.isValid) {
          console.log(
            "form 3",
            cardNumber,
            expMonth,
            expYear,
            cvv,
            termsAgreed,
            specialOffers
          );

          const emailStored = localStorage.getItem("userEmail");

          const formData = {
            tenantId: 1,
            startDate: checkInDate,
            emailId: emailStored,
            endDate: checkOutDate,
            roomCount: numberOfRooms,
            adultCount: combinedGuest["Adults"],
            teenCount: combinedGuest["Teens"],
            kidCount: combinedGuest["Kids"],
            propertyId: propertyId ?? 15,
            roomTypeId: roomTypeId,
            roomTypeName: roomTypeName?.room_type_name,
            costInfo: {
              totalCost: totalCost,
              amountDueAtResort: amountDueAtResort,
              nightlyRate: nightlyRate,
              taxes: taxes,
              vat: vat,
            },
            promotionInfo: {
              promotionId:
                selectedPromo.promotion_id === 0 ||
                selectedPromo.promotion_id > 5
                  ? 0
                  : selectedPromo.promotion_id,
              promotionTitle: selectedPromo.promotion_title,
              priceFactor: selectedPromo.price_factor,
              promotionDescription: selectedPromo.promotion_description,
            },
            guestInfo: {
              firstName: firstName,
              lastName: lastName,
              phone: phone,
              emailId: email,
              hasSubscribed: specialOffers,
            },
            billingInfo: {
              firstName: firstNameBilling,
              lastName: lastNameBilling,
              address1: address1,
              address2: address2,
              city: selectedCityName,
              zipcode: zipCode,
              state: state,
              country: country,
              phone: phoneBilling,
              emailId: emailBilling,
            },
            paymentInfo: {
              cardNumber: cardNumber,
              expiryMonth: expMonth,
              expiryYear: expYear,
            },
          };

          console.log("formdata", formData);
          setLoader(true);
          setTransactionStatus("pending");
          appDispatch(setPurchaseStateSnackBar(true));
          setSnackbarMessage("Transaction in progress");
          setSnackbarSeverity("info");

          const response = await fetch(
            // "http://localhost:8080/api/v1/booking",
            // "https://team-15-ibe-web-app.azurewebsites.net/api/v1/CBooking/booking",
            "https://ibe-team-15-api-management.azure-api.net/api/v1/booking",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to submit the form");
          }

          const responseData = await response.json();
          console.log(responseData);
          const bookingId = responseData;

          setTransactionStatus("success");
          appDispatch(setPurchaseStateSnackBar(true));
          setSnackbarMessage("Transaction successful");
          setSnackbarSeverity("success");

          if (bookingId <= 0) {
            console.log("booking failed");
            throw new Error("Booking failed");
          }

          // const Bookingresponse = await fetch(`http://localhost:8080/api/v1/booking/getBooking/${bookingId}`);
          const Bookingresponse = await fetch(`https://ibe-team-15-api-management.azure-api.net/api/v1/booking/getBooking/${bookingId}`);
          const bookingDetails = await Bookingresponse.json();
          appDispatch(mailBookingConfirmation({ bookingDetails: bookingDetails }));
          const generatedToken = generateToken(6);
          // appDispatch(sendEmail({email:email,data:`http://localhost:5173/reviews?tenantId=1&propertyId=${propertyId}&roomTypeId=${roomTypeId}&token=${generatedToken}`}))
          appDispatch(sendEmail({email:email,data:`http://team-15-ibe-b5averevakhagghw.z02.azurefd.net/reviews?tenantId=1&propertyId=${propertyId}&roomTypeId=${roomTypeId}&token=${generatedToken}`}))
          // fetch(`http://localhost:8080/api/v1/addToken/${generatedToken}`)
          fetch(`https://ibe-team-15-api-management.azure-api.net/api/v1/addToken/${generatedToken}`)
          navigator(`/bookings?bookingId=${bookingId}`);
        }
      } catch (error) {
        console.error("Error:", error);
        const prevPath = localStorage.getItem("prevPath");
        setLoader(false);
        appDispatch(setPurchaseStateSnackBar(true));

        setTransactionStatus("failed");
        setSnackbarSeverity("error");
        setSnackbarMessage("Transaction failed");
        navigator(`/rooms?${prevPath}`);

      }
    }
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    appDispatch(setPurchaseStateSnackBar(false));
  };
  const appDispatch = useDispatch<AppDispatch>();
  function handlePriceClick() {
    appDispatch(setTermModal(true));
  }

  const handleCitySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityIndex = parseInt(e.target.value);
    const selectedCity = cityList[selectedCityIndex];
    setSelectedCityName(selectedCity.name);
    console.log(cityList[selectedCityIndex]);

    const selectedStateId = stateid;
    const selectedState = stateList.find(
      (state: any) => state.id === selectedStateId
    );

    if (selectedState) {
      setState(selectedState.name);
      console.log(state);
    }

    const selectedCountryID = countryid;
    const selectedCountry = countriesList.find(
      (country: any) => country.id === selectedCountryID
    );

    if (selectedCountry) {
      setCountry(selectedCountry.name);
      console.log(state);
    }
  };

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  useEffect(() => {
    if (countryid !== 0) {
      GetState(countryid).then((result) => {
        setStateList(result);
      });
    }
  }, [countryid]);

  useEffect(() => {
    if (stateid !== 0) {
      GetCity(countryid, stateid).then((result) => {
        setCityList(result);
      });
    }
  }, [stateid]);

  const validateZipCodeWithCity = async (zipCode, selectedCityName) => {
    try {
      if (zipCode.length === 6 && selectedCityName != "") {
        const response = await fetch(
          `https://app.zipcodebase.com/api/v1/search?apikey=402113b0-f7f7-11ee-aecc-8d499b6da50a&codes=${zipCode}`
        );
        const data = await response.json();

        // Check if the response contains results
        if (data.results && data.results[zipCode]) {
          const results = data.results[zipCode];
          console.log(
            results.province,
            results.postal_code,
            selectedCityName,
            zipCode
          );

          // Check if any of the results match the selected city's province
          const isValid = results.some(
            (result) => result.province === selectedCityName
          );

          return isValid;
        } else {
          // If no results found, return false
          return false;
        }
      }
    } catch (error) {
      console.error("Error validating zip code:", error);
      return false;
    }
  };

  const exchangeRates = useSelector((state: RootState) => state.landing.rate);

  const currency = useSelector((state: RootState) => state.landing.currency);

  return (
    // <form>
    <div>
      <div className="form-heading">
        <FormattedMessage id="paymentInfo" defaultMessage={"Payment Info"} />
      </div>

      <Formik
        innerRef={formikRef}
        initialValues={{
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .required("First Name is a required field")
            .matches(/^[^\d]+$/, "First Name must not contain digits"),
          lastName: Yup.string()
            // .required("Last Name is a required field")
            .matches(/^[^\d]+$/, "Last Name must not contain digits"),
          phone: Yup.string()
            .required("Phone is a required field")
            .matches(/^\d{10}$/, "Phone number must be 10 digits"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is a required field"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(firstName, lastName, phone, email);
          console.log(values);
          setSubmitting(false);
        }}
      >
        {() => (
          <Form>
            <span className="form-subsection traveller-info">
              1.{" "}
              <FormattedMessage
                id="travelerInfo"
                defaultMessage={"Traveler Info"}
              />
            </span>
            <div className="travellers-info info-style">
              <div style={{ display: "flex" }}>
                <div className="input-field">
                  <label className="input-label" htmlFor="firstName">
                    <FormattedMessage
                      id="firstName"
                      defaultMessage="First Name"
                    />
                  </label>
                  <Field type="text" id="firstName" name="firstName" />
                  <div className="error-message">
                    <ErrorMessage name="firstName" className="error-message" />
                  </div>
                </div>
                <div className="input-field">
                  <label className="input-label" htmlFor="lastName">
                    <FormattedMessage
                      id="lastName"
                      defaultMessage="Last Name"
                    />
                  </label>
                  <Field type="text" id="lastName" name="lastName" />
                  <div className="error-message">
                    <ErrorMessage name="lastName" />
                  </div>
                </div>
              </div>
              <div className="input-field" style={{ width: "50%" }}>
                <label className="input-label" htmlFor="phone">
                  <FormattedMessage id="phone" defaultMessage="Phone" />
                </label>
                <Field type="tel" id="phone" name="phone" />
                <div className="error-message">
                  <ErrorMessage name="phone" />
                </div>
              </div>
              <div className="input-field" style={{ width: "50%" }}>
                <label className="input-label" htmlFor="email">
                  <FormattedMessage id="email" defaultMessage="Email" />
                </label>
                <Field type="email" id="email" name="email" />
                <div className="error-message">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="btn-div">
                <button
                  type="button"
                  className="btn-next"
                  onClick={handleTravellersInfo}
                >
                  <FormattedMessage
                    id="nextBillingInfo"
                    defaultMessage="Next: BILLING INFO"
                  />
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Formik
        innerRef={formRef}
        initialValues={{
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zipCode: "",
          phone: "",
          email: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .required("First Name is a required field")
            .matches(/^[^\d]+$/, "First Name must not contain digits"),
          lastName: Yup.string()
            // .required("Last Name is a required field")
            .matches(/^[^\d]+$/, "Last Name must not contain digits"),
          address1: Yup.string().required(
            "Mailing Address 1 is a required field"
          ),
          phone: Yup.string()
            .required("Phone is a required field")
            .matches(/^\d{10}$/, "Phone number must be 10 digits"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is a required field"),

          // zipCode: Yup.string().required("Zip code is a required field"),
          zipCode: Yup.string()
            .required("Zip code is a required field")
            .test("isValidZip", "Invalid zip code", async (value: string) => {
              return await validateZipCodeWithCity(value, selectedCityName);
            }),
        })}
        onSubmit={(values: FormikValues, { setSubmitting }: any) => {
          console.log(values);
          console.log(
            "form 4",
            firstNameBilling,
            lastNameBilling,
            address1,
            address2,
            country,
            state,
            selectedCityName,
            zipCode,
            phoneBilling,
            emailBilling
          );
          setSubmitting(false);
        }}
      >
        {/* removed isSubmiting from here */}
        {({ setFieldValue }: any) => (
          <Form>
            <span className="form-subsection traveller-info">
              2.{" "}
              <FormattedMessage
                id="billingInfo"
                defaultMessage={"Billing Info"}
              />
            </span>
            <div className="billing-info info-style">
              <div style={{ display: "flex" }}>
                <div className="input-field">
                  <label className="input-label" htmlFor="firstName">
                    <FormattedMessage
                      id="firstName"
                      defaultMessage="First Name"
                    />
                  </label>
                  <Field type="text" name="firstName" />
                  <div className="error-message">
                    <ErrorMessage name="firstName" />
                  </div>
                </div>
                <div className="input-field">
                  <label className="input-label" htmlFor="lastName">
                    <FormattedMessage
                      id="lastName"
                      defaultMessage="Last Name"
                    />
                  </label>
                  <Field type="text" name="lastName" />
                  <div className="error-message">
                    <ErrorMessage name="lastName" />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="input-field">
                  <label className="input-label" htmlFor="address1">
                    <FormattedMessage
                      id="address"
                      defaultMessage="Mailing Address"
                    />{" "}
                    1
                  </label>
                  <Field type="text" id="address1" name="address1" />
                  <div className="error-message">
                    <ErrorMessage name="address1" />
                  </div>
                </div>
                <div className="input-field">
                  <label className="input-label" htmlFor="address2">
                    <FormattedMessage
                      id="address"
                      defaultMessage="Mailing Address"
                    />{" "}
                    2
                  </label>
                  <Field type="text" id="address2" name="address2" />
                  <div className="error-message">
                    <ErrorMessage name="address2" />
                  </div>
                </div>
              </div>

              <div className="input-field" style={{ width: "49%" }}>
                <label className="input-label" htmlFor="email">
                  <FormattedMessage id="country" defaultMessage="Country" />
                </label>
                <select
                  className="select-div"
                  onChange={(e) => {
                    const country = countriesList[e.target.value]; //here you will get full country object.
                    setCountryid(country.id);
                    GetState(country.id).then((result) => {
                      setStateList(result);
                    });
                  }}
                >
                  {countriesList.map((item: any, index: number) => (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex" }}>
                <div
                  className="input-field"
                  style={{ width: "49%", marginRight: "10px" }}
                >
                  <label className="input-label" htmlFor="firstName">
                    <FormattedMessage id="state" defaultMessage="State" />
                  </label>
                  <select
                    className="select-div"
                    onChange={(e) => {
                      const state = stateList[e.target.value]; //here you will get full state object.
                      setStateid(state.id);
                      GetCity(countryid, state.id).then((result) => {
                        setCityList(result);
                      });
                    }}
                  >
                    {stateList.map((item: any, index: number) => (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "flex", width: "50%" }}>
                  <div className="input-field" style={{ marginRight: "8px" }}>
                    <label className="input-label" htmlFor="firstName">
                      <FormattedMessage id="city" defaultMessage="City" />
                    </label>

                    <select
                      className="select-div"
                      onChange={handleCitySelection}
                    >
                      {cityList.map((item: any, index: number) => (
                        <option key={index} value={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    {/* <div>Selected City: {selectedCityName}</div> */}
                  </div>
                  <div className="input-field">
                    <label className="input-label" htmlFor="zipCode">
                      <FormattedMessage
                        id="zipCode"
                        defaultMessage="Zip Code"
                      />
                    </label>
                    <Field
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("zipCode", e.target.value);
                        const newZipCode = e.target.value;
                        setFieldValue("zipCode", newZipCode);
                      }}
                    />
                    <div className="error-message">
                      <ErrorMessage name="zipCode" />
                    </div>
                    {/* <div>Zip Code: {zipCode}</div> */}
                  </div>
                </div>
              </div>

              <div className="input-field" style={{ width: "50%" }}>
                <label className="input-label" htmlFor="phone">
                  <FormattedMessage id="phone" defaultMessage="Phone" />
                </label>
                <Field type="tel" name="phone" />
                <div className="error-message">
                  <ErrorMessage name="phone" />
                </div>
              </div>
              <div className="input-field" style={{ width: "50%" }}>
                <label className="input-label" htmlFor="email">
                  <FormattedMessage id="email" defaultMessage="Email" />
                </label>
                <Field type="email" name="email" />
                <div className="error-message">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="btn-div">
                <div className="btns">
                  <button
                    className="btn-prev"
                    type="button"
                    onClick={handleBillingInfoPrev}
                  >
                    <FormattedMessage
                      id="editTravellerInfo"
                      defaultMessage="Edit Traveller Info."
                    />
                  </button>
                  <button
                    className="btn-next"
                    type="button"
                    onClick={handleBillingInfoNext}
                  >
                    <FormattedMessage
                      id="nextPaymentInfo"
                      defaultMessage="NEXT: PAYMENT INFO"
                    />
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <div>
        <span className="form-subsection">
          3.{" "}
          <FormattedMessage id="paymentInfo" defaultMessage={"Payment Info"} />
        </span>
        <div className="payment-info info-style">
          <Formik
            innerRef={formikRef2}
            initialValues={{
              cardNumber: "",
              expMonth: "",
              expYear: "",
              cvv: "",
              specialOffers: false,
              termsAgreed: false,
            }}
            validationSchema={Yup.object({
              cardNumber: Yup.string()
                .required("Card Number is required")
                .matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Invalid card number"),
              expMonth: Yup.string()
                .required("Expiration Month is required")
                .matches(/^(0[1-9]|1[0-2])$/, "Invalid expiration month"),
              expYear: Yup.string()
                .required("Expiration Year is required")
                .matches(/^(20\d{2})$/, "Invalid expiration year")
                .test("expirationDate", "Card has expired", function (value) {
                  console.log(value);
                  const { expMonth, expYear } = this.parent;
                  const currentYear = new Date().getFullYear();
                  const currentMonth = new Date().getMonth() + 1; // January is 0
                  if (
                    parseInt(expYear) < currentYear ||
                    (parseInt(expYear) === currentYear &&
                      parseInt(expMonth) < currentMonth)
                  ) {
                    return false; // Card has expired
                  }
                  return true;
                }),
              cvv: Yup.string()
                .required("CVV is required")
                .matches(/^\d{3}$/, "CVV must be 3 digits"),
              termsAgreed: Yup.boolean().oneOf(
                [true],
                "Please agree to the terms and policies"
              ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(false);
            }}
          >
            <Form>
              <div style={{ display: "flex" }}>
                <div className="input-field" style={{ width: "52%" }}>
                  <label className="input-label" htmlFor="cardNumber">
                    <FormattedMessage
                      id="cardNumber"
                      defaultMessage="Card Number"
                    />
                  </label>
                  <Field
                    type="password"
                    id="cardNumber"
                    name="cardNumber"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (
                        e.key !== "Backspace" &&
                        (e.currentTarget.value.length + 1) % 5 === 0
                      ) {
                        e.currentTarget.value += "-";
                      }
                    }}
                  />
                  <ErrorMessage
                    name="cardNumber"
                    className="error-message"
                    component="div"
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <div className="input-field">
                    <label className="input-label" htmlFor="expMonth">
                      Exp MM
                    </label>
                    <Field type="text" id="expMonth" name="expMonth" />
                    <ErrorMessage
                      name="expMonth"
                      className="error-message"
                      component="div"
                    />
                  </div>
                  <div className="input-field">
                    <label className="input-label" htmlFor="expYear">
                      Exp YYYY
                    </label>
                    <Field type="text" id="expYear" name="expYear" />
                    <ErrorMessage
                      name="expYear"
                      className="error-message"
                      component="div"
                    />
                  </div>
                </div>
              </div>
              <div className="input-field" style={{ width: "25%" }}>
                <label className="input-label" htmlFor="cvv">
                  CVV
                </label>
                <Field type="password" id="cvv" name="cvv" />
                <ErrorMessage
                  name="cvv"
                  className="error-message"
                  component="div"
                />
              </div>
              <div className="terms">
                <div className="checkboxes">
                  <label>
                    <Field
                      style={{ cursor: "pointer" }}
                      type="checkbox"
                      name="specialOffers"
                      onClick={() => {
                        setSpecialOffers(!specialOffers);
                      }}
                    />
                    <FormattedMessage
                      id="sendSpecialOffers"
                      defaultMessage="Send me special Offers"
                    />
                  </label>
                </div>
                <div className="checkboxes" onClick={handleTnC}>
                  <label>
                    <Field
                      type="checkbox"
                      name="termsAgreed"
                      style={{ cursor: "pointer" }}
                    />
                    <FormattedMessage
                      id="iAgreeTo"
                      defaultMessage="I agree to"
                    />
                    &nbsp;
                    <span>
                      <FormattedMessage
                        id="termsPolicies"
                        defaultMessage="Terms and Policies"
                      />
                    </span>
                    &nbsp;
                    <FormattedMessage
                      id="ofTravel"
                      defaultMessage="of travel"
                    />
                    &nbsp;
                    <button
                      className="promo-modal"
                      style={{
                        border: "none",
                        backgroundColor: "white",
                        cursor: "pointer",
                      }}
                      onClick={handlePriceClick}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="14" height="14" fill="white" />
                        <path
                          d="M6.99968 6.3335C6.82287 6.3335 6.6533 6.40373 6.52827 6.52876C6.40325 6.65378 6.33301 6.82335 6.33301 7.00016V9.66683C6.33301 9.84364 6.40325 10.0132 6.52827 10.1382C6.6533 10.2633 6.82287 10.3335 6.99968 10.3335C7.17649 10.3335 7.34606 10.2633 7.47108 10.1382C7.59611 10.0132 7.66634 9.84364 7.66634 9.66683V7.00016C7.66634 6.82335 7.59611 6.65378 7.47108 6.52876C7.34606 6.40373 7.17649 6.3335 6.99968 6.3335ZM7.25301 3.72016C7.0907 3.65348 6.90865 3.65348 6.74634 3.72016C6.66451 3.75189 6.58975 3.79947 6.52634 3.86016C6.46746 3.92496 6.42011 3.99937 6.38634 4.08016C6.34902 4.15928 6.33076 4.24605 6.33301 4.3335C6.3325 4.42123 6.34932 4.50821 6.3825 4.58943C6.41567 4.67066 6.46456 4.74454 6.52634 4.80683C6.59115 4.86572 6.66555 4.91307 6.74634 4.94683C6.84734 4.98832 6.95699 5.00437 7.06564 4.99357C7.1743 4.98277 7.27863 4.94544 7.36949 4.88488C7.46034 4.82431 7.53492 4.74235 7.58668 4.64621C7.63845 4.55007 7.6658 4.44269 7.66634 4.3335C7.66389 4.15698 7.59483 3.98792 7.47301 3.86016C7.40961 3.79947 7.33485 3.75189 7.25301 3.72016ZM6.99968 0.333496C5.68114 0.333496 4.3922 0.724489 3.29588 1.45703C2.19955 2.18957 1.34506 3.23077 0.840481 4.44894C0.335896 5.66711 0.203874 7.00756 0.461109 8.30077C0.718344 9.59397 1.35328 10.7819 2.28563 11.7142C3.21798 12.6466 4.40587 13.2815 5.69908 13.5387C6.99228 13.796 8.33273 13.6639 9.5509 13.1594C10.7691 12.6548 11.8103 11.8003 12.5428 10.704C13.2754 9.60764 13.6663 8.31871 13.6663 7.00016C13.6663 6.12468 13.4939 5.25778 13.1589 4.44894C12.8238 3.6401 12.3328 2.90517 11.7137 2.28612C11.0947 1.66706 10.3597 1.176 9.5509 0.840966C8.74206 0.505935 7.87516 0.333496 6.99968 0.333496ZM6.99968 12.3335C5.94484 12.3335 4.9137 12.0207 4.03664 11.4347C3.15957 10.8486 2.47599 10.0157 2.07232 9.04114C1.66865 8.0666 1.56304 6.99425 1.76882 5.95968C1.97461 4.92512 2.48256 3.97481 3.22844 3.22893C3.97432 2.48305 4.92463 1.9751 5.9592 1.76931C6.99376 1.56352 8.06612 1.66914 9.04066 2.07281C10.0152 2.47647 10.8481 3.16006 11.4342 4.03712C12.0202 4.91418 12.333 5.94533 12.333 7.00016C12.333 8.41465 11.7711 9.77121 10.7709 10.7714C9.77072 11.7716 8.41417 12.3335 6.99968 12.3335Z"
                          fill="#858685"
                        />
                      </svg>
                    </button>
                  </label>
                  <ErrorMessage
                    name="termsAgreed"
                    className="error-message"
                    component="div"
                  />
                </div>
              </div>
              <div className="btn-div">
                <div>
                  <FormattedMessage id="totalDue" defaultMessage="Total Due" />
                  <IntlProvider locale="en">
                    <span>
                      {" "}
                      <FormattedNumber
                        style="currency"
                        currency={currency}
                        value={
                          totalCost * exchangeRates[currency.toUpperCase()]
                        }
                        maximumFractionDigits={0}
                      />
                    </span>
                  </IntlProvider>
                </div>
                <div className="btns">
                  <button
                    type="button"
                    className="btn-prev"
                    onClick={handlePaymentInfoPrev}
                  >
                    <FormattedMessage
                      id="editBillingInfo"
                      defaultMessage="Edit Billing Info."
                    />
                  </button>

                  <button
                    type="button"
                    className="btn-next"
                    onClick={handleSubmit}
                  >
                    <ClipLoader
                      color={"white"}
                      loading={loader}
                      cssOverride={override}
                      size={50}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    <FormattedMessage id="purchase" defaultMessage="PURCHASE" />
                  </button>

                  <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  >
                    <MuiAlert
                      elevation={6}
                      variant="filled"
                      onClose={handleSnackbarClose as any}
                      severity={snackbarSeverity as any}
                      sx={{
                        backgroundColor:
                          transactionStatus === "failed" ? "red" : "#26266D",
                        color: "white",
                      }}
                    >
                      {snackbarMessage}
                    </MuiAlert>
                  </Snackbar>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <Terms />
    </div>
    // </form>
  );
}