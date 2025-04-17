import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const CaptainProtectedWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)
    const url = "http://localhost:3000"

    useEffect(() => {
        if (!token) {
            navigate('/captains/login')
            return null
        }


        axios.get(`${url}/captains/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        }).catch((error) => {
            console.log(error)
            localStorage.removeItem('token')
            navigate('/captains/login')
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

export default CaptainProtectedWrapper