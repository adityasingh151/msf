import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push, set, get } from "firebase/database";
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import { BsPlusCircle } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const CourseForm2 = ({ editMode = false }) => {
  const { courseId } = useParams();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [fields, setFields] = useState(['courseName', 'description', 'fee', 'webinars', 'imageUrl']);
  const imageUrl = watch('imageUrl');
  const [imagePreview, setImagePreview] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const storage = getStorage();
  const database = getDatabase();

  useEffect(() => {
    if (editMode && courseId) {
      const db = getDatabase();
      const courseRef = ref(db, `coursesPage2/${courseId}`);
      get(courseRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach(key => setValue(key, data[key]));
          setImagePreview(data.imageUrl); // Set image preview
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

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0 && imageUrl[0] instanceof File) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreview(e.target.result);
      fileReader.readAsDataURL(imageUrl[0]);
    } else {
      setImagePreview(imageUrl);
    }
  }, [imageUrl]);

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      let downloadURL = imagePreview; // Default to current image URL
      if (data.imageUrl && data.imageUrl[0] instanceof File) {
        const file = data.imageUrl[0];
        const storageReference = storageRef(storage, `coursesPage2/${file.name}`);
        await uploadBytes(storageReference, file);
        downloadURL = await getDownloadURL(storageReference);
      }
      const courseData = {
        ...data,
        imageUrl: downloadURL
      };
      if (editMode && courseId) {
        const courseRef = ref(database, `coursesPage2/${courseId}`);
        await set(courseRef, courseData);
        console.log('Course data updated successfully!', courseData);
      } else {
        const coursesRef = ref(database, 'coursesPage2');
        await push(coursesRef, courseData);
        console.log('Course data submitted successfully!', courseData);
      }
      setShowSuccess(true);
    } catch (error) {
      console.log('Error adding/updating course data: ', error);
      setShowError(true);
    } finally {
      setIsSaving(false);
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

  const sectionFields = {
    Basic: ['courseName', 'description', 'fee'],
    Additional: ['webinars'],
    Media: ['imageUrl']
  };

  useEffect(() => {
    register('imageUrl', { required: 'This field is required' });
  }, [register]);

  const getInputType = (fieldName) => {
    if (fieldName.includes('Date')) return 'date';
    if (fieldName.includes('Time')) return 'time';
    return 'text';
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isSaving && <Saving />}
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col space-y-2 p-3 lg:p-6 md:w-1/3">
          {Object.entries(sectionFields).map(([section, fieldArray]) => (
            <button
              key={section}
              onClick={() => toggleFields(fieldArray)}
              className={`text-sm lg:text-base py-2 px-4 rounded transition duration-300 flex items-center gap-2 ${fields.some(field => fieldArray.includes(field)) ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
            >
              <BsPlusCircle /> {fields.some(field => fieldArray.includes(field)) ? 'Remove' : 'Add'} {section.replace(/([A-Z])/g, ' $1').replace("Section", " Section")}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 lg:p-6 bg-white shadow-lg rounded-lg flex-grow space-y-4 md:w-2/3">
          <h2 className="text-xl lg:text-2xl font-bold text-indigo-600">{editMode ? 'Edit Course Details' : 'Course Details'}</h2>
          {showSuccess && (
            <SuccessNotification
              message={editMode ? 'Course Updated Successfully!' : 'Course Created Successfully!'}
              onClose={() => setShowSuccess(false)}
            />
          )}
          {showError && (
            <ErrorNotification
              message="Something went wrong!"
              onClose={() => setShowError(false)}
            />
          )}
          {fields.map(field => (
            <div key={field} className="relative">
              <label className="block text-sm lg:text-base font-medium text-gray-700 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
                {field !== 'webinars' && <span className="text-red-500">*</span>}
              </label>
              {field === 'imageUrl' ? (
                <div>
                  <input
                    type="file"
                    {...register('imageUrl')}
                    className="mt-1 block w-full pl-3 py-2 text-sm lg:text-base text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-48 w-auto border rounded-md" />}
                </div>
              ) : (
                <input
                  type={getInputType(field)}
                  {...register(field, {
                    required: field !== 'webinars',
                    minLength: { value: 3, message: 'Minimum length is 3 characters' }
                  })}
                  className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                />
              )}
              {errors[field] && <p className="mt-1 text-sm lg:text-base text-red-500">{errors[field].message}</p>}
            </div>
          ))}
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {editMode ? 'Update Course Details' : 'Submit Course Details'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CourseForm2;
