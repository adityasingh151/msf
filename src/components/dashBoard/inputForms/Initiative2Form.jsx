import React, { useState, useEffect } from 'react';
import ReactQuillNewEditor from '../../reactQuill/ReactQuillNewEditor';
import { ref, set, onValue } from 'firebase/database';
import { txtdb } from '../../databaseConfig/firebaseConfig';
import Saving from '../../LoadSaveAnimation/Saving';  // Importing the Saving component
import Loading from '../../LoadSaveAnimation/Loading';  // Importing the Loading component
import Notification from '../../Notification';  // Importing the Notification component

const Initiative2Form = () => {
  const [vision, setVision] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const visionRef = ref(txtdb, 'collegeOfStartups/vision');
    const storyRef = ref(txtdb, 'collegeOfStartups/story');

    setLoading(true);
    onValue(visionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setVision(data);
      setLoading(false);
    }, { onlyOnce: true });

    onValue(storyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setStory(data);
      setLoading(false);
    }, { onlyOnce: true });

    setLoading(false);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const visionRef = ref(txtdb, 'collegeOfStartups/vision');
      const storyRef = ref(txtdb, 'collegeOfStartups/story');

      await set(visionRef, vision);
      await set(storyRef, story);

      setSuccess('Changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
      setError('Error saving changes');
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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">The College of Startups</h1>
      
      {success && <Notification message={success} type="success" onClose={handleCloseNotification} />}
      {error && <Notification message={error} type="error" onClose={handleCloseNotification} />}
      
      {loading && <Loading />}
      
      {!loading && (
        <>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Story</h2>
            <ReactQuillNewEditor
              value={story}
              onChange={setStory}
              theme="snow"
              className="border border-gray-300 rounded-lg"
              placeholder="Enter the story here..."
            />
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">The Vision</h2>
            <ReactQuillNewEditor
              value={vision}
              onChange={setVision}
              theme="snow"
              className="border border-gray-300 rounded-lg"
              placeholder="Enter the vision here..."
            />
          </section>

          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

          {saving && <Saving />}
        </>
      )}
    </div>
  );
};

export default Initiative2Form;
