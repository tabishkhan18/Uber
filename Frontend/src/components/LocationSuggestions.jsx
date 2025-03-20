import React from 'react'
import { IoLocation } from "react-icons/io5";
const LocationSuggestions = ({ suggestions, setVehiclePanel, setLocationPanelArrow, locationPanelArrow,  setLocationPanel, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion);
        } else if (activeField === 'destination') {
            setDestination(suggestion);
        }
        setVehiclePanel(true);
        setLocationPanel(false);
        setLocationPanelArrow(!locationPanelArrow)
    };


    return (

        <div className=''>
            {suggestions.length > 0 ? (
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)}
                        className='flex gap-5 m-2 py-2 px-5 h-24 items-center border-2 border-neutral-200 active:border-black rounded-lg'>
                        <div className="icon bg-neutral-200 p-2 rounded-full">
                            <IoLocation size={25} />
                        </div>
                        <div className="location">
                            <h1 className='text-sm'>{elem}</h1>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No suggestions found</p>
            )}
        </div>
    )
}

export default LocationSuggestions
