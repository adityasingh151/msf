import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import Modal from '../../Modal'; 
import Loading from '../../LoadSaveAnimation/Loading';
import Notification from '../../Notification';
import DOMPurify from 'dompurify';

const ResearchManagement = () => {
  const [researchPapers, setResearchPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const researchRef = ref(db, 'researchPapers');

    onValue(researchRef, (snapshot) => {
      const data = snapshot.val();
      const papersList = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      setResearchPapers(papersList);
      setIsLoading(false);
    });

    return () => { /* cleanup */ };
  }, []);

  const handleDelete = async () => {
    const db = getDatabase();
    await remove(ref(db, `researchPapers/${selectedPaper.id}`));
    setShowModal(false);
    setResearchPapers(researchPapers.filter(paper => paper.id !== selectedPaper.id));
    setNotification({ show: true, message: 'Research paper deleted successfully!', type: 'success' });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const promptDelete = (paper) => {
    setSelectedPaper(paper);
    setModalContent(`Are you sure you want to delete the research paper: <strong>${DOMPurify.sanitize(paper.title)}</strong>?`);
    setShowModal(true);
  };

  const handleEdit = (paper) => {
    navigate('/admin/forms/research', { state: { editData: paper } });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Research Papers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchPapers.map(paper => (
          <div key={paper.id} className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paper.title) }} 
                className='ql-editor'/>
              </h2>
              <p className="text-gray-600">
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paper.authors) }} 
                className='ql-editor'/>
              </p>
              <p className="text-gray-600">
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paper.journal) }} 
                className='ql-editor'/>
              </p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(paper)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => promptDelete(paper)}
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
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(modalContent) }}
        className='ql-editor' />
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

export default ResearchManagement;
