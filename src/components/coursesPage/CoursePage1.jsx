import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

const CoursePage1 = () => {
  const [teacherCourses, setTeacherCourses] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const coursesRef = ref(db, 'coursesPage1');

    onValue(coursesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fetchedCourses = [];
        for (const courseId in data) {
          const course = data[courseId];
          if (course.category === "teachers") {
            fetchedCourses.push({
              id: courseId,
              ...course
            });
          }
        }
        setTeacherCourses(fetchedCourses);
        console.log(fetchedCourses);
      } else {
        console.log("No data available for teacher courses");
      }
    });
  }, []);

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="bg-no-repeat bg-right-top bg-[url('#')] p-10 lg:p-20 text-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center w-full lg:w-2/3">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-5">Courses for School Teachers</h1>
            <p className="text-lg lg:text-xl mb-4">Globally the education is shifting to an online platform. With the COVID-19 pandemic, schools & colleges have moved online. This is our effort to empower teachers to learn, understand, and utilize tools for teaching in a technology-enabled online environment.</p>
          </div>
          <div className="flex flex-wrap justify-center mt-6 space-x-4">
            <Blurb title="Level - Beginner to Intermediate" icon="🏅" content="Explore various courses as per your current skill levels." />
            <Blurb title="Open for Enrollment" icon="📚" content="Join our ongoing sessions and enhance your teaching skills." />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {teacherCourses.length > 0 ? (
              teacherCourses.map((course, index) => (
                <CTA 
                  key={course.id || index}
                  title={course.title || "No Title Provided"}
                  details={course.description || "No details available"}
                  duration={`Course Duration: ${course.duration}`}
                  fees={course.fees}
                  action="Learn More"
                  imgSrc={course.imgSrc}
                />
              ))
            ) : (
              <p className="col-span-full">No teacher courses available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <IconText iconUrl="https://cdn3.iconfinder.com/data/icons/network-communication-vol-3-1/48/109-512.png" text="Live Webinars" />
          <IconText iconUrl="https://cdn4.iconfinder.com/data/icons/got-an-idea/128/discussion-512.png" text="Discussion with Peer Group" />
          <IconText iconUrl="https://cdn1.iconfinder.com/data/icons/teamwork-24/64/collective-project-data-processing-analysis-512.png" text="Projects and Hands-on Activities" />
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-blue-600 text-white text-center py-10">
        <p>Stay safe at home and use this time to hone your skills and enhance your knowledge base.</p>
      </section>
    </div>
  );
};

const Blurb = ({ title, icon, content }) => (
  <div className="mt-4 p-4 bg-blue-200 rounded-lg shadow-lg flex items-center space-x-3">
    <span className="text-2xl">{icon}</span>
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">{content}</p>
    </div>
  </div>
);

const CTA = ({ title, fees, details, duration, action, imgSrc }) => {
  const renderDetails = () => {
    if (Array.isArray(details)) {
      return details.map((detail, index) => <li key={index}>{detail}</li>);
    }
    return <li>{details}</li>; // Handle non-array details
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-center">{title}</h3>
        <img src={imgSrc} alt="Course" className="w-full h-64 object-cover mt-5" />
        <h3 className="mb-4 text-xl font-bold">Description: </h3>
        <ul className="list-disc list-inside my-4">
          {renderDetails()}
        </ul>
        <p className="font-semibold">{duration}</p>
        <p className="font-semibold">Rs. {fees}</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{action}</button>
      </div>
    </div>
  );
};

const IconText = ({ iconUrl, text }) => (
  <div className="p-6 bg-white shadow rounded-lg">
    <img src={iconUrl} alt={text} className="w-24 h-24 mx-auto mb-2" />
    <p className="font-medium">{text}</p>
  </div>
);

export default CoursePage1;