import React from 'react';
import DOMPurify from 'dompurify';

const AdvisorySection = React.forwardRef(({ title, members }, ref) => {
  return (
    <section
      ref={ref}
      data-animation="animate-slide-in-bottom-right"
      className="py-4 bg-gradient-to-r from-indigo-50 to-blue-100"
    >
      <div className="container mx-auto px-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {title && (
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
              {title}
            </h2>
          )}
          <ul className="text-lg leading-relaxed text-gray-700">
            {members.map((member, index) => {
              const sanitizedName = member.name ? DOMPurify.sanitize(member.name) : '';
              const sanitizedDescription = member.description ? DOMPurify.sanitize(member.description) : '';
              return (
                <li key={index} className="mb-4">
                  {member.name && (
                    // <strong>{member.name},</strong>
                    <span dangerouslySetInnerHTML={{ __html: sanitizedName }} 
                    className=' m-0'/>
                  )}
                  {sanitizedDescription && (
                    <span dangerouslySetInnerHTML={{ __html: sanitizedDescription }} 
                    className=' m-0'/>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default AdvisorySection;
