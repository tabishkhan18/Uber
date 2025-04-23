import React, { useState, useRef, useEffect, useContext } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import axios from 'axios'
import LocationSuggestions from '../components/LocationSuggestions';
import VehicleSuggestions from '../components/VehicleSuggestions';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowUp } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import LiveTracking from '../components/LiveTracking';

const UserHome = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [vehicleImage, setVehicleImage] = useState(null);
  const [ride, setRide] = useState(null)
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
  const debounceTimer = useRef(null);
  const searchRef = useRef(null) // NEW ref for search container

  const navigate = useNavigate()
  const location = useLocation()
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  // Set success message if passed in location state
  const [success, setSuccess] = useState(location.state?.success || '')
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    setWaitingForDriver(false)
    navigate('/users/riding', { state: { ride, vehicleImage } })
  })

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
    setActiveField('pickup');

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ input: e.target.value }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPickupSuggestions(data.map(item => item.text));
      } catch (error) {
        console.error("Error fetching destination suggestions:", error);
      }
    }, 300);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    setActiveField('destination');

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
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

        const data = await response.json();
        setDestinationSuggestions(data.map(item => item.text));

      } catch (error) {
        console.error("Error fetching destination suggestions:", error);
      }
    }, 300);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function () {
    if (locationPanel) {
      gsap.to(locationPanelRef.current, {
        height: '100%'
      }
      )
    } else {
      gsap.to(locationPanelRef.current, {
        height: '0%'
      }
      )
    }
  }, [locationPanel])

  // NEW: Animate the search container height based on locationPanel state.
  useGSAP(() => {
    if (locationPanel) {
      gsap.to(searchRef.current, { height: '100vh' })
    } else {
      // Approximate height for h-3/7 (3/7 of viewport height ≈ 42.86vh)
      gsap.to(searchRef.current, { height: '42.86vh' })
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

  const findRide = async () => {
    setVehiclePanel(true);
    setLocationPanel(false);
    setLocationPanelArrow(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setFare(response.data)
  }

  const createRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  return (
    <div className='relative'>
      {success && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {success}
        </div>
      )}
      <div className="h-screen relative overflow-hidden">
        <div className='flex items-center justify-between'>
          <img className='w-40' src="/logo.webp" alt="" />
          <Link to='/users/logout' className='home bg-white p-2 rounded-full'>
            <BiLogOut size={25} />
          </Link>
        </div>
        <div className='h-1/2'>
          <LiveTracking />
        </div>
        {/* Search */}
        <div 
          ref={searchRef} 
          className='search h-3/7 absolute bottom-0 w-full flex flex-col justify-end '
        >
          <div className='bg-white p-5 flex flex-col gap-5 relative'>
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
              <div className="line bg-neutral-500 h-20 w-[3px] rounded-full absolute left-10 bottom-28"></div>
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
            <button
              onClick={findRide}
              disabled={!pickup || !destination}
              className={`text-white flex justify-center items-center py-3 rounded-lg text-xl ${!pickup || !destination ? 'bg-neutral-500 cursor-not-allowed' : 'bg-black'
                }`}>
              Find Ride
            </button>
          </div>
          <div ref={locationPanelRef} className='h-[0%] bg-white overflow-y-scroll'>
            <LocationSuggestions
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        </div>

        <div ref={vehiclePanelRef} className='w-full fixed z-10 bottom-0 rounded-lg translate-y-full bg-white py-5 h-fit'>
          <VehicleSuggestions
            selectVehicle={setVehicleType}
            fare={fare}
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel}
            setConfirmRide={setConfirmRide}
            setVehicleImage={setVehicleImage}
          />
        </div>

        <div ref={confirmRideRef} className='w-full fixed z-10 bottom-0 rounded-lg translate-y-full bg-white py-5 h-fit'>
          <ConfirmRide
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            confirmRide={confirmRide}
            setConfirmRide={setConfirmRide}
            setVehicleFound={setVehicleFound}
            vehicleImage={vehicleImage}
          />
        </div>
        <div ref={vehicleFoundRef} className='w-full fixed z-10 bottom-0 rounded-lg translate-y-full bg-white py-5 h-fit'>
          <LookingForDriver
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            vehicleFound={vehicleFound}
            setVehicleFound={setVehicleFound}
            vehicleImage={vehicleImage}
          />
        </div>
        <div ref={waitingForDriverRef} className='w-full fixed z-10 bottom-0 rounded-lg translate-y-full  bg-white py-5 h-fit'>
          <WaitingForDriver
            ride={ride}
            setVehicleFound={setVehicleFound}
            setWaitingForDriver={setWaitingForDriver}
            waitingForDriver={waitingForDriver}
            vehicleImage={vehicleImage}
          />
        </div>
      </div>
    </div>
  )
}

export default UserHome
