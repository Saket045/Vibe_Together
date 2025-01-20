/* eslint-disable no-unused-vars */
// Import necessary modules
import React, { useState } from 'react';
import { auth, googleProvider } from '../../firebase/firebase.js'; // Assuming firebaseConfig is the file where the Firebase setup is stored
import { signInWithPopup } from 'firebase/auth';
import {Link} from 'react-router-dom'
import { login, setLoading, setUser } from '../../redux/slices/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = () => {

  const dispatch=useDispatch();
  const loading= useSelector((state)=>state.auth.loading);

  const [input,setInput]=useState({
      fullname:"",
      username:"",
      email:"",
      password:"",
      phonenumber:""
  });

const handleInput=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
}

const handleFormSubmit=async(e)=>{
  try{
    dispatch(setLoading(true));
   e.preventDefault();
   const response=await fetch('/api/user/signup',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      },
      body:JSON.stringify(input),
   })
   if(!response.ok){
     throw new Error;
   }
   const data=await response.json();
   dispatch(setUser(data));
   dispatch(login());
   console.log(data);
  }
  catch(err){
    throw new err;
  }
  finally{
    dispatch(setLoading(false));
  }
}

  // Handle Google Sign-In
  const handleGoogleSignUp = async () => {
    try {
      // Sign in using the Google provider
      dispatch( setLoading(true));
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log("User signed in: ", user);
      const idToken = await user.getIdToken();
      const response = await fetch('/api/user/googleSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      dispatch(setUser(data));
      dispatch(login());
      console.log('Backend response:', data);
    } catch (err) {
      console.error("Google sign-in error: ", err);
    } 
    finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="sign-up-page">
      <h1>Signup Page</h1>
      <form action="" onSubmit={handleFormSubmit}>
        <div>
          <label>Fullname:</label>
          <input type="text" name='fullname' value={input.fullname} onChange={handleInput} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" name='username' value={input.username} onChange={handleInput} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" name='email' value={input.email} onChange={handleInput} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name='password' value={input.password} onChange={handleInput} />
        </div>
        <div>
          <label>Phonenumber:</label>
          <input type="text" name='phonenumber' value={input.phonenumber} onChange={handleInput} />
        </div>
        <button type='submit'>Signup</button>
      </form>

      <button 
        onClick={handleGoogleSignUp} 
      >
        {loading ? 'Signing up...' : 'Sign Up with Google'}
      </button>
      <Link to={"/login"}>Go to login page</Link>

    </div>
  );
};

export default SignUp;
