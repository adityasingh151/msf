import React from 'react';
import DOMPurify from 'dompurify';

const DetailsSection = React.forwardRef(({ title, details }, ref) => {
  return (
    <section
      ref={ref}
      data-animation="animate-slide-in-bottom"
      className="py-4 px-3 bg-gradient-to-r from-blue-100 to-cyan-50"
    >
      <div className="container mx-auto">
        <div className="max-w-screen-md mx-auto bg-white p-10 border border-gray-300 rounded-lg shadow-xl">
          {title && (
            <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
              {title}
            </h2>
          )}
          {details.map((detail, index) => {
            const sanitizedValue = detail.value ? DOMPurify.sanitize(detail.value) : '';
            return (
              sanitizedValue && (
                <p key={index} className="text-lg leading-relaxed text-gray-700 mb-4">
                  <strong>{detail.label}:</strong>{' '}
                  <span dangerouslySetInnerHTML={{ __html: sanitizedValue }} 
                  className='ql-editor'/>
                </p>
              )
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default DetailsSection;
