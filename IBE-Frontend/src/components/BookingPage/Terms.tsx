import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { AppDispatch, RootState } from "../../redux/store/store";
import "./PromotionModal.style.scss";
import { setTermModal } from "../../redux/slice/ItineararySlice";
import { FormattedMessage } from "react-intl";
const Terms = () => {
  const isOpen = useSelector((state: RootState) => state.itinerary.termModal);
  const appDispatch = useDispatch<AppDispatch>();
  const closeModal = () => {
    appDispatch(setTermModal(false));
  };

  return (
    <div className="main-promo">
      <Modal open={isOpen} onClose={closeModal} center>
        <div className="details">
          <h2>
            <FormattedMessage
              id="termsConditions"
              defaultMessage={"Terms and Conditions"}
            />
          </h2>

          <ul style={{ padding: "20px", lineHeight: "170%", fontSize: "18px" }}>
            <li>
              <FormattedMessage
                id="checkInCheckOut"
                defaultMessage={"Check-In: 3:00 PM; Check-Out: 11:00 AM."}
              />
            </li>
            <li>
              <FormattedMessage
                id="checkOutDateChange"
                defaultMessage={
                  "You have the option to change your check out date at any time prior to check-in or at check-in without being charged an early departure assessment. However, in the event you decide to checkout prior to your confirmed departure date, you will be charged an early departure assessment in the amount equal to the applicable rate and taxes you were quoted for the night you are departing."
                }
              />
            </li>
            <li>
              <FormattedMessage
                id="creditCardDeposit"
                defaultMessage={
                  "None of the above related to changes to check-out date applies to Advance Purchase, Non-refundable bookings."
                }
              />
            </li>
            <li>
              <FormattedMessage
                id="firstNightDeposit"
                defaultMessage={
                  "First night room and tax deposit required for confirmation."
                }
              />
            </li>
            <li>
              <FormattedMessage
                id="nonrefundableCancellation"
                defaultMessage={
                  "Deposit is nonrefundable for cancellations received less than 72 hours prior to 4:00pm Pacific Time on arrival date."
                }
              />
            </li>
            <li>
              <FormattedMessage
                id="selfParking"
                defaultMessage={
                  "Self-parking at Resort is complimentary for all guests and visitors. Valet parking incurs a nominal fee."
                }
              />
            </li>
            <li>
              <FormattedMessage
                id="estimatedTaxes"
                defaultMessage={
                  "Estimated taxes are based on the current tax rate (subject to change as permitted by applicable law). Additional taxes, if any, will be due upon check-in."
                }
              />
            </li>
            <li>
              <FormattedMessage
                id="creditCardDeposit"
                defaultMessage={
                  "Credit Card deposit of $25 per night, maximum of $100 is required for all reservations, at check in."
                }
              />
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default Terms;
