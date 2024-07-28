import React from 'react';
import background from '../assets/images/hero-background.png';
import shape1 from '../assets/images/shape/shape-1.svg';
import shape2 from '../assets/images/shape/shape-2.svg';
import shape3 from '../assets/images/shape/shape-3.svg';
import shape4 from '../assets/images/shape/shape-4.svg';
import headerImage from '../assets/images/header-image.svg';

const Hero = () => {
  return (
    <div className='mx-auto'>

    <div className="relative bg-gray-100 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
        >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-1/2">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Beautifully Crafted Tailwind CSS Hero Section
          </h1>
          <p className="text-white mt-6 text-lg sm:text-xl lg:text-2xl">
            Create stunning websites quickly with Tailwind CSS.
          </p>
          <a
            href="#get-started"
            className="inline-block mt-8 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            >
            Get Started
          </a>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end">
          <img
            src={headerImage}
            alt="Header Image"
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            />
        </div>
      </div>

      {/* Shapes */}
      <img
        src={shape1}
        alt="shape"
        className="absolute top-0 left-0 w-16 h-16"
        />
      <img
        src={shape2}
        alt="shape"
        className="absolute bottom-0 left-0 w-24 h-24"
        />
      <img
        src={shape3}
        alt="shape"
        className="absolute top-0 right-0 w-20 h-20"
        />
      <img
        src={shape4}
        alt="shape"
        className="absolute bottom-0 right-0 w-28 h-28"
        />
    </div>
        </div>
  );
};

export default Hero;
