import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2">OOPS! Page Not Found</h2>
        <p className="mb-6">
          The page you are looking for doesn't exist or has been moved. Try searching for a hotel or go back to the homepage.
        </p>
       <div className='flex flex-col justify-center items-center'>
       <img
          src="https://i.imgflip.com/1ur9b0.jpg"
          alt="Confused Travolta Meme"
          className="w-64 h-auto mb-6 rounded-md shadow-lg"
        />
        <div className="flex flex-col items-center">
          
          <Link to="/" className="mt-6 px-6 py-2 bg-white text-blue-700 rounded-md hover:bg-gray-200 transition duration-200">
            Go Back Home
          </Link>
        </div>
       </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
