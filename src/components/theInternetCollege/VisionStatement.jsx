import React, { useEffect, useRef } from 'react';

const VisionStatement = () => {
  const visionRef = useRef(null);

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

    if (visionRef.current) {
      observer.observe(visionRef.current);
    }

    return () => {
      if (visionRef.current) {
        observer.unobserve(visionRef.current);
      }
    };
  }, []);

  return (
    <section ref={visionRef} data-animation="animate-fly-in" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8 text-center">
        <h1 className="text-indigo-600 text-5xl font-bold mb-4">The Internet College</h1>
        <h2 className="text-3xl font-bold mb-2">Vision Statement</h2>
        <p className="text-lg leading-relaxed mb-4 font-serif">
          The only meaning and purpose of education is to enable each individual young mind to discover her true calling in life. This true calling can also be defined as her inner drumbeat or passion. The student begins to get educated when after discovering her inner drumbeat she is able to march in the real world in harmony with this inner drumbeat or calling in life i.e. when she begins to put into practice her passion.
        </p>
      </div>
    </section>
  );
};

export default VisionStatement;
