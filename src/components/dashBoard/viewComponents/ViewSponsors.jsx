import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import Modal from '../../Modal'; // Assuming Modal is a reusable component
import Notification from '../../Notification'; // Import the Notification component
import Loading from '../../LoadSaveAnimation/Loading';
import { useNavigate } from 'react-router-dom'; // Add this import

const ViewSponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const db = getDatabase();

    // Fetch Sponsors
    const sponsorsRef = ref(db, 'sponsorsImages');
    onValue(sponsorsRef, (snapshot) => {
      const data = snapshot.val();
      setSponsors(Object.keys(data).map(key => ({ id: key, ...data[key] })));
      setIsLoading(false);
    });

    console.log("ViewSponsors");

  }, []);

  const handleDelete = async () => {
    const db = getDatabase();
    await remove(ref(db, `sponsorsImages/${selectedSponsor.id}`));
    setShowModal(false);
    setSponsors(sponsors.filter(sponsor => sponsor.id !== selectedSponsor.id));
    setNotification({ show: true, message: 'Sponsor deleted successfully!', type: 'success' });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const promptDelete = (sponsor) => {
    setSelectedSponsor(sponsor);
    setModalContent(`Are you sure you want to delete this sponsor?`);
    setShowModal(true);
  };

  const handleEdit = (sponsor) => {
    console.log("Edit Sponsor called.");
    navigate(`/admin/forms/sponsors/edit/${sponsor.id}`, { state: { sponsor } }); // Pass state
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4 sm:mt-2 mt-20">
      <h1 className="text-3xl font-bold mb-4 text-center ">Manage Sponsors</h1>
      
      {/* Sponsors Section */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Sponsors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sponsors.map(sponsor => (
            <div key={sponsor.id} className="p-4 border rounded mb-2 flex flex-col items-center">
              <img
                src={sponsor.imageUrl}
                alt={`Sponsor ${sponsor.sponsorName}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="mt-2 font-bold">{sponsor.sponsorName}</p>
              <p className="mt-1 text-sm text-gray-600">{sponsor.sponsorDetails}</p>
              <div className="flex mt-2">
                <button onClick={() => promptDelete(sponsor)} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2">Delete</button>
                <button onClick={() => handleEdit(sponsor)} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        title="Confirm Deletion"
        onClose={() => setShowModal(false)}
      >
        <p>{modalContent}</p>
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

export default ViewSponsors;
