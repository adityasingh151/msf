import React, { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { txtdb } from '../../databaseConfig/firebaseConfig';
import Saving from '../../LoadSaveAnimation/Saving';  // Importing the Saving component
import Loading from '../../LoadSaveAnimation/Loading';  // Importing the Loading component
import Notification from '../../Notification';  // Importing the Notification component

const EngineeringKitchenForm = () => {
  const [purpose, setPurpose] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const purposeRef = ref(txtdb, 'engineeringKitchen/purpose');
    const aboutRef = ref(txtdb, 'engineeringKitchen/about');

    const fetchData = async () => {
      try {
        onValue(purposeRef, (snapshot) => {
          const data = snapshot.val();
          if (data) setPurpose(data);
        });

        onValue(aboutRef, (snapshot) => {
          const data = snapshot.val();
          if (data) setAbout(data);
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await set(ref(txtdb, 'engineeringKitchen/purpose'), purpose);
      await set(ref(txtdb, 'engineeringKitchen/about'), about);

      setSuccess('Sections saved successfully');
    } catch (error) {
      console.error('Error saving sections:', error);
      setError('Error saving sections');
    } finally {
      setSaving(false);
    }
  };

  const handleCloseNotification = () => {
    setError('');
    setSuccess('');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Engineering Kitchen - Add Sections</h1>
      
      {success && <Notification message={success} type="success" onClose={handleCloseNotification} />}
      {error && <Notification message={error} type="error" onClose={handleCloseNotification} />}
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">The Purpose</h2>
        <textarea
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          rows="4"
          className="w-full p-4 border border-gray-300 rounded-lg"
          placeholder="Enter the purpose here..."
        />
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">About Engineering Kitchen</h2>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows="4"
          className="w-full p-4 border border-gray-300 rounded-lg"
          placeholder="Enter the about section here..."
        />
      </section>

      <button
        onClick={handleSave}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Sections'}
      </button>

      {saving && <Saving />}
      {loading && <Loading />}
    </div>
  );
};

export default EngineeringKitchenForm;
