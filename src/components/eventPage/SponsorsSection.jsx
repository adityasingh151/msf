import React from 'react';
import DOMPurify from 'dompurify';

const SponsorsSection = React.forwardRef(({ title, sponsors }, ref) => {
  const sanitizedTitle = title ? DOMPurify.sanitize(title) : '';

  return (
    <section
      ref={ref}
      data-animation="animate-fly-in"
      className="py-4 bg-gradient-to-r from-cyan-50 to-blue-100"
    >
      <div className="container mx-auto px-8">
        {sanitizedTitle && (
          <h2
            className="text-3xl font-bold text-center text-indigo-600 mb-6"
            dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
          />
        )}
        <div className="flex flex-wrap justify-center">
          {sponsors.map((sponsor, index) => {
            const sanitizedSponsorName = sponsor.name ? DOMPurify.sanitize(sponsor.name) : '';
            return (
              sanitizedSponsorName && (
                <div key={index} className="w-1/2 md:w-1/4 p-4">
                  <img
                    src={sponsor.imageUrl}
                    alt={sanitizedSponsorName}
                    className="w-full h-auto rounded-lg shadow-lg transition transform hover:scale-105 duration-300"
                  />
                </div>
              )
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default SponsorsSection;
