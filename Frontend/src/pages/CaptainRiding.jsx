import React, { useRef, useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { IoIosArrowUp } from 'react-icons/io'

import { Link, useLocation } from 'react-router-dom'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

import FinishRide from '../components/FinishRide'


const CaptainRiding = () => {


    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride


    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            }
            )
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            }
            )
        }
    }, [finishRidePanel])


    return (
        <div className='relative h-screen flex flex-col'>
            <div className=''>
                <img className='w-40 absolute top-8' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
                <Link to='/captains/login' className='home absolute top-12 right-5 bg-white p-2 rounded-full'>
                    <BiLogOut size={25} />
                </Link>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" />
            </div>


            <div onClick={() => {
                setFinishRidePanel(true)
            }} className='py-5 flex flex-col justify-between items-center bg-yellow-20 h-1/5'>
                <IoIosArrowUp
                    className=""
                    size={30}
                />
                <div className='flex w-full bg-red-40 justify-center items-center gap-8'>
                    <h1 className='text-lg font-semibold'>4 KMs away</h1>
                    <button className='w-1/2 flex justify-center bg-green-600  py-2 text-lg font-medium text-white  rounded'>
                        Complete Ride
                    </button>
                </div>
            </div>


            <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 py-5'>
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel}
                />
            </div>
        </div>
    )
}

export default CaptainRiding