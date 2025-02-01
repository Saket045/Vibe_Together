/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, googleProvider } from '../../firebase/firebase.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setLoading, setUser } from '../../redux/slices/userSlice.js';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = async () => {
    try {
      dispatch(setLoading(true));
      const result = await signInWithPopup(auth, googleProvider);
      if (result && result.user) {
        const user = result.user;
        const idToken = await user.getIdToken();

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
        navigate("/");
        console.log('Backend response:', data);
      }
    } catch (err) {
      console.error('Error handling redirect result:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await fetch('/api/user/login', {
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
      console.error('Error logging in:', err);
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-3">Email</label>
            <input
              type="text"
              name="email"
              value={input.email}
              onChange={handleInput}
              className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-3">Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleInput}
              className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="my-6 text-center text-gray-500">OR</div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border hover:border-gray-600 py-2 rounded-md  transition duration-300"
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
          Sign in with Google
        </button>
        <div className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
