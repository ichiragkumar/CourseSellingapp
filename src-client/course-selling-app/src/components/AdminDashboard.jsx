import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/v1/admin/courses', {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/v1/admin/allusers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchCourses();
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Courses:</h3>
          <ul className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            {courses.map((course) => (
              <li key={course.id} className="mb-2 text-gray-700 dark:text-gray-300">{course.title}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Users:</h3>
          <ul className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            {users.map((user) => (
              <li key={user.id} className="mb-2 text-gray-700 dark:text-gray-300">{user.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

