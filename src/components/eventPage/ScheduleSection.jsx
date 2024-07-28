import React from 'react';

const ScheduleSection = React.forwardRef(({ title, sessions }, ref) => {
  return (
    <section
      ref={ref}
      className="py-4 px-8 bg-gradient-to-r animate-fly-in from-blue-100 to-cyan-50"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg ">
          {sessions.map((session, index) => (
            <div
              key={index}
              className="p-4 border border-blue-300 rounded-lg hover:shadow-lg hover:bg-blue-200 transition duration-300"
            >
              <h3 className="text-2xl font-bold">{session.title}</h3>
              {session.details.map((detail, idx) => (
                <p key={idx}>{detail}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ScheduleSection;
