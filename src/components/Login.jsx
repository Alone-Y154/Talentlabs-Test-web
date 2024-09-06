/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, { email, password });
      console.log(res.data);
      // Set the token in local storage
      localStorage.setItem('token', res.data.token);
      // Redirect to protected route
      window.location.href = '/courses';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/google-login`, {
        token: response.credential,  // sending Google token to backend
      });
  
      // Store the returned token from your backend in local storage
      localStorage.setItem('token', res.data.token);
      // Redirect to protected route
      window.location.href = '/courses';
    } catch (err) {
      setError('Google Sign-In failed. Please try again.', err);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center h-screen">
        <div className="bg-white shadow rounded-lg p-8 md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="bg-red-100 mb-4 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span className="absolute top-0 right-0 px-3 py-2">
                  <svg className="fill-current h-6 w-6 text-red-500" role="img" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.95 1.05a.75.75 0 01.53.22l8.25 8.25a.75.75 0 010 1.06l-8.25 8.25a.75.75 0 01-1.06 0l-8.25-8.25a.75.75 0 01.22-.53 2.25 2.25 0 00.41-.38L5.7 9.28a2.25 2.25 0 000 3.18l6.85 6.85a2.25 2.25 0 003.18 0l6.85-6.85a2.25 2.25 0 000-3.18L12.95 1.05z" />
                  </svg>
                </span>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
            >
              Login
            </button>
            <p className="mt-3 text-center">
              Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                Sign up
              </Link>
            </p>
          </form>
          <div className="mt-4">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => setError('Google Sign-In failed. Please try again.')}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;