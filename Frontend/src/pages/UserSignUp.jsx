import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { FaCircleUser } from "react-icons/fa6";


const UserSignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})


  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)


  const handleSubmit = async (e) => {
    e.preventDefault()

    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password
    }


    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/users/home')
    }


    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='flex flex-col justify-between h-screen '>
      <div>
        <div className='flex pt-8 w-full justify-between items-center'>
          <img className='w-40' src="/logo.webp" alt="" />
          <FaCircleUser className='me-5' size={40} />
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
          <button className='my-5 bg-black w-full py-2 text-lg font-medium text-white rounded' >Create Account</button>
        </form>
        <p className='px-5 text-center text-sm'>Already have an Account? <Link to='/users/login' className='text-blue-500'>Login here</Link></p>
      </div>
      <div className='p-5'>
        <p className='text-[10px] text-neutral-500'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to number provided.</p>
      </div>
    </div>
  )
}

export default UserSignUp
