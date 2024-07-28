import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, off, remove } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import Modal from '../../Modal'; // Import the modal component
import NotificationForm from '../inputForms/NotificationForm'; // Import the NotificationForm component
import dayjs from 'dayjs';
import Loading from '../../LoadSaveAnimation/Loading';

const ViewNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const notificationsRef = ref(db, 'notifications');

    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedNotifications = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
        timestamp: dayjs(data[key].timestamp) // Assuming timestamp is stored in the notifications
      }));
      loadedNotifications.sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first
      setNotifications(loadedNotifications);
      setIsLoading(false);
    }, (error) => {
      console.error(error);
      setError("Failed to fetch notifications");
      setIsLoading(false);
    });

    return () => off(notificationsRef, 'value', unsubscribe);
  }, []);

  const handleDelete = async () => {
    const storage = getStorage();
    const pdfRef = storageRef(storage, currentNotification.pdfUrl);
    
    try {
      await deleteObject(pdfRef);
      await remove(ref(getDatabase(), `notifications/${currentNotification.id}`));
      setModalOpen(false); // Close modal on success
      alert('Notification deleted successfully!');
    } catch (error) {
      console.error('Error removing notification: ', error);
      alert('Failed to delete notification.');
    }
  };

  const promptDelete = (notification) => {
    setCurrentNotification(notification);
    setModalOpen(true);
  };

  const handleEdit = (notification) => {
    setCurrentNotification(notification);
    setEditModalOpen(true);
  };

  const handleUpdate = () => {
    setEditModalOpen(false);
    // Reload notifications
    const db = getDatabase();
    const notificationsRef = ref(db, 'notifications');

    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedNotifications = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
        timestamp: dayjs(data[key].timestamp)
      }));
      loadedNotifications.sort((a, b) => b.timestamp - a.timestamp);
      setNotifications(loadedNotifications);
      setIsLoading(false);
    }, (error) => {
      console.error(error);
      setError("Failed to fetch notifications");
      setIsLoading(false);
    });
  };

  if (isLoading) return <Loading/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mx-auto py-4 px-6">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Confirm Deletion">
        <p>Are you sure you want to delete the notification titled '{currentNotification?.heading}'? This action cannot be undone.</p>
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded mt-4">
          Delete
        </button>
      </Modal>
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Notification">
        <NotificationForm
          existingData={currentNotification}
          onSave={handleUpdate}
        />
      </Modal>
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.map((notification, index) => (
        <div key={notification.id} className="relative border p-4 rounded mb-2 flex justify-between items-center">
          {index < 3 && (
            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">Latest</span>
          )}
          <div>
            <h2 className="text-xl font-semibold">{notification.heading}</h2>
            <p className="text-sm">Date: {notification.date}</p>
            <p className="text-sm">Year: {notification.year}</p>
            <a href={notification.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View PDF</a>
          </div>
          <div>
            <button onClick={() => promptDelete(notification)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded mr-2">Delete</button>
            <button onClick={() => handleEdit(notification)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewNotifications;
