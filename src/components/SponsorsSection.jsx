import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

function SponsorsSection() {
  const [sponsors, setSponsors] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    const db = getDatabase();
    const sponsorsRef = ref(db, 'sponsorsImages');
    
    onValue(sponsorsRef, (snapshot) => {
      const sponsorsData = snapshot.val();
      if (sponsorsData) {
        const loadedSponsors = Object.keys(sponsorsData).map(key => ({
          icon: sponsorsData[key].imageUrl,
          title: sponsorsData[key].sponsorName,
          description: sponsorsData[key].sponsorDetails
        }));
        setSponsors(loadedSponsors);
      }
    });
    
  }, []);

  return (
    <section id="sponsors" className="sponsors_area pt-4 pb-4 relative w-full bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h5 className="text-indigo-600 uppercase font-semibold">What We Do</h5>
          <h2 className="text-4xl font-bold text-gray-900">Our Sponsors</h2>
        </div>
        <div className={`flex justify-center ${sponsors.length <= 3 ? 'flex-wrap' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-6`}>
          {sponsors.map((sponsor, index) => (
            <div key={index}
                 className="relative rounded-lg p-6 sm:my-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
                 onMouseEnter={() => setHoveredIndex(index)}
                 onMouseLeave={() => setHoveredIndex(-1)}
                 style={{ width: sponsors.length <= 3 ? '300px' : '100%', height:'200px' }}>
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoveredIndex === index ? 'blur-[2px]' : 'opacity-100'}`}>
                <img src={sponsor.icon} alt={sponsor.title} style={{ width: '150px', height: '500px !important' }} className="max-w-full max-h-full"/>
              </div>
              <div className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className="sponsor_title text-black font-semibold text-xl md:text-2xl">{sponsor.title}</h3>
                <p className="mt-4">{sponsor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SponsorsSection;
