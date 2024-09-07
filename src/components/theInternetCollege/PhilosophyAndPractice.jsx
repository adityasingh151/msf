import React from 'react';

const PhilosophyAndPractice = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Philosophy and Practice</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-4">
            <img
              src="path_to_image1.jpg"
              alt="Philosophy"
              className="w-full h-auto rounded-lg shadow-lg transform transition hover:scale-105 duration-300"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <p className="text-lg leading-relaxed mb-4 font-serif text-gray-700">
              The Internet College is a highly innovative knowledge platform designed to allow each individual to discover their calling in life (inner drumbeat) by exposing the student to the challenges and needs of society through various interactive ways and means.
            </p>
            <p className="text-lg leading-relaxed mb-4 font-serif text-gray-700">
              In pursuing this discovery of the student’s inner drumbeat, the Internet College encourages the young to be empowered and enabled through engaging with enjoyable, practical, and relevant knowledge that is in harmony with their inner calling.
            </p>
            <p className="text-lg leading-relaxed mb-4 font-serif text-gray-700">
              This will be achieved through a creative technology platform that provides mentored, peer-led learning merged with explorations of and adventures into the real world, based on experiential knowledge connected to societal needs and challenges.
            </p>
            <p className="text-lg leading-relaxed mb-4 font-serif text-gray-700">
              Each student shall be guided into putting into practice their inner and true passion.
            </p>
            <p className="text-lg leading-relaxed font-serif text-gray-700">
              The Internet College seeks to redefine education as ‘knowledge in action for personal fulfillment’ by engaging with society and its challenges and needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophyAndPractice;
