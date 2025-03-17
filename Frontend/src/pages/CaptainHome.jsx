import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import CaptainRidePopup from '../components/CaptainRidePopup';
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'


import { BiLogOut } from "react-icons/bi";
import CaptainDetails from '../components/CaptainDetails';
import ConfirmRidePopup from '../components/ConfirmRidePopup';






const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)


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
      <div className=''>
        <img className='w-40 absolute top-8' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
        <Link to='/captains/login' className='home absolute top-12 right-5 bg-white p-2 rounded-full'>
          <BiLogOut size={25} />
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" />
      </div>
      <div className='py-5'>
        <CaptainDetails />
      </div>



      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 bg-white translate-y-full px-3 py-5'>
        <CaptainRidePopup 
        setRidePopupPanel={setRidePopupPanel}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel}  
        />
      </div>

      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 bg-white translate-y-full px-3 py-5'>
        <ConfirmRidePopup 
        setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
        setRidePopupPanel={setRidePopupPanel}
        />
      </div>


    </div>
  )
}

export default CaptainHome
