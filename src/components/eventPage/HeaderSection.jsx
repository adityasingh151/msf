import React from 'react';
import DOMPurify from 'dompurify';

const HeaderSection = React.forwardRef(({ title, subtitle, buttonText, onButtonClick }, ref) => {
  const sanitizedTitle = title ? DOMPurify.sanitize(title) : '';
  const sanitizedSubtitle = subtitle ? DOMPurify.sanitize(subtitle) : '';
  const sanitizedButtonText = buttonText ? DOMPurify.sanitize(buttonText) : '';

  const handleLearnMoreClick = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={ref} data-animation="animate-fly-in" className="relative w-full bg-cover bg-center bg-gradient-to-r from-teal-900 to-blue-950 h-screen">
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
        {sanitizedTitle && (
          <h1 className="text-blue-50 text-5xl font-bold mb-1" dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
        )}
        {sanitizedSubtitle && (
          <p className="text-blue-100 text-md font-bold mb-1 animate-pulse italic" dangerouslySetInnerHTML={{ __html: sanitizedSubtitle }} />
        )}
        {sanitizedButtonText && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            onClick={onButtonClick}
            dangerouslySetInnerHTML={{ __html: sanitizedButtonText }}
          />
        )}
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-3 sm:mt-6 rounded-full"
          onClick={handleLearnMoreClick}
        >
          Learn More
        </button>
      </div>
    </div>
  );
});

export default HeaderSection;
