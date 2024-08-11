import React, { useEffect, useRef } from 'react';

const PhilosophyAndPractice = () => {
  const philosophyRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.dataset.animation);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (philosophyRef.current) {
      observer.observe(philosophyRef.current);
    }

    return () => {
      if (philosophyRef.current) {
        observer.unobserve(philosophyRef.current);
      }
    };
  }, []);

  return (
    <section ref={philosophyRef} data-animation="animate-slide-in" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Philosophy and Practice</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-4">
            <img src="path_to_image1.jpg" alt="Philosophy" className="w-full h-auto rounded-lg shadow-lg transition transform hover:scale-105 duration-300" />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <p className="text-lg leading-relaxed mb-4 font-serif">
              The Internet College is a highly innovative knowledge platform designed to allow each individual to discover her calling in life (inner drumbeat) by exposing the student-through various interactive ways and means- to the challenges and needs of society.
            </p>
            <p className="text-lg leading-relaxed font-serif">
              In pursuance of this discovery of the student’s inner drumbeat the Internet College shall encourage and allow the young to be empowered and enabled through engagement with enjoyable, practical and relevant knowledge that is in harmony with the student’s inner drumbeat.
            </p>
            <p className="text-lg leading-relaxed font-serif">
              This shall happen through a creative technology platform that provides for mentored peer led learning merged with explorations of and adventures into the real world based on experiential knowledge connected to societal needs and challenges.
            </p>
            <p className="text-lg leading-relaxed font-serif">
              Thus each student shall be guided into putting into practice her inner and true passion.
            </p>
            <p className="text-lg leading-relaxed font-serif">
              The Internet College seeks to redefine education as ‘knowledge in action for personal fulfillment’ through engaging with society and its challenges and needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophyAndPractice;
