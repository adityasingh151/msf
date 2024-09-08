import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getDatabase, ref, push, update } from "firebase/database";
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import ReactQuillNewEditor from '../../reactQuill/ReactQuillNewEditor'; // Import the custom editor

const ResearchForm = () => {
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
      setValue('authors', editData.authors);
      setValue('journal', editData.journal);
    }
    setIsLoading(false);
  }, [editData, setValue]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    const db = getDatabase();

    try {
      if (editData) {
        const dbRef = ref(db, `researchPapers/${editData.id}`);
        await update(dbRef, data);
      } else {
        const researchRef = ref(db, 'researchPapers');
        await push(researchRef, data);
      }
      reset();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/admin/view/research');
      }, 2000);
    } catch (error) {
      console.error("Error saving research paper: ", error);
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
          {editData ? 'Edit Research Paper' : 'Add New Research Paper'}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <ReactQuillNewEditor
              value={editData ? editData.title : ''}
              onChange={(content) => setValue('title', content)}
              placeholder="Enter the research paper title"
            />
            {errors.title && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Authors</label>
            <ReactQuillNewEditor
              value={editData ? editData.authors : ''}
              onChange={(content) => setValue('authors', content)}
              placeholder="Enter the research paper authors"
            />
            {errors.authors && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Journal</label>
            <ReactQuillNewEditor
              value={editData ? editData.journal : ''}
              onChange={(content) => setValue('journal', content)}
              placeholder="Enter the journal name"
            />
            {errors.journal && <p className="text-red-500 text-xs italic">This field is required</p>}
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {editData ? 'Update Research Paper' : 'Add Research Paper'}
          </button>
        </form>
        {showSuccess && (
          <SuccessNotification message="Research paper submitted successfully!" onClose={() => setShowSuccess(false)} />
        )}
        {showError && (
          <ErrorNotification message="Failed to submit research paper!" onClose={() => setShowError(false)} />
        )}
      </div>
    </>
  );
};

export default ResearchForm;
