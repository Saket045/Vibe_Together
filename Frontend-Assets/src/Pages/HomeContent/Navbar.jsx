/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../firebase/firebase'
import { signOut } from 'firebase/auth'
import { setUser,logout } from '../../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {

  const [open, setOpen] = useState(false);
  const dispatch=useDispatch();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);

  const handleLogout=async()=>{
    try {
    signOut(auth).then(() => {
    console.log('signed out')
})
  const response=await fetch("/api/user/logout",{method:"POST"});
  if(!response.ok){
throw new Error
  }
  const data=await response.json();
  dispatch(setUser({
    email:"",
    phonenumber:"",
    username:"",
    _id:"",
  }));
  dispatch(logout());
  console.log(data)
  }
   catch(err){
    console.log(err.message)
   }
}

  return (

    <header className={`flex w-full items-center bg-white dark:bg-dark`}>
    <div className="w-full items-center px-12">
      <div className="relative -mx-4 flex items-center justify-between">
        <div className="w-60 max-w-full px-4">
          <a to={""} className="block w-full py-5">
          <Link to={"/"} className="logo">
      Vibe<span className="at-symbol">@</span>Together
    </Link>
          </a>
        </div>
        <div className="flex w-full items-center justify-between px-4">
          <div>
            <button
              onClick={() => setOpen(!open)}
              id="navbarToggler"
              className={` ${
                open && "navbarTogglerActive"
              } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
            >
              <span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white"></span>
              <span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white"></span>
              <span className="relative my-[6px] block h-[2px] w-[30px] bg-black dark:bg-white"></span>
            </button>
            <nav
              // :className="!navbarOpen && 'hidden' "
              id="navbarCollapse"
              className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                !open && "hidden"
              } `}
            >
              <ul className="block lg:flex">
                <ListItem NavLink="/">Home</ListItem>
                <ListItem NavLink="/communityPage">Communities</ListItem>
                <ListItem NavLink="/eventPage">Events</ListItem>
                {isLoggedIn && <ListItem NavLink="/profilePage">Profile</ListItem>}
                <ListItem NavLink="/contactPage">Contact Us</ListItem>
              </ul>
            </nav>
          </div>
          <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
           {!isLoggedIn ? <div> <Link
              to={"/login"}
              className="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white"
            >
              Sign in
            </Link>

            <Link
              to={"/signup"}
              className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90"
            >
              Sign Up
            </Link> </div>: 
            <button className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90" onClick={handleLogout}>Logout</button>  } 
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Navbar

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="flex py-2 text-base font-medium text-black hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};