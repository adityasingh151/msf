import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import Modal from '../../Modal'; // Reuse the Modal component
import Notification from '../../Notification'; // Reuse the Notification component
import Loading from '../../LoadSaveAnimation/Loading';

const ViewWorkshop = () => {
  const [workshops, setWorkshops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    console.log("view workshop")
    const db = getDatabase();
    const workshopRef = ref(db, 'workshops');

    onValue(workshopRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedWorkshops = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setWorkshops(loadedWorkshops);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    }, (error) => {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    });

    return () => {};
  }, []);

  const handleDelete = async () => {
    const db = getDatabase();
    try {
      await remove(ref(db, `workshops/${selectedWorkshop.id}`));
      setShowModal(false);
      setWorkshops(workshops.filter(workshop => workshop.id !== selectedWorkshop.id));
      setNotification({ show: true, message: 'Workshop deleted successfully!', type: 'success' });
      setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    } catch (error) {
      console.error('Error removing workshop: ', error);
      setNotification({ show: true, message: 'Failed to delete workshop!', type: 'error' });
    }
  };

  const promptDelete = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowModal(true);
  };

  const handleEdit = (workshop) => {
    console.log('edit is called')
    window.location.href = `/admin/${workshop.id}`; // Ensure this route is correctly set up
  };

  if (isLoading) return <Loading/>;
  if (isError) return <div>Failed to load workshops. Please try again later.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Workshops</h1>
      {workshops.map(workshop => (
        <div key={workshop.id} className="p-4 border rounded mb-2 flex justify-between items-center">
          <div>
            <h2 className="font-semibold">{workshop.headerTitle}</h2>
            <p>{workshop.aboutTitle}</p>
          </div>
          <div>
            <button onClick={() => promptDelete(workshop)} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2">Delete</button>
            <button onClick={() => handleEdit(workshop)} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit</button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={showModal}
        title="Confirm Deletion"
        onClose={() => setShowModal(false)}
      >
        <p>Are you sure you want to delete the workshop: {selectedWorkshop?.headerTitle}? This action cannot be undone.</p>
        <div className="mt-4 flex justify-end">
          <button onClick={handleDelete} className="bg-red-600 hover:bg-red-800 text-white py-1 px-3 rounded mr-2">Confirm</button>
          <button onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded">Cancel</button>
        </div>
      </Modal>

      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default ViewWorkshop;
