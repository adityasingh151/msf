import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getDatabase, ref, set, push, get } from 'firebase/database';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';

const CourseForm1 = ({ editMode, courseId }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [fields, setFields] = useState(['title', 'content', 'details', 'duration', 'fees', 'imgSrc']);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);

  useEffect(() => {
    if (editMode && courseId) {
      const db = getDatabase();
      const courseRef = ref(db, `coursesPage1/${courseId}`);
      get(courseRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach(key => setValue(key, data[key]));
          setImgPreview(data.imgSrc); // Set image preview
        } else {
          console.log('No data available');
        }
        setIsLoading(false);
      }).catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [editMode, courseId, setValue]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const db = getDatabase();
      if (editMode && courseId) {
        const courseRef = ref(db, `coursesPage1/${courseId}`);
        await set(courseRef, data);
        console.log('Course data updated successfully!', data);
      } else {
        const coursesRef = ref(db, 'coursesPage1');
        await push(coursesRef, data);
        console.log('Course data submitted successfully!', data);
      }
      setShowSuccess(true); // Show success notification
    } catch (error) {
      console.log('Error adding/updating course data: ', error);
      setShowError(true); // Show error notification
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('imgSrc', reader.result);
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleFields = (fieldArray) => {
    const currentFieldSet = new Set(fields);
    const hasAllFields = fieldArray.every(field => currentFieldSet.has(field));
    if (hasAllFields) {
      setFields(fields.filter(field => !fieldArray.includes(field)));
    } else {
      setFields([...fields, ...fieldArray.filter(field => !currentFieldSet.has(field))]);
    }
  };

  const getInputType = (fieldName) => {
    if (fieldName.includes('Date')) return 'date';
    if (fieldName.includes('Time')) return 'time';
    return 'text';
  };

  const sectionFields = {
    courseDetails: ['title', 'content', 'duration', 'fees', 'imgSrc'],
    additionalDetails: ['details']
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isSaving && <Saving />}
      <div className="flex">
        {showSuccess && <SuccessNotification message="Item Created Successfully!" onClose={() => setShowSuccess(false)} />}
        {showError && <ErrorNotification message="Something went wrong!" onClose={() => setShowError(false)} />}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg flex-grow space-y-4">
          <h2 className="text-2xl font-bold text-indigo-600">Course Details</h2>
          {fields.map(field => (
            <div key={field} className="relative">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
                <span className="text-red-500">*</span>
              </label>
              {field === 'details' ? (
                <textarea
                  {...register('details', { required: true })}
                  className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                />
              ) : field === 'imgSrc' ? (
                <input
                  type="file"
                  accept="image/*"
                  className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  onChange={handleImageUpload}
                />
              ) : (
                <input
                  type={getInputType(field)}
                  {...register(field, {
                    required: true,
                    minLength: { value: 3, message: 'Minimum length is 3 characters' }
                  })}
                  className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                />
              )}
              {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field].message}</p>}
            </div>
          ))}
          {imgPreview && (
            <div className="mt-4">
              <img src={imgPreview} alt="Preview" className="w-full h-64 object-cover" />
            </div>
          )}
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {editMode ? 'Update Course Details' : 'Submit Course Details'}
          </button>
        </form>

        <div className="flex flex-col space-y-2 p-6">
          {Object.entries(sectionFields).map(([section, fieldArray]) => (
            <button
              key={section}
              onClick={() => toggleFields(fieldArray)}
              className={`text-sm py-2 px-4 rounded transition duration-300 flex items-center gap-2 ${fields.some(field => fieldArray.includes(field)) ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
            >
              <BsPlusCircle /> {fields.some(field => fieldArray.includes(field)) ? 'Remove' : 'Add'} {section.replace(/([A-Z])/g, ' $1').replace("Details", " Details")}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseForm1;
