import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import Loading from '../LoadSaveAnimation/Loading';

const CoursePage2 = () => {
  const [collegeCourses, setCollegeCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const coursesRef = ref(db, 'coursesPage2');

    onValue(coursesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fetchedCourses = [];
        for (const courseId in data) {
          const course = data[courseId];
          fetchedCourses.push({
            id: courseId,
            ...course
          });
        }
        setCollegeCourses(fetchedCourses);
        setLoading(false);
        console.log(fetchedCourses);
      } else {
        console.log("No data available for college courses");
        setLoading(false);
      }
    });
  }, []);

  const headerProps = {
    title: "Courses for College Students",
    description: "If you are currently studying in university or going to join the workforce, you are expected to have some skills of the 21st century - Data Driven Thinking and Digital Skills. These skills not only enhance your employment opportunities but also improve your academic or professional performance.",
    backgroundImage: 'url(https://mathscifound.org/wp-content/uploads/2019/09/language-school-06.png)',
    blurbs: [
      { title: "Level - Beginner to Intermediate", icon: "🏅" },
      { title: "Open for Enrollment", icon: "📚", text: "We are running multiple batches of the course as per registrations" }
    ],
    buttonText: "Available Courses"
  };

  const objectivesProps = {
    objectives: [
      { title: "Live Webinars", imgSrc: "https://cdn3.iconfinder.com/data/icons/network-communication-vol-3-1/48/109-512.png" },
      { title: "Discussion with Peer Group", imgSrc: "https://cdn4.iconfinder.com/data/icons/got-an-idea/128/discussion-512.png" },
      { title: "Projects and Hands-on Activities", imgSrc: "https://cdn1.iconfinder.com/data/icons/teamwork-24/64/collective-project-data-processing-analysis-512.png" }
    ]
  };

  const footerProps = {
    title: "Register for a Course Today!",
    buttonText: "Register Now"
  };

  if (loading) return <Loading />;

  return (
    <div className="font-sans bg-gradient-to-r from-gray-50 to-cyan-100 rounded-md shadow-md">
      <Header {...headerProps} />
      <CourseDetails courses={collegeCourses} />
      <Objectives {...objectivesProps} />
      <Footer {...footerProps} />
    </div>
  );
};

const Header = ({ title, description, backgroundImage, blurbs, buttonText }) => {
  return (
    <section className="bg-no-repeat bg-top-right bg-cover py-4" style={{ backgroundImage }}>
      <div className="max-w-6xl mx-auto flex flex-wrap items-center">
        <div className="w-full lg:w-1/2 px-4">
          <h1 className="font-serif text-5xl lg:text-6xl leading-tight mb-6 text-gray-800">{title}</h1>
          <p className="text-justify text-lg mb-8 text-gray-700">{description}</p>
          {blurbs.map((blurb, index) => (
            <Blurb key={index} {...blurb} />
          ))}
        </div>
      </div>
      <Button text={buttonText} />
    </section>
  );
};

const Blurb = ({ title, icon, text }) => {
  return (
    <div className="flex items-center mb-4">
      <i className={`text-xl text-teal-500 mr-2 ${icon}`} />
      <div>
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        {text && <p className="text-base text-gray-700">{text}</p>}
      </div>
    </div>
  );
};

const Button = ({ text }) => {
  return (
    <div className="text-center mt-8">
      <button className="bg-red-500 cursor-default text-white rounded-full py-3 px-8 text-lg font-semibold tracking-wide transition duration-300">{text}</button>
    </div>
  );
};

const CourseDetails = ({ courses }) => {
  return (
    <section className="py-4">
      <div className="max-w-6xl mx-auto flex flex-wrap">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={course.id || index} className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0 shadow-2xl rounded-lg">
              <CallToAction title={course.courseName || "No Title Provided"} buttonText="Click Here" />
              <CourseDescription description={course.description} fee={course.fee} webinars={course.webinars} imgSrc={course.imageUrl} />
            </div>
          ))
        ) : (
          <p>No courses available at the moment.</p>
        )}
      </div>
    </section>
  );
};

const CallToAction = ({ title, buttonText }) => {
  return (
    <div className="bg-teal-600 text-white text-center p-8 rounded-t-lg shadow-lg hover:bg-teal-700 transition duration-300">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <button className="bg-white hover:bg-gray-200 text-teal-600 rounded-full py-3 px-8 text-lg font-semibold tracking-wide transition duration-300">{buttonText}</button>
    </div>
  );
};

const CourseDescription = ({ description, fee, webinars, imgSrc }) => {
  return (
    <div className="">
      <img src={imgSrc || "https://via.placeholder.com/400"} alt="Course" className="w-full h-64 object-cover mb-4 rounded-b-lg" />
      <p className="w-fit font-bold text-xl mb-1 px-4 py-2 bg-teal-400 cursor-default rounded-full hover:bg-teal-600 shadow-md">Fees: <span className='text-xl font-normal'>Rs. {fee}</span></p>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li className="text-gray-800">{description}</li>
        <li className="text-gray-800">{webinars}</li>
      </ul>
    </div>
  );
};

const Objectives = ({ objectives }) => {
  return (
    <section className="bg-teal-600 py-4">
      <div className="bg-white rounded-t-lg shadow-xl max-w-6xl mx-auto flex flex-wrap">
        {objectives.map((objective, index) => (
          <Objective key={index} {...objective} />
        ))}
      </div>
    </section>
  );
};

const Objective = ({ title, imgSrc }) => {
  return (
    <div className="w-full lg:w-1/3 p-6 text-center">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <img className="mx-auto mb-4 transform transition duration-300 hover:scale-105" src={imgSrc} alt={title} />
    </div>
  );
};

const Footer = ({ title, buttonText }) => {
  return (
    <section className="bg-teal-700 text-white text-center py-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <Button text={buttonText} />
    </section>
  );
};

export default CoursePage2;
