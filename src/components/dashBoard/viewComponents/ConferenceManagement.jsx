import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal';
import Loading from '../../LoadSaveAnimation/Loading';
import Notification from '../../Notification';

const ConferenceManagement = () => {
  const [conferences, setConferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConference, setSelectedConference] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const conferencesRef = ref(db, 'conferences');

    onValue(conferencesRef, (snapshot) => {
      const data = snapshot.val();
      const conferencesList = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      setConferences(conferencesList);
      setIsLoading(false);
    });

    return () => { /* cleanup */ };
  }, []);

  const handleDelete = async () => {
    const db = getDatabase();
    await remove(ref(db, `conferences/${selectedConference.id}`));
    setShowModal(false);
    setConferences(conferences.filter(conference => conference.id !== selectedConference.id));
    setNotification({ show: true, message: 'Conference deleted successfully!', type: 'success' });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const promptDelete = (conference) => {
    setSelectedConference(conference);
    setModalContent(`Are you sure you want to delete the conference: ${conference.title}?`);
    setShowModal(true);
  };

  const handleEdit = (conference) => {
    navigate('/admin/forms/conference', { state: { editData: conference } });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Conferences</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conferences.map(conference => (
          <div key={conference.id} className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{conference.title}</h2>
              <p className="text-gray-600">{conference.date}</p>
              <p className="text-gray-600">{conference.location}</p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(conference)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => promptDelete(conference)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        title="Confirm Deletion"
        onClose={() => setShowModal(false)}
      >
        <p>{modalContent}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Confirm
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded transition duration-300"
          >
            Cancel
          </button>
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

export default ConferenceManagement;
