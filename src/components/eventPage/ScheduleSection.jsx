import React from 'react';
import DOMPurify from 'dompurify';

const ScheduleSection = React.forwardRef(({ title, sessions }, ref) => {
  const sanitizedTitle = title ? DOMPurify.sanitize(title) : '';

  return (
    <section
      ref={ref}
      className="py-4 px-8 bg-gradient-to-r animate-fly-in from-blue-100 to-cyan-50"
    >
      <div className="container mx-auto">
        {sanitizedTitle && (
          <h2
            className="text-3xl font-bold text-center text-indigo-600 mb-6 ql-editor"
            dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg ">
          {sessions.map((session, index) => {
            const sanitizedSessionTitle = session.title ? DOMPurify.sanitize(session.title) : '';
            return (
              sanitizedSessionTitle && (
                <div
                  key={index}
                  className="p-4 border border-blue-300 rounded-lg hover:shadow-lg hover:bg-blue-200 transition duration-300"
                >
                  <h3
                    className="text-2xl font-bold ql-editor"
                    dangerouslySetInnerHTML={{ __html: sanitizedSessionTitle }}
                  />
                  {session.details.map((detail, idx) => {
                    const sanitizedDetail = DOMPurify.sanitize(detail);
                    return (
                      sanitizedDetail && (
                        <p key={idx} dangerouslySetInnerHTML={{ __html: sanitizedDetail }} 
                        className='ql-editor'/>
                      )
                    );
                  })}
                </div>
              )
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default ScheduleSection;
