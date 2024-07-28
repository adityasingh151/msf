import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getDatabase, ref, onValue, off, remove } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Modal from '../../Modal'; // Assuming Modal is in the same directory
import Loading from '../../LoadSaveAnimation/Loading';

const CarouselView = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const imagesRef = ref(db, 'carouselImages');
    
    const unsubscribe = onValue(imagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedImages = Object.keys(data).map(key => ({
        id: key,
        url: data[key].imageUrl
      }));
      setImages(loadedImages);
      setIsLoading(false);
    }, (error) => {
      console.error(error);
      setError("Failed to fetch images");
      setIsLoading(false);
    });

    return () => off(imagesRef, 'value', unsubscribe);
  }, []);

  const confirmDelete = (image) => {
    setCurrentImage(image);
    setModalContent(`Are you sure you want to delete this image?`);
    setShowModal(true);
  };

  const deleteImage = async () => {
    const storage = getStorage();
    const imageRef = storageRef(storage, currentImage.url);
    
    try {
      await deleteObject(imageRef);
      await remove(ref(getDatabase(), `carouselImages/${currentImage.id}`));
      setShowModal(false);
    } catch (error) {
      console.error('Error removing image: ', error);
      setModalContent('Failed to delete image.');
    }
  };

  if (isLoading) return <Loading/>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mx-auto py-1">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm Deletion">
        <p>{modalContent}</p>
        <button onClick={deleteImage} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete Image
        </button>
      </Modal>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
        style={{ width: '100%', height: '600px' }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div
              className="relative h-full w-full"
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black opacity-25"></div>
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <button className="text-white bg-red-600 hover:bg-red-700 p-2 rounded" onClick={() => confirmDelete(image)}>
                    Delete
                  </button>
                </div>
                <p className="text-center text-white text-2xl font-bold">Slide</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselView;
