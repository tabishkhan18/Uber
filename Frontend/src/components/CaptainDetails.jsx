import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

import { IoIosTimer } from "react-icons/io";
import { SlSpeedometer } from "react-icons/sl";
import { LuNotebook } from "react-icons/lu";


const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)

    return (
        <div >
            <div className="flex justify-between items-center px-5 py-2">
                <div className='flex w-1/2 items-center gap-2'>
                    <img className='w-12 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ZT8j1Kg9SVKlDrZaq1E6_VtInBA5CO98I3Q8dr_ydEcfv0a3_5ViL4fLO0j8Pu3hhOQ&usqp=CAU" alt="" />
                    <h1 className='font-medium text-lg capitalize'>
                        {captain ? `${captain.fullName.firstName} ${captain.fullName.lastName}` : "Loading..."}
                    </h1>
                </div>
                <div className="text-end w-1/2">
                    <h1 className='font-medium text-xl'>₹110.26</h1>
                    <h1 className='text-sm font-semibold text-neutral-500'>Earned</h1>
                </div>
            </div>
            <div className="w-full p-2">
                <div className="bg-neutral-100 p-5 flex w-full justify-between rounded-2xl">
                    <div className='flex flex-col items-center'>
                        <IoIosTimer size={25} />
                        <h1 className='font-semibold'>10.5</h1>
                        <h1 className='text-neutral-600 text-xs'>Hours Online</h1>
                    </div>
                    <div className='flex flex-col items-center'>
                        <SlSpeedometer size={25} />
                        <h1 className='font-semibold'>253 KMs</h1>
                        <h1 className='text-neutral-600 text-xs'>Total distance</h1>
                    </div>
                    <div className='flex flex-col items-center'>
                        <LuNotebook size={25} />
                        <h1 className='font-semibold'>24</h1>
                        <h1 className='text-neutral-600 text-xs'>Total jobs </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails
