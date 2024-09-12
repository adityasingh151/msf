import React from 'react';
import DOMPurify from 'dompurify';

const RegistrationSection = React.forwardRef(({ title, details, buttonText, onButtonClick }, ref) => {
  const createMarkup = (htmlContent) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  const sanitizedTitle = title ? DOMPurify.sanitize(title) : '';
  const sanitizedButtonText = buttonText ? DOMPurify.sanitize(buttonText) : '';

  return (
    <section
      ref={ref}
      data-animation="animate-slide-in-top"
      className="py-4 px-3 bg-gradient-to-r from-blue-100 to-cyan-50"
    >
      <div className="container mx-auto">
        <div className="max-w-screen-md mx-auto bg-white p-10 border border-gray-300 rounded-lg shadow-xl">
          {sanitizedTitle && (
            <h2 className="text-4xl font-bold text-center text-blue-600 mb-8 ql-editor" dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
          )}
          {details.map((detail, index) => (
            <p key={index} className="text-lg leading-relaxed text-gray-700 mb-4">
              <strong>{detail.label}: </strong>
              <span dangerouslySetInnerHTML={createMarkup(detail.value)} 
              className='ql-editor'/>
            </p>
          ))}
          <div className="text-center mt-8">
            {sanitizedButtonText && (
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ql-editor"
                onClick={onButtonClick}
                dangerouslySetInnerHTML={{ __html: sanitizedButtonText }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default RegistrationSection;
