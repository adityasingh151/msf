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
import ReactQuillNewEditor from '../../reactQuill/ReactQuillNewEditor';  // Assuming this is the path to your custom editor

const EventForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [fields, setFields] = useState([
    'headerTitle',
    'aboutDescription',
    'aboutImage'
  ]);
  const [initialData, setInitialData] = useState(null);
  const { eventId } = useParams();  // To differentiate between add/edit mode

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

  // Fetch event data if eventId exists (for edit mode)
  useEffect(() => {
    if (eventId) {
      console.log("Fetching event data for ID:", eventId);
      const db = getDatabase();
      get(ref(db, `events/${eventId}`)).then(snapshot => {
        console.log("Snapshot data:", snapshot.val());
        if (snapshot.exists()) {
          const data = snapshot.val();
          setInitialData(data);
  
          // Iterate over the fields and set the value in the form
          Object.keys(data).forEach(field => {
            if (field === 'eventDate') {
              // Convert saved date (DD MMMM, YYYY) back to YYYY-MM-DD
              const parsedDate = moment(data[field], 'DD MMMM, YYYY').format('YYYY-MM-DD');
              setValue(field, parsedDate);
            } else if (field === 'eventTime') {
              // Convert saved time (hh:mm A) back to HH:mm (24-hour format)
              const parsedTime = moment(data[field], 'hh:mm A').format('HH:mm');
              setValue(field, parsedTime);
            } else {
              setValue(field, data[field]);
            }
          });
  
          if (data.aboutImage) {
            setImagePreview(data.aboutImage);  // Set the image preview if already exists
          }
        } else {
          console.log("No data exists for this event ID:", eventId);
        }
      }).catch(error => {
        console.error("Error fetching event data:", error);
      });
    }
  }, [eventId, setValue]);
  

  // Image preview logic for "aboutImage"
  useEffect(() => {
    if (aboutImage && aboutImage[0] instanceof File) {
      const file = aboutImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (initialData?.aboutImage) {
      setImagePreview(initialData.aboutImage);  // If no new image is provided, show the existing one
    } else {
      setImagePreview(null);  // Reset if no image is selected
    }
  }, [aboutImage, initialData]);

  // Similarly handle sponsor images preview logic

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

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
      const uploadPromises = [];
      let aboutImageURL = initialData?.aboutImage || null;

      // Upload the image only if a new image is provided
      if (data.aboutImage?.[0] instanceof File) {
        aboutImageURL = await uploadImage(data.aboutImage[0], `events/${data.aboutImage[0].name}`);
      }

      // Similarly handle sponsor images
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
      const [sponsorImage1URL, sponsorImage2URL, sponsorImage3URL, sponsorImage4URL] = urls;

      // Format date and time separately using moment
      const formattedEventDate = moment(data.eventDate).format('DD MMMM, YYYY'); // Format date
      const formattedEventTime = moment(data.eventTime, 'HH:mm').format('hh:mm A'); // Format time

      const eventData = {
        ...data,
        aboutImage: aboutImageURL,  // Keep the previous image if no new image is provided
        sponsorImage1: sponsorImage1URL || initialData?.sponsorImage1 || null,
        sponsorImage2: sponsorImage2URL || initialData?.sponsorImage2 || null,
        sponsorImage3: sponsorImage3URL || initialData?.sponsorImage3 || null,
        sponsorImage4: sponsorImage4URL || initialData?.sponsorImage4 || null,
        eventDate: formattedEventDate,  // Save formatted event date
        eventTime: formattedEventTime,  // Save formatted event time
      };

      const dbRef = ref(txtdb, 'events');
      if (eventId) {
        const eventUpdateRef = ref(txtdb, `events/${eventId}`);
        await update(eventUpdateRef, eventData);
      } else {
        const eventsRef = ref(txtdb, 'events');
        await push(eventsRef, eventData);
      }

      setShowSuccess(true);
    } catch (error) {
      console.error('Error adding/updating event data: ', error);
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle the conditional image field requirement based on whether it's a new event or edit
  useEffect(() => {
    register('aboutImage', {
      required: !eventId ? 'This field is required' : false // Image is required only if eventId is null (new event)
    });
    register('sponsorImage1');
    register('sponsorImage2');
    register('sponsorImage3');
    register('sponsorImage4');
  }, [register, eventId]);

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
              className={`text-sm py-2 px-4 rounded transition duration-300 flex items-center gap-2 ${
                fields.some((field) => fieldArray.includes(field)) ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'
              } text-white`}
            >
              <BsPlusCircle /> {fields.some((field) => fieldArray.includes(field)) ? 'Remove' : 'Add'} {section.replace(/([A-Z])/g, ' $1').replace('section', ' Section')}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg flex-grow space-y-4 w-full sm:w-2/3">
          <h2 className="text-2xl font-bold text-indigo-600">Event Details</h2>
          {fields.map((field) => (
            <div key={field} className="relative">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
                {/* Add a star for mandatory fields */}
                {['headerTitle', 'eligibility', 'eventDate', 'eventTime', 'registrationFee', 'registrationLink'].includes(field) && (
                  <span className="text-red-500"> *</span>
                )}
              </label>
  
              {/* Handle non-image fields and specifically eventDate, eventTime, registrationFee, registrationLink */}
              {field === 'eventDate' ? (
                <input
                  type="date"
                  {...register('eventDate')}
                  defaultValue={initialData?.eventDate || ''}
                  className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : field === 'eventTime' ? (
                <input
                  type="time"
                  {...register('eventTime')}
                  defaultValue={initialData?.eventTime || ''}
                  className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : field === 'registrationFee' ? (
                <input
                  type="number"
                  {...register('registrationFee')}
                  defaultValue={initialData?.registrationFee || ''}
                  className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : field === 'registrationLink' ? (
                <input
                  type="url"
                  {...register('registrationLink')}
                  defaultValue={initialData?.registrationLink || ''}
                  className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : field === 'aboutImage' || field.includes('sponsorImage') ? (
                <div>
                  <input
                    type="file"
                    {...register(field, {
                      required: field === 'aboutImage' && !eventId ? 'This field is required' : false,
                    })}
                    className="mt-1 block w-full pl-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {/* Display preview for the aboutImage */}
                  {field === 'aboutImage' && imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-4 h-48 w-auto border rounded-md mx-auto"
                    />
                  )}
                  {/* Display previews for sponsor images */}
                  {field === 'sponsorImage1' && sponsorImage1Preview && (
                    <img
                      src={sponsorImage1Preview}
                      alt="Preview"
                      className="mt-4 h-48 w-auto border rounded-md mx-auto"
                    />
                  )}
                  {/* Add more image previews as needed */}
                </div>
              ) : (
                /* Handle rich text or other text inputs */
                <ReactQuillNewEditor
                  value={watch(field) || initialData?.[field] || ''}
                  onChange={(content) => setValue(field, content)} // Update the form state with the editor content
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                />
              )}
  
              {/* Display field errors */}
              {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field].message}</p>}
            </div>
          ))}
  
          {/* Submit Button */}
          <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Submit Event Details
          </button>
        </form>
      </div>
    </>
  );
  
};

export default EventForm;