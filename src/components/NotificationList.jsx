import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, off } from "firebase/database";
import dayjs from 'dayjs';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <div className="relative mx-auto py-12 px-6 bg-gradient-to-br from-blue-100 to-indigo-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-indigo-900 text-center">Latest News/Notices</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {notifications.map((notification, index) => (
          <div key={notification.id} className="relative bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
            {index < 3 && (
              <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">Latest</span>
            )}
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-lg font-semibold text-gray-800">{notification.heading}</p>
                <p className="text-sm text-gray-500 mt-2">{notification.date}, {notification.year}</p>
              </div>
              <a href={notification.pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 hover:text-blue-800 transition duration-300">
                View PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
