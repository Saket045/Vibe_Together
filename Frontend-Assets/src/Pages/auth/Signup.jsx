/* eslint-disable no-unused-vars */
// Import necessary modules
import React, { useState } from 'react';
import { auth, googleProvider } from '../../firebase/firebase.js'; // Assuming firebaseConfig is the file where the Firebase setup is stored
import { signInWithPopup } from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom'
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [userShow,setUserShow]=useState(null)

  const navigate=useNavigate();
  // Handle Google Sign-In
  const handleGoogleSignUp = async () => {
    setLoading(true);

    try {
      // Sign in using the Google provider
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
      console.log('Backend response:', data);

      setUserShow(user)
   navigate("/")
      
    } catch (err) {
      console.error("Google sign-in error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-page">

      <button 
        onClick={handleGoogleSignUp} 
        disabled={loading} 
      >
        {loading ? 'Signing up...' : 'Sign Up with Google'}
      </button>
      <Link to={"/login"}>Go to login page</Link>

    </div>
  );
};

export default SignUp;
