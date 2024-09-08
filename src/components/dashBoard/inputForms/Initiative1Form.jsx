import React, { useState, useEffect } from 'react';
import { ref, get, set } from 'firebase/database';
import { txtdb } from '../../databaseConfig/firebaseConfig';
import Saving from '../../LoadSaveAnimation/Saving';
import Loading from '../../LoadSaveAnimation/Loading';
import Notification from '../../Notification';
import ReactQuillNewEditor from '../../reactQuill/ReactQuillNewEditor'; // Import the new ReactQuillNewEditor component

const Initiative1Form = () => {
  const [data, setData] = useState({
    introduction: '',
    aims: '',
    philosophy: '',
    offerings: '',
    vision: '',
    mission: '',
    essentialFeatures: '',
    advancedNations: '',
    problems: '',
    crisis: '',
    need: '',
    outcomes: '',
    philosophyPractice: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const sections = [
      'introduction', 'aims', 'philosophy', 'offerings',
      'vision', 'mission', 'essentialFeatures', 'advancedNations',
      'problems', 'crisis', 'need', 'outcomes', 'philosophyPractice'
    ];

    const fetchData = async () => {
      try {
        const fetchedData = {};
        const promises = sections.map(async (section) => {
          const sectionRef = ref(txtdb, `internetCollege/${section}`);
          const snapshot = await get(sectionRef);
          fetchedData[section] = snapshot.val() || '';
        });

        await Promise.all(promises);
        setData(fetchedData);
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
      const sections = Object.keys(data);
      for (const section of sections) {
        await set(ref(txtdb, `internetCollege/${section}`), data[section]);
      }
      setSuccess('Sections saved successfully');
    } catch (error) {
      console.error('Error saving sections:', error);
      setError('Error saving sections');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (section, value) => {
    setData(prevData => ({ ...prevData, [section]: value }));
  };

  const handleCloseNotification = () => {
    setError('');
    setSuccess('');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">The Internet College</h1>
      
      {success && <Notification message={success} type="success" onClose={handleCloseNotification} />}
      {error && <Notification message={error} type="error" onClose={handleCloseNotification} />}
      
      {loading && <Loading />}
      
      {!loading && Object.keys(data).map((key) => (
        <section key={key} className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 capitalize">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h2>
          <ReactQuillNewEditor
            value={data[key]}
            onChange={(content) => handleChange(key, content)}
            placeholder={`Enter the ${key} here...`}
          />
        </section>
      ))}

      <button
        onClick={handleSave}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save'}
      </button>

      {saving && <Saving />}
    </div>
  );
};

export default Initiative1Form;
