// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import SignUpPage from './components/SignUpPage';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Courses from './components/Courses';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';

function App() {

  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   // Retrieve token from local storage
  //   const storedToken = localStorage.getItem('token');
  //   setToken(storedToken);
  // }, []);
  const [token, setToken] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(null); // Assume valid by default
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Validate the token
      axios.post(`${import.meta.env.VITE_BASE_URL}/validate-token`, { token: storedToken })
        .then((response) => {
          if (response.data.authorized) {
            setToken(storedToken);
            setIsTokenValid(true);
          } else {
            localStorage.removeItem('token');
            setIsTokenValid(false);
          }
        })
        .catch((error) => {
          console.error('Error validating token:', error);
          localStorage.removeItem('token');
          setIsTokenValid(false);
        })
        .finally(() => {
          setIsLoading(false); // Update loading state
        });
    } else {
      setIsTokenValid(false); // No token means not authenticated
      setIsLoading(false);
    }
  }, [isTokenValid]);

  const handleLogout = () => {
    setIsTokenValid(false)
    window.location.href = '/';
  }
  
  // Show a loading indicator while validating the token
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar isTokenValid={isTokenValid} handleLogout={handleLogout}/>
      <Routes>
        {/* Redirect authenticated users from /signin and /login to /courses */}
        <Route element={<ProtectedRoute token={token} redirectTo={isTokenValid ? '/courses' : null} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<Login />} />
        </Route>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute token={token} redirectTo={null} />}>
          <Route path="/courses" element={<Courses />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
