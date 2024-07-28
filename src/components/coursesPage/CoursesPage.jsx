import React from 'react';

const coursesForStudents = [
  {
    title: 'Learn Math in a Fun and Easy Way using Computers',
    description: 'This programme is designed for middle school students who wish to kickstart their learning and excel in their studies. Visualization helps here to understand what the problem is about. It will enhance student’s understanding and improve achievements as well as problem-solving skills. It will equip them with mathematical skills and help children to visualize mathematical concepts.',
    imgSrc: 'https://lh3.googleusercontent.com/KXxQm9ACAeTFg7rANxYX32DWaHHIVuMAU0JEyLd1CYC7vWB6Y6g3VIJvte_kUPAs5D3FQL6NXg=w640-h400-e365',
    link: '#',
  },
  {
    title: 'Statistics and Probability for Class 9 & 10th',
    description: 'Today’s 21st century world revolves around data. Understanding and interpreting data is, therefore, not just a chapter in the mathematics syllabus, but also a valuable skill in daily life. Learn the concepts of statistics and probability aligned with the syllabus of secondary education and their application in the real world.',
    imgSrc: 'https://cdn0.iconfinder.com/data/icons/ikooni-outline-seo-web/128/seo2-83-2-256.png',
    link: '#',
  },
  {
    title: 'Statistics and Probability for Class 11 & 12th',
    description: 'Today’s 21st century world revolves around data. Understanding and interpreting data is, therefore, not just a chapter in the mathematics syllabus, but also a valuable skill in daily life. Learn the concepts of statistics and probability aligned with the syllabus of senior secondary education and their application in the real world.',
    imgSrc: 'https://cdn0.iconfinder.com/data/icons/ikooni-outline-seo-web/128/seo2-39-256.png',
    link: '#',
  },
];

const coursesForTeachers = [
  {
    title: 'Enriching Your Classroom with GeoGebra',
    description: 'Learn how to use GeoGebra in our course for middle school math teachers with exploratory pedagogy. This course is designed to equip the participants with the basics of GeoGebra and the skill to create their own dynamic applets to use in their classrooms.',
    imgSrc: 'https://wiki.geogebra.org/uploads/8/85/Download-icons-device-screen.png',
    link: 'https://mathscifound.org/online-courses/school-teachers/',
  },
  {
    title: 'Introduction to Useful Tools and Online Teaching Strategies',
    description: 'Globally, education is shifting to the online platform. This course empowers teachers to learn, understand, and use tools to teach in an online environment, especially relevant due to the COVID-19 pandemic.',
    imgSrc: 'https://cdn1.iconfinder.com/data/icons/online-education-58/200/education-teaching-Online_course-512.png',
    link: 'https://mathscifound.org/online-courses/school-teachers/',
  },
  {
    title: 'Practicals on Applied Mathematics Using Spreadsheets',
    description: 'Learn practical applications of mathematics using spreadsheets. This course focuses on applying mathematical concepts through practical exercises, enhancing teaching methodologies with hands-on learning.',
    imgSrc: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://mathscifound.org/online-courses/school-teachers/',
  },
];

