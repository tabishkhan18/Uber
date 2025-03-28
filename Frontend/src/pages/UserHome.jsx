import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { IoIosArrowUp } from "react-icons/io";
import LocationSuggestions from '../components/LocationSuggestions';
import VehicleSuggestions from '../components/VehicleSuggestions';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { Link } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";


const UserHome = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)

  const [locationPanel, setLocationPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const [locationPanelArrow, setLocationPanelArrow] = useState(false)

  const locationPanelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRideRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)



  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    setActiveField('pickup');
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          input: e.target.value
        }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data)
      console.log(data.map(item => item.text))
      setPickupSuggestions(data.map(item => item.text))
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    setActiveField('destination');
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ input: e.target.value })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Parse JSON response
      console.log(data.map(item => item.text))
      setDestinationSuggestions(data.map(item => item.text));
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
    }
  };


  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitted');
  }

  useGSAP(function () {
    if (locationPanel) {
      gsap.to(locationPanelRef.current, {
        height: '65%'
      }
      )
    } else {
      gsap.to(locationPanelRef.current, {
        height: '0%'
      }
      )
    }
  }, [locationPanel])


  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      }
      )
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      }
      )
    }
  }, [vehiclePanel])


  useGSAP(function () {
    if (confirmRide) {
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(0)'
      }
      )
    } else {
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(100%)'
      }
      )
    }
  }, [confirmRide])


  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      }
      )
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      }
      )
    }
  }, [vehicleFound])



  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      }
      )
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      }
      )
    }
  }, [waitingForDriver])



  return (
    <div>
      <div className="h-screen relative overflow-hidden">
        <div className=''>
          <img className='w-40 absolute top-8' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
          <Link to='/users/logout' className='home absolute top-12 right-5 bg-white p-2 rounded-full'>
            <BiLogOut size={25} />
          </Link>
        </div>
        <div className='h-3/5'>
          <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" />
        </div>
        <div className='h-screen absolute bottom-0 right-0 w-full flex flex-col justify-end '>
          <div className='bg-white p-5 flex flex-col gap-5 relative h-[35%] rounded-t-xl'>
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl font-semibold'>Find a trip</h1>
              <IoIosArrowUp
                onClick={() => {
                  setLocationPanel(!locationPanel)
                  setLocationPanelArrow(!locationPanelArrow)
                }}
                className={`transform ${locationPanelArrow ? 'rotate-180' : ''}`}
                size={30}
              />
            </div>
            <form onSubmit={(e) => {
              submitHandler(e)
            }} className='flex flex-col gap-5'>
              <div className="line bg-neutral-500 h-20 w-[3px] rounded-full absolute left-10 bottom-16"></div>
              <input
                value={pickup}

                onClick={() => {
                  setLocationPanel(true)
                  setLocationPanelArrow(true)
                }}
                onChange={handlePickupChange}
                className='bg-neutral-200 px-10 py-3 rounded w-full'
                type="text"
                placeholder='Add a pick-up location'
              />
              <input
                value={destination}
                onClick={() => {
                  setLocationPanel(true)
                  setLocationPanelArrow(true)
                }}
                onChange={handleDestinationChange}
                className='bg-neutral-200 px-10 py-3 rounded w-full'
                type="text"
                placeholder='Enter your destination'
              />
            </form>
          </div>
          <div ref={locationPanelRef} className='h-[0%] bg-white overflow-y-scroll'>
            <LocationSuggestions
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              setLocationPanel={setLocationPanel}
              setVehiclePanel={setVehiclePanel}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
              setLocationPanelArrow={setLocationPanelArrow}
              locationPanelArrow={locationPanelArrow}
            />
          </div>
        </div>

        <div ref={vehiclePanelRef} className='w-full fixed z-10 bottom-0 rounded-lg translate-y-full bg-white py-5 h-fit'>
          <VehicleSuggestions
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel}
            setConfirmRide={setConfirmRide}
          />
        </div>

        <div ref={confirmRideRef} className='w-full fixed z-10 bottom-0 rounded-lg translate-y-full bg-white py-5 h-fit'>
          <ConfirmRide
            confirmRide={confirmRide}
            setConfirmRide={setConfirmRide}
            setVehicleFound={setVehicleFound}
          />

        </div>
        <div ref={vehicleFoundRef} className='w-full fixed z-10 bottom-0 rounded-lg translate-y-full bg-white py-5 h-fit'>
          <LookingForDriver
            vehicleFound={vehicleFound}
            setVehicleFound={setVehicleFound}
          />
        </div>
        <div ref={waitingForDriverRef} className='w-full fixed z-10 bottom-0 rounded-lg translate-y-full  bg-white py-5 h-fit'>
          <WaitingForDriver waitingForDriver={waitingForDriver} />
        </div>


      </div>
    </div>
  )
}

export default UserHome
