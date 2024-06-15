import { useSelector } from "react-redux";
import "../../styles/Footer.style.scss";
import { IntlProvider, FormattedMessage } from "react-intl";
import { RootState } from "../../redux/store/store";

export function Footer() {
  const translations = useSelector((store:RootState)=>store.landing.translations);
  const language = useSelector((store: RootState) => store.landing.language);
  return (
    <IntlProvider locale={language} messages={translations[language]}>
    <div className="footer">
      <div className="footer-component">
        <div className="title">
        <img
                src="/8577ef8274c4ed3327eded84eeb7995f.png"
                alt=""
                 />
        </div>
        <div className="properties">
          <p>&copy; Kickdrum Technology Group LLC.</p>
          <p><FormattedMessage id="footer" defaultMessage={"All rights reserved"}/></p>
        </div>
      </div>
    </div>
    </IntlProvider>
  );
}