const coursesForCollegeStudents = [
  {
    title: 'Getting Started with Data Analysis on MS Excel with Basic Statistics',
    description: 'This learning programme is designed in such a way that participants can explore techniques of quantitative data analysis using Microsoft Excel. This introductory course enables the participants to make sense of data analytics using spreadsheets and derive valuable insights from available information.',
    imgSrc: 'https://cdn2.iconfinder.com/data/icons/financial-vol-2/128/064-512.png',
    link: 'https://mathscifound.org/online-courses/college-students/',
  },
  {
    title: 'Essential Digital Skills for College Students',
    description: 'This course will help the participants to acquire digital skills required in internet & technology-driven learning environments. Participants will learn methods and tools for conducting online research, developing websites using WordPress, and identifying credible information on the web. These skills have been coupled with the domain of academic inquiry through various projects and activities.',
    imgSrc: 'https://cdn2.iconfinder.com/data/icons/pregnancy-8/512/56_reach_Touch_destination_digital_analytic_creative_skills_process-512.png',
    link: 'https://mathscifound.org/online-courses/college-students/',
  },
  {
    title: 'English Communication & Self Enhancement',
    description: 'No matter what your goal, good communication is the key to success in life. But did you know that communicating well has little to do with mastering a language? It is much more than that—it is about finding your voice, having something to say, and saying it with conviction and clarity. This activity-based, interdisciplinary workshop is all things relevant, creative, and enjoyable, designed to help you become a good thinker, confident speaker, and an excellent communicator. The participants will be introduced to ways of thinking critically through creative, innovative, and engaging activities.',
    imgSrc: 'https://cdn2.iconfinder.com/data/icons/unigrid-bluetone-human-vol-5/60/011_207_team_discussion_message_chat_forum_communication-512.png',
    link: 'https://mathscifound.org/online-courses/college-students/',
  },
];

const teachingMethods = [
  {
    title: 'Online/Webinar Based',
    description: 'Utilizing modern webinar tools to deliver real-time teaching experiences that are both engaging and educational.',
    imgSrc: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    title: 'Interdisciplinary Approach',
    description: 'Incorporating multiple disciplines to provide a holistic learning experience that encourages critical thinking and creativity.',
    imgSrc: 'https://images.pexels.com/photos/3017115/pexels-photo-3017115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    title: 'Hands-on & Project Based Learning',
    description: 'Engaging students in practical projects to apply theoretical knowledge and develop problem-solving skills.',
    imgSrc: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    title: 'Discussion with Peer Group',
    description: 'Facilitating peer discussions to enhance learning through collaboration, exchange of ideas, and feedback.',
    imgSrc: 'https://images.pexels.com/photos/1325762/pexels-photo-1325762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const CourseCard = ({ title, description, imgSrc, link }) => (
  <div className="w-full md:w-1/3 px-4 mb-8">
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
      <img src={imgSrc} className="w-full h-48 object-cover" alt="Course Thumbnail" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-800">{title}</h3>
        <p className="text-base text-gray-700 mb-4 h-40 overflow-hidden">{description}</p>
        <a href={link} className="inline-block bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full">Know More</a>
      </div>
    </div>
  </div>
);

function CoursesPage() {
  return (
    <div className="bg-coolGray-100">
      {/* Header Section */}
      <div className="bg-[url('https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-top-right py-4 px-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <h1 className="text-6xl font-serif mb-4">Online Hands-on Courses for Teachers and Students</h1>
            <p className="text-xl">We at MSF have created a variety of online courses specially designed for the community of teachers, school students & college students. These skill-based courses will enable you to excel in your arena and enhance your understanding with the help of technology.</p>
          </div>
        </div>
      </div>

      {/* Our Course Offerings */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-serif text-center mb-12 text-blue-600">Our Course Offerings</h2>
          <div className="flex flex-wrap -mx-4">
            {coursesForStudents.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </div>

      {/* For School Teachers */}
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif mb-12 text-blue-600">For School Teachers</h2>
          <div className="flex flex-wrap -mx-4">
            {coursesForTeachers.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </div>

      {/* For College Students or Budding Professionals */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif mb-12 text-blue-600">For College Students or Budding Professionals</h2>
          <div className="flex flex-wrap -mx-4">
            {coursesForCollegeStudents.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </div>

      {/* Teaching and Learning Method Section */}
      <div className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif mb-12 text-blue-600">Teaching and Learning Method</h2>
          <div className="flex flex-wrap -mx-4">
            {teachingMethods.map((method, index) => (
              <CourseCard key={index} {...method} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="py-20 bg-white text-center">
        <h2 className="text-5xl font-serif mb-4 text-blue-600">Register for a Course Today!</h2>
        <p className="text-xl text-gray-700">Stay safe at home and use this time to hone your skills and enhance your knowledge base.</p>
        <div className="mt-4">
          <a href="#" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full mr-4">Join Now</a>
          <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">Learn More</a>
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;