import React from 'react'

import { IoIosArrowUp, IoMdCash } from 'react-icons/io'
import { IoLocation } from 'react-icons/io5'
import { MdMyLocation } from 'react-icons/md'

const CaptainRidePopup = (props) => {
    return (
        <div className='w-full bg-red-30 flex flex-col'>
            <div className='flex justify-between items-center px-2'>
                <h1 className='text-2xl font-semibold'>New ride availabe!</h1>
                <IoIosArrowUp
                    onClick={() => {
                        props.setRidePopupPanel(false)
                    }}
                    className="rotate-180 my-5"
                    size={30}
                />
            </div>
            <div className="flex bg-neutral-100 rounded-lg justify-between items-center px-2 py-2">
                <div className='flex w-full items-center gap-2'>
                    <img className='w-12 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ZT8j1Kg9SVKlDrZaq1E6_VtInBA5CO98I3Q8dr_ydEcfv0a3_5ViL4fLO0j8Pu3hhOQ&usqp=CAU" alt="" />
                    <h1 className='font-medium text-lg'>{props.ride?.user.fullName.firstName}</h1>
                </div>
                <div className="text-end w-full">
                    <h1 className='font-medium text-lg'>12 KMs</h1>
                </div>
            </div>
            <div className="py-5 w-full divide-y divide-neutral-300">
                <div className='flex  gap-5 m-2 p-2 items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <IoLocation size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-semibold'>{props.ride?.pickup}</h1>
                    </div>
                </div>
                <div className='flex gap-5 m-2 p-2 items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <MdMyLocation size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-semibold'>{props.ride?.destination}</h1>
                    </div>
                </div>
                <div className='flex  gap-5 m-2 p-2 items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <IoMdCash size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-semibold text-lg'>₹{props.ride?.fare}</h1>
                        <h1 className='font-semibold text-sm text-neutral-500'>Cash, Online</h1>
                    </div>
                </div>

            </div>
            <div className="flex gap-4">
                <button onClick={() => {
                     props.setRidePopupPanel(false)
                }} className='w-1/2 flex justify-center bg-neutral-300  py-2 text-lg font-medium  rounded'>
                    Ignore
                </button>
                <button onClick={() => {
                    props.setConfirmRidePopupPanel(true)
                    props.confirmRide()
                }} className='w-1/2 flex justify-center bg-black  py-2 text-lg font-medium text-white  rounded'>
                    Accept
                </button>
            </div>

        </div>
    )
}

export default CaptainRidePopup
