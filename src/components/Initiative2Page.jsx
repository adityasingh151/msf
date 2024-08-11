import React, { useState, useEffect, useCallback } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import Loading from '../components/LoadSaveAnimation/Loading';
import Notification from './Notification';
import { motion } from 'framer-motion';
import { memo } from 'react';

const Initiative2Page = memo(() => {
  const [data, setData] = useState({ story: '', vision: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;

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

      <div className="container mx-auto px-6 lg:px-8 py-16 bg-gradient-to-b from-sky-100 to-white">
        <motion.h1
          className="text-5xl font-extrabold text-center text-indigo-900 mb-12 tracking-wide"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          College of Startups
        </motion.h1>

        <motion.section
          id="story-section"
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white shadow-2xl rounded-lg p-10 mb-8 transition-transform transform hover:-translate-y-1 hover:shadow-3xl">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4 border-b-4 border-gray-300 pb-2">
              Story
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif whitespace-pre-line">
              {data.story.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </p>
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white shadow-2xl rounded-lg p-10 transition-transform transform hover:-translate-y-1 hover:shadow-3xl">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4 border-b-4 border-gray-300 pb-2">
              Vision
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif whitespace-pre-line">
              {data.vision.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
});

export default Initiative2Page;
