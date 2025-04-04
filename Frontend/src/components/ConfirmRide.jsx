import React from 'react';

import { IoIosArrowUp } from "react-icons/io";
import { IoLocation } from 'react-icons/io5';
import { MdMyLocation } from "react-icons/md";
import { IoMdCash } from "react-icons/io";

const ConfirmRide = (props) => {
    return (
        <div className='w-full h-screen flex flex-col'>
    <div className='flex justify-between items-center p-5'>
        <h1 className='text-2xl font-semibold'>Confirm your ride !</h1>
        <IoIosArrowUp
            onClick={() => {
                props.setConfirmRide(!props.confirmRide)
            }}
            className="rotate-180 my-5"
            size={30}
        />
    </div>
    <div className="flex justify-center py-5">
        <img className='w-56' src={props.vehicleImage} alt="" />
    </div>
    <div className="py-5 w-full divide-y divide-neutral-300">
        <div className='flex gap-5 m-2 py-2 px-5 items-center'>
            <div className="icon bg-neutral-200 p-2 rounded-full">
                <IoLocation size={25} />
            </div>
            <div className="location">
                <h1 className='font-medium'>
                    {props.pickup.split(" ").length > 8 
                        ? props.pickup.split(" ").slice(0, 8).join(" ") + "..." 
                        : props.pickup}
                </h1>
            </div>
        </div>
        <div className='flex gap-5 m-2 py-2 px-5 items-center'>
            <div className="icon bg-neutral-200 p-2 rounded-full">
                <MdMyLocation size={25} />
            </div>
            <div className="location">
                <h1 className='font-medium'>
                    {props.destination.split(" ").length > 8 
                        ? props.destination.split(" ").slice(0, 8).join(" ") + "..." 
                        : props.destination}
                </h1>
            </div>
        </div>
        <div className='flex gap-5 m-2 py-2 px-5 items-center'>
            <div className="icon bg-neutral-200 p-2 rounded-full">
                <IoMdCash size={25} />
            </div>
            <div className="location">
                <h1 className='font-medium text-lg'>₹{props.fare[props.vehicleType]}</h1>
                <h1 className='font-semibold text-xs text-neutral-500'>Cash, Online</h1>
            </div>
        </div>
    </div>
    <div className="submit mx-5">
        <button onClick={() => {
            props.setVehicleFound(true)
            props.setConfirmRide(false)
            props.createRide()
        }} className='w-full flex justify-center bg-green-600 py-2 text-lg font-medium text-white rounded'>
            Confirm Ride
        </button>
    </div>
</div>
    )
}

export default ConfirmRide
