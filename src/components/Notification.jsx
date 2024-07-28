import React from 'react';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  return (
    <div className={`${bgColor} text-white px-4 py-3 rounded fixed bottom-4 right-4 shadow-lg`}>
      <strong>{message}</strong>
      <button onClick={onClose} className="float-right ml-2 text-lg font-semibold">&times;</button>
    </div>
  );
};

export default Notification;
