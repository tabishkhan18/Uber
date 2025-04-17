import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import { FaTaxi } from "react-icons/fa";

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const url = "http://localhost:3000"
  // Clear error popup after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const captain = { email, password }
      const response = await axios.post(`${url}/captains/login`, captain)
      if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captains/home', { state: { success: 'Login successful!' } })
      }
    } catch (err) {
      setError('Email or password is wrong')
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className='flex flex-col justify-between h-screen relative'>
      {error && (
        <div className="fixed top-2 left-1/3 transform -translate-x-1/4 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {error}
        </div>
      )}
      <div>
        <div className='flex w-full justify-between items-center'>
          <img className='w-40' src="/logo.webp" alt="" />
          <FaTaxi className='me-5' size={40} />
        </div>
        <form onSubmit={handleSubmit} className='p-5'>
          <h1 className="text-base my-2">Enter email</h1>
          <input
            className="bg-neutral-200 my-2 p-3 w-full rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="yourname@email.com"
          />
          <h1 className="text-base my-2">Enter password</h1>
          <input
            className="bg-neutral-200 my-2 p-3 w-full rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <button className='my-5 bg-black w-full py-2 text-lg font-medium text-white rounded'>Login</button>
        </form>
        <p className='px-5 text-sm'>Join as Captain? <Link to='/captains/register' className='text-blue-500'>Create New Account</Link></p>
      </div>
      <div className='px-5'>
        <Link to="/users/login" className='my-5 flex justify-center bg-blue-700 w-full py-2 text-lg font-medium text-white rounded'>
          Login as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
