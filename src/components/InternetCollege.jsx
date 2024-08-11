import React from 'react';
import VisionStatement from './theInternetCollege/VisionStatement';
import MissionStatement from './theInternetCollege/MissionStatement';
import PhilosophyAndPractice from './theInternetCollege/PhilosophyAndPractice';
import Outcomes from './theInternetCollege/Outcomes';
import CrisisFacingEducation from './theInternetCollege/CrisisFacingEducation';
import EssentialFeatures from './theInternetCollege/EssentialFeatures';
import Problems from './theInternetCollege/Problems';
import AdvancedNations from './theInternetCollege/AdvancedNations';
import NeedForDigitalPlatform from './theInternetCollege/NeedForDigitalPlatform';

const InternetCollege = () => {
  return (
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100 min-h-screen">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <VisionStatement />
        <MissionStatement />
        <PhilosophyAndPractice />
        <Outcomes />
        <CrisisFacingEducation />
        <EssentialFeatures />
        <Problems />
        <AdvancedNations />
        <NeedForDigitalPlatform />
      </div>
    </div>
  );
};

export default InternetCollege;
