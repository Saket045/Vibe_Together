/* eslint-disable no-unused-vars */
import { signInWithRedirect, getRedirectResult, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '../../firebase/firebase.js';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { login, setLoading, setUser } from '../../redux/slices/userSlice.js';

const Login = () => {
  const [input,setInput]=useState({
    email:"",
    password:""
})

const dispatch=useDispatch();

const loading=useSelector((state)=>state.auth.loading);

const handleInput=(e)=>{
  setInput({...input,[e.target.name]:e.target.value});
}

  // Handle Google login redirect
  const handleGoogleLogin = async () => {
      try {
        dispatch(setLoading(true));
        const result = await signInWithPopup(auth,googleProvider);
        if (result && result.user) {
          const user = result.user;
          const idToken = await user.getIdToken();
          
          // Send the idToken to the backend
          const response = await fetch('/api/user/googleLogin', {
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
        }
      } catch (err) {
        console.error('Error handling redirect result:', err);
      }
      finally{
        dispatch(setLoading(false));
      }
  };

  // Retrieve result from redirect after the page reloads
const handleFormSubmit=async(e)=>{
  try{
    dispatch(setLoading(true));
   e.preventDefault();
   const response=await fetch('/api/user/login',{
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
   dispatch(setLoading(false));
   console.log(data);
  }
  catch(err){
    throw new err;
  }
}
  return (
    <div>
       <h1>Login Page</h1>
       <form onSubmit={handleFormSubmit}>
       <div>
        <label htmlFor="">Email</label>
        <input type="text" name='email' value={input.email} onChange={handleInput} />
       </div>
       <div>
        <label htmlFor="">Password</label>
        <input type="text" name='password' value={input.password}  onChange={handleInput} />
       </div>

 <div><button type='submit'>{loading ? 'Signing In...' : 'Login'}</button></div>
 </form>
      <button onClick={handleGoogleLogin} >
        {loading ? 'Signing In...' : 'Login with Google'}
      </button>
      <br />
      <Link to="/signup">Go to signup page</Link>
    </div>
  );
};

export default Login;
