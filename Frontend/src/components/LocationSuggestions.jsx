import React from 'react'
import { IoLocation } from "react-icons/io5";
const LocationSuggestions = ({ suggestions, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion);
        } else if (activeField === 'destination') {
            setDestination(suggestion);
        }
    };


    return (
        <div className=''>
            {suggestions.length > 0 ? (
                suggestions.map((elem, idx) => {
                    // Split words and check length
                    const words = elem.split(" ");
                    const truncatedText =
                        words.length > 8 ? words.slice(0, 8).join(" ") + "..." : elem;
                    return (
                        <div key={idx} onClick={() => handleSuggestionClick(elem)}
                            className='flex gap-5 mx-5 my-2 py-2 px-4 h-20 items-center border-2 border-neutral-100 active:border-black rounded-lg'>
                            <div className="icon bg-neutral-200 p-2 rounded-full">
                                <IoLocation size={25} />
                            </div>
                            <div className="location">
                                <h1 className='text-sm'>{truncatedText}</h1>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="text-center text-gray-500">No suggestions found</p>
            )}
        </div>

    )
}

export default LocationSuggestions
