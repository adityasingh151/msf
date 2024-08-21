import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
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

  const handleButtonClick = useCallback(() => {
    if (workshopData?.registrationLink) {
      window.location.href = workshopData.registrationLink;
    }
  }, [workshopData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100">
      <Suspense fallback={<Loading />}>
        {workshopData?.headerTitle && 
          <HeaderSection
            title={workshopData.headerTitle}
            subtitle={workshopData.headerSubtitle}
            buttonText="Register Now"
            onButtonClick={handleButtonClick}
          />
        }
        {workshopData?.aboutDescription &&
          <AboutSection
            title={workshopData.aboutTitle}
            content={workshopData.aboutDescription}
            imageUrl={workshopData.aboutImage}
          />
        }
        {workshopData?.outcomeContent && 
          <OutcomesSection
            title={workshopData.outcomeTitle}
            content={workshopData.outcomeContent}
          />
        }
        {workshopData?.quote && 
          <QuoteSection
            quote={workshopData.quote}
          />
        }
        {workshopData?.workshopDate && 
          <RegistrationSection
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
          />
        }
        {workshopData?.address && 
          <HowToReach
            location={{ name: workshopData.address, embedParams: workshopData.addressURL }}
          />
        }
      </Suspense>
    </div>
  );
};

export default WorkshopPage;
