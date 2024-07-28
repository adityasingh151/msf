import React from 'react';

const HeaderSection = React.forwardRef(({ title, subtitle, buttonText, onButtonClick }, ref) => {
  return (
    <div ref={ref} data-animation="animate-fly-in" className="relative w-full h-60 bg-cover bg-center" >
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-repeat blur-sm"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='65' height='65' patternTransform='scale(5) rotate(25)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(187,65.6%,47.8%,1)'/><path d='M25.5 6.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm39 13a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm0 13a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-39 0a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm13 26a6 6 0 1 1-12 0 6 6 0 0 1 12 0z'  stroke-width='1' stroke='none' fill='hsla(240, 39%, 49%, 1)'/><path d='M64.5 45.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm0-39a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-13 13a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm0 26a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-26 13a6 6 0 1 1-12 0 6 6 0 0 1 12 0z'  stroke-width='1' stroke='none' fill='hsla(45,98.7%,69.8%,1)'/><path d='M51.5 32.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-13-13a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm0-13a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-26 39a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm0 13a6 6 0 1 1-12 0 6 6 0 0 1 12 0z'  stroke-width='1' stroke='none' fill='hsla(0,98.9%,64.1%,1)'/><path d='M51.5 58.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-39-52a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm0 26a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm26 13a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-13-26a6 6 0 1 1-12 0 6 6 0 0 1 12 0z'  stroke-width='1' stroke='none' fill='hsla(240, 39%, 49%, 1)'/></pattern></defs><rect width='800%' height='800%' transform='translate(-110,0)' fill='url(%23a)'/></svg>")`
          }}
        ></div>
        <h1 className="text-blue-50 text-5xl font-bold mb-4 animate-bounce">
          {title}
        </h1>
        <p className="text-blue-100 text-md font-bold mb-4 animate-pulse italic">
          {subtitle}
        </p>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
});

export default HeaderSection;