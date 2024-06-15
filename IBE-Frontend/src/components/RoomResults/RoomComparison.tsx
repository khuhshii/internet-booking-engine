import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import "./RoomComparison.styles.scss";
import { clearSelectedRooms } from "../../redux/slice/RoomPageSlice";
import { FormattedMessage, FormattedNumber, IntlProvider } from "react-intl";

export function RoomComparison() {
  const selectedRoom = useSelector(
    (store: RootState) => store.roomPage.selectedRoomsComparison
  );
  const [comparisonVisible, setComparisonVisible] = useState(false);
  const handleCompare = () => {
    setComparisonVisible(true);
  };

  const handleClose = () => {
    setComparisonVisible(false);
  };

  const formatRoomTypeName = (roomTypeName: string): string => {
    return roomTypeName.replace(/_/g, " ");
  };

  const dispatch = useDispatch();
  const handleClearComparison = () => {
    setComparisonVisible(false);
    dispatch(clearSelectedRooms());
  };
  const currency = useSelector((state: RootState) => state.landing.currency);
  const exchangeRates = useSelector((state: RootState) => state.landing.rate);

  return (
    // <div
    // className={`room-comparison${comparisonVisible ? " active" : ""}`}
    <div
      className={`room-comparison${comparisonVisible ? " active" : ""}`}
      style={{ display: selectedRoom.length < 1 ? "none" : "block" }}
    >
      <div className="button-selection">
        <div className="heading">
          <FormattedMessage
            id="roomComparisonResult"
            defaultMessage="Room Comparison Result"
          />
        </div>
        <div className="btns">
          {comparisonVisible ? (
            <button onClick={handleClose}>
              <FormattedMessage
                id="closeCompare"
                defaultMessage="Close Compare"
              />
            </button>
          ) : (
            <button onClick={handleCompare}>
              <FormattedMessage id="compare" defaultMessage="Compare" />
            </button>
          )}
          <button onClick={handleClearComparison}>
            <FormattedMessage
              id="clearComparison"
              defaultMessage="Clear Comparison"
            />
          </button>
        </div>
      </div>
      {comparisonVisible && (
        <div className="comparison-tab">
          <ul>
            <li>
              <p>
                <FormattedMessage id="name" defaultMessage="Name" />
              </p>
              <p>
                <FormattedMessage
                  id="nightlyRate"
                  defaultMessage="Nightly Rates"
                />
              </p>
              <p>
                <FormattedMessage id="doubleBed" defaultMessage="Double Bed" />
              </p>
              <p>
                <FormattedMessage id="singleBed" defaultMessage="Single Bed" />
              </p>
              <p>
                <FormattedMessage id="area" defaultMessage="Area" />
              </p>
              <p>
                <FormattedMessage
                  id="averageRatings"
                  defaultMessage="Average Ratings"
                />
              </p>
            </li>
            {selectedRoom.map((room) => (
              <li key={room.room_type_id}>
                <p>{formatRoomTypeName(room.room_type_name)}</p>
                <p>
                  <IntlProvider locale="en">
                    <span>
                      <FormattedNumber
                        style="currency"
                        currency={currency}
                        value={
                          room.minRates * exchangeRates[currency.toUpperCase()]
                        }
                        maximumFractionDigits={0}
                      />
                    </span>
                  </IntlProvider>
                </p>
                <p>{room.double_bed}</p>
                <p>{room.single_bed}</p>
                <p>{room.area_in_square_feet}</p>
                <p>{room.ratings.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
