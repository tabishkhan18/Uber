import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const url = "http://localhost:3000"
    axios.get(`${url}/captains/logout`, {
        headers: { 
            Authorization: `Bearer ${token}` 
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            navigate('/captains/login')
        }
    })

  return (
    <div>
      Captain Logout
    </div>
  )
}

export default CaptainLogout
