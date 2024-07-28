import React, { useEffect, useRef } from 'react';

const HeaderPattern = () => {
  const textRef = useRef(null);
  const fullText = "Mathematical Sciences Foundation";

  useEffect(() => {
    let timeoutId;

    const runAnimation = () => {
      let i = 0;
      const textElement = textRef.current;
      textElement.textContent = ''; // Clear the text content before starting the animation

      const typewriter = () => {
        if (i < fullText.length) {
          textElement.textContent += fullText.charAt(i);
          i++;
          timeoutId = setTimeout(typewriter, 100); // Delay of 150ms for typing effect
        }
      };

      typewriter();
    };

    runAnimation();
    const intervalId = setInterval(runAnimation, 10000); // Repeat the animation every 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
      clearTimeout(timeoutId); // Cleanup timeout on component unmount
    };
  }, [fullText]); // Ensure the effect runs only once and when fullText changes

  return (
    <section className="relative w-full h-40 mt-0 bg-gradient-to-r from-teal-600 to-blue-700">
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-repeat bg-cover opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg width='100%' height='100%' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='pattern' patternUnits='userSpaceOnUse' width='20' height='20'><circle cx='10' cy='10' r='8' fill='none' stroke='hsl(48, 100%, 67%)' stroke-width='2'/></pattern></defs><rect width='100%' height='100%' fill='url(#pattern)'/></svg>")`,
          }}
        ></div>
        <p className="text-yellow-200 text-lg font-semibold mb-0 italic animate-fade-in">
          Welcome to
        </p>
        <h1 ref={textRef} className="text-white text-5xl font-extrabold mb-0">
          {/* Initial text is empty to allow typewriter effect */}
        </h1>
        {/* <p className="text-yellow-200 text-md font-semibold animate-pulse italic">
          <span className=''>Director:</span>An initiative by Prof. Dinesh Singh
        </p> */}
      </div>
    </section>
  );
};

export default HeaderPattern;
