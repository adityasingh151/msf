import React from 'react';
import DOMPurify from 'dompurify';

const RegistrationSection = React.forwardRef(({ title, details, registrationInfo, buttonText, onButtonClick }, ref) => {
  const sanitizedTitle = title ? DOMPurify.sanitize(title) : '';
  const sanitizedDetails = details ? details.map(detail => ({
    ...detail,
    value: detail.value ? DOMPurify.sanitize(detail.value) : '',
  })) : [];

  return (
    <section ref={ref} data-animation="animate-slide-in-bottom" className="py-4 px-3 bg-gradient-to-r from-blue-100 to-cyan-50">
      <div className="container mx-auto">
        <div className="max-w-screen-md mx-auto bg-white p-10 border border-gray-300 rounded-lg shadow-xl">
          {title && (
            <h2
              className="text-4xl font-bold text-center text-blue-600 mb-8"
              dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
            />
          )}
          {sanitizedDetails && sanitizedDetails.map((detail, index) => (
            detail.value && (
              <p key={index} className="text-lg leading-relaxed text-gray-700 mb-4">
                <strong>{detail.label}:</strong> {detail.value}
              </p>
            )
          ))}
          {buttonText && (
            <div className="text-center mt-8">
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
                onClick={onButtonClick}
              >
                {buttonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default RegistrationSection;
