import React from 'react';
import DOMPurify from 'dompurify';

const FeaturesSection = React.forwardRef(({ title, features }, ref) => {
  const sanitizedTitle = title ? DOMPurify.sanitize(title) : '';

  return (
    <section
      ref={ref}
      data-animation="animate-slide-in-bottom"
      className="py-4 bg-gradient-to-r from-indigo-50 to-blue-100"
    >
      <div className="container mx-auto px-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {sanitizedTitle && (
            <h2
              className="text-3xl font-bold text-center text-indigo-700 mb-6 "
              dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
            />
          )}
          <ul className="text-lg leading-relaxed text-gray-700">
            {features.map((feature, index) => {
              const sanitizedFeature = DOMPurify.sanitize(feature);
              return (
                sanitizedFeature && (
                  <li key={index} className="mb-4 " dangerouslySetInnerHTML={{ __html: sanitizedFeature }} />
                )
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default FeaturesSection;
