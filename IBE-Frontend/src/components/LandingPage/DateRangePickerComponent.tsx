import { useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "../../styles/DateRangePickerComponent.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  setEndDate,
  setEndDateString,
  setIsCalendarOpen,
  setStartDate,
  setStartDateString,
} from "../../redux/slice/LandingPageSlice";
import { useMediaQuery } from "usehooks-ts";
import { getNightlyRates } from "../../redux/thunk/getNightlyRates";

// import translations from "../../translations/Translation";
import { IntlProvider, FormattedMessage, FormattedNumber } from "react-intl";
import { setIscalendarOpen } from "../../redux/slice/RoomSearchSlice";
import { format } from "date-fns";


interface ICalendarProps{
  page?:string;
}
function DateRangePickerComponent({page}:ICalendarProps) {
  const currency = useSelector((state: RootState) => state.landing.currency);
  const exchangeRates = useSelector((state: RootState) => state.landing.rate);
  const language = useSelector((store: RootState) => store.landing.language);
  const appDispatch = useDispatch<AppDispatch>();
  // const startDateStore = useSelector(
  //   (store: RootState) => store.landing.startDate
  // );
  // const endDateStore = useSelector((store: RootState) => store.landing.endDate);
  const isMobile = useMediaQuery("(max-width:980px)");
  const initialPropertyConfiguration = useSelector((store:RootState)=>store.landing.initialPropertyConfiguration);
  const [propertyRates, setPropertyRates] = useState<{ [key: string]: number }>(
    {}
  );

  const isMobileRoomPage = useMediaQuery("(max-width:1145px)");



  interface DateRange {
    startDate: Date;
    endDate: Date;
    key: string;
  }

  useEffect(() => {
    appDispatch(getNightlyRates());
    // fetch("https://team-15-ibe-web-app.azurewebsites.net/api/v1/nightlyRates")
    // fetch("http://localhost:8080/api/v1/nightlyRates")
    fetch("https://ibe-team-15-api-management.azure-api.net/api/v1/nightlyRates")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPropertyRates(data);
      });
  }, []);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 86400000 * 2),
      key: "selection",
    },
  ]);

  const handleDateChange = (rangesByKey: RangeKeyDict) => {
    const { selection } = rangesByKey as { selection: DateRange };
    if (selection) {
      setDateRange([{ ...selection, key: "selection" }]);
      appDispatch(setStartDate(selection.startDate));
      appDispatch(setEndDate(selection.endDate));
      appDispatch(setStartDateString(format(selection.startDate,"yyyy-MM-dd")));
      appDispatch(setEndDateString(format(selection.endDate,"yyyy-MM-dd")));
    }
  };

  const getMaxEndDate = (startDate: Date) => {
    const maxEndDate = new Date(startDate);
    maxEndDate.setDate(startDate.getDate() + 14);
    return maxEndDate;
  };
  const getMinDate = (startDate: Date) => {
    const currentDate = new Date();
    const minDate = new Date(startDate);
    minDate.setDate(startDate.getDate() - 13);
    if (minDate < currentDate) {
      return currentDate;
    }
    return minDate;
  };

  const generateDisabledDates = (startDate: Date) => {
    const disabledDates:Date[] = [];
    const endDate = new Date(startDate.getTime());
    endDate.setDate(startDate.getDate() + initialPropertyConfiguration.maxLengthOfStay);
    const currentDate = new Date(endDate);
    currentDate.setDate(endDate.getDate() + 1);
    while (currentDate <= endDate) {
      disabledDates.push(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return disabledDates;
  };

  // const handleStartDateChange = (startDate: Date) => {
  //   let maxDate = null;
  //   if (startDate.getTime() === dateRange[0].endDate.getTime()) {
  //     maxDate = getMaxEndDate(startDate);
  //   }
  //   setDateRange([
  //     { startDate, endDate: dateRange[0].endDate, key: "selection" },
  //   ]);
  //   return { minDate: startDate, maxDate };
  // };

  function handleApplyDates() {
    appDispatch(setIsCalendarOpen(false));
    appDispatch(setStartDate(dateRange[0].startDate))
    appDispatch(setEndDate(dateRange[0].endDate))

    // appDispatch(setStartDateString(formattedDate[2]+"-"+formattedDate[1]+"-"+formattedDate[0]));
    appDispatch(setStartDateString(format(dateRange[0].startDate,"yyyy-MM-dd")));
    // appDispatch(setEndDateString(formattedDate[2]+"-"+formattedDate[1]+"-"+formattedDate[0]));
    appDispatch(setEndDateString(format(dateRange[0].endDate,"yyyy-MM-dd")));
    appDispatch(setIscalendarOpen(false));
  }

  const translations = useSelector(
    (store: RootState) => store.landing.translations
  );

  const calculateMinimumPrice = () => {
    const start = dateRange[0].startDate.getTime();
    const end = dateRange[0].endDate.getTime();

    let minimumPrice = Infinity;

    for (
      let currentDate = start + 86400000;
      currentDate <= end + 86400000;
      currentDate += 86400000
    ) {
      const formattedDate = new Date(currentDate).toISOString().split("T")[0];
      if (propertyRates[formattedDate] < minimumPrice) {
        minimumPrice = propertyRates[formattedDate];
      }
    }

    return minimumPrice;
  };
  const dateDropdownClass = `date-dropdown-container ${page === "room result" ? "room-result" : ""}`;

  return (
    <IntlProvider locale={language} messages={translations[language]}>
      <div className={dateDropdownClass} >
        <div className="calender">
          <DateRangePicker
            ranges={dateRange}
            className="dateRangePicker"
            onChange={handleDateChange}
            minDate={
              dateRange[0].startDate.getTime() ===
              dateRange[0].endDate.getTime()
                ? getMinDate(dateRange[0].startDate)
                : new Date()
            }
            maxDate={
              dateRange[0].startDate.getTime() ===
              dateRange[0].endDate.getTime()
                ? getMaxEndDate(dateRange[0].startDate)
                : new Date(new Date().getFullYear(), new Date().getMonth()+2, 31)
            }
            disabledDates={generateDisabledDates(dateRange[0].startDate)}
            months={page==="room result"?(isMobileRoomPage?1:2):(isMobile ? 1 : 2)}
            direction="horizontal"
            // showSelectionPreview={false}
            editableDateInputs={true}
            // onChangeStart={handleStartDateChange}
            dayContentRenderer={(day: Date) => {
              return (
                <IntlProvider locale="en">
                  <div className="date-price-container">
                    <span className="date">{day.getDate()}</span>
                    {/* <span className="price">${price}</span> */}
                    <span className="price">
                      <FormattedNumber
                        style="currency"
                        currency={currency}
                        // value={(price*exchangeRates[currency])}
                        value={propertyRates[format(day,"yyyy-MM-dd")] * exchangeRates[currency.toUpperCase()]}
                        maximumFractionDigits={0}
                      />
                    </span>
                    <span className="discounted-price"></span>
                  </div>
                </IntlProvider>
              );
            }}
          />
        </div>
        <div className="message-button">
          <div
            className="minimum-rate-message"
            style={{
              display:
                dateRange[0].startDate.toLocaleDateString() ===
                dateRange[0].endDate.toLocaleDateString()
                  ? "none"
                  : "block",
            }}
          ><FormattedMessage id="from"/>&nbsp;
            <FormattedNumber
              style="currency"
              currency={currency}
              value={calculateMinimumPrice() * exchangeRates[currency.toUpperCase()]}
              maximumFractionDigits={0}
            /> /<FormattedMessage id="night"/>
          </div>
          <div className="apply-btn-container">
            <button
              className="apply-btn"
              onClick={handleApplyDates}
              disabled={
                // !startDateStore ||
                // !endDateStore ||
                dateRange[0].startDate.toDateString() ===
                  dateRange[0].endDate.toDateString()
              }
              style={{
                backgroundColor:
                  // startDateStore &&
                  // endDateStore &&
                  dateRange[0].startDate.toDateString() !==
                    dateRange[0].endDate.toDateString()
                    ? "#120639"
                    : "#C1C2C2",
              }}
            >
              <FormattedMessage
                id="applyDates"
                defaultMessage={"APPLY DATES"}
              />
            </button>
            {dateRange[0].startDate.toDateString() ===
              dateRange[0].endDate.toDateString() && (
              <div className="end-date-select-message">
                <FormattedMessage
                  id="datemsg"
                  defaultMessage={
                    "Please select end date. Max. length of stay : 14"
                  }
                />
                {initialPropertyConfiguration.maxLengthOfStay}
                <FormattedMessage id="day" defaultMessage={"days"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </IntlProvider>
  );
}

export default DateRangePickerComponent;
