import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Loading from './LoadSaveAnimation/Loading';

const DisplayContent = () => {
  const [content, setContent] = useState({
    galleryImages: [],
    videos: [],
    articles: []
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    
    // Fetch Content
    const fetchContent = (path, stateKey) => {
      const contentRef = ref(db, path);
      onValue(contentRef, (snapshot) => {
        const data = snapshot.val();
        setContent(prev => ({
          ...prev,
          [stateKey]: Object.keys(data || {}).map(key => ({ id: key, ...data[key] })).reverse()
        }));
      });
    };

    fetchContent('imageContent', 'galleryImages');
    fetchContent('videoContent', 'videos');
    fetchContent('articleContent', 'articles');
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const uniqueCategories = [...new Set([
      ...content.galleryImages.map(img => img.category),
      ...content.videos.map(video => video.category)
    ])];
    setCategories(uniqueCategories);
  }, [content.galleryImages, content.videos]);

  if (isLoading) return <Loading />;

  const renderImage = (image) => ({
    original: image.imageUrl,
    thumbnail: image.imageUrl,
    description: image.imageDetails,
    originalClass: "rounded-lg shadow-lg",
  });

  const renderVideo = (video, index) => (
    <div key={`video-${video.id}-${index}`} className="p-4 border rounded-lg mb-4 bg-gradient-to-r from-teal-600 to-blue-700 shadow-lg">
      <iframe
        title={`Video ${video.videoDetails}`}
        width="100%"
        height="350"
        src={`https://www.youtube.com/embed/${video.videoUrl}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
      <p className="mt-2 text-center text-white font-semibold">{video.videoDetails}</p>
    </div>
  );

  const renderArticle = (article, index) => (
    <div key={`article-${article.id}-${index}`} className="p-6 border rounded-lg mb-4 bg-gradient-to-r from-teal-600 to-blue-700 shadow-lg">
      <a href={article.articleUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
        <h3 className="text-lg font-semibold text-white">{article.articleHeading}</h3>
        <p className='italic text-sm text-white'>~ Prof. Dinesh Singh</p>
      </a>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-600 to-blue-700">
      <main className="container mx-auto py-8 rounded-md shadow-lg">
        <h1 className="text-5xl font-bold mb-12 text-center text-white">Explore Our Content</h1>
        
        {categories.map((category, index) => {
          const images = content.galleryImages.filter(image => image.category === category).map(renderImage);
          const videos = content.videos.filter(video => video.category === category);

          return (
            <div key={`category-${category}-${index}`}>
              {images.length > 0 && (
                <section className="my-12">
                  <h2 className="text-4xl font-bold text-white mb-8 border-b-4 pb-4 border-white">{category} - Images</h2>
                  <ImageGallery items={images} />
                </section>
              )}
              {videos.length > 0 && (
                <section className="my-12">
                  <h2 className="text-4xl font-bold text-white mb-8 border-b-4 pb-4 border-white">{category} - Videos</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {videos.map(renderVideo)}
                  </div>
                </section>
              )}
            </div>
          );
        })}

        {/* Articles Section */}
        <section className="my-12">
          <h2 className="text-4xl font-bold text-white mb-8 border-b-4 pb-4 border-white">Informative Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {content.articles.map(renderArticle)}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DisplayContent;
