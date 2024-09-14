import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push, update, get } from "firebase/database"; // Added `get` to fetch resource
import { useParams, useNavigate } from 'react-router-dom'; // Added `useParams` for resourceId
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import ReactQuillNewEditor from '../../reactQuill/ReactQuillNewEditor'; // Import the Quill editor

const ResourceForm = ({ onSave = () => {} }) => {
  const { resourceId } = useParams(); // Fetch resourceId from URL
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      file: null,
    }
  });

  const file = watch('file');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state for fetching resource
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [description, setDescription] = useState(''); // State for Quill editor

  useEffect(() => {
    if (resourceId) {
      // Fetch the existing resource data for editing
      const db = getDatabase();
      const resourceRef = ref(db, `resources/${resourceId}`);
      get(resourceRef).then((snapshot) => {
        if (snapshot.exists()) {
          const resourceData = snapshot.val();
          setValue('title', resourceData.title);
          setDescription(resourceData.description);
          setIsLoading(false);
        } else {
          console.error('Resource not found');
          setIsLoading(false);
        }
      }).catch((error) => {
        console.error('Error fetching resource:', error);
        setIsLoading(false);
      });
    } else {
      // No resourceId, meaning this is a new resource
      setIsLoading(false);
    }
  }, [resourceId, setValue]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      let downloadURL = '';
      if (file && file.length > 0) {
        const fileToUpload = file[0];
        const storageReference = storageRef(getStorage(), `resources/${fileToUpload.name}`);
        await uploadBytes(storageReference, fileToUpload);
        downloadURL = await getDownloadURL(storageReference);
      }

      const resourceRef = resourceId
        ? ref(getDatabase(), `resources/${resourceId}`)
        : ref(getDatabase(), 'resources');

      const resourceData = {
        title: data.title,
        description: description, // Add description field
        link: downloadURL || null, // Keep old file if not uploading a new one
      };

      if (resourceId) {
        await update(resourceRef, resourceData);
      } else {
        await push(resourceRef, resourceData);
      }

      setShowSuccess(true);
      onSave();
      navigate('/admin/view/resources'); // Redirect after save
    } catch (error) {
      console.error('Error saving resource:', error);
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isSaving && <Saving />}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg relative">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">{resourceId ? 'Edit Resource' : 'Upload Resource Document'}</h2>
        {showSuccess && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2">
            <SuccessNotification message="Resource saved successfully!" onClose={() => setShowSuccess(false)} />
          </div>
        )}
        {showError && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2">
            <ErrorNotification message="Failed to save resource!" onClose={() => setShowError(false)} />
          </div>
        )}
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Resource Title <span className="text-red-500">*</span>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className={`mt-1 block w-full pl-3 py-2 text-base text-gray-900 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </label>
        </div>

        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Upload File <span className="text-red-500">*</span>
            <input
              type="file"
              accept="application/pdf"
              {...register('file')}
              className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>

        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Description
          </label>
          <ReactQuillNewEditor 
            value={description} 
            onChange={setDescription} 
            placeholder="Add a description for the resource" 
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          {resourceId ? 'Update Resource' : 'Submit Resource'}
        </button>
      </form>
    </>
  );
};

export default ResourceForm;
