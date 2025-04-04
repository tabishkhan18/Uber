import React from 'react'
import { MdMyLocation } from "react-icons/md";
import { IoMdCash } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";

import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';


const Riding = () => {

    const location = useLocation()
    const { ride } = location.state || {}

    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on("ride-ended", ()=>{
        navigate('/users/home')
    })




    return (
        <div className='w-full relative h-screen flex flex-col'>
            <div className='h-1/2'>

            <div className='flex justify-between items-center'>
                <img className='w-40' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
                <Link to='/users/home' className='home bg-white p-2 rounded-full'>
                    <AiFillHome size={25} />
                </Link>
            </div>
            <div className='h-4/5'>
                {/* <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" /> */}
                <LiveTracking/>
            </div>
            </div>

            <div className=''>
                <div className="flex justify-between items-center px-5 py-2">
                    <img className='w-40' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                    <div className="text-end w-full">
                        <h1 className='font-medium text-lg'>{ride?.captain.fullName.firstName}</h1>
                        <h1 className='text-xl font-semibold'>{ride?.captain.vehicle.plate}</h1>
                        <h1 className='text-neutral-500 font-medium'>Honda City</h1>
                    </div>
                </div>
                <div className=" w-full ">

                    <div className='flex gap-5 m-2 pb-4 px-5  items-center border-b border-neutral-300'>
                        <div className="icon bg-neutral-200 p-2 rounded-full">
                            <MdMyLocation size={25} />
                        </div>
                        <div className="location">
                            <h1 className='font-semibold'>{ride?.destination.split(" ").length > 8
                                ? ride?.destination.split(" ").slice(0, 8).join(" ") + "..."
                                : ride?.destination}</h1>
                            </div>
                    </div>
                    <div className='flex  gap-5 m-2 py-2 px-5  items-center'>
                        <div className="icon bg-neutral-200 p-2 rounded-full">
                            <IoMdCash size={25} />
                        </div>
                        <div className="location">
                            <h1 className='font-semibold text-lg'>${ride?.fare}</h1>
                            <h1 className='font-semibold text-sm text-neutral-500'>Cash, Online</h1>
                        </div>
                    </div>
                    <div className="mx-5">
                        <button className='w-full flex justify-center bg-green-600  py-2 text-lg font-medium text-white  rounded'>
                            Make a Payment
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Riding
