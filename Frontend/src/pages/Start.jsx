import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className='bg-[url(https://img.freepik.com/free-photo/vertical-shot-traffic-light-with-number-13-stopwatch_181624-11218.jpg?t=st=1741253308~exp=1741256908~hmac=645a183a897702de34026f6bbb15e87fc5d010ac1d86cdff58685c1735d5af68&w=740)] bg-cover flex flex-col h-lvh justify-between'>
      <div>
        <img className='w-40 pt-8' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
      </div>
      <div className='p-5 flex flex-col gap-5 bg-white'>
        <h1 className='text-2xl font-bold'>Get Started with Uber</h1> 
        <Link to="/users/login" className='flex justify-center items-center bg-black text-white py-3 rounded-lg text-xl'>Continue <IoIosArrowRoundForward className='absolute right-10' size={30}/></Link>
      </div>
    </div>
  )
}

export default Start
