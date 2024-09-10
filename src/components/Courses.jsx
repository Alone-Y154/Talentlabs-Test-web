/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Navigation hook from react-router-dom

  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('token');

    // Redirect immediately if no token is found
    if (!storedToken) {
      navigate('/login', { replace: true });
      return; // Exit early to avoid further execution
    }

    // Fetch courses if the token is available
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/courses/courses`, {
          headers: {
            Authorization: `${storedToken}`, // Ensure proper format with Bearer prefix
          },
        });
         // Logging API response
        setCourses(response.data);
      } catch (error) {
        console.error("API Error:", error); // Logging error details
        if (error.response && error.response.status === 401) {
          // Remove the token from local storage to prevent further unauthorized requests
          localStorage.removeItem('token');
          navigate('/login', { replace: true }); // Redirect to login page
        } else {
          setError(error.message);
        }
      }
    };

    fetchCourses(); // Call the fetch function

  }, [navigate]); // Added navigate to dependencies to ensure it's properly handled

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to freeCodeCamp.org</h1>
        <p className="text-lg text-gray-600 mb-8">
          "I have not failed. I've just found 10,000 ways that won't work." - Thomas A. Edison
        </p>
      </div>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {courses.map((course) => (
            <div key={course._id} className="bg-gray-100 p-4 rounded-md shadow-md">
              <div className="flex items-center">
                {course.icon && (
                  <span className="mr-4">
                    <img src={course.icon} alt={course.title} className="w-10 h-10 rounded-full" />
                  </span>
                )}
                <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
              </div>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <p className="text-gray-600 mt-2">Duration: {course.duration}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
