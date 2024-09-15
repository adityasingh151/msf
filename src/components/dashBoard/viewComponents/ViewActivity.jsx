import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, off, remove, update } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { useNavigate } from 'react-router-dom'; // For navigation
import Loading from '../../LoadSaveAnimation/Loading';
import DOMPurify from 'dompurify'; // Import DOMPurify

const ViewActivity = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    // Navigate to the ActivityForm with the existing activity's data for editing
    navigate(`/admin/forms/activity/edit/${id}`);
  };

  const handleDeleteActivity = async (id) => {
    setIsDeleting(true);
    try {
      const db = getDatabase();
      const activityRef = ref(db, `activities/${id}`);
      await remove(activityRef);
      alert('Activity deleted successfully!');
      setActivities(activities.filter(activity => activity.id !== id));
    } catch (error) {
      console.error('Error deleting activity:', error);
      alert('Failed to delete activity.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteImage = async (activityId, imageUrl, imageIndex) => {
    setIsDeleting(true);
    try {
      const storage = getStorage();
      const imageRef = storageRef(storage, imageUrl);
      await deleteObject(imageRef); // Delete the image from Firebase storage

      // Update the activity to remove the image from the image array
      const db = getDatabase();
      const activityRef = ref(db, `activities/${activityId}`);
      const updatedImages = activities.find(act => act.id === activityId).images.filter((_, index) => index !== imageIndex);
      await update(activityRef, { images: updatedImages });

      // Update the state after image deletion
      setActivities(prevActivities => prevActivities.map(act => act.id === activityId ? { ...act, images: updatedImages } : act));
      alert('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <div className="relative mx-auto py-12 px-6 bg-gradient-to-br from-blue-100 to-indigo-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-indigo-900 text-center">Activity List</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activities.map((activity) => (
          <div key={activity.id} className="relative bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex flex-col justify-between h-full">
              <p className="text-lg font-semibold text-gray-800">{activity.headline}</p>
              <div className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(activity.description) }} />
              <p className="text-sm text-gray-600 flex">
                <span className="font-bold">Date: </span>
                <span className="font-normal" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(activity.date) }} />
              </p>



              {/* Display images with delete button */}
              {activity.images && activity.images.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-gray-700">Images:</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {activity.images.map((imageUrl, index) => (
                      <div key={index} className="relative">
                        <img src={imageUrl} alt={`Activity Image ${index}`} className="h-32 w-32 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(activity.id, imageUrl, index)}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                          disabled={isDeleting}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(activity.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteActivity(activity.id)}
                  className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ${isDeleting ? 'opacity-50' : ''}`}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewActivity;
