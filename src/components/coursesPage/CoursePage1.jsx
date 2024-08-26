import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

const CoursePage1 = () => {
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const coursesRef = ref(db, 'coursesPage1');

    onValue(coursesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fetchedCourses = Object.keys(data).map(courseId => ({
          id: courseId,
          ...data[courseId]
        }));
        setTeacherCourses(fetchedCourses);
        setLoading(false);
        console.log(fetchedCourses);
      } else {
        console.log("No data available for teacher courses");
        setLoading(false);
      }
    }, (error) => {
      console.error("Error fetching data: ", error);
      setLoading(false);
    });
  }, []);


  return (
    <div className="font-sans bg-gradient-to-r from-gray-50 to-cyan-100 rounded-md shadow-md">
      {/* Header Section */}
      <section className="bg-no-repeat bg-top-right bg-cover py-4" style={{ backgroundImage: `url('https://example.com/background-image.jpg')` }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 px-4">
            <h1 className="font-serif text-5xl lg:text-6xl leading-tight mb-6 text-gray-800">Courses for School Teachers</h1>
            <p className="text-justify text-lg mb-8 text-gray-700">Globally the education is shifting to an online platform. With the COVID-19 pandemic, schools & colleges have moved online. This is our effort to empower teachers to learn, understand, and utilize tools for teaching in a technology-enabled online environment.</p>
            <Blurb title="Level - Beginner to Intermediate" icon="🏅" content="Explore various courses as per your current skill levels." />
            <Blurb title="Open for Enrollment" icon="📚" content="Join our ongoing sessions and enhance your teaching skills." />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap">
          {teacherCourses.length > 0 ? (
            teacherCourses.map((course, index) => (
              <div key={course.id || index} className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0 shadow-2xl rounded-lg">
                <CallToAction title={course.title || "No Title Provided"} buttonText="Learn More" />
                <CourseDescription description={course.description} fee={course.fees} duration={course.duration} imgSrc={course.imgSrc} />
              </div>
            ))
          ) : (
            <p>No teacher courses available.</p>
          )}
        </div>
      </section>

      {/* Objectives Section */}
      <section className="bg-teal-600 py-4">
        <div className="bg-white rounded-t-lg shadow-xl max-w-6xl mx-auto flex flex-wrap">
          <Objective title="Live Webinars" imgSrc="https://cdn3.iconfinder.com/data/icons/network-communication-vol-3-1/48/109-512.png" />
          <Objective title="Discussion with Peer Group" imgSrc="https://cdn4.iconfinder.com/data/icons/got-an-idea/128/discussion-512.png" />
          <Objective title="Projects and Hands-on Activities" imgSrc="https://cdn1.iconfinder.com/data/icons/teamwork-24/64/collective-project-data-processing-analysis-512.png" />
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-teal-700 text-white text-center py-4">
        <h2 className="text-2xl font-semibold mb-4">Stay safe at home and use this time to hone your skills and enhance your knowledge base.</h2>
        <Button text="Register Now" />
      </section>
    </div>
  );
};

const Blurb = ({ title, icon, content }) => (
  <div className="flex items-center mb-4">
    <i className="text-xl text-teal-500 mr-2">{icon}</i>
    <div>
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      <p className="text-base text-gray-700">{content}</p>
    </div>
  </div>
);

const CallToAction = ({ title, buttonText }) => (
  <div className="bg-teal-600 text-white text-center p-8 rounded-t-lg shadow-lg hover:bg-teal-700 transition duration-300">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <button className="bg-white hover:bg-gray-200 text-teal-600 rounded-full py-3 px-8 text-lg font-semibold tracking-wide transition duration-300">{buttonText}</button>
  </div>
);

const CourseDescription = ({ description, fee, duration, imgSrc }) => (
  <div>
    <img src={imgSrc || "https://via.placeholder.com/400"} alt="Course" className="w-full h-64 object-cover mb-4 rounded-b-lg" />
    <p className="w-fit font-bold text-xl mb-1 px-4 py-2 bg-teal-400 cursor-default rounded-full hover:bg-teal-600 shadow-md">Fees: <span className='text-xl font-normal'>Rs. {fee}</span></p>
    <ul className="list-disc list-inside space-y-2 mb-4">
      <li className="text-gray-800">{description}</li>
      <li className="text-gray-800">{duration}</li>
    </ul>
  </div>
);

const Objective = ({ title, imgSrc }) => (
  <div className="w-full lg:w-1/3 p-6 text-center">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
    <img className="mx-auto mb-4 transform transition duration-300 hover:scale-105" src={imgSrc} alt={title} />
  </div>
);

const Button = ({ text }) => (
  <div className="text-center mt-8">
    <button className="bg-red-500 cursor-default text-white rounded-full py-3 px-8 text-lg font-semibold tracking-wide transition duration-300">{text}</button>
  </div>
);

export default CoursePage1;
