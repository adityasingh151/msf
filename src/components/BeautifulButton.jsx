import React from 'react';
import { useNavigate } from 'react-router-dom';

const BeautifulButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // console.log("buttoin is pressed.")
        navigate('/about/story'); // Replace with your target path
    };

    return (
        <div className='bg-gradient-to-r from-teal-600 via-blue-500 to-blue-700 py-6 w-full flex flex-col items-center justify-center'>
            <h1 className="text-white text-3xl font-bold mb-2">
                Discover Our Journey
            </h1>
            <button
                onClick={handleClick}
                className="bg-white text-purple-600 font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
                Our History
            </button>
        </div>
    );
};

export default BeautifulButton;
