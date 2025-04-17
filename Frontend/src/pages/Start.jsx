import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import { HiMiniCodeBracket } from "react-icons/hi2";
const Start = () => {
  return (
    <div>
      <div className='hidden sm:flex justify-center flex-col items-center h-screen bg-black text-white text-2xl font-bold'>
        Use mobile phone to open the app
        <div className="fixed bottom-0 w-full flex justify-between md:p-10 p-5">
          <a href='https://tabishkhan18.github.io/' className='text-neutral-400 md:text-md text-xs font-semibold flex gap-1 hover:text-white hover:underline transition-all duration-100 ease-in-out'>Contact developer @<HiMiniCodeBracket style={{ fontSize: '1rem', fontWeight: 'bold' }} />Tabish</a>
          <h1 className='text-neutral-400 md:text-md text-xs font-semibold hover:text-white hover:underline transition-all duration-100 ease-in-out '><a href="mailto:tabishkhan1811@gmail.com" className='cursor-pointer'>tabishkhan1811@gmail.com</a></h1>
        </div>

      </div>
      <div className='sm:hidden bg-[url(/bg.jpg)] bg-cover flex flex-col h-lvh justify-between'>
        <div>
          <img className='w-40' src="/logo.webp" alt="" />
        </div>
        <div className='p-5 flex flex-col gap-5 bg-white'>
          <h1 className='text-2xl font-bold'>Get Started with Uber</h1>
          <Link to="/users/login" className='flex justify-center items-center bg-black text-white py-3 rounded-lg text-xl'>Continue <IoIosArrowRoundForward className='absolute right-10' size={30} /></Link>
        </div>
      </div>
    </div>
  )
}

export default Start
