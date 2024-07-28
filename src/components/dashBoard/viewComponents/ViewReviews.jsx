import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Loading from '../../LoadSaveAnimation/Loading';
import ErrorNotification from '../../LoadSaveAnimation/ErrorNotification';
import SuccessNotification from '../../LoadSaveAnimation/SuccessNotification';
import Saving from '../../LoadSaveAnimation/Saving';
import Modal from '../../Modal'; // Import the Modal component

const ViewReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const db = getDatabase();
    const reviewsRef = ref(db, 'reviews');

    const fetchData = () => {
      onValue(reviewsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const reviewList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setReviews(reviewList);
        } else {
          console.log("No data available");
          setShowError(true);
        }
        setIsLoading(false);
      }, (error) => {
        console.error('Error fetching reviews: ', error);
        setShowError(true);
        setIsLoading(false);
      });
    };

    fetchData();
  }, []);

  const handleEdit = (review) => {
    setEditingReview(review);
    setValue('name', review.name);
    setValue('review', review.review);
    setValue('designation', review.designation);
    setImageFile(null); // Reset the image file when editing
  };

  const confirmDelete = (review) => {
    setReviewToDelete(review);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      setIsSaving(true);
      const reviewRef = ref(getDatabase(), `reviews/${reviewToDelete.id}`);
      await remove(reviewRef);
      setReviews(reviews.filter(review => review.id !== reviewToDelete.id));
      setShowSuccess(true);
    } catch (error) {
      console.error('Error deleting review: ', error);
      setShowError(true);
    } finally {
      setIsSaving(false);
      setIsModalOpen(false);
      setReviewToDelete(null);
    }
  };

  const handleImageUpload = async (file) => {
    const storage = getStorage();
    const storagePath = `review_images/${file.name}`;
    const imageRef = storageRef(storage, storagePath);

    await uploadBytes(imageRef, file);
    const imageURL = await getDownloadURL(imageRef);

    return imageURL;
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      let imageUrl = editingReview?.imageUrl;

      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      const reviewRef = ref(getDatabase(), `reviews/${editingReview.id}`);
      await update(reviewRef, {
        name: data.name,
        review: data.review,
        designation: data.designation,
        imageUrl: imageUrl || editingReview?.imageUrl,
      });
      
      setReviews(reviews.map(review => review.id === editingReview.id ? { id: editingReview.id, ...data, imageUrl } : review));
      setShowSuccess(true);
      setEditingReview(null);
      setImageFile(null); // Reset the image file
    } catch (error) {
      console.error('Error updating review: ', error);
      setShowError(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (showError) {
    return <ErrorNotification message="Failed to load reviews!" onClose={() => setShowError(false)} />;
  }

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Manage Reviews</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16 mt-6">
          <div className="lg:col-span-2">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 bg-white shadow-lg rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-rose-600">{review.name}</h3>
                    <p className="text-gray-500">{review.designation}</p>
                    <p className="mt-4 text-gray-700">{review.review}</p>
                    {review.imageUrl && (
                      <img src={review.imageUrl} alt="Reviewer" className="w-32 h-32 object-cover mt-4 rounded-full" />
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(review)}
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(review)}
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">{editingReview ? 'Edit Review' : 'Add New Review'}</h3>
            {isSaving && <Saving />}
            {showSuccess && (
              <SuccessNotification message="Review saved successfully!" onClose={() => setShowSuccess(false)} />
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-base font-medium text-gray-700">
                  Reviewer's Name <span className="text-red-500">*</span>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className={`mt-1 block w-full pl-3 py-2 text-base text-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </label>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700">
                  Review <span className="text-red-500">*</span>
                  <textarea
                    {...register('review', { required: 'Review is required' })}
                    className={`mt-1 block w-full pl-3 py-2 text-base text-gray-900 border ${errors.review ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.review && <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>}
                </label>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700">
                  Reviewer's Designation
                  <input
                    type="text"
                    {...register('designation')}
                    className="mt-1 block w-full pl-3 py-2 text-base text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </label>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700">
                  Reviewer's Image
                  <input
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </label>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                {editingReview ? 'Update Review' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} title="Delete Review" onClose={() => setIsModalOpen(false)}>
        <p>Are you sure you want to delete this review?</p>
        <div className="flex justify-end mt-4 gap-4">
          <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">
            Cancel
          </button>
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
            Delete
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default ViewReviews;
