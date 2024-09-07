import React from 'react';

const Problems = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Why Do We Have These Problems?</h2>
        <p className="text-lg leading-relaxed mb-6 font-serif text-gray-700">
          The following are some key reasons why these issues persist:
        </p>
        
        <ul className="list-disc pl-5 text-lg leading-relaxed mb-6 font-serif text-gray-700">
          <li>
            It is a tragic fact that Indian educational institutions are largely removed from the nation's and society’s needs and challenges. These institutions tend to encourage rote learning and discourage curiosity, creativity, and innovation.
          </li>
          <li>
            Their courses of study and pedagogical methods are often outdated and lack relevance.
          </li>
          <li>
            They do not emphasize or understand the importance of the trans-disciplinary nature of knowledge.
          </li>
          <li>
            Indian educational institutions fail to recognize that knowledge without action is meaningless and that skills and knowledge are two sides of the same coin.
          </li>
          <li>
            They have not fully embraced Gandhi’s dictum in the context of education, which says, “What you do with your hands enters your heart.”
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Problems;
