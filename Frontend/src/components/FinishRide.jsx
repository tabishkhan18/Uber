import React from 'react'
import { IoIosArrowUp, IoMdCash } from 'react-icons/io'
import { IoLocation } from 'react-icons/io5'
import { MdMyLocation } from 'react-icons/md'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {

    const navigate = useNavigate()
    const url = "http://localhost:3000"
    async function endRide() {
        const response = await axios.post(`${url}/rides/end-ride`, {

            rideId: props.ride._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captains/home')
        }

    }

    return (
        <div className='w-full h-screen py-5 bg-red-30 flex flex-col'>
            <div className='flex justify-between items-center px-2'>
                <h1 className='text-2xl font-semibold'>Finish Ride!</h1>
                <IoIosArrowUp
                    onClick={() => {
                        props.setFinishRidePanel(false)
                    }}
                    className="rotate-180 my-5"
                    size={30}
                />
            </div>
            <div className="flex bg-neutral-100 rounded-lg justify-between items-center px-2 py-2">
                <div className='flex w-full items-center gap-2'>
                    <img className='w-12 object-cover rounded-full' src="/user.jpg" alt="" />
                    <h1 className='font-medium text-lg'>{props.ride?.user.fullName.firstName}</h1>
                </div>
                <div className="text-end w-full">
                    <h1 className='font-medium text-lg'>0 KMs</h1>
                </div>
            </div>
            <div className="py-5 w-full divide-y divide-neutral-300">
                <div className='flex  gap-5 m-2 p-2 items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <IoLocation size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-semibold text-lg'>{props.ride?.pickup}</h1>
                    </div>
                </div>
                <div className='flex gap-5 m-2 p-2 items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <MdMyLocation size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-semibold text-lg'>{props.ride?.destination}</h1>
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
            <div className="flex flex-col gap-4 mt-5">
                <button
                onClick={endRide}
                className='w-full flex justify-center bg-green-600  py-2 text-lg font-medium text-white  rounded'>
                    Finish Ride
                </button>
                <p className='text-xs mt-10 text-red-500'>Before clicking on <span className='text-black'>Finish Ride</span> button, make sure that you recieve the payment.</p>
            </div>
        </div>
    )
}

export default FinishRide