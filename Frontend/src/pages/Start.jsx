import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className='bg-[url(/bg.jpg)] bg-cover flex flex-col h-lvh justify-between'>
      <div>
        <img className='w-40' src="/logo.webp" alt="" />
      </div>
      <div className='p-5 flex flex-col gap-5 bg-white'>
        <h1 className='text-2xl font-bold'>Get Started with Uber</h1> 
        <Link to="/users/login" className='flex justify-center items-center bg-black text-white py-3 rounded-lg text-xl'>Continue <IoIosArrowRoundForward className='absolute right-10' size={30}/></Link>
      </div>
    </div>
  )
}

export default Start
