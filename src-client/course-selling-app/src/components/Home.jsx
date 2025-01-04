import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Welcome to CourseHub</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">Discover and learn from our wide range of courses</p>
      <div className="space-x-4">
        <Link to="/courses" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Browse Courses
        </Link>
        <Link to="/signup" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
          Sign Up
        </Link>
      </div>
      <img src="https://source.unsplash.com/random/800x400?education" alt="Education" className="mt-8 rounded-lg shadow-lg mx-auto" />
    </div>
  );
}

export default Home;

