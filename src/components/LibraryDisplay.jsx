import React from 'react';
import ConferenceDisplay from './ConferenceDisplay';
import BookDisplay from './BookDisplay';
import ResearchDisplay from './ResearchDisplay';

const LibraryDisplay = () => {
  return (
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-700 h-screen relative">
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">MSF Library</h1>
            <p className="text-2xl mb-8">Explore our collection of conferences, books, and research papers.</p>
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => document.getElementById('research-section').scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Conference Display Section */}
      <div className="container mx-auto px-6 lg:px-8 py-12 bg-gradient-to-b from-sky-100 to-white">
        <ConferenceDisplay />
      </div>

      {/* Books Display Section */}
      <div className="container mx-auto px-6 lg:px-8 py-12 bg-gradient-to-b from-sky-100 to-white">
        <BookDisplay />
      </div>

      {/* Research Papers Display Section */}
      <div className="container mx-auto px-6 lg:px-8 py-12 bg-gradient-to-b from-sky-100 to-white">
        <ResearchDisplay />
      </div>
    </div>
  );
};

export default LibraryDisplay;
