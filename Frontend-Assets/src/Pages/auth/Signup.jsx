/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// Import necessary modules
import React, { useState } from 'react';
import { auth, googleProvider } from '../../firebase/firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login, setLoading, setUser } from '../../redux/slices/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const navigate=useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    phonenumber: ""
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    try {
      dispatch(setLoading(true));
      e.preventDefault();
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      dispatch(setUser(data));
      dispatch(login());
      navigate("/");
      console.log(data);
    } catch (err) {
      console.error('Signup error:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle Google Sign-Up
  const handleGoogleSignUp = async () => {
    try {
      dispatch(setLoading(true));
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

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
      navigate("/");
      console.log('Backend response:', data);
    } catch (err) {
      console.error('Google sign-up error:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Let's VibeTogether
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="block text-sm mb-2 font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm mb-2 font-medium text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm mb-2 font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm mb-2 font-medium  text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm mb-2 font-medium text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phonenumber"
              value={input.phonenumber}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
        
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="my-6 text-center text-gray-500">OR</div>
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center  py-2 rounded-md transition duration-300"
        >
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.5 0 6.4 1.2 8.4 3.2l6.3-6.3C34.7 3.3 29.7 1 24 1 14.5 1 6.4 6.7 2.6 14.8l7.6 5.9C12.2 14.1 17.6 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.4 24.5c0-1.7-.1-3.4-.4-5H24v10h12.8c-.6 3-2.3 5.6-4.8 7.4l7.6 5.9c4.4-4.1 7-10.2 7-17.3z"
            />
            <path
              fill="#FBBC05"
              d="M10.2 27.6c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8L2.6 14.8C.9 18.3 0 22 0 25.9s.9 7.6 2.6 11.1l7.6-5.9z"
            />
            <path
              fill="#34A853"
              d="M24 47c6.5 0 12-2.1 16-5.8l-7.6-5.9c-2.2 1.5-5 2.4-8.4 2.4-6.4 0-11.8-4.5-13.7-10.6l-7.6 5.9C6.4 41.3 14.5 47 24 47z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Sign Up with Google
        </button>
        <div className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
