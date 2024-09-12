import React from 'react';
import DOMPurify from 'dompurify';

const AboutSection = React.forwardRef(({ content, imageUrl }, ref) => {
  const sanitizedContent = content ? DOMPurify.sanitize(content) : '';

  return (
    <section
      id='about'
      ref={ref}
      data-animation="animate-slide-in-left"
      className="py-4 bg-gradient-to-r from-cyan-50 to-blue-100"
    >
      <div className="container mx-auto px-8">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl font-bold text-indigo-600 mb-6">
              About this Event
            </h2>
            {sanitizedContent && (
              <div
                className="text-lg leading-relaxed ql-editor"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            )}
          </div>
          <div className="w-full md:w-1/2 p-4">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="About"
                className="w-full h-auto rounded-lg shadow-lg transition transform hover:scale-105 duration-300"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
