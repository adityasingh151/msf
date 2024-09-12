import React from "react";
import DOMPurify from 'dompurify';

const RewardsSection = React.forwardRef(({ title, rewards }, ref) => {
  const sanitizedTitle = title ? DOMPurify.sanitize(title) : '';

  return (
    <section
      ref={ref}
      data-animation="animate-slide-in-bottom"
      className="py-4 bg-gradient-to-r from-indigo-50 to-blue-100"
    >
      <div className="container mx-auto px-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {sanitizedTitle && (
            <h2
              className="text-3xl font-bold text-center text-indigo-700 mb-6 ql-editor"
              dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
            />
          )}
          <table className="w-full text-lg leading-relaxed text-gray-700">
            <thead>
              <tr>
                <th className="text-left">For Students</th>
                <th className="text-left">For Schools</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((reward, index) => {
                const sanitizedStudents = reward.students ? DOMPurify.sanitize(reward.students) : '';
                const sanitizedSchools = reward.schools ? DOMPurify.sanitize(reward.schools) : '';
                return (
                  <tr key={index}>
                    <td className="p-4 border-b border-gray-300" dangerouslySetInnerHTML={{ __html: sanitizedStudents }} />
                    <td className="p-4 border-b border-gray-300" dangerouslySetInnerHTML={{ __html: sanitizedSchools }} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
});

export default RewardsSection;
