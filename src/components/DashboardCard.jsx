import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardCard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="mt-6">
       <h2 className="invisible md:visible md:text-4xl lg:text-5xl sm:text-2xl animate-bounce shadow-gray-600 w-fit text-xl font-bold mx-auto text-center text-indigo-900 my-2">
          Mathematical Sciences Foundation
        </h2>
      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Manage Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => handleNavigation('/admin/forms/course1')}
            className="card cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-indigo-600"
          >
            Add Students Courses
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/course2')}
            className="card cursor-pointer bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-pink-600"
          >
            Add Teachers Courses
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/courses')}
            className="card cursor-pointer bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-teal-600"
          >
            Add All Courses
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/event')}
            className="card cursor-pointer bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-orange-600"
          >
            Add Events
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/people')}
            className="card cursor-pointer bg-gradient-to-r from-gray-500 to-gray-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-gray-600"
          >
            Add People
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/workshop')}
            className="card cursor-pointer bg-gradient-to-r from-lime-500 to-lime-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-lime-600"
          >
            Add Workshops
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/carousel')}
            className="card cursor-pointer bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-amber-600"
          >
            Add Carousel
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/gallery')}
            className="card cursor-pointer bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-amber-600"
          >
            Add Photos, Videos & Articles
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/notification')}
            className="card cursor-pointer bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-amber-600"
          >
            Add Notifications
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/sponsors')}
            className="card cursor-pointer bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-amber-600"
          >
            Add Sponsors
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/testimonials')}
            className="card cursor-pointer bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-purple-600"
          >
            Add Testimonials
          </div>
         
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">View Content</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => handleNavigation('/admin/view/courses')}
            className="card cursor-pointer bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-blue-600"
          >
            View Courses
          </div>
          <div 
            onClick={() => handleNavigation('/admin/view/events')}
            className="card cursor-pointer bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-green-600"
          >
            View Events
          </div>
          <div 
            onClick={() => handleNavigation('/admin/view/people')}
            className="card cursor-pointer bg-gradient-to-r from-red-500 to-red-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-red-600"
          >
            View People
          </div>
          <div 
            onClick={() => handleNavigation('/admin/view/workshops')}
            className="card cursor-pointer bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-purple-600"
          >
            View Workshops
          </div>
          <div 
            onClick={() => handleNavigation('/admin/view/carousel')}
            className="card cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-yellow-600"
          >
            View Carousel
          </div>
          <div 
            onClick={() => handleNavigation('/admin/view/courses/teachers')}
            className="card cursor-pointer bg-gradient-to-r from-cyan-500 to-cyan-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-cyan-600"
          >
            View Teacher Courses
          </div>
          <div 
            onClick={() => handleNavigation('/admin/view/courses/college')}
            className="card cursor-pointer bg-gradient-to-r from-gray-500 to-gray-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-gray-600"
          >
            View Student Courses
          </div>
          <div 
            onClick={() => handleNavigation('/admin/view/gallery')}
            className="card cursor-pointer bg-gradient-to-r from-cyan-500 to-cyan-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-cyan-600"
          >
            View Images, Videos & Articles
          </div>
          <div 
            onClick={() => handleNavigation('/admin/view/notification')}
            className="card cursor-pointer bg-gradient-to-r from-cyan-500 to-cyan-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-cyan-600"
          >
            View Notifications
          </div>
          <div 
            onClick={() => handleNavigation('/admin/view/sponsors')}
            className="card cursor-pointer bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-blue-600"
          >
            View Sponsors
          </div>
          <div 
            onClick={() => handleNavigation('/admin/view/testimonials')}
            className="card cursor-pointer bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-blue-600"
          >
            View Testimonials
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/startup')}
            className="card cursor-pointer bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-green-600"
          >
            View Startup College
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/internetCollege')}
            className="card cursor-pointer bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-green-600"
          >
            View Internet College
          </div>
          <div 
            onClick={() => handleNavigation('/admin/forms/engineeringKitchen')}
            className="card cursor-pointer bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out hover:bg-amber-600"
          >
            View Engineering Kitchen
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
