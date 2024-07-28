import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getDatabase, ref, push } from "firebase/database";
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';

const ReviewForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
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

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const reviewRef = ref(getDatabase(), 'reviews');
      await push(reviewRef, {
        name: data.name,
        review: data.review,
        designation: data.designation,
      });
      setShowSuccess(true);
    } catch (error) {
      console.error('Error saving review: ', error);
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
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Submit Your Review</h2>
        {showSuccess && (
          <SuccessNotification message="Review submitted successfully!" onClose={() => setShowSuccess(false)} />
        )}
        {showError && (
          <ErrorNotification message="Failed to submit review!" onClose={() => setShowError(false)} />
        )}
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Reviewer's Name <span className="text-red-500">*</span>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`mt-1 block w-full pl-3 py-2 text-base text-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </label>
        </div>
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Review <span className="text-red-500">*</span>
            <textarea
              {...register('review', { required: 'Review is required' })}
              className={`mt-1 block w-full pl-3 py-2 text-base text-gray-900 border ${errors.review ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.review && <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>}
          </label>
        </div>
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Reviewer's Designation
            <input
              type="text"
              {...register('designation')}
              className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Submit Review
        </button>
      </form>
    </>
  );
};

export default ReviewForm;
