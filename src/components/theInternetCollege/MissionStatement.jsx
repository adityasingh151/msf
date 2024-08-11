import React, { useEffect, useRef } from 'react';

const MissionStatement = () => {
  const missionRef = useRef(null);

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

    if (missionRef.current) {
      observer.observe(missionRef.current);
    }

    return () => {
      if (missionRef.current) {
        observer.unobserve(missionRef.current);
      }
    };
  }, []);

  return (
    <section ref={missionRef} data-animation="animate-slide-in" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Mission Statement</h2>
        <p className="text-lg leading-relaxed mb-4 font-serif">
          ENABLE THE YOUNG BY REDEFINING EDUCATION
        </p>
      </div>
    </section>
  );
};

export default MissionStatement;
