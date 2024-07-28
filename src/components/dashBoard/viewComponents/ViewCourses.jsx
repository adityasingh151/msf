import { useNavigate } from 'react-router-dom';import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Modal from '../../Modal';  // Ensure the path is correct
import Notification from '../../Notification';  // Ensure the path is correct
import Loading from '../../LoadSaveAnimation/Loading';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();  // Add this line

  useEffect(() => {
    const dbRef = ref(getDatabase(), 'courses');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const courseList = [];
        snapshot.forEach((courseSnapshot) => {
          const courseId = courseSnapshot.key;
          const categories = courseSnapshot.val();
          Object.keys(categories).forEach((category) => {
            courseList.push({
              id: courseId,
              category: category,
              ...categories[category]
            });
          });
        });
        setCourses(courseList);
      } else {
        setCourses([]);
      }
      setLoading(false);
    }, (error) => {
      setError('Failed to fetch data');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = (course) => {
    setCurrentCourse({...course, action: 'delete'});
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (!currentCourse) return;
    const dbRef = ref(getDatabase(), `courses/${currentCourse.id}/${currentCourse.category}`);
    remove(dbRef)
      .then(() => {
        setNotification({ message: 'Course deleted successfully.', type: 'success' });
        setModalOpen(false);
      })
      .catch(() => setNotification({ message: 'Failed to delete course.', type: 'error' }));
  };

  const handleEdit = (course) => {
    navigate(`/forms/courses/edit/${course.id}/${course.category}`);  // Update this line
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  if (loading) return <Loading/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Manage Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={`${course.id}-${course.category}`} className="bg-white shadow rounded overflow-hidden">
            <img src={course.imgSrc} alt={course.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="font-bold text-lg">{course.title} ({course.category})</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => handleEdit(course)} className="text-blue-500 hover:text-blue-700 flex items-center">
                  <BsPencilSquare className="mr-2"/>Edit
                </button>
                <button onClick={() => handleDelete(course)} className="text-red-500 hover:text-red-700 flex items-center">
                  <BsTrash className="mr-2"/>Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentCourse && (
        <Modal
          isOpen={modalOpen}
          title={`Confirm ${currentCourse.action === 'delete' ? 'Deletion' : 'Edit'}`}
          onClose={() => setModalOpen(false)}
        >
          <p>Are you sure you want to {currentCourse.action === 'delete' ? `delete "${currentCourse.title}" (${currentCourse.category})?` : `edit "${currentCourse.title}" (${currentCourse.category})?`}</p>
          {currentCourse.action === 'delete' ? (
            <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2">Confirm</button>
          ) : (
            <button onClick={performEdit} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">Proceed to Edit</button>
          )}
        </Modal>
      )}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default ViewCourses;
