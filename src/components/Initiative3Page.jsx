import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { txtdb } from '../components/databaseConfig/firebaseConfig';
import Loading from '../components/LoadSaveAnimation/Loading';
import Notification from './Notification';
import { motion } from 'framer-motion';

const EngineeringKitchenPage = () => {
  const [purpose, setPurpose] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    <div className="bg-sky-100 min-h-screen">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen relative">
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">Welcome to Engineering Kitchen</h1>
            <p className="text-2xl mb-8">A place for engineering innovation and creativity</p>
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => document.getElementById('purpose-section').scrollIntoView({ behavior: 'smooth' })}
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
          Engineering Kitchen
        </motion.h1>

        <motion.section
          id="purpose-section"
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white shadow-2xl rounded-lg p-10 mb-8 transition-transform transform hover:-translate-y-1 hover:shadow-3xl">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4 border-b-4 border-gray-300 pb-2">
              Our Vision and Purpose
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif whitespace-pre-line">
              {purpose.split('\n').map((line, index) => (
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
              About Engineering Kitchen
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-serif whitespace-pre-line">
              {about.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default EngineeringKitchenPage;
