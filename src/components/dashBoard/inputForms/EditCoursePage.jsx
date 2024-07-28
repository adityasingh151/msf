import React from 'react';
import { useParams } from 'react-router-dom';
import CourseForm1 from './CourseForm1'; // Ensure the path is correct

const EditCoursePage = () => {
  const { courseId } = useParams();

  return (
    <CourseForm1 editMode={true} courseId={courseId} />
  );
};

export default EditCoursePage;
