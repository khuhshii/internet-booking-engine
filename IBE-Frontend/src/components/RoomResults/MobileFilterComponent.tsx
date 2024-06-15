import  { useState } from 'react'
import FilterContainer from './FilterContainer'
import { FormattedMessage } from 'react-intl';

function MobileFilterComponent() {

    const [mobileFilterDropDown,setMobileFilterDropDown] = useState(false);

    function handleMobileFilterDropDown(){
        setMobileFilterDropDown(!mobileFilterDropDown);
    }
  return (
    <div className="mobile-filter-component">
            <button className="mobile-filter-button" onClick={handleMobileFilterDropDown}>
              <div className="narrow-text">
              <FormattedMessage id="narrow"/>
              </div>
              <div className="dropdown-image">
              <img src={mobileFilterDropDown?"up-arrow.png":"roomsearch-drop-down.png"} alt="drop-down"></img>
            </div>
            </button>
            <div className="narrow-options" style={{display:mobileFilterDropDown?"block":"none"}}>
              <FilterContainer/>
            </div>
            
          </div>
  )
}

export default MobileFilterComponent