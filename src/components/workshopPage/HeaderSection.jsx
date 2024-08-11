import React from 'react';

const HeaderSection = React.forwardRef(({ title, subtitle, buttonText, onButtonClick }, ref) => {
  return (
    <div ref={ref} data-animation="animate-slide-in" className="relative w-full bg-cover bg-center animate-fly-in bg-gradient-to-r from-teal-600 to-blue-700 h-screen" >
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 ">
       
        {/* Conditional rendering of the title, subtitle, and button */}
        {title && (
          <h1 className="text-blue-50 text-5xl font-bold mb-4 animate-bounce">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-blue-100 text-md font-bold mb-4 animate-pulse italic">
            {subtitle}
          </p>
        )}
        {buttonText && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
});

export default HeaderSection;
