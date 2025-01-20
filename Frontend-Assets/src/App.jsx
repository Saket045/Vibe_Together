/* eslint-disable no-unused-vars */
import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SignUp from './Pages/auth/Signup.jsx'
import Login from './Pages/auth/Login.jsx'
import { Navigate } from 'react-router-dom'
import PrivateRoute from './Pages/privateRoute/PrivateRoute.jsx'
import PublicRoute from './Pages/publicRoute/PublicRoute.jsx'
const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
      <Route path='/signup' element={<PublicRoute><SignUp/></PublicRoute>} />
      <Route path='/login' element={ <PublicRoute><Login/></PublicRoute>} />
      </Routes>
    </div>
  )
}

export default App
