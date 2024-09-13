import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { txtdb, imgdb } from '../../databaseConfig/firebaseConfig';
import { getDatabase, ref, push, set, update, onValue } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import { useParams } from 'react-router-dom';
import { UploadWidget } from '@bytescale/upload-widget-react';
import { useDropzone } from 'react-dropzone';

const PeopleForm = () => {
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();
  const [fields, setFields] = useState(['name', 'position', 'designation', 'details', 'photoUrl']);
  const photoUrl = watch('photoUrl');
  const [imagePreview, setImagePreview] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { personId } = useParams();

  const onDrop = useCallback(acceptedFiles => {
    // Assume only one file is accepted
    const file = acceptedFiles[0];
    const storage = getStorage();
    const storageReference = storageRef(storage, `uploads/${file.name}`);
    uploadBytes(storageReference, file).then(snapshot => {
      return getDownloadURL(snapshot.ref);
    }).then(url => {
      setImagePreview(url);
      setValue('photoUrl', url);  // Set the photoUrl in the form
    }).catch(error => {
      console.error("Error uploading file: ", error);
    });
  }, [setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    // If there is a photoUrl and it's a string (checking it's not a file object)
    if (photoUrl && typeof photoUrl === 'string') {
      setImagePreview(photoUrl);
    } else {
      setImagePreview(null);
    }
  }, [photoUrl]);
  const handleUploadSuccess = (url) => {
    setImagePreview(url);
    setValue('photoUrl', url); // Update the photoUrl field in the form
  };

  // Fetch person data for editing
  useEffect(() => {
    if (personId) {
      const db = getDatabase();
      const personRef = ref(db, `people/${personId}`);
      onValue(personRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          reset(data); // Reset form with fetched data
          if (data.photoUrl) {
            setImagePreview(data.photoUrl);
          }
        }
        setIsLoading(false);
      }, {
        onlyOnce: true
      });
    } else {
      setIsLoading(false); // No loading needed if adding a new person
    }
  }, [personId, reset]);

  useEffect(() => {
    // Simulate a delay to demonstrate the loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust this duration as needed

    return () => clearTimeout(timer);
  }, []);
  

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      let downloadURL = data.photoUrl;
      if (data.photoUrl && typeof data.photoUrl[0] === 'object') {
        const storage = getStorage();
        const storageReference = storageRef(storage, `people/${photoUrl[0].name}`);
        await uploadBytes(storageReference, photoUrl[0]);
        downloadURL = await getDownloadURL(storageReference);
      }

      const personData = { ...data, photoUrl: downloadURL };

      const db = getDatabase();
      if (personId) {
        await update(ref(db, `people/${personId}`), personData);
        setShowSuccess(true);
      } else {
        await push(ref(db, 'people'), personData);
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Error processing person data:', error);
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

  useEffect(() => {
    register('photoUrl');
  }, [register]);

  const getInputType = (fieldName) => {
    if (fieldName.includes('Date')) return 'date';
    if (fieldName.includes('Time')) return 'time';
    return 'text';
  };

  const sectionFields = {
    personalDetails: ['age', 'email', 'phoneNumber'],
    addressSection: ['address', 'city', 'country'],
    professionalDetails: ['company', 'jobTitle', 'yearsOfExperience']
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {showSuccess && (
        <SuccessNotification
          message="Operation Successful!"
          onClose={() => {
            setShowSuccess(false);
            onClose();  // Close the form modal on successful operation
          }}
        />
      )}
      {showError && (
        <ErrorNotification
          message="Something went wrong!"
          onClose={() => setShowError(false)}
        />
      )}
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
          <h2 className="text-xl lg:text-2xl font-bold text-indigo-600">People Details</h2>
          {showSuccess && (
            <SuccessNotification
              message="Person Created Successfully!"
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
                {['name', 'position'].includes(field) && <span className="text-red-500">*</span>}
              </label>
              {field === 'photoUrl' ? (
                <div>
                  <input
                    type="file"
                    {...register('photoUrl')}
                    className="mt-1 block w-full pl-3 py-2 text-sm lg:text-base text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-48 w-auto border rounded-md" />}
                </div>
              ) : field === 'position' ? (
                <select
                  {...register('position', { required: true })}
                  className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                >
                  <option value="">Select Position</option>
                  <option value="Office Bearers">Office Bearers</option>
                  <option value="Executive Committee">Executive Committee</option>
                  <option value="Fellows">Fellow</option>
                  <option value="Staff">Staff</option>
                  <option value="Team">Team</option>
                </select>
              ) : (
                <input
                  type={getInputType(field)}
                  {...register(field, {
                    required: ['name', 'position'].includes(field),
                    minLength: { value: 1, message: 'Minimum length is 3 characters' }
                  })}
                  className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                />
              )}
              {errors[field] && <p className="mt-1 text-sm lg:text-base text-red-500">{errors[field].message}</p>}
            </div>
          ))}
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Submit Person Details
          </button>
        </form>
      </div>
    </>
  );
};

export default PeopleForm;
