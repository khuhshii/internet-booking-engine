import React from "react";
import "./DealCard.styles.scss";
import { FormattedMessage, FormattedNumber, IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

interface CardProps {
  dealName: string;
  description: string;
  price: number;
  onSelectDeal: () => void;
  isDisabled?: boolean; // Add isDisabled prop
  disabledMessage?: string;
}

const Card: React.FC<CardProps> = ({
  dealName,
  description,
  price,
  onSelectDeal,
  isDisabled = false, // Default isDisabled to false
  // disabledMessage = "This deal is not available",
}) => {
  const exchangeRates = useSelector((state: RootState) => state.landing.rate);

  const currency = useSelector((state: RootState) => state.landing.currency);
  return (
    // <div className="card">
    <div className={`card ${isDisabled ? "disabled" : ""}`}>
      <div className="title-desc">
        <div className="dealname">{dealName}</div>
        <div className="desc">{description}</div>
      </div>
      <div className="price-select">
        <IntlProvider locale="en">
          <div className="price">
            <FormattedNumber
              style="currency"
              currency={currency}
              value={price * exchangeRates[currency.toUpperCase()]}
              maximumFractionDigits={0}
            />
          </div>
        </IntlProvider>
        <div className="pernight">
          <FormattedMessage id="from" defaultMessage={"per"} />
          &nbsp;
          <FormattedMessage id="night" defaultMessage={"night"} />
        </div>
        {/* <div className="btn">
          <button onClick={onSelectDeal}>
            <FormattedMessage
              id="selectedPackage"
              defaultMessage={"SELECT PACKAGE"}
            />
          </button>{" "}
        </div> */}
        <div className={`btn ${isDisabled ? "disabled" : ""}`}>
          <button onClick={onSelectDeal} disabled={isDisabled}>
            {isDisabled ? (
              <FormattedMessage
              id="notApplicable"
              defaultMessage={"NOT APPLICABLE"}
            />
            ) : (
              <FormattedMessage
                id="selectedPackage"
                defaultMessage={"SELECT PACKAGE"}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
