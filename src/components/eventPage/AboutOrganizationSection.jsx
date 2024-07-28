import React from 'react';

const AboutOrganizationSection = React.forwardRef(({ title, content }, ref) => {
  return (
    <section
      ref={ref}
      data-animation="animate-slide-in"
      className="py-4 bg-gradient-to-r from-cyan-50 to-blue-100"
    >
      <div className="container mx-auto px-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            {title}
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
});

export default AboutOrganizationSection;
