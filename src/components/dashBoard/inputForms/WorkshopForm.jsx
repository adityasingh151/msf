import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { BsPlusCircle } from 'react-icons/bs';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push, get, update } from "firebase/database";
import { useParams } from 'react-router-dom';
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import { imgdb } from '../../databaseConfig/firebaseConfig'; // Import your Firebase configuration
import moment from 'moment';

const WorkshopForm = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors }, control } = useForm();
  const { workshopId } = useParams();
  const [fields, setFields] = useState([
    'headerTitle',
    'aboutDescription',
    'aboutImage',
    'registrationLink' // Moved registrationLink to header section
  ]);

  const aboutImage = watch('aboutImage');
  const [imagePreview, setImagePreview] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [activeSections, setActiveSections] = useState({
    headerSection: true,
    reachSection: false,
    outcomesSection: false,
    quoteSection: false,
    registrationSection: false,
  });

  useEffect(() => {
    if (workshopId) {
      // Fetch the workshop details if workshopId is present
      const db = getDatabase();
      const workshopRef = ref(db, `workshops/${workshopId}`);
      get(workshopRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          Object.keys(data).forEach(key => {
            setValue(key, data[key]);
          });
          setImagePreview(data.aboutImage); // Set image preview from URL
        }
        setIsLoading(false);
      }).catch((error) => {
        console.error('Error fetching workshop data: ', error);
        setShowError(true);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [workshopId, setValue]);

  useEffect(() => {
    if (aboutImage && aboutImage.length > 0 && typeof aboutImage[0] === 'object') {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreview(e.target.result);
      fileReader.readAsDataURL(aboutImage[0]);
    }
  }, [aboutImage]);

  const uploadImage = async (imageFile, path) => {
    const storageReference = storageRef(imgdb, path);
    await uploadBytes(storageReference, imageFile);
    const downloadURL = await getDownloadURL(storageReference);
    return downloadURL;
  };

  const extractEmbedId = (iframeString) => {
    const regex = /<iframe.*?src=".*?\/embed\?pb=(.*?)".*?><\/iframe>/;
    const match = iframeString.match(regex);
    return match ? match[1] : iframeString;
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      let downloadURL = data.aboutImage;
  
      if (data.aboutImage && data.aboutImage[0] instanceof File) {
        downloadURL = await uploadImage(data.aboutImage[0], `workshops/${data.aboutImage[0].name}`);
      }
  
      const addressEmbedId = activeSections.reachSection ? extractEmbedId(data.addressURL) : "";
  
      const workshopData = {
        ...(activeSections.headerSection && {
          headerTitle: data.headerTitle || "",
          aboutDescription: data.aboutDescription || "",
          aboutImage: downloadURL || "",
          registrationLink: data.registrationLink || ""
        }),
        ...(activeSections.reachSection && {
          address: data.address || "",
          addressURL: addressEmbedId || ""
        }),
        ...(activeSections.outcomesSection && {
          outcomeContent: data.outcomeContent || ""
        }),
        ...(activeSections.quoteSection && {
          quote: data.quote || ""
        }),
        ...(activeSections.registrationSection && {
          workshopDate: data.workshopDate ? moment(data.workshopDate).format('DD MMMM, YYYY') : "",
          workshopStartTime: data.workshopStartTime ? moment(data.workshopStartTime, 'HH:mm').format('hh:mm A') : "",
          workshopEndTime: data.workshopEndTime ? moment(data.workshopEndTime, 'HH:mm').format('hh:mm A') : "",
          prerequisites: data.prerequisites || "",
          designedFor: data.designedFor || "",
          lastDateForRegistration: data.lastDateForRegistration || "",
          workshopRegistrationFee: data.workshopRegistrationFee || ""
        })
      };
  
      const db = getDatabase();
      if (workshopId) {
        console.log(workshopData);
        await update(ref(db, `workshops/${workshopId}`), workshopData);
      } else {
        console.log(workshopData);
        await push(ref(db, 'workshops'), workshopData);
      }
  
      setShowSuccess(true);
    } catch (error) {
      console.error('Error adding/updating workshop data:', error);
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleSection = (section) => {
    setActiveSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  useEffect(() => {
    register('aboutImage', { required: activeSections.headerSection && 'This field is required' });
  }, [register, activeSections.headerSection]);

  const getInputType = (fieldName) => {
    if (fieldName.includes('Date')) return 'date';
    if (fieldName.includes('Time')) return 'time';
    return 'text';
  };

  const sectionFields = {
    headerSection: ['headerTitle', 'aboutDescription', 'aboutImage', 'registrationLink'], // Added registrationLink here
    reachSection: ['address', 'addressURL'],
    outcomesSection: ['outcomeContent'],
    quoteSection: ['quote'],
    registrationSection: [
      'workshopDate',
      'workshopStartTime',
      'workshopEndTime',
      'prerequisites',
      'designedFor',
      'lastDateForRegistration',
      'workshopRegistrationFee'
    ]
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isSaving && <Saving />}
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col space-y-2 p-6 sm:w-1/3">
          {Object.entries(sectionFields).map(([section, fieldArray]) => (
            <button
              key={section}
              onClick={() => toggleSection(section)}
              className={`text-sm py-2 px-4 rounded transition duration-300 flex items-center gap-2 ${activeSections[section] ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
            >
              <BsPlusCircle /> {activeSections[section] ? 'Remove' : 'Add'} {section.replace(/([A-Z])/g, ' $1').replace("Section", " Section")}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg flex-grow space-y-4 w-full sm:w-2/3">
          <h2 className="text-2xl font-bold text-indigo-600">Workshop Details</h2>
          {showSuccess && (
            <SuccessNotification
              message={workshopId ? "Workshop Updated Successfully!" : "Workshop Created Successfully!"}
              onClose={() => setShowSuccess(false)}
            />
          )}
          {showError && (
            <ErrorNotification
              message="Something went wrong!"
              onClose={() => setShowError(false)}
            />
          )}
          {Object.entries(sectionFields).map(([section, fieldArray]) =>
            activeSections[section] && fieldArray.map(field => (
              <div key={field} className="relative">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                  {['headerSubtitle', 'outcomeContent', 'quote', 'prerequisites', 'designedFor', 'lastDateForRegistration', 'registrationLink'].includes(field) ? null : <span className="text-red-500">*</span>}
                </label>
                {field === 'aboutDescription' ? (
                  <textarea
                    {...register(field, {
                      required: activeSections.headerSection && 'This field is required',
                      minLength: {
                        value: 3,
                        message: 'Minimum length is 3 characters'
                      }
                    })}
                    className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    rows="5"
                    placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                  />
                ) : field === 'aboutImage' ? (
                  <Controller
                    name="aboutImage"
                    control={control}
                    defaultValue=""
                    rules={{ required: activeSections.headerSection && 'This field is required' }}
                    render={({ field: { onChange, value } }) => (
                      <div>
                        <input
                          type="file"
                          onChange={(e) => {
                            onChange(e.target.files);
                            if (e.target.files.length > 0) {
                              const fileReader = new FileReader();
                              fileReader.onload = (event) => setImagePreview(event.target.result);
                              fileReader.readAsDataURL(e.target.files[0]);
                            } else {
                              setImagePreview(null);
                            }
                          }}
                          className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-48 w-auto border rounded-md mx-auto" />}
                      </div>
                    )}
                  />
                ) : (
                  <input
                    type={getInputType(field)}
                    {...register(field, {
                      required: ['headerTitle', 'aboutDescription', 'aboutImage'].includes(field) ? activeSections.headerSection && 'This field is required' : false,
                      minLength: {
                        value: field.includes('Fee') ? 0 : 3,
                        message: 'Minimum length is 3 characters'
                      }
                    })}
                    className={`mt-1 block w-full pl-3 pr-12 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                  />
                )}
                {errors[field] && (
                  <p className="mt-1 text-sm text-red-500">{errors[field].message}</p>
                )}
              </div>
            ))
          )}
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            {workshopId ? 'Update Workshop Details' : 'Submit Workshop Details'}
          </button>
        </form>
      </div>
    </>
  );
};

export default WorkshopForm;
