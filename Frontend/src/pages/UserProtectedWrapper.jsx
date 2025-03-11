import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'



const UserProtectedWrapper = ({
  children
}) => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/users/login')
      return null
    }
  }, [token])



  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper
