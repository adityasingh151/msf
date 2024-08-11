import React, { useState, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getDatabase, ref, onValue } from "firebase/database";
import { Link } from 'react-router-dom';
import Loading from './LoadSaveAnimation/Loading';

const SampleNextArrow = React.memo((props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#4A90E2",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        zIndex: 1
      }}
      onClick={onClick}
    >
      <FaArrowRight color="white" />
    </div>
  );
});

const SamplePrevArrow = React.memo((props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#4A90E2",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        zIndex: 1
      }}
      onClick={onClick}
    >
      <FaArrowLeft color="white" />
    </div>
  );
});

const WorksSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [works, setWorks] = useState([]);

  const fetchData = useCallback(async () => {
    const db = getDatabase();
    const workshopRef = ref(db, 'workshops');
    const eventsRef = ref(db, 'events');

    const fetchDataPromise = async (ref, type) => {
      return new Promise((resolve) => {
        onValue(ref, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const list = Object.keys(data).map(key => ({
              id: key,
              image: data[key].aboutImage,
              title: data[key].headerTitle,
              description: type === 'workshop' ? data[key].aboutTitle : data[key].headerSubTitle,
              type,
            }));
            resolve(list);
          } else {
            console.log(`No data available for ${type}`);
            resolve([]);
          }
        });
      });
    };

    try {
      const [workshops, events] = await Promise.all([
        fetchDataPromise(workshopRef, 'workshop'),
        fetchDataPromise(eventsRef, 'event'),
      ]);

      setWorks([...workshops, ...events]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (isLoading) return (<Loading />);

  return (
    <section id="work" className="bg-gradient-to-r from-teal-600 to-blue-700 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-yellow-300 uppercase font-semibold">Works</h5>
          <h4 className="main_title text-4xl font-bold text-white">Some of Our Recent Works</h4>
        </div>
        <Slider {...settings}>
          {works.map((work, index) => (
            <div key={index} className="p-4">
              <Link to={work.type === 'event' ? `/event/${work.id}` : `/workshop/${work.id}`} className="block">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                  <img src={work.image} alt={work.title} className="w-full h-64 object-cover" loading="lazy" />
                  <div className="p-4">
                    <h5 className="text-2xl font-bold text-gray-800">{work.title}</h5>
                    <p className="text-gray-700 mt-2">{work.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default React.memo(WorksSection);
