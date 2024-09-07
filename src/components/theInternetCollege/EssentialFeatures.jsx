import React, { useEffect, useRef } from 'react';

const EssentialFeatures = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Essential Features of the Internet College</h2>
        
        <p className="text-lg leading-relaxed mb-6 font-serif text-gray-700">
          The Internet College addresses the crisis in education with the following features:
        </p>
        
        <ul className="list-disc pl-5 text-lg leading-relaxed mb-6 font-serif text-gray-700">
          <li><strong>Philosophy in More Practical Terms:</strong> Bridging the gap between theoretical knowledge and real-world applications.</li>
          <li><strong>Design and Effectiveness of the Technology Platform:</strong> Leveraging user-friendly and scalable technology to enhance the learning experience.</li>
          <li><strong>Innovativeness of the Pedagogical Environment:</strong> Creating a flexible and engaging learning environment that adapts to diverse student needs.</li>
          <li><strong>Creating Relevant Offerings and Content:</strong> Tailoring educational content to meet current industry demands and student career goals.</li>
        </ul>
        
        <p className="text-lg leading-relaxed font-serif text-gray-700">
          Stemming from these features will be the financial viability of The Internet College.
        </p>
      </div>
    </section>
  );
};

export default EssentialFeatures;
