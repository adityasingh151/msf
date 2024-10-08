import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal';
import Loading from '../../LoadSaveAnimation/Loading';
import Notification from '../../Notification';
import DOMPurify from 'dompurify';

const ConferenceManagement = () => {
  const [conferences, setConferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConference, setSelectedConference] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isDeletingImage, setIsDeletingImage] = useState(false);
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

  const handleDeleteConference = async () => {
    const db = getDatabase();
    await remove(ref(db, `conferences/${selectedConference.id}`));
    setShowModal(false);
    setConferences(conferences.filter(conference => conference.id !== selectedConference.id));
    setNotification({ show: true, message: 'Conference deleted successfully!', type: 'success' });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleDeleteImage = async (conferenceId, imageUrl, imageIndex) => {
    setIsDeletingImage(true);
    try {
      const storage = getStorage();
      const imageRef = storageRef(storage, imageUrl);
      await deleteObject(imageRef); // Delete the image from Firebase storage

      // Update the conference to remove the image from the image array
      const db = getDatabase();
      const conferenceRef = ref(db, `conferences/${conferenceId}`);
      const updatedImages = conferences.find(conf => conf.id === conferenceId).images.filter((_, index) => index !== imageIndex);
      await update(conferenceRef, { images: updatedImages });

      // Update the state after image deletion
      setConferences(prevConferences => prevConferences.map(conf => conf.id === conferenceId ? { ...conf, images: updatedImages } : conf));
      setNotification({ show: true, message: 'Image deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error deleting image:', error);
      setNotification({ show: true, message: 'Failed to delete image.', type: 'error' });
    } finally {
      setIsDeletingImage(false);
    }
  };

  const promptDeleteConference = (conference) => {
    setSelectedConference(conference);
    setModalContent(`Are you sure you want to delete the conference: <strong>${DOMPurify.sanitize(conference.title)}</strong>?`);
    setShowModal(true);
  };

  const handleEditConference = (conference) => {
    navigate(`/admin/forms/conference/edit/${conference.id}`, { state: { editData: conference } });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Conferences</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conferences.map(conference => (
          <div key={conference.id} className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(conference.title) }} className='ql-editor'/>
              </h2>
              <p className="text-gray-600">
                Date: <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(conference.date) }} className='ql-editor'/>
              </p>
              <p className="text-gray-600">
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(conference.location) }} className='ql-editor'/>
              </p>

              {/* Display images with delete button */}
              {conference.images && conference.images.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-gray-700">Images:</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {conference.images.map((imageUrl, index) => (
                      <div key={index} className="relative">
                        <img src={imageUrl} alt={`Conference Image ${index}`} className="h-32 w-32 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(conference.id, imageUrl, index)}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                          disabled={isDeletingImage}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleEditConference(conference)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => promptDeleteConference(conference)}
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
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(modalContent) }} className='ql-editor'/>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleDeleteConference}
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
