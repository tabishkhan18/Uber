import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import UserHome from './pages/UserHome'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/users/login" element={<UserLogin />} />
        <Route path="/users/riding" element={<Riding />} />
        <Route path="/captains/riding" element={<CaptainRiding />} />
        <Route path="/users/register" element={<UserSignUp />} />
        <Route path="/captains/login" element={<CaptainLogin />} />
        <Route path="/captains/register" element={<CaptainSignUp />} />
        <Route path="/users/home" element={
          <UserProtectedWrapper>
            <UserHome />
          </UserProtectedWrapper>
        } />
        <Route path="/users/logout" element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />

        <Route path="/captains/home" element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />


      </Routes>
    </>
  )
}

export default App
