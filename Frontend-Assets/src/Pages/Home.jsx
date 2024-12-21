/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { auth,onAuthStateChanged } from '../firebase/firebase.js'
import { signOut } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

const Home = () => {
 
   const navigate=useNavigate();

useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    if(!user){
      navigate('/login')
    }
    // else{
    //  here we call the user
    // }
  })
},[])
  

  const handleLogout=async()=>{
   
      try {
      signOut(auth).then(() => {
      console.log('signed out')
 })
    const response=await fetch("/api/user/logout",{method:"POST"})
    if(!response.ok){
throw new Error
    }
    const data=await response.json()
    console.log(data)
    }
     catch(err){
      console.log(err.message)
     }
  }

  return (
    <div>



      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
