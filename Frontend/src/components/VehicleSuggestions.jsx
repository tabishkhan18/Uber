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
                props.setVehicleImage("/car.webp"); // Set car image
            }} className=' m-2 p-2 flex gap-2 justify-between items-center border-2 border-white active:border-black rounded-lg'>
                <div className='w-1/4'>
                    <img className='scale-125' src="/car.webp" alt="" />
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
                props.setVehicleImage("/moto.webp"); // Set moto image
            }} className=' m-2 p-2 flex gap-2 justify-between items-center border-2 border-white active:border-black rounded-lg'>
                <div className='w-1/4'>
                    <img className='scale-110' src="/moto.webp" alt="" />
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
                props.setVehicleImage("/auto.webp"); // Set auto image
            }} className=' m-2 p-2 flex gap-2 justify-between items-center border-2 border-white active:border-black rounded-lg'>
                <div className='w-1/4 '>
                    <img className='scale-110' src="/auto.webp" alt="" />
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
