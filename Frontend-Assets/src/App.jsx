/* eslint-disable no-unused-vars */
import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SignUp from './Pages/auth/Signup.jsx'
import Login from './Pages/auth/Login.jsx'
import { Navigate } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={ <Home/>} />
      <Route path='/signup' element={ <SignUp/>} />
      <Route path='/login' element={ <Login/>} />
      </Routes>
    </div>
  )
}

export default App
