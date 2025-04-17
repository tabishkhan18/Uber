import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios'

import { FaTaxi } from "react-icons/fa";



const CaptainSignUp = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')




  const [captainData, setCaptainData] = useState({})

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const url = "https://uber-2l9q.onrender.com"

  const handleSubmit = async (e) => {
    e.preventDefault()
    const captainData =
      {
        fullName: {
          firstName: firstName,
          lastName: lastName,
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType
        }
      }
    
    const response = await axios.post(`${url}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captains/home')
    }

    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }


  return (
    <div className='flex flex-col justify-between h-screen '>
      <div>
        <div className='flex pt-8 w-full justify-between items-center'>
          <img className='w-40' src="/logo.webp" alt="" />
          <FaTaxi className='me-5' size={40} />
        </div>
        <form onSubmit={handleSubmit} className='p-5'>
          <h1 className="text-base my-2">What is your full name?</h1>
          <div className='flex gap-5'>

            <input
              className="bg-neutral-200 my-2 p-3 w-1/2 rounded placeholder:text-sm"

              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
            />
            <input
              className="bg-neutral-200 my-2 p-3 w-1/2 rounded placeholder:text-sm"

              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>


          <h1 className="text-base my-2">What is your email?</h1>
          <input
            className="bg-neutral-200 my-2 p-3 w-full rounded placeholder:text-sm"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="yourname@email.com"
          />
          <h1 className="text-base my-2">Create a password</h1>
          <input
            className="bg-neutral-200 my-2 p-3 w-full rounded placeholder:text-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />



          <h3 className='text-base mt-4 mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-neutral-200 w-1/2 rounded p-3 placeholder:text-sm'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-neutral-200 w-1/2 rounded p-3 placeholder:text-sm'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-neutral-200 w-1/2 rounded p-3 placeholder:text-sm'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-neutral-200 w-1/2 rounded p-3 placeholder:text-sm'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Vehicle Type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
          </div>




          <button className='my-5 bg-black w-full py-2 text-lg font-medium text-white  rounded' >Create Account</button>
        </form>
        <p className='px-5 text-sm'>Already have an account? <Link to='/captains/login' className='text-blue-500'>Login here</Link></p>
      </div>
      <div className='p-5'>
        <p className='text-[10px] text-neutral-500'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to number provided.</p>
      </div>
    </div>
  )
}

export default CaptainSignUp
