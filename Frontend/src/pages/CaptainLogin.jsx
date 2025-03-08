import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaTaxi } from "react-icons/fa";

const CaptainLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    setCaptainData(
      {
        email: email,
        password: password
      }
    )
    // console.log(captainData)

    setEmail('')
    setPassword('')
  }

  return (
    <div className='flex flex-col justify-between h-screen '>
      <div>
        <div className='flex pt-8 w-full justify-between items-center'>
          <img className='w-40' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
          <FaTaxi className='me-5' size={40} />
        </div>
        <form onSubmit={handleSubmit} className='p-5'>
          <h1 className="text-base my-2">What is your email</h1>
          <input
            className="bg-neutral-200 my-2 p-3 w-full rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="yourname@email.com"
          />
          <h1 className="text-base my-2">Enter Password</h1>
          <input
            className="bg-neutral-200 my-2 p-3 w-full rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <button className='my-5 bg-black w-full py-2 text-lg font-medium text-white  rounded' >Login</button>
        </form>
        <p className='px-5 text-sm'>Join as Captain? <Link to='/captain-signup' className='text-blue-500'>Create New Account</Link></p>
      </div>
      <div className='px-5'>
        <Link to="/user-login" className='my-5 flex justify-center bg-blue-700 w-full py-2 text-lg font-medium text-white  rounded'>
          User Login
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
