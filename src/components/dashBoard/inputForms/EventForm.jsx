import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPlusCircle } from 'react-icons/bs';
import { txtdb, imgdb } from '../../databaseConfig/firebaseConfig';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref, push, update } from 'firebase/database';
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import { useParams } from 'react-router-dom';
import { getDatabase, get } from 'firebase/database';
import moment from 'moment';

const EventForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [fields, setFields] = useState([
    'headerTitle',
    'aboutDescription',
    'aboutImage'
  ]);
  const [initialData, setInitialData] = useState(null);
  const { eventId } = useParams();

  const aboutImage = watch('aboutImage');
  const sponsorImage1 = watch('sponsorImage1');
  const sponsorImage2 = watch('sponsorImage2');
  const sponsorImage3 = watch('sponsorImage3');
  const sponsorImage4 = watch('sponsorImage4');

  const [imagePreview, setImagePreview] = useState();
  const [sponsorImage1Preview, setSponsorImage1Preview] = useState();
  const [sponsorImage2Preview, setSponsorImage2Preview] = useState();
  const [sponsorImage3Preview, setSponsorImage3Preview] = useState();
  const [sponsorImage4Preview, setSponsorImage4Preview] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [openedSections, setOpenedSections] = useState({
    registrationSection: false
  });

  useEffect(() => {
    if (eventId) {
      console.log("Fetching event data for ID:", eventId);
      const db = getDatabase();
      get(ref(db, `events/${eventId}`)).then(snapshot => {
        console.log("Snapshot data:", snapshot.val()); // Log the fetched data
        if (snapshot.exists()) {
          setInitialData(snapshot.val());
          Object.keys(snapshot.val()).forEach(field => {
            console.log("Setting field:", field, snapshot.val()[field]); // Log each field being set
            setValue(field, snapshot.val()[field]);
          });
        } else {
          console.log("No data exists for this event ID:", eventId);
        }
      }).catch(error => {
        console.error("Error fetching event data:", error);
      });
    }
  }, [eventId, setValue]);

  useEffect(() => {
  if (aboutImage && aboutImage[0] instanceof File) {  // Check if it's a File object
    const file = aboutImage[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    setImagePreview(null);
  }
}, [aboutImage]);

useEffect(() => {
  if (sponsorImage1 && sponsorImage1[0] instanceof File) {  // Check if it's a File object
    const file = sponsorImage1[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSponsorImage1Preview(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    setSponsorImage1Preview(null);
  }
}, [sponsorImage1]);

useEffect(() => {
  if (sponsorImage2 && sponsorImage2[0] instanceof File) {  // Check if it's a File object
    const file = sponsorImage2[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSponsorImage2Preview(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    setSponsorImage2Preview(null);
  }
}, [sponsorImage2]);

useEffect(() => {
  if (sponsorImage3 && sponsorImage3[0] instanceof File) {  // Check if it's a File object
    const file = sponsorImage3[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSponsorImage3Preview(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    setSponsorImage3Preview(null);
  }
}, [sponsorImage3]);

useEffect(() => {
  if (sponsorImage4 && sponsorImage4[0] instanceof File) {  // Check if it's a File object
    const file = sponsorImage4[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSponsorImage4Preview(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    setSponsorImage4Preview(null);
  }
}, [sponsorImage4]);


  useEffect(() => {
    // Simulate a delay to demonstrate the loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust this duration as needed

    return () => clearTimeout(timer);
  }, []);

  const uploadImage = async (imageFile, path) => {
    const storageReference = storageRef(imgdb, path);
    await uploadBytes(storageReference, imageFile);
    const downloadURL = await getDownloadURL(storageReference);
    return downloadURL;
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      // Parallelize image uploads if new images are uploaded
      const uploadPromises = [];
      if (data.aboutImage?.[0] instanceof File) {
        uploadPromises.push(uploadImage(data.aboutImage[0], `events/${data.aboutImage[0].name}`));
      }
      if (data.sponsorImage1?.[0] instanceof File) {
        uploadPromises.push(uploadImage(data.sponsorImage1[0], `sponsors/${data.sponsorImage1[0].name}`));
      }
      if (data.sponsorImage2?.[0] instanceof File) {
        uploadPromises.push(uploadImage(data.sponsorImage2[0], `sponsors/${data.sponsorImage2[0].name}`));
      }
      if (data.sponsorImage3?.[0] instanceof File) {
        uploadPromises.push(uploadImage(data.sponsorImage3[0], `sponsors/${data.sponsorImage3[0].name}`));
      }
      if (data.sponsorImage4?.[0] instanceof File) {
        uploadPromises.push(uploadImage(data.sponsorImage4[0], `sponsors/${data.sponsorImage4[0].name}`));
      }

      const urls = await Promise.all(uploadPromises);
      const [aboutImageURL, sponsorImage1URL, sponsorImage2URL, sponsorImage3URL, sponsorImage4URL] = urls;

      const eventData = {
        ...data,
        aboutImage: aboutImageURL || data.aboutImage,
        sponsorImage1: sponsorImage1URL || data.sponsorImage1,
        sponsorImage2: sponsorImage2URL || data.sponsorImage2,
        sponsorImage3: sponsorImage3URL || data.sponsorImage3,
        sponsorImage4: sponsorImage4URL || data.sponsorImage4,
        eventDate: moment(data.eventDate).format('DD MMMM, YYYY'),
        eventTime: moment(data.eventTime, 'HH:mm').format('hh:mm A'),
      };

      const dbRef = ref(txtdb, 'events');
      if (eventId) {
        // Update existing event
        const eventUpdateRef = ref(txtdb, `events/${eventId}`);
        await update(eventUpdateRef, eventData);
      } else {
        // Create new event
        const eventsRef = ref(txtdb, 'events');
        await push(eventsRef, eventData);
      }

      setShowSuccess(true); // Show success notification
    } catch (error) {
      console.error('Error adding/updating event data: ', error);
      setShowError(true); // Show error notification
    } finally {
      setIsSaving(false);
    }
  };

  const toggleFields = (fieldArray, section) => {
    const currentFieldSet = new Set(fields);
    const hasAllFields = fieldArray.every(field => currentFieldSet.has(field));

    if (hasAllFields) {
      setFields(fields.filter(field => !fieldArray.includes(field)));
      setOpenedSections({ ...openedSections, [section]: false });
    } else {
      setFields([...fields, ...fieldArray.filter(field => !currentFieldSet.has(field))]);
      setOpenedSections({ ...openedSections, [section]: true });
    }
  };

  useEffect(() => {
    register('aboutImage', { required: 'This field is required' });
    register('sponsorImage1');
    register('sponsorImage2');
    register('sponsorImage3');
    register('sponsorImage4');
  }, [register]);

  useEffect(() => {
    if (openedSections.registrationSection) {
      register('eligibility', { required: 'This field is required' });
      register('eventDate', { required: 'This field is required' });
      register('eventTime', { required: 'This field is required' });
      register('registrationFee', { required: 'This field is required' });
      register('registrationLink', { required: 'This field is required' });
    } else {
      setValue('eligibility', '');
      setValue('eventDate', '');
      setValue('eventTime', '');
      setValue('registrationFee', '');
      setValue('registrationLink', '');
    }
  }, [openedSections, register, setValue]);

  const getInputType = (fieldName) => {
    if (fieldName.includes('Image')) return 'file';
    if (fieldName.includes('Date')) return 'date';
    if (fieldName.includes('Time')) return 'time';
    if (fieldName.includes('Link') || fieldName.includes('URL')) return 'url';
    if (fieldName.includes('Fee')) return 'number';
    return 'text';
  };

  const sectionFields = {
    headerSection: ['headerSubtitle'],
    featuresSection: ['feature1', 'feature2', 'feature3', 'feature4'],
    sponsorsSection: ['sponsor1', 'sponsorImage1', 'sponsor2', 'sponsorImage2', 'sponsor3', 'sponsorImage3', 'sponsor4', 'sponsorImage4'],
    rewardsSection: [
      'studentReward1', 'studentReward2', 'studentReward3',
      'schoolReward1', 'schoolReward2', 'schoolReward3'
    ],
    aboutOrganizationSection: ['organizationDescription'],
    advisorySection: [
      'advisoryMember1', 'advisoryMemberDescription1',
      'advisoryMember2', 'advisoryMemberDescription2',
      'advisoryMember3', 'advisoryMemberDescription3',
      'advisoryMember4', 'advisoryMemberDescription4'
    ],
    registrationSection: [
      'eligibility', 'eventDate', 'eventTime',
      'registrationFee', 'registrationLink'
    ]
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isSaving && <Saving />}
      <div className="flex flex-col sm:flex-row">
        {showSuccess && (
          <SuccessNotification
            message="Event Created Successfully!"
            onClose={() => setShowSuccess(false)}
          />
        )}
        {showError && (
          <ErrorNotification
            message="Something went wrong!"
            onClose={() => setShowError(false)}
          />
        )}
        <div className="flex flex-col space-y-2 p-6 sm:w-1/3">
          {Object.entries(sectionFields).map(([section, fieldArray]) => (
            <button
              key={section}
              onClick={() => toggleFields(fieldArray, section)}
              className={`text-sm py-2 px-4 rounded transition duration-300 flex items-center gap-2 ${fields.some(field => fieldArray.includes(field)) ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
            >
              <BsPlusCircle /> {fields.some(field => fieldArray.includes(field)) ? 'Remove' : 'Add'} {section.replace(/([A-Z])/g, ' $1').replace('section', ' Section')}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg flex-grow space-y-4 w-full sm:w-2/3">
          <h2 className="text-2xl font-bold text-indigo-600">Event Details</h2>
          {fields.map(field => (
            <div key={field} className="relative">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
                {['headerSubtitle', 'feature1', 'feature2', 'feature3', 'feature4', 'sponsor1', 'sponsorImage1', 'sponsor2', 'sponsorImage2', 'sponsor3', 'sponsorImage3', 'sponsor4', 'sponsorImage4', 'studentReward1', 'studentReward2', 'studentReward3', 'schoolReward1', 'schoolReward2', 'schoolReward3', 'organizationDescription', 'advisoryMember1', 'advisoryMemberDescription1', 'advisoryMember2', 'advisoryMemberDescription2', 'advisoryMember3', 'advisoryMemberDescription3', 'advisoryMember4', 'advisoryMemberDescription4', 'eligibility', 'eventDate', 'eventTime', 'registrationFee', 'registrationLink'].includes(field) ? null : <span className="text-red-500">*</span>}
              </label>
              {field === 'aboutImage' || field === 'sponsorImage1' || field === 'sponsorImage2' || field === 'sponsorImage3' || field === 'sponsorImage4' ? (
                <div>
                  <input
                    type="file"
                    {...register(field, {
                      required: ['headerSubtitle', 'feature1', 'feature2', 'feature3', 'feature4', 'sponsor1', 'sponsorImage1', 'sponsor2', 'sponsorImage2', 'sponsor3', 'sponsorImage3', 'sponsor4', 'sponsorImage4', 'studentReward1', 'studentReward2', 'studentReward3', 'schoolReward1', 'schoolReward2', 'schoolReward3', 'organizationDescription', 'advisoryMember1', 'advisoryMemberDescription1', 'advisoryMember2', 'advisoryMemberDescription2', 'advisoryMember3', 'advisoryMemberDescription3', 'advisoryMember4', 'advisoryMemberDescription4', 'eligibility', 'eventDate', 'eventTime', 'registrationFee', 'registrationLink'].includes(field) ? false : 'This field is required'
                    })}
                    className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {field === 'aboutImage' && imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-4 h-48 w-auto border rounded-md mx-auto"
                    />
                  )}
                  {field === 'sponsorImage1' && sponsorImage1Preview && (
                    <img
                      src={sponsorImage1Preview}
                      alt="Preview"
                      className="mt-4 h-48 w-auto border rounded-md mx-auto"
                    />
                  )}
                  {field === 'sponsorImage2' && sponsorImage2Preview && (
                    <img
                      src={sponsorImage2Preview}
                      alt="Preview"
                      className="mt-4 h-48 w-auto border rounded-md mx-auto"
                    />
                  )}
                  {field === 'sponsorImage3' && sponsorImage3Preview && (
                    <img
                      src={sponsorImage3Preview}
                      alt="Preview"
                      className="mt-4 h-48 w-auto border rounded-md mx-auto"
                    />
                  )}
                  {field === 'sponsorImage4' && sponsorImage4Preview && (
                    <img
                      src={sponsorImage4Preview}
                      alt="Preview"
                      className="mt-4 h-48 w-auto border rounded-md mx-auto"
                    />
                  )}
                </div>
              ) : (
                <input
                  type={getInputType(field)}
                  {...register(field, {
                    required: ['headerSubtitle', 'feature1', 'feature2', 'feature3', 'feature4', 'sponsor1', 'sponsorImage1', 'sponsor2', 'sponsorImage2', 'sponsor3', 'sponsorImage3', 'sponsor4', 'sponsorImage4', 'studentReward1', 'studentReward2', 'studentReward3', 'schoolReward1', 'schoolReward2', 'schoolReward3', 'organizationDescription', 'advisoryMember1', 'advisoryMemberDescription1', 'advisoryMember2', 'advisoryMemberDescription2', 'advisoryMember3', 'advisoryMemberDescription3', 'advisoryMember4', 'advisoryMemberDescription4', 'eligibility', 'eventDate', 'eventTime', 'registrationFee', 'registrationLink'].includes(field) ? false : 'This field is required',
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
          ))}
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Submit Event Details
          </button>
        </form>
      </div>
    </>
  );
};

export default EventForm;
