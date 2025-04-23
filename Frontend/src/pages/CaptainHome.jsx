import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import CaptainRidePopup from '../components/CaptainRidePopup';
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'


import { BiLogOut } from "react-icons/bi";
import CaptainDetails from '../components/CaptainDetails';
import ConfirmRidePopup from '../components/ConfirmRidePopup';

import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking';



const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)
  const location = useLocation()
  const [success, setSuccess] = useState(location.state?.success || '')
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  useEffect(() => {

    if (!captain) return;

    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }
    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()
    // return () => clearInterval(locationInterval);
  }, [])




  socket.on('new-ride', (data) => {
    setRide(data)
    setRidePopupPanel(true)
    // console.log(data) 
  })


  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,

    }, { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    // console.log(response)
    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }



  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      }
      )
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      }
      )
    }
  }, [ridePopupPanel])

  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      }
      )
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      }
      )
    }
  }, [confirmRidePopupPanel])




  return (
    <div className='relative h-screen flex flex-col'>
      {success && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {success}
        </div>
      )}
      <div className='flex justify-between items-center'>
        <img className='w-40' src="/logo.webp" alt="" />
        <Link to='/captains/login' className='home bg-white p-2 rounded-full'>
          <BiLogOut size={25} />
        </Link>
      </div>
      <div className='h-3/5'>
        {/* <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" /> */}
        <LiveTracking/>
      </div>
      <div className='py-5'>
        <CaptainDetails />
      </div>



      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 py-5'>
        <CaptainRidePopup
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 bg-white translate-y-full px-3 py-5'>
        <ConfirmRidePopup
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>


    </div>
  )
}

export default CaptainHome
