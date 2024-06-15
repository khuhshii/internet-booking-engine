import { useState } from "react";
import IteanaryContainer from "./IteanaryContainer";
import "./MobileItinerary.style.scss"

interface MobileItenaryProps {
    buttonText: string;
    onButtonClick: () => void;
  }
  
  const MobileItenaryComponent: React.FC<MobileItenaryProps> = ({ buttonText, onButtonClick }) => {
   const [mobileFilterDropDown, setMobileFilterDropDown] = useState(false);

  function handleMobileFilterDropDown() {
    setMobileFilterDropDown(!mobileFilterDropDown);
  }

  return (
    <div className="mobile-itinerary-component">
      <button
        className="mobile-filter-button"
        onClick={handleMobileFilterDropDown}
      >
        <div className="narrow-text">Show Itinerary</div>
        <div className="dropdown-image">
          <img
            src={
              mobileFilterDropDown ? "up-arrow.png" : "roomsearch-drop-down.png"
            }
            alt="drop-down"
          ></img>
        </div>
      </button>
      <div
        className="narrow-options"
        style={{ display: mobileFilterDropDown ? "block" : "none" }}
      >
         <IteanaryContainer
          buttonText={buttonText}
          onButtonClick={onButtonClick}
        />
      </div>
    </div>
  );
}

export default MobileItenaryComponent;
