import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get resourceId from the URL
import { getDatabase, ref, onValue, off } from "firebase/database";
import Loading from './LoadSaveAnimation/Loading';

const ResourceList = () => {
  const { resourceId } = useParams(); // Get the resource ID from the URL
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const resourcesRef = ref(db, 'resources');

    const unsubscribe = onValue(resourcesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedResources = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      setResources(loadedResources);
      setIsLoading(false);
    }, (error) => {
      console.error(error);
      setError("Failed to fetch resources");
      setIsLoading(false);
    });

    return () => off(resourcesRef, 'value', unsubscribe);
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  const filteredResources = resourceId
    ? resources.filter(resource => resource.id === resourceId)
    : resources;

  return (
    <div className="relative mx-auto py-12 px-6 bg-gradient-to-br from-blue-100 to-indigo-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-indigo-900 text-center">
        {resourceId ? "Resource Details" : "Resource Documents"}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="relative bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-lg font-semibold text-gray-800">{resource.title}</p>
                <div className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: resource.description }} />
              </div>
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 hover:text-blue-800 transition duration-300">
                View Resource
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
