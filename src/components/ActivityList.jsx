import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, off } from "firebase/database";
import Loading from './LoadSaveAnimation/Loading';
import DOMPurify from 'dompurify';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const activitiesRef = ref(db, 'activities');

    const unsubscribe = onValue(activitiesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedActivities = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      setActivities(loadedActivities);
      setIsLoading(false);
    }, (error) => {
      console.error(error);
      setError("Failed to fetch activities");
      setIsLoading(false);
    });

    return () => off(activitiesRef, 'value', unsubscribe);
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <div className="relative mx-auto py-12 px-6 bg-gradient-to-br from-blue-100 to-indigo-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-indigo-900 text-center">Activity List</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activities.map((activity) => (
          <div key={activity.id} className="relative bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex flex-col justify-between h-full">
              <p className="text-lg font-semibold text-gray-800" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(activity.headline) }} />
              <div className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(activity.description) }} />

              {/* Display date */}
              <p className="text-sm text-gray-600 flex font-bold">
                Date: <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(activity.date) }} className='font-normal' />
              </p>

              {/* Display images if they exist */}
              {activity.images && activity.images.length > 0 && (
                <div className="mt-4">
                  <ImageGallery
                    items={activity.images.map((imageUrl) => ({
                      original: imageUrl,
                      thumbnail: imageUrl
                    }))}
                    showThumbnails={true}
                    showFullscreenButton={true}
                    showPlayButton={false}
                    showBullets={true}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
