/* eslint-disable no-unused-vars */
import { signInWithRedirect, getRedirectResult, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '../../firebase/firebase.js';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Google login redirect
  const handleGoogleLogin = async () => {
    setLoading(true);
      try {
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
          console.log('Backend response:', data);

          // Navigate to home page after successful login
          navigate('/');
        }
      } catch (err) {
        console.error('Error handling redirect result:', err);
      } finally {
        setLoading(false);
        
      }
  };

  // Retrieve result from redirect after the page reloads


  return (
    <div>
      <button onClick={handleGoogleLogin} disabled={loading}>
        {loading ? 'Signing In...' : 'Login with Google'}
      </button>
      <Link to="/signup">Go to signup page</Link>
    </div>
  );
};

export default Login;
