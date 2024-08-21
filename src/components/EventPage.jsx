import React, { useEffect, useRef, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { useParams } from 'react-router-dom';
import HeaderSection from './eventPage/HeaderSection';
import AboutSection from './eventPage/AboutSection';
import FeaturesSection from './eventPage/FeaturesSection';
import SponsorsSection from './eventPage/SponsorsSection';
// import DetailsSection from './eventPage/DetailsSection';
import RewardsSection from './eventPage/RewardsSection';
import AboutOrganizationSection from './eventPage/AboutOrganizationSection';
import AdvisorySection from './eventPage/AdvisorySection';
import RegistrationSection from './eventPage/RegistrationSection';
import Loading from './LoadSaveAnimation/Loading';

const EventPage = () => {
  const { eventId } = useParams();
  const sectionRefs = {
    header: useRef(null),
    about: useRef(null),
    features: useRef(null),
    sponsors: useRef(null),
    details: useRef(null),
    rewards: useRef(null),
    aboutOrg: useRef(null),
    advisory: useRef(null),
    registration: useRef(null),
  };

  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const eventRef = ref(db, 'events/' + eventId); // Adjust the path as per your database structure
  
    onValue(eventRef, (snapshot) => {
      const data = snapshot.val();
      setEventData(data);
    });
  }, [eventId]);

  if (!eventData) {
    return <Loading/>;
  }

  const headerTitle = eventData.headerTitle;
  const headerSubtitle = eventData.headerSubtitle;
  const headerButtonText = "Register Now";

  // const aboutTitle = eventData.aboutTitle;
  const aboutContent = eventData.aboutDescription;
  const aboutImageUrl = eventData.aboutImage;

  const featuresTitle = "Features of the Competition";
  const features = [
    eventData.feature1,
    eventData.feature2,
    eventData.feature3,
    eventData.feature4,
  ];

  const sponsorsTitle = "Our Sponsors";
  const sponsors = [
    { name: eventData.sponsor1, imageUrl: eventData.sponsorImage1 },
    { name: eventData.sponsor2, imageUrl: eventData.sponsorImage2 },
  ];

  const rewardsTitle = "Rewards";
  const rewards = [
    { students: eventData.studentReward1, schools: eventData.schoolReward1 },
    { students: eventData.studentReward2, schools: eventData.schoolReward2 },
    { students: eventData.studentReward3, schools: eventData.schoolReward3 },
  ];

  const aboutOrgTitle = "About Mathematical Sciences Foundation";
  const aboutOrgContent = eventData.organizationDescription;

  const advisoryTitle = "The advisory committee comprises of eminent educationists including:";
  const advisoryMembers = [
    { name: eventData.advisoryMember1, description: eventData.advisoryMemberDescription1 },
    { name: eventData.advisoryMember2, description: eventData.advisoryMemberDescription2 },
    { name: eventData.advisoryMember3, description: eventData.advisoryMemberDescription3 },
  ];

  const registrationTitle = "Register Now";
  const registrationDetails = [
    { label: "Eligibility", value: eventData.eligibility },
    { label: "Date & Time", value: eventData.eventDate + " " + eventData.eventTime },
    { label: "Fees", value: " Rs." + eventData.registrationFee +" /-" },
  ];
  const registrationInfo = `<a href='${eventData.registrationLink}' target='_blank' rel='noreferrer noopener'>${eventData.registrationLink}</a>`;
  const registrationButtonText = "Register Now";
  const onRegistrationButtonClick = () => {
    window.location.href = eventData.registrationLink;
  };

  return (
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100">
      <HeaderSection
        ref={sectionRefs.header}
        title={headerTitle}
        subtitle={headerSubtitle}
        buttonText={headerButtonText}
        onButtonClick={onRegistrationButtonClick}
      />
      <AboutSection
        ref={sectionRefs.about}
        // title={aboutTitle}
        content={aboutContent}
        imageUrl={aboutImageUrl}
      />
      <FeaturesSection
        ref={sectionRefs.features}
        title={featuresTitle}
        features={features}
      />
      <SponsorsSection
        ref={sectionRefs.sponsors}
        title={sponsorsTitle}
        sponsors={sponsors}
      />
      <RegistrationSection
        ref={sectionRefs.registration}
        title={registrationTitle}
        details={registrationDetails}
        registrationInfo={registrationInfo}
        buttonText={registrationButtonText}
        onButtonClick={onRegistrationButtonClick}
      />
      <RewardsSection
        ref={sectionRefs.rewards}
        title={rewardsTitle}
        rewards={rewards}
      />
      <AboutOrganizationSection
        ref={sectionRefs.aboutOrg}
        title={aboutOrgTitle}
        content={aboutOrgContent}
      />
      <AdvisorySection
        ref={sectionRefs.advisory}
        title={advisoryTitle}
        members={advisoryMembers}
      />
    </div>
  );
};

export default EventPage;
