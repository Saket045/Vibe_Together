/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Introduction from './HomeContent/Introduction.jsx'
import CommunityCategories from './HomeContent/CommunityCategories.jsx'
import CommunityNav from './HomeContent/CommunityNav.jsx'
import EventNav from './HomeContent/EventNav.jsx'
import { useSelector } from 'react-redux'
import ExcitingEvents from './HomeContent/ExcitingEvents.jsx'
import Footer from './HomeContent/Footer.jsx'
const Home = () => {
  
  return (
    <div >
    <Introduction/>
    <CommunityCategories/>
    <CommunityNav/>
    <ExcitingEvents/>
    <EventNav/>
    <Footer/>
    </div>
  )
}

export default Home

