import React from 'react';

const Outcomes = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Outcomes of the Philosophy</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-4">
            <p className="text-lg leading-relaxed mb-4 font-serif text-gray-700">
              The very nature of the empowerment of the student through the Internet College shall ensure that the student evolves into a creative individual with practical and hands-on knowledge.
            </p>
            <p className="text-lg leading-relaxed mb-4 font-serif text-gray-700">
              This, in turn, is likely to enable the student to find gainful and fulfilling employment or assist them in setting up their own enterprise.
            </p>
            <p className="text-lg leading-relaxed font-serif text-gray-700">
              Thus, the Internet College shall endeavor to not just create job seekers but also job creators.
            </p>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <img
              src="path_to_image2.jpg"
              alt="Outcomes"
              className="w-full h-auto rounded-lg shadow-lg transform transition hover:scale-105 duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
