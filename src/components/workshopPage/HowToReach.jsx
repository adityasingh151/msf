import React from 'react';
import DOMPurify from 'dompurify';

const HowToReach = React.forwardRef(({ location }, ref) => {
  const mapSrc = location && location.embedParams ? `https://www.google.com/maps/embed?pb=${location.embedParams}` : '';
  const sanitizedLocationName = location?.name ? DOMPurify.sanitize(location.name) : '';

  return (
    <section ref={ref} className="py-4 px-2 bg-gradient-to-r animate-fly-in from-blue-100 to-cyan-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          How To Reach
        </h2>
        <div className="flex flex-col md:flex-row md:items-center">
          {mapSrc && (
            <div className="md:w-3/4 p-4">
              <iframe
                src={mapSrc}
                width="90%"
                height="350"
                allowFullScreen
                loading="lazy"
                className="rounded-lg shadow-lg"
                title="Google Map"
              ></iframe>
            </div>
          )}
          {location && location.name && (
            <div className="md:w-1/4 p-4">
              <p
                className="text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizedLocationName }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default HowToReach;
