import React, { useEffect, useRef } from 'react';

const Problems = () => {
  const problemsRef = useRef(null);

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

    if (problemsRef.current) {
      observer.observe(problemsRef.current);
    }

    return () => {
      if (problemsRef.current) {
        observer.unobserve(problemsRef.current);
      }
    };
  }, []);

  return (
    <section ref={problemsRef} data-animation="animate-slide-in" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Why Do We Have These Problems?</h2>
        <p className="text-lg leading-relaxed mb-4 font-serif">
          The Following Are Some Pointers:
          <ul className="list-disc pl-5">
            <li>It is a tragic fact that Indian educational institutions are quite removed from the above-mentioned needs and challenges of the nation and of society. They-largely-encourage learning by rote and discourage curiosity, creativity and innovation.</li>
            <li>Their courses of study and pedagogical methods are dated and meaningless.</li>
            <li>They do not encourage or realize the importance of the trans-disciplinary nature of knowledge.</li>
            <li>Indian educational institutions do not understand that knowledge without action is meaningless and that skills and knowledge are two sides of the same coin.</li>
            <li>Indian institutions do not seem to have grasped Gandhi’s dictum in the context of education, which says “what you do with your hands enters your heart”.</li>
          </ul>
        </p>
      </div>
    </section>
  );
};

export default Problems;
