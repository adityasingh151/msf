import React, { useEffect, useRef } from 'react';

const Outcomes = () => {
  const outcomesRef = useRef(null);

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

    if (outcomesRef.current) {
      observer.observe(outcomesRef.current);
    }

    return () => {
      if (outcomesRef.current) {
        observer.unobserve(outcomesRef.current);
      }
    };
  }, []);

  return (
    <section ref={outcomesRef} data-animation="animate-slide-in-right" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Outcomes of the Philosophy</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-4">
            <p className="text-lg leading-relaxed mb-4 font-serif">
              The very nature of the empowerment of the student through the Internet College shall ensure that the student has evolved into a creative individual with practical and hands-on knowledge.
            </p>
            <p className="text-lg leading-relaxed font-serif">
              In turn this is likely to enable the student to either find gainful and fulfilling employment or it shall assist him in setting up his own enterprise.
            </p>
            <p className="text-lg leading-relaxed font-serif">
              Thus the Internet College shall endeavor to not just create job seekers but also job creators.
            </p>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <img src="path_to_image2.jpg" alt="Outcomes" className="w-full h-auto rounded-lg shadow-lg transition transform hover:scale-105 duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
