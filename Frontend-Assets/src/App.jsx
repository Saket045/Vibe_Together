/* eslint-disable no-unused-vars */
import React from 'react'
import {Route,Routes, useLocation} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SignUp from './Pages/auth/Signup.jsx'
import Login from './Pages/auth/Login.jsx'
import { Navigate } from 'react-router-dom'
import PrivateRoute from './Pages/privateRoute/PrivateRoute.jsx'
import PublicRoute from './Pages/publicRoute/PublicRoute.jsx'
import Community from './Pages/community/Community.jsx'
import Event from './Pages/event/Event.jsx'
import Profile from './Pages/profile/Profile.jsx'
import Contact from './Pages/contact/Contact.jsx'
import Navbar from './Pages/HomeContent/Navbar.jsx'
import Footer from './Pages/HomeContent/Footer.jsx'
import { useSelector } from 'react-redux'
const App = () => {

const location = useLocation();
const showBars=location.pathname!=="/login" && location.pathname!=="/signup"  

  return (
    <div>
     {showBars && <Navbar/>}
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={ <Login/>}/>
      <Route path='/communityPage'element={<Community/>}/>
      <Route path='/eventPage'element={ <Event/>}/>
      <Route path='/profilePage'element={ <Profile/>}/>
      <Route path='/contactPage'element={<Contact/>}/>
      </Routes>
    </div>
  )
}

export default App
