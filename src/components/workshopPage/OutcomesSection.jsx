import React from 'react';
import DOMPurify from 'dompurify';

const OutcomesSection = React.forwardRef(({ title, content }, ref) => {
  const sanitizedContent = content ? DOMPurify.sanitize(content) : '';

  return (
    <section ref={ref} data-animation="animate-slide-in-left" className="py-4 bg-gradient-to-r from-indigo-50 to-blue-100">
      <div className="container mx-auto px-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {title && <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">{title}</h2>}
          {content && (
            <p
              className="text-lg leading-relaxed text-gray-700 ql-editor"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          )}
        </div>
      </div>
    </section>
  );
});

export default OutcomesSection;
