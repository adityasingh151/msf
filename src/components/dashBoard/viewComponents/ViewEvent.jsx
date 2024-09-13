import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import Modal from '../../Modal'; // Assuming Modal is a reusable component
import Notification from '../../Notification'; // Import the Notification component
import Loading from '../../LoadSaveAnimation/Loading';
import DOMPurify from 'dompurify';

const ViewEvent = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const db = getDatabase();
    const eventRef = ref(db, 'events');

    onValue(eventRef, (snapshot) => {
      const data = snapshot.val();
      const loadedEvents = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      setEvents(loadedEvents);
      setIsLoading(false);
    }, {
      onlyOnce: true
    });

    return () => { /* cleanup */ };
  }, []);

  const handleDelete = async () => {
    const db = getDatabase();
    await remove(ref(db, `events/${selectedEvent.id}`));
    setShowModal(false);
    setEvents(events.filter(event => event.id !== selectedEvent.id));
    setNotification({ show: true, message: 'Event deleted successfully!', type: 'success' });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const promptDelete = (event) => {
    setSelectedEvent(event);
    setModalContent(`Are you sure you want to delete the event: ${event.headerTitle}?`);
    setShowModal(true);
  };

  const handleEdit = (event) => {
    window.location.href = `/admin/forms/event/edit/${event.id}`; // Direct navigation to edit route
  };

  const sanitizeContent = (content) => {
    return { __html: DOMPurify.sanitize(content) };
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 " 
                dangerouslySetInnerHTML={sanitizeContent(event.headerTitle)}
              />
              {/* Use dangerouslySetInnerHTML to safely render aboutDescription */}
              <div className="text-gray-600 ql-editor" dangerouslySetInnerHTML={sanitizeContent(event.aboutDescription)} />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(event)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => promptDelete(event)}
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

export default ViewEvent;
