import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import AboutSection from './AboutSection';
import SponsorsSection from './SponsorsSection'; // Fixed typo in the name
import WorksSection from './WorksSection';
import ContactArea from './ContactArea';
import Loading from './LoadSaveAnimation/Loading';
import CoursePage2 from './coursesPage/CoursePage2';
import CoursePage1 from './coursesPage/CoursePage1';
import CoursesPage from './coursesPage/CoursesPage'
import SponsorsImageForm from './dashBoard/inputForms/SponsorsImageForm';
import ReviewForm from './dashBoard/inputForms/ReviewForm';
import ReviewsDisplay from './ReviewsDisplay';
import HeaderPattern from './HeaderPattern';
// import InternetCollege from './InternetCollege';

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Adjust this duration as needed

    // Cleanup function to clear the timeout
    return () => clearTimeout(timer);
  }, []); // Add dependencies array to prevent re-running on component updates

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
    <HeaderPattern/>
      <Carousel />
      {/* <AboutSection />
      <SponsorsSection /> */}
      <WorksSection />
      <ReviewsDisplay/>
      {/* <InternetCollege/> */}
    </>
  );
}

export default Home;
