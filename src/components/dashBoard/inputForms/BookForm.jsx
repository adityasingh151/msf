import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getDatabase, ref, push, update } from "firebase/database";
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';

const BookForm = () => {
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
      setValue('author', editData.author);
      setValue('publisher', editData.publisher);
    }
    setIsLoading(false);
  }, [editData, setValue]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    const db = getDatabase();

    try {
      if (editData) {
        const dbRef = ref(db, `books/${editData.id}`);
        await update(dbRef, data);
      } else {
        const booksRef = ref(db, 'books');
        await push(booksRef, data);
      }
      reset();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/admin/view/books');
      }, 2000);
    } catch (error) {
      console.error("Error saving book: ", error);
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
          {editData ? 'Edit Book' : 'Add New Book'}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...register('title', { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.title && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              {...register('author', { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.author && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Publisher</label>
            <input
              type="text"
              {...register('publisher', { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.publisher && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {editData ? 'Update Book' : 'Add Book'}
          </button>
        </form>
        {showSuccess && (
          <SuccessNotification message="Book submitted successfully!" onClose={() => setShowSuccess(false)} />
        )}
        {showError && (
          <ErrorNotification message="Failed to submit book!" onClose={() => setShowError(false)} />
        )}
      </div>
    </>
  );
};

export default BookForm;
