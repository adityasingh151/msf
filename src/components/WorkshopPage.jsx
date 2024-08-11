import React, { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useParams } from 'react-router-dom';
import Loading from './LoadSaveAnimation/Loading';

const HeaderSection = lazy(() => import('./workshopPage/HeaderSection'));
const AboutSection = lazy(() => import('./workshopPage/AboutSection'));
const OutcomesSection = lazy(() => import('./workshopPage/OutcomesSection'));
const QuoteSection = lazy(() => import('./workshopPage/QuoteSection'));
const RegistrationSection = lazy(() => import('./workshopPage/RegistrationSection'));
const HowToReach = lazy(() => import('./workshopPage/HowToReach'));

const WorkshopPage = () => {
  const { workshopId } = useParams();
  const [workshopData, setWorkshopData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshopData = async () => {
      const db = getDatabase();
      const workshopRef = ref(db, 'workshops/' + workshopId);
      try {
        const snapshot = await get(workshopRef);
        if (snapshot.exists()) {
          setWorkshopData(snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching workshop data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshopData();
  }, [workshopId]);

  const sectionRefs = useRef({
    header: null,
    about: null,
    schedule: null,
    outcomes: null,
    quote: null,
    registration: null,
    directions: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.dataset.animation);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [workshopData]);

  const handleButtonClick = useCallback(() => {
    if (workshopData.registrationLink) {
      window.location.href = workshopData.registrationLink;
    }
  }, [workshopData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100">
      <Suspense fallback={<Loading />}>
        {workshopData.headerTitle && 
          <HeaderSection
            ref={(el) => (sectionRefs.current.header = el)}
            title={workshopData.headerTitle}
            subtitle={workshopData.headerSubtitle}
            buttonText="Register Now"
            onButtonClick={handleButtonClick}
            data-animation="animate-slide-in"
          />
        }
        {workshopData.aboutDescription &&
          <AboutSection
            ref={(el) => (sectionRefs.current.about = el)}
            title={workshopData.aboutTitle}
            content={workshopData.aboutDescription}
            imageUrl={workshopData.aboutImage}
            data-animation="animate-fade-in"
          />
        }
        {workshopData.outcomeContent && 
          <OutcomesSection
            ref={(el) => (sectionRefs.current.outcomes = el)}
            title={workshopData.outcomeTitle}
            content={workshopData.outcomeContent}
            data-animation="animate-slide-up"
          />
        }
        {workshopData.quote && 
          <QuoteSection
            ref={(el) => (sectionRefs.current.quote = el)}
            quote={workshopData.quote}
            data-animation="animate-fade-in"
          />
        }
        {workshopData.workshopDate && 
          <RegistrationSection
            ref={(el) => (sectionRefs.current.registration = el)}
            title="Register for the Workshop"
            details={[
              { label: 'Date', value: workshopData.workshopDate },
              { label: 'Time', value: `${workshopData.workshopStartTime} - ${workshopData.workshopEndTime}` },
              { label: 'Prerequisite', value: workshopData.prerequisites },
              { label: 'Designed for', value: workshopData.designedFor },
              { label: 'Fees(Rupees)', value: workshopData.workshopRegistrationFee },
            ]}
            registrationInfo={workshopData.registrationInfo}
            buttonText="Register Now"
            onButtonClick={handleButtonClick}
            data-animation="animate-slide-up"
          />
        }
        {workshopData.address && 
          <HowToReach
            ref={(el) => (sectionRefs.current.directions = el)}
            location={{ name: workshopData.address, embedParams: workshopData.addressURL }}
            data-animation="animate-fade-in"
          />
        }
      </Suspense>
    </div>
  );
};

export default WorkshopPage;
