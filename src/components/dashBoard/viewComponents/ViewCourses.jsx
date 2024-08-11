import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Modal from '../../Modal'; // Ensure the path is correct
import Notification from '../../Notification'; // Ensure the path is correct
import Loading from '../../LoadSaveAnimation/Loading';

const ViewCourses = () => {
  const [studentsCourses, setStudentsCourses] = useState([]);
  const [teachersCourses, setTeachersCourses] = useState([]);
  const [collegeCourses, setCollegeCourses] = useState([]);
  const [methodsCourses, setMethodsCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();

    const fetchCourses = (category, setState) => {
      const dbRef = ref(db, `courses/${category}`);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const courseList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }));
          setState(courseList);
        } else {
          setState([]);
        }
      });
    };

    fetchCourses('students', setStudentsCourses);
    fetchCourses('teachers', setTeachersCourses);
    fetchCourses('college', setCollegeCourses);
    fetchCourses('methods', setMethodsCourses);

    setLoading(false);
  }, []);

  const handleDelete = (course, category) => {
    setCurrentCourse({ ...course, category, action: 'delete' });
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (!currentCourse) return;
    const dbRef = ref(getDatabase(), `courses/${currentCourse.category}/${currentCourse.id}`);
    remove(dbRef)
      .then(() => {
        setNotification({ message: 'Course deleted successfully.', type: 'success' });
        setModalOpen(false);
      })
      .catch(() => setNotification({ message: 'Failed to delete course.', type: 'error' }));
  };

  const handleEdit = (course, category) => {
    navigate(`/admin/forms/courses/edit/${course.id}/${category}`);
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  if (loading) return <Loading />;

  const renderCourses = (courses, category) => (
    <div className="my-8">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">{category} Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow rounded overflow-hidden">
            <img src={course.imgSrc} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => handleEdit(course, category)} className="text-blue-500 hover:text-blue-700 flex items-center">
                  <BsPencilSquare className="mr-2" />Edit
                </button>
                <button onClick={() => handleDelete(course, category)} className="text-red-500 hover:text-red-700 flex items-center">
                  <BsTrash className="mr-2" />Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 sm:mt-2 mt-20">
      <h1 className="text-3xl font-semibold text-center mb-6">Manage Courses</h1>
      {renderCourses(studentsCourses, 'students')}
      {renderCourses(teachersCourses, 'teachers')}
      {renderCourses(collegeCourses, 'college')}
      {renderCourses(methodsCourses, 'methods')}
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
            <button onClick={() => handleEdit(currentCourse, currentCourse.category)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">Proceed to Edit</button>
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