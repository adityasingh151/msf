import React from 'react';
import DOMPurify from 'dompurify';

const ScheduleSection = React.forwardRef(({ title, sessions }, ref) => {
  const sanitizedTitle = title ? DOMPurify.sanitize(title) : '';
  const sanitizedSessions = sessions ? sessions.map(session => ({
    ...session,
    title: session.title ? DOMPurify.sanitize(session.title) : '',
    details: session.details ? session.details.map(detail => DOMPurify.sanitize(detail)) : [],
  })) : [];

  return (
    <section ref={ref} className="py-4 px-8 bg-gradient-to-r animate-fly-in from-blue-100 to-cyan-50">
      <div className="container mx-auto">
        {title && (
          <h2
            className="text-3xl font-bold text-center text-indigo-600 mb-6"
            dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
          />
        )}
        {sanitizedSessions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
            {sanitizedSessions.map((session, index) => (
              <div key={index} className="p-4 border border-blue-300 rounded-lg hover:shadow-lg hover:bg-blue-200 transition duration-300">
                {session.title && (
                  <h3 className="text-2xl font-bold" dangerouslySetInnerHTML={{ __html: session.title }} />
                )}
                {session.details && session.details.map((detail, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: detail }} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default ScheduleSection;
