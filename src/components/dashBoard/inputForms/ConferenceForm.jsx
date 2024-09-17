import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getDatabase, ref, push, update, get } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import ReactQuillNewEditor from '../../reactQuill/ReactQuillNewEditor';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const ConferenceForm = () => {
  const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const { conferenceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (conferenceId) {
      console.log(conferenceId)
      const db = getDatabase();
      const confRef = ref(db, `conferences/${conferenceId}`);

      get(confRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setValue('title', data.title);
          setValue('date', data.date);
          setValue('location', data.location);
          setValue('description', data.description);
          setExistingImages(data.images || []);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [conferenceId, setValue]);

  const onSubmit = async (data) => {
    setIsSaving(true);

    try {
      let imageUrls = [...existingImages];

      const storage = getStorage();

      // Loop through each image file and upload to Firebase
      for (let file of imageFiles) {
        const storageRefPath = storageRef(storage, `conferences/${file.name}`);
        await uploadBytes(storageRefPath, file);
        const downloadURL = await getDownloadURL(storageRefPath); // Get Firebase URL
        imageUrls.push(downloadURL); // Add Firebase URL to imageUrls array
      }

      // Prepare the conference data with Firebase URLs
      const conferenceData = {
        ...data,
        images: imageUrls, // Store the URLs, not the files
      };

      const db = getDatabase();
      const confRef = ref(db, `conferences/${conferenceId || Date.now()}`);

      if (conferenceId) {
        await update(confRef, conferenceData);
      } else {
        await push(ref(db, 'conferences'), conferenceData);
      }

      reset();
      setUploadedImages([]);
      setImageFiles([]);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/admin/view/conferences');
      }, 2000);
    } catch (error) {
      console.error("Error saving conference: ", error);
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      original: URL.createObjectURL(file),
      thumbnail: URL.createObjectURL(file),
      file,
    }));

    setImageFiles((prevFiles) => [...prevFiles, ...files]);
    setUploadedImages((prevImages) => [...prevImages, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isSaving && <Saving />}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          {conferenceId ? 'Edit Conference' : 'Add New Conference'}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <ReactQuillNewEditor
              value={getValues('title')}
              onChange={(content) => setValue('title', content)}
              placeholder="Enter the conference title"
            />
            {errors.title && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="text"
              {...register('date', { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.date && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>

          {/* Location Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <ReactQuillNewEditor
              value={getValues('location')}
              onChange={(content) => setValue('location', content)}
              placeholder="Enter the conference location"
            />
            {errors.location && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <ReactQuillNewEditor
              value={getValues('description')}
              onChange={(content) => setValue('description', content)}
              placeholder="Enter the conference description"
            />
            {errors.description && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
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

          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {conferenceId ? 'Update Conference' : 'Submit Conference'}
          </button>
        </form>
        {showSuccess && (
          <SuccessNotification message="Conference saved successfully!" onClose={() => setShowSuccess(false)} />
        )}
        {showError && (
          <ErrorNotification message="Failed to submit conference!" onClose={() => setShowError(false)} />
        )}
      </div>
    </>
  );
};

export default ConferenceForm;
