import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg mt-8 text-center">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <p className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</p>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFound;