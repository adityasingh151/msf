import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, update, get, push } from "firebase/database";
import ReactQuillNewEditor from '../../reactQuill/ReactQuillNewEditor'; // Import the Quill editor
import ImageGallery from 'react-image-gallery'; // For previewing uploaded images
import "react-image-gallery/styles/css/image-gallery.css";
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and params

const ActivityForm = () => {
  const { activityId } = useParams(); // To get the ID for editing
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [date, setDate] = useState(''); // State for Quill Date field
  const [description, setDescription] = useState(''); // State for Quill Description field
  const [uploadedImages, setUploadedImages] = useState([]); // To store image URLs for preview
  const [imageFiles, setImageFiles] = useState([]); // Image files before uploading
  const [existingImages, setExistingImages] = useState([]); // To store existing images of the activity

  useEffect(() => {
    if (activityId) {
      console.log(activityId, "activityId is here.");
      // Fetch the existing activity details if editing
      const db = getDatabase();
      const activityRef = ref(db, `activities/${activityId}`);
      
      get(activityRef).then((snapshot) => {
        if (snapshot.exists()) {
          const activity = snapshot.val();
          setValue('headline', activity.headline);
          setDate(activity.date);
          setDescription(activity.description);
          setExistingImages(activity.images || []);
        } else {
          console.log('No data available');
        }
      }).catch((error) => {
        console.error('Error fetching activity:', error);
        setShowError(true);
      });
    }
  }, [activityId, setValue]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      let imageUrls = [...existingImages]; // Start with existing images

      // Upload new images to Firebase Storage
      const storage = getStorage();
      for (let file of imageFiles) {
        const storageRefPath = storageRef(storage, `activities/${file.name}`);
        await uploadBytes(storageRefPath, file);
        const downloadURL = await getDownloadURL(storageRefPath);
        imageUrls.push(downloadURL);
      }

      // Save or update activity data to Firebase Realtime Database
      const db = getDatabase();
      const activityRef = ref(db, `activities/${activityId || Date.now()}`); // Use existing activityId or generate new one
      const newActivity = {
        headline: data.headline,
        date: date,
        description: description,
        images: imageUrls, // Save the image URLs
      };

      if (activityId) {
        // Update existing activity
        await update(activityRef, newActivity);
      } else {
        // Create new activity
        await push(ref(db, 'activities'), newActivity);
      }

      setShowSuccess(true);
      reset(); // Clear form after submission
      setDate('');
      setDescription('');
      setImageFiles([]);
      setUploadedImages([]);
    } catch (error) {
      console.error('Error saving activity:', error);
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => ({
      original: URL.createObjectURL(file),
      thumbnail: URL.createObjectURL(file),
      file, // Store the actual file for uploading
    }));

    setImageFiles([...imageFiles, ...files]); // Append new files to the existing list
    setUploadedImages([...uploadedImages, ...imagePreviews]); // Append new previews
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    const updatedImages = [...uploadedImages];
    const updatedFiles = [...imageFiles];

    // Remove the selected image and file
    updatedImages.splice(index, 1);
    updatedFiles.splice(index, 1);

    setUploadedImages(updatedImages);
    setImageFiles(updatedFiles);
  };

  return (
    <>
      {isSaving && <Saving />}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg relative">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">{activityId ? 'Edit Activity' : 'Add New Activity'}</h2>
        {showSuccess && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2">
            <SuccessNotification message="Activity saved successfully!" onClose={() => setShowSuccess(false)} />
          </div>
        )}
        {showError && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2">
            <ErrorNotification message="Failed to save activity!" onClose={() => setShowError(false)} />
          </div>
        )}

        {/* Headline Field */}
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Headline <span className="text-red-500">*</span>
            <input
              type="text"
              {...register('headline', { required: 'Headline is required' })}
              className={`mt-1 block w-full pl-3 py-2 text-base text-gray-900 border ${errors.headline ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.headline && <p className="text-red-500 text-sm mt-1">{errors.headline.message}</p>}
          </label>
        </div>

        {/* Date Field (React Quill) */}
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Date <span className="text-red-500">*</span>
          </label>
          <ReactQuillNewEditor value={date} onChange={setDate} placeholder="Add date for the activity" />
        </div>

        {/* Description Field (React Quill) */}
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <ReactQuillNewEditor value={description} onChange={setDescription} placeholder="Add a description for the activity" />
        </div>

        {/* Image Input Field */}
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Upload Images (multiple)
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>

        {/* Image Gallery Preview with Remove Option */}
        {uploadedImages.length > 0 && (
          <div className="my-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative inline-block m-2">
                <img src={image.thumbnail} alt="Preview" className="h-32 w-32 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          {activityId ? 'Update Activity' : 'Submit Activity'}
        </button>
      </form>
    </>
  );
};

export default ActivityForm;
