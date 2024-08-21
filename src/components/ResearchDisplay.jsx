import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import Loading from './LoadSaveAnimation/Loading';

const ResearchDisplay = () => {
  const [researchPapers, setResearchPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) return <Loading />;

  return (
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-700 h-screen relative">
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">Research at MSF</h1>
            <p className="text-2xl mb-8">Explore our latest research papers and publications</p>
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => document.getElementById('research-section').scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Research Papers Section */}
      <div id="research-section" className="container mx-auto px-6 lg:px-8 py-8 bg-gradient-to-b from-sky-100 to-white">
        <h2 className="text-5xl font-extrabold text-center text-indigo-900 mb-12 tracking-wide">
          Research Papers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {researchPapers.map(paper => (
            <div key={paper.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-indigo-900">
                  {paper.title}
                </h3>
                <p className="text-lg font-medium text-gray-700 mb-1">
                  <span className="text-gray-500">Authors:</span> {paper.authors}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  <span className="text-gray-500">Published in:</span> {paper.journal}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchDisplay;
