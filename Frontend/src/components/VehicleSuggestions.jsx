import React from 'react'

import { IoIosArrowUp } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";

const VehicleSuggestions = (props) => {

    return (
        <div className='w-full flex flex-col '>

            <div className='flex justify-between items-center p-5'>
                <h1 className='text-2xl font-semibold'>Choose a vehicle</h1>
                <IoIosArrowUp
                    onClick={() => {
                        props.setVehiclePanel(!props.vehiclePanel)
                    }}
                    className="rotate-180 "
                    size={30}
                />
            </div>

            {/* Car */}
            <div onClick={()=>{
                props.setConfirmRide(true)
                props.setVehiclePanel(false)
                props.selectVehicle('car')
                props.setVehicleImage("https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"); // Set car image
            }} className=' m-2 p-2 flex gap-2 justify-between items-center border-2 border-white active:border-black rounded-lg'>
                <div className='w-1/4'>
                    <img className='scale-125' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                </div>
                <div className='w-1/2 flex flex-col '>
                    <h1 className='flex items-center font-semibold gap-2 text-lg'>UberGo <IoMdPerson />4</h1>
                    <h1 className='flex items-center text-sm'>2 mins away</h1>
                    <h1 className='flex items-center text-xs text-neutral-500'>Affordable compact rides</h1>
                </div>
                <div className="w-1/4 text-xl font-semibold text-end">
                ₹{props.fare.car}
                </div>
            </div>

            {/* Motorcycle */}
            <div onClick={()=>{
                props.setConfirmRide(true)
                props.setVehiclePanel(false)
                props.selectVehicle('moto')
                props.setVehicleImage("https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"); // Set moto image
            }} className=' m-2 p-2 flex gap-2 justify-between items-center border-2 border-white active:border-black rounded-lg'>
                <div className='w-1/4'>
                    <img className='scale-110' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                </div>
                <div className='w-1/2 flex flex-col'>
                    <h1 className='flex items-center font-semibold gap-2 text-lg'>Moto <IoMdPerson />1</h1>
                    <h1 className='flex items-center text-sm'>3 mins away</h1>
                    <h1 className='flex items-center text-xs text-neutral-500'>Affordable moto rides</h1>
                </div>
                <div className="w-1/4 text-xl font-semibold text-end">
                ₹{props.fare.moto}
                </div>
            </div>

            {/* Auto */}
            <div onClick={()=>{
                props.setConfirmRide(true)
                props.setVehiclePanel(false)
                props.selectVehicle('auto')
                props.setVehicleImage("https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"); // Set auto image
            }} className=' m-2 p-2 flex gap-2 justify-between items-center border-2 border-white active:border-black rounded-lg'>
                <div className='w-1/4 '>
                    <img className='scale-110' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                </div>
                <div className='w-1/2  flex flex-col '>
                    <h1 className='flex items-center font-semibold gap-2 text-lg'>UberAuto <IoMdPerson />3</h1>
                    <h1 className='flex items-center text-sm'>2 mins away</h1>
                    <h1 className='flex items-center text-xs text-neutral-500'>Affordable auto rides</h1>
                </div>
                <div className="w-1/4  text-xl font-semibold text-end">
                ₹{props.fare.auto}
                </div>
            </div>
        </div>
    )
}

export default VehicleSuggestions
