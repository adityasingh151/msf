import React, { useState, useEffect, useCallback, memo } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import Loading from '../components/LoadSaveAnimation/Loading';
import Notification from './Notification';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';

const Initiative2Page = memo(() => {
  const [data, setData] = useState({ story: '', vision: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const db = getDatabase();
  const auth = getAuth();

  const fetchData = useCallback(() => {
    const dataRef = ref(db, 'collegeOfStartups');
    onValue(
      dataRef,
      (snapshot) => {
        const value = snapshot.val();
        if (value) {
          setData({
            story: value.story || 'Story not available',
            vision: value.vision || 'Vision not available',
          });
        } else {
          setData({ story: 'Story not available', vision: 'Vision not available' });
        }
        setLoading(false);
      },
      {
        onlyOnce: true,
      }
    );
  }, [db]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLearnMoreClick = useCallback(() => {
    document.getElementById('story-section').scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Notification message={error} type="error" onClose={() => setError('')} />
      </div>
    );
  }

  // Sanitize text content
  const sanitizedStory = DOMPurify.sanitize(data.story);
  const sanitizedVision = DOMPurify.sanitize(data.vision);

  return (
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100 min-h-screen">
      <div className="bg-gradient-to-r from-teal-600 to-blue-700 h-screen relative">
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">Welcome to College of Startups</h1>
            <p className="text-2xl mb-8">A place for innovation and growth</p>
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleLearnMoreClick}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div id="story-section" className="container mx-auto px-6 lg:px-8 py-4 bg-gradient-to-b from-sky-100 to-white">
        <h1 className="text-5xl font-extrabold text-center text-indigo-900 mb-12 tracking-wide">College of Startups</h1>

        <section className="py-4 bg-gradient-to-r from-cyan-50 to-blue-100 mb-12">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-bold mb-4 text-center capitalize">Story</h2>
            <div className="text-lg leading-relaxed mb-4 font-serif"
                 dangerouslySetInnerHTML={{ __html: sanitizedStory }} />
          </div>
        </section>

        <section className="py-4 bg-gradient-to-r from-cyan-50 to-blue-100 mb-12">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-bold mb-4 text-center capitalize">Vision</h2>
            <div className="text-lg leading-relaxed mb-4 font-serif"
                 dangerouslySetInnerHTML={{ __html: sanitizedVision }} />
          </div>
        </section>
      </div>
    </div>
  );
});

export default Initiative2Page;
