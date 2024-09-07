import React, { useEffect, useRef } from 'react';

const CrisisFacingEducation = () => {
  const crisisRef = useRef(null);

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

    if (crisisRef.current) {
      observer.observe(crisisRef.current);
    }

    return () => {
      if (crisisRef.current) {
        observer.unobserve(crisisRef.current);
      }
    };
  }, []);

  return (
    <section ref={crisisRef} data-animation="animate-fly-in" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Crisis Facing Education</h2>
        
        <p className="text-lg leading-relaxed mb-6 font-serif text-gray-700">
          Increasingly and in large measure, there is enormous dissatisfaction globally amongst the young with the established old school systems of education. In India, this dissatisfaction is even more evident. Consider the following facts:
        </p>

        <ul className="list-disc pl-5 text-lg leading-relaxed mb-6 font-serif text-gray-700">
          <li><strong>Un-employability of Students:</strong> Most educational institutions in India do not seem to be connected with the needs of society. Hence, students who do graduate tend to be rather unsuited for work. Kiran Karnik, then Director of NASSCOM, observed that 3 out of 4 graduates were unemployable.</li>
          
          <li><strong>Unemployable Students - A True Story from DU:</strong> In a campus placement exercise, only 3 out of 1200 shortlisted students were selected by a leading multinational firm, despite graduates being from highly reputed colleges.</li>
          
          <li><strong>Do Our Students Acquire Knowledge in the Classroom?</strong> A student from IIT Mumbai in 2015 stated that the academic experience over four years had been an "academic void," leading to minimal knowledge gain.</li>
          
          <li><strong>The Story of the Young Indian Cab Driver in Sydney:</strong> A young cab driver with a B.Com (Hons) from a leading Delhi University college was driving taxis in Sydney, due to a lack of practical, employable skills acquired from his degree.</li>
        </ul>

        <p className="text-lg leading-relaxed mb-6 font-serif text-gray-700">
          <strong>The Situation is Compounded By:</strong>
        </p>

        <ul className="list-disc pl-5 text-lg leading-relaxed mb-6 font-serif text-gray-700">
          <li><strong>Staggering Numbers of Students Graduating Annually:</strong> The UP Education Board, Bihar Education Board, and CBSE graduate about 60 lakh students annually from Class XII. Many of them fail to enter higher education and drift aimlessly, contributing to societal issues.</li>
          
          <li><strong>Our Embrace of Mediocrity in The Education Sector:</strong> Shekhar Gupta, former Chief Editor of the Indian Express, highlights India's mediocrity across academia and business, pointing out that very few individuals achieve global excellence or contribute cutting-edge research and innovation.</li>

          <li><strong>The Fact that India does not have a Knowledge Economy:</strong> India relies heavily on foreign technical expertise in vital sectors like oil and gas exploration, electronics, and proprietary software, leading to significant economic losses and dependency on foreign technology.</li>
        </ul>
      </div>
    </section>
  );
};

export default CrisisFacingEducation;
