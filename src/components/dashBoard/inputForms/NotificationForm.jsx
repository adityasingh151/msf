import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push, update } from "firebase/database";
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import dayjs from 'dayjs';

const NotificationForm = ({ existingData, onSave = () => {} }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      heading: existingData ? existingData.heading : '',
      pdfFile: existingData ? existingData.pdfUrl : null,
    }
  });
  const pdfFile = watch('pdfFile');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (existingData) {
      setValue('heading', existingData.heading);
    }
  }, [existingData, setValue]);

  const getCurrentDate = () => {
    const date = new Date();
    const options = { day: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedYear = date.getFullYear().toString();
    return { formattedDate, formattedYear };
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    setShowSuccess(false);
    setShowError(false);
    try {
      const file = data.pdfFile[0];
      const storageReference = storageRef(getStorage(), `notifications/${file.name}`);
      await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(storageReference);
      const { formattedDate, formattedYear } = getCurrentDate();
      const timestamp = dayjs().toISOString(); // Save the current timestamp
      const notificationRef = existingData
        ? ref(getDatabase(), `notifications/${existingData.id}`)
        : ref(getDatabase(), 'notifications');
      const notificationData = {
        heading: data.heading,
        pdfUrl: downloadURL,
        date: formattedDate,
        year: formattedYear,
        timestamp: timestamp // Add timestamp to the notification data
      };

      if (existingData) {
        await update(notificationRef, notificationData);
        setShowSuccess(true);
      } else {
        await push(notificationRef, notificationData);
        setShowSuccess(true);
      }

      onSave();
    } catch (error) {
      console.error('Error uploading PDF: ', error);
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
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">{existingData ? 'Edit Notification' : 'Upload Notification PDF'}</h2>
        {showSuccess && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2">
            <SuccessNotification message="PDF uploaded successfully!" onClose={() => setShowSuccess(false)} />
          </div>
        )}
        {showError && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2">
            <ErrorNotification message="Failed to upload PDF!" onClose={() => setShowError(false)} />
          </div>
        )}
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Notification Heading <span className="text-red-500">*</span>
            <input
              type="text"
              {...register('heading', { required: 'Heading is required' })}
              className={`mt-1 block w-full pl-3 py-2 text-base text-gray-900 border ${errors.heading ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.heading && <p className="text-red-500 text-sm mt-1">{errors.heading.message}</p>}
          </label>
        </div>
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Upload PDF <span className="text-red-500">*</span>
            <input
              type="file"
              accept="application/pdf"
              {...register('pdfFile', { required: 'PDF file is required' })}
              className={`mt-1 block w-full pl-3 py-2 text-base text-gray-900 border ${errors.pdfFile ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.pdfFile && <p className="text-red-500 text-sm mt-1">{errors.pdfFile.message}</p>}
          </label>
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          {existingData ? 'Update Notification' : 'Submit Notification'}
        </button>
      </form>
    </>
  );
};

export default NotificationForm;
