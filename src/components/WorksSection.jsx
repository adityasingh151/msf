import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getDatabase, ref, onValue } from "firebase/database";
import { Link } from 'react-router-dom';
import Loading from './LoadSaveAnimation/Loading';

function SampleNextArrow(props) {
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
}

function SamplePrevArrow(props) {
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
}

function WorksSection() {
  const [isWorkshopLoading, setIsWorkshopLoading] = useState(true);
  const [isEventLoading, setIsEventLoading] = useState(true);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const db = getDatabase();

    const fetchWorkshops = () => {
      const workshopRef = ref(db, 'workshops');
      onValue(workshopRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const workshopList = Object.keys(data).map(key => ({
            id: key,
            image: data[key].aboutImage,
            title: data[key].aboutTitle,
            description: data[key].headerTitle,
            type: "workshop"
          }));
          setWorks(prevWorks => [...prevWorks, ...workshopList]);
          setIsWorkshopLoading(false);
        } else {
          console.log("No data available for workshops");
        }
      });
    };

    const fetchEvents = () => {
      const eventsRef = ref(db, 'events');
      onValue(eventsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const eventList = Object.keys(data).map(key => ({
            id: key,
            image: data[key].aboutImage,
            title: data[key].headerTitle,
            description: data[key].headerSubTitle,
            type: "event"
          }));
          setWorks(prevWorks => [...prevWorks, ...eventList]);
          setIsEventLoading(false)
        } else {
          console.log("No data available for events");
        }
      });
    };

    fetchWorkshops();
    fetchEvents();
  }, []);

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

  if (isEventLoading || isWorkshopLoading) return (<Loading />)

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
                  <img src={work.image} alt={work.title} className="w-full h-64 object-cover" />
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

export default WorksSection;
