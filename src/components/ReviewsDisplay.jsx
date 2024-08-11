import React, { useEffect, useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { getDatabase, ref, onValue } from 'firebase/database';
import Loading from './LoadSaveAnimation/Loading';
import ErrorNotification from './LoadSaveAnimation/ErrorNotification';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchReviews = () => {
      const db = getDatabase();
      const reviewsRef = ref(db, 'reviews');

      onValue(reviewsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const reviewList = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setReviews(reviewList);
        } else {
          console.log('No data available');
          setShowError(true);
        }
        setIsLoading(false);
      }, (error) => {
        console.error('Error fetching reviews: ', error);
        setShowError(true);
        setIsLoading(false);
      });
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (showError) {
    return <ErrorNotification message="Failed to load reviews!" onClose={() => setShowError(false)} />;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-blue-700 px-4 py-12 sm:py-16 lg:px-6 isolate">
      <div className="mx-auto max-w-2xl lg:max-w-3xl">
        <div className="text-center text-2xl font-bold leading-8 text-white sm:text-3xl sm:leading-9">
          <h5 className="text-yellow-300 uppercase font-semibold">Testimonials</h5>
          <p>Few words from our alumni!!</p>
        </div>
        <CarouselProvider
          naturalSlideWidth={100}
          isIntrinsicHeight
          totalSlides={reviews.length}
          infinite
        >
          <Slider>
            {reviews.map((review, index) => (
              <Slide key={review.id} index={index}>
                <figure className="mt-8">
                  <blockquote className="text-center text-base font-medium leading-6 text-gray-200 sm:text-lg sm:leading-7">
                    <p className='italic'>"{review.review}"</p>
                  </blockquote>
                  <figcaption className="mt-8">
                    <img
                      alt={review.name}
                      src={review.imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                      className="mx-auto h-10 w-10 rounded-full"
                    />
                    <div className="mt-3 flex items-center justify-center space-x-2 text-sm">
                      <div className="font-semibold text-xl text-white">{review.name}</div>
                      <svg width={2} height={2} viewBox="0 0 2 2" aria-hidden="true" className="fill-white">
                        <circle r={1} cx={1} cy={1} />
                      </svg>
                      <div className="text-gray-300">{review.designation}</div>
                    </div>
                  </figcaption>
                </figure>
              </Slide>
            ))}
          </Slider>
          <div className="flex items-center mt-6 justify-center">
            <ButtonBack className="cursor-pointer" role="button" aria-label="previous slide">
              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonal-svg2.svg" alt="previous" />
            </ButtonBack>
            <ButtonNext className="cursor-pointer ml-2" role="button" aria-label="next slide">
              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonial-svg3.svg" alt="next" />
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    </section>
  );
};

export default Testimonials;
