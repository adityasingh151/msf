import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getDatabase, ref, push, update } from "firebase/database";
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import ReactQuillNewEditor from '../../reactQuill/ReactQuillNewEditor'; // Import the custom editor

const ConferenceForm = () => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData;

  useEffect(() => {
    if (editData) {
      setValue('title', editData.title);
      setValue('date', editData.date);
      setValue('location', editData.location);
      setValue('description', editData.description);
    }
    setIsLoading(false);
  }, [editData, setValue]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    const db = getDatabase();

    try {
      if (editData) {
        const dbRef = ref(db, `conferences/${editData.id}`);
        await update(dbRef, data);
      } else {
        const conferencesRef = ref(db, 'conferences');
        await push(conferencesRef, data);
      }
      reset();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/admin/view/conferences');
      }, 2000);
    } catch (error) {
      console.error("Error saving conference: ", error);
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          {editData ? 'Edit Conference' : 'Add New Conference'}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <ReactQuillNewEditor
              value={editData ? editData.title : ''}
              onChange={(content) => setValue('title', content)}
              placeholder="Enter the conference title"
            />
            {errors.title && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="text"
              {...register('date', { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.date && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <ReactQuillNewEditor
              value={editData ? editData.location : ''}
              onChange={(content) => setValue('location', content)}
              placeholder="Enter the conference location"
            />
            {errors.location && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <ReactQuillNewEditor
              value={editData ? editData.description : ''}
              onChange={(content) => setValue('description', content)}
              placeholder="Enter the conference description"
            />
            {errors.description && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {editData ? 'Update Conference' : 'Add Conference'}
          </button>
        </form>
        {showSuccess && (
          <SuccessNotification message="Conference submitted successfully!" onClose={() => setShowSuccess(false)} />
        )}
        {showError && (
          <ErrorNotification message="Failed to submit conference!" onClose={() => setShowError(false)} />
        )}
      </div>
    </>
  );
};

export default ConferenceForm;
