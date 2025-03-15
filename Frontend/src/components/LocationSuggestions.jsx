import React from 'react'
import { IoLocation } from "react-icons/io5";
const LocationSuggestions = (props) => {

    const locations = [
        {
            name: 'Awadh Restaurant',
            address: 'Near bus stand, Maulaganj',
            fullAddress: ' Maulaganj, Shahabad, Hardoi 241124'
        },
        {
            name: 'Phoenix Palassio',
            address: 'Amar shaheed path',
            fullAddress: 'Gomti nagar, Lucknow 226010'
        },
        {
            name: 'Charbagh metro station',
            address: 'Near charbagh railway station',
            fullAddress: 'Charbagh, Lucknow 226004'
        },
        {
            name: 'Charbagh metro station',
            address: 'Near charbagh railway station',
            fullAddress: 'Charbagh, Lucknow 226004'
        },
        {
            name: 'Charbagh metro station',
            address: 'Near charbagh railway station',
            fullAddress: 'Charbagh, Lucknow 226004'
        },
        {
            name: 'Charbagh metro station',
            address: 'Near charbagh railway station',
            fullAddress: 'Charbagh, Lucknow 226004'
        },
        {
            name: 'Charbagh metro station',
            address: 'Near charbagh railway station',
            fullAddress: 'Charbagh, Lucknow 226004'
        },
    ]


    return (

        <div className=''>
            { locations.map(function(elem, idx){
                return <div key={idx} onClick={()=>{
                    props.setVehiclePanel(true)
                    props.setLocationPanel(false)
                }} className='flex gap-5 m-2 py-2 px-5  items-center border-2 border-white active:border-black rounded-lg'>
                <div className="icon bg-neutral-200 p-2 rounded-full">
                    <IoLocation size={25} />
                </div>
                <div className="location">
                    <h1 className='font-semibold'>{elem.name}</h1>
                    <h1 className='font-semibold text-sm text-neutral-500'>{elem.address}</h1>
                    <h1 className='font-semibold text-sm text-neutral-500'>{elem.fullAddress}</h1>
                </div>

            </div>
            })}
        </div>
    )
}

export default LocationSuggestions
