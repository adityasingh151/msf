import React from 'react';

const SponsorsSection = React.forwardRef(({ title, sponsors }, ref) => {
  return (
    <section
      ref={ref}
      data-animation="animate-fly-in"
      className="py-4 bg-gradient-to-r from-cyan-50 to-blue-100"
    >
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          {title}
        </h2>
        <div className="flex flex-wrap justify-center">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="w-1/2 md:w-1/4 p-4">
              <img
                src={sponsor.imageUrl}
                alt={sponsor.name}
                className="w-full h-auto rounded-lg shadow-lg transition transform hover:scale-105 duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default SponsorsSection;
