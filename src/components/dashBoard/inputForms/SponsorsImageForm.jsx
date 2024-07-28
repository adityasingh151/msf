import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push, update } from "firebase/database";
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import { useLocation } from 'react-router-dom';

const SponsorsImageForm = ({ existingSponsor }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const imageUrl = watch('imageUrl');
  const [imagePreview, setImagePreview] = useState(existingSponsor?.imageUrl || null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const location = useLocation();
  const sponsor = location.state?.sponsor || {};

  useEffect(() => {
    if (sponsor) {
      setValue('sponsorName', sponsor.sponsorName);
      setValue('sponsorDetails', sponsor.sponsorDetails);
      setImagePreview(sponsor.imageUrl);
    }
  }, [sponsor, setValue]);

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreview(e.target.result);
      fileReader.readAsDataURL(imageUrl[0]);
    } else if (!sponsor.imageUrl) {
      setImagePreview(null);
    }
  }, [imageUrl, sponsor.imageUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      let downloadURL = sponsor.imageUrl;
      if (data.imageUrl && data.imageUrl[0]) {
        const file = data.imageUrl[0];
        const storageReference = storageRef(getStorage(), `sponsorsImages/${file.name}`);
        await uploadBytes(storageReference, file);
        downloadURL = await getDownloadURL(storageReference);
      }

      const db = getDatabase();
      const sponsorData = { 
        sponsorName: data.sponsorName,
        sponsorDetails: data.sponsorDetails,
        imageUrl: downloadURL 
      };

      if (sponsor.id) {
        const sponsorRef = ref(db, `sponsorsImages/${sponsor.id}`);
        await update(sponsorRef, sponsorData);
      } else {
        const sponsorRef = ref(db, 'sponsorsImages');
        await push(sponsorRef, sponsorData);
      }

      setShowSuccess(true);
    } catch (error) {
      console.error('Error uploading image: ', error);
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
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">{sponsor.id ? 'Edit Sponsor Image' : 'Upload Sponsor Image'}</h2>
        {showSuccess && (
          <SuccessNotification message="Image uploaded successfully!" onClose={() => setShowSuccess(false)} />
        )}
        {showError && (
          <ErrorNotification message="Failed to upload image!" onClose={() => setShowError(false)} />
        )}
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Sponsor Name <span className="text-red-500">*</span>
            <input
              type="text"
              {...register('sponsorName', { required: 'Sponsor name is required' })}
              className={`mt-1 block w-full pl-3 py-2 text-base text-gray-900 border ${errors.sponsorName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.sponsorName && <p className="text-red-500 text-sm mt-1">{errors.sponsorName.message}</p>}
          </label>
        </div>
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Sponsor Details
            <textarea
              {...register('sponsorDetails')}
              className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Upload Image {sponsor.id ? '' : <span className="text-red-500">*</span>}
            <input
              type="file"
              {...register('imageUrl', { required: !sponsor.imageUrl && 'Image is required' })}
              className={`mt-1 block w-full pl-3 py-2 text-base text-gray-900 border ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
          </label>
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-48 w-auto border rounded-md" />}
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          {sponsor.id ? 'Update Sponsor' : 'Submit Sponsor'}
        </button>
      </form>
    </>
  );
};

export default SponsorsImageForm;
