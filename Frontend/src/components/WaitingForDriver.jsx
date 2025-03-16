import React from 'react'
import { IoLocation } from 'react-icons/io5';
import { MdMyLocation } from "react-icons/md";
import { IoMdCash } from "react-icons/io";

const WaitingForDriver = () => {
    return (
        <div className='w-full h-screen flex flex-col pt-5'>
            <div className="flex justify-between items-center p-5">
                <img className='w-40' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                <div className="text-end w-full">
                    <h1 className='font-medium text-lg'>Tabish</h1>
                    <h1 className='text-xl font-semibold'>UP 30 Y 1234</h1>
                    <h1 className='text-neutral-500 font-medium'>Honda City</h1>
                </div>
            </div>
            <div className="py-5 w-full divide-y divide-neutral-300">
                <div className='flex  gap-5 m-2 py-2 px-5  items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <IoLocation size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-semibold text-lg'>Charbagh metro station</h1>
                        <h1 className='font-semibold text-sm text-neutral-500'>Near charbagh railway station, lucknow</h1>
                    </div>
                </div>
                <div className='flex gap-5 m-2 py-2 px-5  items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <MdMyLocation size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-semibold text-lg'>Phoenix Palassio</h1>
                        <h1 className='font-semibold text-sm text-neutral-500'>Amar shaheed path, Gomti nagar, Lucknow</h1>
                    </div>
                </div><div className='flex  gap-5 m-2 py-2 px-5  items-center'>
                    <div className="icon bg-neutral-200 p-2 rounded-full">
                        <IoMdCash size={25} />
                    </div>
                    <div className="location">
                        <h1 className='font-semibold text-lg'>$3.11</h1>
                        <h1 className='font-semibold text-sm text-neutral-500'>Cash, Online</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WaitingForDriver
