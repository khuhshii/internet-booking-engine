import { useDispatch, useSelector } from "react-redux";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { AppDispatch, RootState } from "../../redux/store/store";
import { setPromoModal } from "../../redux/slice/ItineararySlice";
// import "./PromotionModal.style.scss"
import "./PromotionModal.style.scss";
import { FormattedMessage, FormattedNumber, IntlProvider } from "react-intl";
const PromotionModal = () => {
  const isOpen = useSelector((state: RootState) => state.itinerary.promoModal);
  const appDispatch = useDispatch<AppDispatch>();
  const closeModal = () => {
    appDispatch(setPromoModal(false));
  };
  const promo = useSelector(
    (state: RootState) => state.itinerary.selectedPromo
  );
  const total = useSelector((state: RootState) => state.itinerary.totalPrice);

  const exchangeRates = useSelector((state: RootState) => state.landing.rate);

  const currency = useSelector((state: RootState) => state.landing.currency);
  // console.log(promo);
  return (
    <div className="main-promo">
      <Modal open={isOpen} onClose={closeModal} center>
        <div className="details">
          <h2>{promo.promotion_title}</h2>
          <p>{promo.promotion_description}</p>

          <div className="total">
            <div>
              <FormattedMessage
                id="packageTotal"
                defaultMessage={"Package Total"}
              />
            </div>
            <IntlProvider locale="en">
              <div>
                <FormattedNumber
                  style="currency"
                  currency={currency}
                  value={total * exchangeRates[currency.toUpperCase()]}
                  maximumFractionDigits={0}
                />
                {/* ${total} */}
              </div>
            </IntlProvider>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PromotionModal;
