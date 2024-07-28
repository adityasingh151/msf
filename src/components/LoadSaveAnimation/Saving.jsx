import React from 'react';

const Saving = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-100 bg-opacity-75 z-50">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
        <img
          src="/msflogo.jpg"
          className="rounded-full h-28 w-28 transform hover:scale-110 transition-transform duration-300"
          alt="Saving"
        />
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700 text-center">
        Please wait,<span className="block sm:inline"> data is being saved.</span>
      </p>
      <div className="mt-2 text-gray-500 text-sm text-center">We are saving your data...</div>
      <div className="mt-6">
        <svg
          className="animate-bounce w-6 h-6 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>
    </div>
  );
};

export default Saving;
