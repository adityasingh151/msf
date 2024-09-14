import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, off, remove } from "firebase/database";
import { useNavigate } from 'react-router-dom'; // For navigation
import Loading from '../../LoadSaveAnimation/Loading';

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    // Navigate to the ResourceForm with the existing resource's data for editing
    navigate(`/admin/forms/resource/edit/${id}`);
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const db = getDatabase();
      const resourceRef = ref(db, `resources/${id}`);
      await remove(resourceRef);
      alert('Resource deleted successfully!');
      setResources(resources.filter(resource => resource.id !== id));
    } catch (error) {
      console.error('Error deleting resource:', error);
      alert('Failed to delete resource.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <div className="relative mx-auto py-12 px-6 bg-gradient-to-br from-blue-100 to-indigo-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-indigo-900 text-center">Resource Documents</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {resources.map((resource) => (
          <div key={resource.id} className="relative bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex flex-col justify-between h-full">
              <p className="text-lg font-semibold text-gray-800">{resource.title}</p>
              <div className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: resource.description }} />
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 hover:text-blue-800 transition duration-300">
                View Document
              </a>
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => handleEdit(resource.id)} 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(resource.id)} 
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

export default ViewResources;
