import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseSelection = () => {
  const navigate = useNavigate();

  const courses = [
    { name: 'Course Form 1', path: '/forms/course1' },
    { name: 'Course Form 2', path: '/forms/course2' },
    { name: 'Courses Form', path: '/forms/courses' }
  ];

  return (
    <div className="p-8 bg-gray-100 w-full h-fit">
      <h2 className="text-xl font-bold mb-4">Select a Course Form</h2>
      {courses.map((course, index) => (
        <button
          key={index}
          onClick={() => navigate(course.path)}
          className="block p-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 mb-3"
        >
          {course.name}
        </button>
      ))}
    </div>
  );
};

export default CourseSelection;
