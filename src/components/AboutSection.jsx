import React from 'react';
import { AcademicCapIcon, LightBulbIcon, UsersIcon } from '@heroicons/react/24/outline';

const AboutSection = () => {
  return (
    <section id="why" className="pt-12 pb-12 relative w-full bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-indigo-600 uppercase font-semibold">Our Mission</h5>
          <h2 className="text-4xl font-bold text-gray-900">Your Goal is Our Achievement</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-8 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-200">
            <div className="flex items-center mb-4">
              <LightBulbIcon className="h-8 w-8 text-indigo-600 mr-4" />
              <h3 className="text-xl font-semibold text-gray-800">Innovation and Leadership</h3>
            </div>
            <ul className="text-gray-600 mt-4 list-disc list-inside space-y-2">
              <li>Nurture out of the box thinking leading to innovations and inventions relevant for industry and the world.</li>
              <li>Create a consulting mechanism that fosters interaction between the corporate world and the ideas of the Foundation.</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-200">
            <div className="flex items-center mb-4">
              <AcademicCapIcon className="h-8 w-8 text-indigo-600 mr-4" />
              <h3 className="text-xl font-semibold text-gray-800">Educational Programs</h3>
            </div>
            <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
              <li>Design and run innovative certificate/diploma/degree courses.</li>
              <li>Undergraduate programs with recognition from leading universities of India and other countries.</li>
              <li>Part-time programs of various levels like Business Statistics, Mathematical Finance, etc.</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-200">
            <div className="flex items-center mb-4">
              <UsersIcon className="h-8 w-8 text-indigo-600 mr-4" />
              <h3 className="text-xl font-semibold text-gray-800">Community and Online Engagement</h3>
            </div>
            <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
              <li>Serve the needs of the nation and civil society through regular training and mentoring programs.</li>
              <li>Conduct online programs that attract the best minds from all over the world, whether as students or researchers.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
