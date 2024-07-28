import React, { useEffect, useRef, useState } from 'react';
import Howler from 'react-howler';

const NotFoundPage = () => {
 



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <img src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif" alt="Confused Travolta" className="w-64 mb-4" />
      <p className="text-xl text-gray-600 mb-4">It seems like you've found a page that doesn't exist. But don't worry, even the best explorers get lost sometimes!</p>
      <button
        className="mt-4 px-6 py-3 text-white bg-blue-500 hover:bg-blue-700 rounded"
        onClick={() => window.location.href = '/'}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;
