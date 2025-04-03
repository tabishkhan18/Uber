import React from 'react'
import { IoLocation } from 'react-icons/io5';
import { MdMyLocation } from "react-icons/md";
import { IoMdCash } from "react-icons/io";

import { IoIosArrowUp } from "react-icons/io";
const WaitingForDriver = (props) => {
    return (
        <div className='w-full h-screen flex flex-col pt-5'>
            <h5 className='p-5 text-center w-[100%]' ><IoIosArrowUp
                onClick={() => {
                    props.setWaitingForDriver(false)
                }}
                className="rotate-180"
                size={30}
            /></h5>
            <div className="flex justify-between items-center p-5">
                <img className='w-40' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                <div className="text-end w-full">
                    <h1 className='font-medium text-lg'>{props.ride?.captain.fullName.firstName}</h1>
                    <h1 className='text-xl font-semibold'>{props.ride?.captain.vehicle.plate}</h1>
                    <h1 className='text-neutral-500 font-medium'>Honda City</h1>
                </div>
            </div>
            <div className="py-5 w-full divide-y divide-neutral-300">
                <div className='flex  gap-5 m-2 py-2 px-5  items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <IoLocation size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-semibold text-lg'>{props.ride?.pickup}</h1>
                    </div>
                </div>
                <div className='flex gap-5 m-2 py-2 px-5  items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <MdMyLocation size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-semibold text-lg'>{props.ride?.destination}</h1>
                    </div>
                </div><div className='flex  gap-5 m-2 py-2 px-5  items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <IoMdCash size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-semibold text-lg'>₹{props.ride?.fare}</h1>
                        <h1 className='font-semibold text-sm text-neutral-500'>Cash, Online</h1>
                    </div>
                </div>
            </div>
            <h1 className='text-center text-2xl py-5 mx-2 font-semibold bg-yellow-300 rounded-lg tracking-[2rem]'>{props.ride?.otp}</h1>

        </div>
    )
}

export default WaitingForDriver
