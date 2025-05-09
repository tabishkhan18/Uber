import React from 'react'

import { IoLocation } from 'react-icons/io5';
import { MdMyLocation } from "react-icons/md";
import { IoMdCash } from "react-icons/io";

import { IoIosArrowUp } from "react-icons/io";

const LookingForDriver = (props) => {
    return (
        <div className='w-full h-screen flex flex-col '>

            <div className='flex justify-between items-center px-5 py-10'>
                <h1 className='text-2xl font-semibold'>Looking for a driver...!</h1>
                <IoIosArrowUp
                    onClick={() => {
                        props.setVehicleFound(false)
                    }}
                    className="rotate-180 my-5"
                    size={30}
                />
            </div>
            <div className="flex justify-center py-5">
                <img className='w-56' src={props.vehicleImage} alt="" />
            </div>
            <div className="py-5 w-full divide-y divide-neutral-300">
                <div className='flex  gap-5 m-2 py-2 px-5  items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <IoLocation size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-medium'>
                            {props.pickup.split(" ").length > 8
                                ? props.pickup.split(" ").slice(0, 8).join(" ") + "..."
                                : props.pickup}</h1>
                    </div>
                </div>
                <div className='flex gap-5 m-2 py-2 px-5  items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <MdMyLocation size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-medium'>
                            {props.destination.split(" ").length > 8
                                ? props.destination.split(" ").slice(0, 8).join(" ") + "..."
                                : props.destination}</h1>
                    </div>
                </div><div className='flex  gap-5 m-2 py-2 px-5  items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <IoMdCash size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-medium text-lg'>₹{props.fare[props.vehicleType]}</h1>
                        <h1 className='font-semibold text-sm text-neutral-500'>Cash, Online</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LookingForDriver
