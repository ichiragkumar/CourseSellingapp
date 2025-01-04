import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
          if(!localStorage.getItem('token') || !localStorage.getItem('email')){
            alert("Please login first");
            return;
          }
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');


        const response = await axios.get('http://localhost:3003/api/v1/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            useremail: email
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchMyCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/v1/my-courses', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchUserData();
    fetchMyCourses();
  }, []);
  if (!user) {
    return <div className="text-center text-gray-700 dark:text-gray-300">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome, {user.name}!</h2>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Your Courses:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h4>
            <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;

