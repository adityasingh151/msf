import React, { useEffect, useRef } from 'react';

const EssentialFeatures = () => {
  const featuresRef = useRef(null);

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

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <section ref={featuresRef} data-animation="animate-slide-in-bottom-right" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Essential Features of the Internet College</h2>
        <p className="text-lg leading-relaxed mb-4 font-serif">
          The Internet College addresses the crisis in education with the following features:
          <ul className="list-disc pl-5">
            <li>Philosophy in More Practical terms</li>
            <li>Design and Effectiveness of the Technology Platform</li>
            <li>Innovativeness of the Pedagogical Environment</li>
            <li>Creating Relevant Offerings and Content</li>
          </ul>
        </p>
        <p className="text-lg leading-relaxed font-serif">
          Stemming from these features will be the Financial Viability of The Internet College.
        </p>
      </div>
    </section>
  );
};

export default EssentialFeatures;
