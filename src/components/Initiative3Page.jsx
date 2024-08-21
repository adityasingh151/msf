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
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100 min-h-screen">
      <div className="bg-gradient-to-r from-teal-600 to-blue-700 h-screen relative">
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

      <div id="purpose-section" className="container mx-auto px-6 lg:px-8 py-4 bg-gradient-to-b from-sky-100 to-white">
        <h1 className="text-5xl font-extrabold text-center text-indigo-900 mb-12 tracking-wide">Engineering Kitchen</h1>

        <section className="py-4 bg-gradient-to-r from-cyan-50 to-blue-100 mb-12">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-bold mb-4 text-center capitalize">Our Vision and Purpose</h2>
            <div className="text-lg leading-relaxed mb-4 font-serif">
              {purpose.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-4 bg-gradient-to-r from-cyan-50 to-blue-100 mb-12">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-bold mb-4 text-center capitalize">About Engineering Kitchen</h2>
            <div className="text-lg leading-relaxed mb-4 font-serif">
              {about.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EngineeringKitchenPage;
