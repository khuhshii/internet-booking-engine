import { useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import DateRangePickerComponent from './DateRangePickerComponent'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { setGuestDropDown, setIsCalendarOpen, setPropertyDropDown, setRoomsDropDown, setShowCalendarDropDown } from '../../redux/slice/LandingPageSlice';

function SelectDatesContainer() {
  const showCalendar = useSelector((store:RootState)=>store.landing.showCalendarDropDown);
  const appDispatch = useDispatch<AppDispatch>();
  const isCalendarOpen = useSelector(
    (store: RootState) => store.landing.isCalendarOpen
  );

  function showCalendarHandler() {
    appDispatch(setShowCalendarDropDown(!showCalendar));
    appDispatch(setIsCalendarOpen(!isCalendarOpen));
    appDispatch(setPropertyDropDown(false));
    appDispatch(setGuestDropDown(false));
    appDispatch(setRoomsDropDown(false));
  }

  const datesRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    if (datesRef.current && !datesRef.current.contains(event.target as Node)) {
        appDispatch(setIsCalendarOpen(false));
        appDispatch(setShowCalendarDropDown(false));
    }
};

useEffect(() => {
  document.addEventListener('click', handleClickOutsideDropdown);
  return () => {
      document.removeEventListener('click', handleClickOutsideDropdown);
  };
}, []);

let startDateString = useSelector((store:RootState)=>store.landing.startDateString);
let endDateString = useSelector((store:RootState)=>store.landing.endDateString);

  return (
    <div className="select-dates-container" ref={datesRef}>
                  <div className="select-dates-tag">
                    <FormattedMessage id="selectDates" defaultMessage={"Select dates"}/>*
                  </div>
                  <button
                    className="select-dates"
                    onClick={showCalendarHandler}
                  >
                    <div className="check-in">
                      {/* {startDate === null || undefined ? (
                        <FormattedMessage id="checkIn" defaultMessage={"Check In"}/>
                      ) : (
                        new Date(startDate).toLocaleDateString()
                      )} */}
                      {startDateString === null || undefined ? (
                        <FormattedMessage id="checkIn" defaultMessage={"Check In"}/>
                      ) : (
                        new Date(startDateString).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                      })
                      )}
                    </div>
                    <div className="arrow">
                      <img src="right-arrow.png" alt="right-arrow"></img>
                    </div>
                    <div className="check-out">
                      {/* {endDate === null ? (
                        <FormattedMessage id="checkOut" defaultMessage={"Check Out"}/>
                      ) : (
                        new Date(endDate).toLocaleDateString()
                      )} */}
                      {endDateString === null ? (
                        <FormattedMessage id="checkOut" defaultMessage={"Check Out"}/>
                      ) : (
                        new Date(endDateString).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                      })
                      )}
                    </div>
                    <div className="calander-image">
                      <img src="u_calendar-alt.png" alt="calendar"></img>
                    </div>
                  </button>
                  <div
                    className="date-range-calendar-picker"
                    style={{
                      display: isCalendarOpen === true ? "block" : "none",
                    }}
                  >
                    <DateRangePickerComponent></DateRangePickerComponent>
                    {/* <div className="apply-dates-btn">
                    <div className="price-message">
                    from $132/night
                    </div>
                    <button id="apply-dates-button" disabled={startDate && endDate?false:true} style={{backgroundColor:startDate && endDate?"#120639":"#C1C2C2"}} onClick={applyDatesHandler}>Apply Dates</button>
                    </div> */}
                  </div>
                </div>
  )
}

export default SelectDatesContainer