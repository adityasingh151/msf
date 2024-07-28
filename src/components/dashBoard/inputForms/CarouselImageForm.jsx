import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, push } from "firebase/database";
import Loading from '../../LoadSaveAnimation/Loading';
import Saving from '../../LoadSaveAnimation/Saving';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';

const CarouselImageForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const imageUrl = watch('imageUrl');
  const [imagePreview, setImagePreview] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreview(e.target.result);
      fileReader.readAsDataURL(imageUrl[0]);
    } else {
      setImagePreview(null);
    }
  }, [imageUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const file = data.imageUrl[0];
      const storageReference = storageRef(getStorage(), `carouselImages/${file.name}`);
      await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(storageReference);
      const imageRef = ref(getDatabase(), 'carouselImages');
      await push(imageRef, { imageUrl: downloadURL });
      setShowSuccess(true);
    } catch (error) {
      console.error('Error uploading image: ', error);
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
        <h2 className="text-2xl font-bold text-indigo-600">Upload Carousel Image</h2>
        {showSuccess && (
          <SuccessNotification message="Image uploaded successfully!" onClose={() => setShowSuccess(false)} />
        )}
        {showError && (
          <ErrorNotification message="Failed to upload image!" onClose={() => setShowError(false)} />
        )}
        <div className="my-4">
          <label className="block text-base font-medium text-gray-700">
            Upload Image
            <input
              type="file"
              {...register('imageUrl', { required: 'Image is required' })}
              className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 h-48 w-auto border rounded-md" />}
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit Image
        </button>
      </form>
    </>
  );
};

export default CarouselImageForm;
