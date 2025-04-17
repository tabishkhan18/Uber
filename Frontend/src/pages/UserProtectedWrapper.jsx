import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserProtectedWrapper = ({
  children
}) => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)
  const [isLoading, setIsLoading] = useState(true)
  const url = "http://localhost:3000"

  useEffect(() => {
    if (!token) {
      navigate('/users/login')
    }

    axios.get(`${url}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.status === 200) {
        setUser(response.data)
        setIsLoading(false)
      }
    })
      .catch(err => {
        console.log(err)
        localStorage.removeItem('token')
        navigate('/users/login')
      })

  }, [token])


  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1>Loading...</h1>
      </div>
    )
  }


  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper
