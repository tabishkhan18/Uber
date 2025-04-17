import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const url = "http://localhost:3000"
    axios.get(`${url}/users/logout`, {
        headers: { 
            Authorization: `Bearer ${token}` 
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            navigate('/users/login')
        }
    })


  return (
    <div>
      User Logout
    </div>
  )
}

export default UserLogout
