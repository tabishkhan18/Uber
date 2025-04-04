import React, { useState, useRef, useEffect, useContext } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import axios from 'axios'

import LocationSuggestions from '../components/LocationSuggestions';
import VehicleSuggestions from '../components/VehicleSuggestions';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

import { Link } from 'react-router-dom';
import { IoIosArrowUp } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';




const UserHome = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])

  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [vehicleImage, setVehicleImage] = useState(null); // New state for vehicle image
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

  const navigate = useNavigate()
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)


  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    // console.log("ride")
    setWaitingForDriver(false)
    navigate('/users/riding', { state: { ride, vehicleImage  } }) // Updated navigate to include ride data
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
        // console.log(data.map(item => item.text));
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
        // console.log(data.map(item => item.text));
        setDestinationSuggestions(data.map(item => item.text));

      } catch (error) {
        console.error("Error fetching destination suggestions:", error);
      }
    }, 300);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log('submitted');
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
    // console.log(response.data)
  }

  return (
    <div>
      <div className="h-screen relative overflow-hidden">
        <div className='flex items-center justify-between'>
          <img className='w-40' src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
          <Link to='/users/logout' className='home bg-white p-2 rounded-full'>
            <BiLogOut size={25} />
          </Link>
        </div>
        <div className='h-3/5 '>
          {/* <img className='h-full w-full object-cover' src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" alt="" /> */}
          <LiveTracking />
        </div>
        <div className='h-screen absolute top-0 w-full flex flex-col justify-end '>
          <div className='bg-white p-5 flex flex-col gap-5 relative h-[40%] rounded-t-xl'>
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
              <div className="line bg-neutral-500 h-20 w-[3px] rounded-full absolute left-10 bottom-24"></div>
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
              disabled={!pickup || !destination} // Disable button if either input is empty
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
            setVehicleImage={setVehicleImage} // Pass the setter function
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
            vehicleImage={vehicleImage} // Pass the image as a prop
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
            vehicleImage={vehicleImage} // Pass the image as a prop
          />
        </div>
        <div ref={waitingForDriverRef} className='w-full fixed z-10 bottom-0 rounded-lg translate-y-full  bg-white py-5 h-fit'>
          <WaitingForDriver
            ride={ride}
            setVehicleFound={setVehicleFound}
            setWaitingForDriver={setWaitingForDriver}
            waitingForDriver={waitingForDriver}
            vehicleImage={vehicleImage} // Pass the image as a prop
          />
        </div>


      </div>
    </div>
  )
}

export default UserHome
