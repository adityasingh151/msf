import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import Notification from '../../Notification';

const EditContent = () => {
  const { register, handleSubmit, watch, formState: { errors }, setError, clearErrors, reset } = useForm();
  const { contentId, contentType } = useParams(); // Retrieve content ID and type from URL parameters
  console.log(contentId,contentType)
  const [imagePreview, setImagePreview] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const imageFile = watch('imageFile');
  const articleImage = watch('articleImage');
  
  useEffect(() => {
    const fetchData = async () => {
      if (contentId && contentType) {
        const dbRef = ref(getDatabase(), `${contentType}/${contentId}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const contentData = snapshot.val();
          reset(contentData);
          if (contentData.imageUrl) {
            setImagePreview({ imageFile: contentData.imageUrl });
          }
          if (contentData.articleImageUrl) {
            setImagePreview({ articleImage: contentData.articleImageUrl });
          }
        }
      }
      setIsLoading(false);
    };

    fetchData();
    console.log("Edit Content.")
  }, [contentId, contentType, reset]);

  useEffect(() => {
    const updateImagePreview = (imageFile, key) => {
      if (imageFile && imageFile.length > 0 && imageFile[0] instanceof File) {
        setImagePreview((prev) => ({ ...prev, [key]: URL.createObjectURL(imageFile[0]) }));
      } else if (typeof imageFile === 'string') {
        setImagePreview((prev) => ({ ...prev, [key]: imageFile }));
      }
    };

    updateImagePreview(imageFile, 'imageFile');
    updateImagePreview(articleImage, 'articleImage');
  }, [imageFile, articleImage]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const uploadFile = async (file, path) => {
        const storageReference = storageRef(getStorage(), path);
        await uploadBytes(storageReference, file);
        return await getDownloadURL(storageReference);
      };

      if (contentType === 'imageContent') {
        if (data.imageFile.length > 0) {
          data.imageUrl = await uploadFile(data.imageFile[0], `contentImages/${data.imageFile[0].name}`);
        }
        delete data.imageFile;
      } else if (contentType === 'videoContent') {
        const videoId = validateYouTubeUrl(data.videoUrl);
        if (!videoId) {
          setError('videoUrl', { type: 'manual', message: 'Please enter a valid YouTube video link.' });
          setIsSaving(false);
          return;
        }
        data.videoUrl = videoId;
      } else if (contentType === 'articleContent') {
        if (data.articleImage.length > 0) {
          data.articleImageUrl = await uploadFile(data.articleImage[0], `contentImages/${data.articleImage[0].name}`);
        }
        delete data.articleImage;
      }

      const dbRef = ref(getDatabase(), `${contentType}/${contentId}`);
      await update(dbRef, data);

      setNotification({ message: 'Content updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating content:', error);
      setNotification({ message: 'Something went wrong!', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const validateYouTubeUrl = (url) => {
    const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/i;
    const match = url.match(pattern);
    return match ? match[1] : null;
  };

  const renderInputField = (label, name, placeholder, type = 'text') => (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      {type === 'textarea' ? (
        <textarea
          {...register(name, { required: 'This field is required', minLength: 10 })}
          className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          {...register(name, { required: 'This field is required', minLength: 3 })}
          className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder={placeholder}
        />
      )}
      {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>}
    </div>
  );

  const renderImageField = (label, name) => (
    <div className="relative mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        {...register(name, { required: 'This field is required' })}
        className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {imagePreview[name] && <img src={imagePreview[name]} alt="Preview" className="mt-4 h-48 w-auto border rounded-md" />}
      {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>}
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isSaving && <Saving />}
      <div className="flex flex-col items-center py-12 bg-gray-50">
        {notification.message && <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg space-y-6">
          <h2 className="text-3xl font-bold text-indigo-600 text-center">Edit Content</h2>
          
          {contentType === 'imageContent' && (
            <>
              {renderImageField('Image File', 'imageFile')}
              {renderInputField('Image Details', 'imageDetails', 'Enter Image Details', 'textarea')}
            </>
          )}

          {contentType === 'videoContent' && (
            <>
              {renderInputField('Video URL', 'videoUrl', 'Enter YouTube Video URL')}
              {renderInputField('Video Details', 'videoDetails', 'Enter Video Details', 'textarea')}
            </>
          )}

          {contentType === 'articleContent' && (
            <>
              {renderInputField('Article URL', 'articleUrl', 'Enter Article URL')}
              {renderInputField('Article Heading', 'articleHeading', 'Enter Article Heading')}
              {renderImageField('Article Image', 'articleImage')}
            </>
          )}

          <div className="text-center">
            <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditContent;
