import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal';
import Loading from '../../LoadSaveAnimation/Loading';
import Notification from '../../Notification';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const booksRef = ref(db, 'books');

    onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      const booksList = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      setBooks(booksList);
      setIsLoading(false);
    });

    return () => { /* cleanup */ };
  }, []);

  const handleDelete = async () => {
    const db = getDatabase();
    await remove(ref(db, `books/${selectedBook.id}`));
    setShowModal(false);
    setBooks(books.filter(book => book.id !== selectedBook.id));
    setNotification({ show: true, message: 'Book deleted successfully!', type: 'success' });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const promptDelete = (book) => {
    setSelectedBook(book);
    setModalContent(`Are you sure you want to delete the book: ${book.title}?`);
    setShowModal(true);
  };

  const handleEdit = (book) => {
    navigate('/admin/forms/book', { state: { editData: book } });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-gray-600">{book.publisher}</p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(book)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => promptDelete(book)}
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

export default BookManagement;
