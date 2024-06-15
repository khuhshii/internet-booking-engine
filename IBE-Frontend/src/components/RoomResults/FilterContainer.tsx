import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { setBedFilter, setPriceFilters, setRoomTypeFilter } from '../../redux/slice/RoomSearchSlice';
import { FormattedMessage } from 'react-intl';

function FilterContainer() {

    const [bedTypeDropdown,setBedTypeDropdown] = useState(false);
    const [roomTypeDropdown,setRoomTypeDropdown] = useState(false);
    const [priceDropdown,setPriceDropdown] = useState(false);

    const appDispatch = useDispatch<AppDispatch>();

    function handleBedDropDown(){
        setBedTypeDropdown(!bedTypeDropdown);
    }

    function handleRoomTypeDropDown(){
        setRoomTypeDropdown(!roomTypeDropdown);
    }

    function handlePriceDropDown(){
        setPriceDropdown(!priceDropdown);
    }

    function bedFilterHandler(e:React.ChangeEvent<HTMLInputElement>){
      appDispatch(setBedFilter(e.currentTarget.name))
    }
    function bedTypeOptionsHandler(name:string){
      appDispatch(setBedFilter(name));
    }

    const bedTypeFilters = useSelector((store:RootState)=>store.roomSearch.bedTypeFilters);

    function roomTypeFilterHandler(e:React.ChangeEvent<HTMLInputElement>){
      appDispatch(setRoomTypeFilter(e.currentTarget.name))
    }

    const roomTypeFilter = useSelector((store:RootState)=>store.roomSearch.roomTypeFilters);

    const priceFilter = useSelector((store:RootState)=>store.roomSearch.priceFilters);

    function priceTypeFilter(e:React.ChangeEvent<HTMLInputElement>){
      appDispatch(setPriceFilters(e.currentTarget.name))
    }

    function roomTypeOptionHandler(name:string){
      appDispatch(setRoomTypeFilter(name))
    }

    function priceTypeOptionHandler(name:string){
      appDispatch(setPriceFilters(name));
    }

    const propertyConfigs = useSelector((store:RootState)=>store.landing.initialPropertyConfiguration);
  return (
            <div className='filter-options-container'>

              <div className="filter-name-drop-down" style={{display:propertyConfigs.filterTypes[0]?.active===true?"block":"none"}}>
                <button className="filter-header" onClick={handleBedDropDown}>
                  <div className="filter-name"><FormattedMessage id="beds" defaultMessage="Bed Type"/> <FormattedMessage id="type"/></div>
                  <div className="drop-down">
                    <img src={bedTypeDropdown?"up-arrow.png":"roomsearch-drop-down.png"} alt="drop-down"></img>
                  </div>
                </button>
                <div className="filter-options" style={{display:bedTypeDropdown?"block":"none"}}>
                  {propertyConfigs.bedType.map((bedFilterType)=>{
                    return (
                      bedFilterType.active===true?
                      <div className="option">
                    <div className="checkbox">
                      <input type="checkbox" checked = {bedTypeFilters.includes(bedFilterType.name)} name={bedFilterType.name} onChange={(e)=>bedFilterHandler(e)}></input>
                    </div>
                    <div className="option-details" onClick={()=>{bedTypeOptionsHandler(bedFilterType.name)}}>{bedFilterType.name}</div>
                  </div>:""
                    )
                  })}
                </div>
              </div>
              <div className="filter-name-drop-down" style={{display:propertyConfigs.filterTypes[1]?.active===true?"block":"none"}}>
                <button className="filter-header" onClick={handleRoomTypeDropDown}>
                  <div className="filter-name"><FormattedMessage id="rooms" defaultMessage="Room"/> <FormattedMessage id="type"/></div>
                  <div className="drop-down">
                    <img src={roomTypeDropdown?"up-arrow.png":"roomsearch-drop-down.png"} alt="drop-down"></img>
                  </div>
                </button>
                <div className="filter-options" style={{display:roomTypeDropdown?"block":"none"}}>
                {propertyConfigs.roomType.map((roomFilterType)=>{
                    return (
                      roomFilterType.active===true?
                      <div className="option">
                    <div className="checkbox">
                      <input type="checkbox" checked = {roomTypeFilter.includes(roomFilterType.name)} name={roomFilterType.name} onChange={(e)=>roomTypeFilterHandler(e)}></input>
                    </div>
                    <div className="option-details" onClick={()=>{roomTypeOptionHandler(roomFilterType.name)}}>{roomFilterType.name}</div>
                  </div>:""
                    )
                  })}
                </div>
              </div>
              <div className="filter-name-drop-down" style={{display:propertyConfigs.filterTypes[2]?.active===true?"block":"none"}}>
                <button className="filter-header" onClick={handlePriceDropDown}>
                  <div className="filter-name"><FormattedMessage id="price" defaultMessage="Price"/></div>
                  <div className="drop-down">
                    <img src={priceDropdown?"up-arrow.png":"roomsearch-drop-down.png"} alt="drop-down"></img>
                  </div>
                </button>
                <div className="filter-options" style={{display:priceDropdown?"block":"none"}}>
                {propertyConfigs.price.map((priceFilterType)=>{
                    return (
                      priceFilterType.active===true?
                      <div className="option">
                    <div className="checkbox">
                      <input type="checkbox" checked = {priceFilter.includes(priceFilterType.name)} name={priceFilterType.name} onChange={(e)=>priceTypeFilter(e)}></input>
                    </div>
                    <div className="option-details" onClick={()=>priceTypeOptionHandler(priceFilterType.name)}>&lt;=&nbsp;${priceFilterType.name}</div>
                  </div>:""
                    )
                  })}
                </div>
              </div>
              </div>
  )
}

export default FilterContainer