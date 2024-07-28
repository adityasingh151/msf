import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import Modal from '../../Modal';
import Notification from '../../Notification';
import Loading from '../../LoadSaveAnimation/Loading';
import { useNavigate } from 'react-router-dom';

const ViewContent = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();

    const fetchContent = (path, setState) => {
      const contentRef = ref(db, path);
      onValue(contentRef, (snapshot) => {
        const data = snapshot.val();
        setState(Object.keys(data || {}).map(key => ({ id: key, ...data[key] })));
      });
    };

    fetchContent('imageContent', setGalleryImages);
    fetchContent('videoContent', setVideos);
    fetchContent('articleContent', setArticles);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const uniqueCategories = new Set();
    galleryImages.forEach(item => uniqueCategories.add(item.category));
    videos.forEach(item => uniqueCategories.add(item.category));
    articles.forEach(item => uniqueCategories.add(item.category));
    setCategories(['All', ...uniqueCategories]);
  }, [galleryImages, videos, articles]);

  const handleDelete = async () => {
    const db = getDatabase();
    const itemType = selectedItem.type;
    await remove(ref(db, `${itemType}/${selectedItem.id}`));
    setShowModal(false);

    if (itemType === 'imageContent') {
      setGalleryImages(galleryImages.filter(item => item.id !== selectedItem.id));
    } else if (itemType === 'videoContent') {
      setVideos(videos.filter(item => item.id !== selectedItem.id));
    } else if (itemType === 'articleContent') {
      setArticles(articles.filter(item => item.id !== selectedItem.id));
    }

    setNotification({ show: true, message: 'Item deleted successfully!', type: 'success' });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const promptDelete = (item, type) => {
    setSelectedItem({ ...item, type });
    setModalContent(`Are you sure you want to delete this ${type.slice(0, -7)}?`);
    setShowModal(true);
  };

  const handleEdit = (item, type) => {
    navigate(`/admin/forms/${type.slice(0, -7)}/edit/${item.id}`, { state: { item, type } });
  };

  const filterByCategory = (items) => {
    if (selectedCategory === 'All') {
      return items;
    }
    return items.filter(item => item.category === selectedCategory);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4 sm:mt-2 mt-20">
      <h1 className="text-3xl font-bold mb-4 text-center">Manage Content</h1>

      <div className="mb-8">
        <label className="text-lg font-semibold">Filter by Category: </label>
        <select
          className="border rounded p-2 ml-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Gallery Section */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Gallery Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filterByCategory(galleryImages).map(image => (
            <div key={image.id} className="p-4 border rounded mb-2 flex flex-col items-center">
              <img
                src={image.imageUrl}
                alt={`Gallery Image ${image.id}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p>{image.imageDetails}</p>
              <div className="flex mt-2">
                <button onClick={() => promptDelete(image, 'imageContent')} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2">Delete</button>
                <button onClick={() => handleEdit(image, 'imageContent')} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterByCategory(videos).map(video => (
            <div key={video.id} className="p-4 border rounded mb-2 flex flex-col items-center">
              <iframe
                title={`Video ${video.videoDetails}`}
                src={`https://www.youtube.com/embed/${video.videoUrl}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full mb-2"
                style={{ border: 'none' }}
              ></iframe>
              <p>{video.videoDetails}</p>
              <div className="flex mt-2">
                <button onClick={() => promptDelete(video, 'videoContent')} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2">Delete</button>
                <button onClick={() => handleEdit(video, 'videoContent')} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles Section */}
      <div className="my-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Articles</h2>
        {filterByCategory(articles).map(article => (
          <div key={article.id} className="p-4 border rounded mb-2">
            <a href={article.articleUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
              {article.articleHeading} <span className='italic text-sm text-gray-600'>~ Prof. Dinesh Singh</span>
            </a>
            <div className="flex mt-2">
              <button onClick={() => promptDelete(article, 'articleContent')} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mr-2">Delete</button>
              <button onClick={() => handleEdit(article, 'articleContent')} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit</button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        title="Confirm Deletion"
        onClose={() => setShowModal(false)}
      >
        <p>{modalContent}</p>
        <div className="mt-4 flex justify-end">
          <button onClick={handleDelete} className="bg-red-600 hover:bg-red-800 text-white py-1 px-3 rounded mr-2">Confirm</button>
          <button onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded">Cancel</button>
        </div>
      </Modal>

      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default ViewContent;
