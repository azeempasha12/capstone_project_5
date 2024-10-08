import React, { useState } from 'react';
import { FaHome, FaFilm, FaBookmark, FaUser, FaSignOutAlt } from "react-icons/fa";
import { GrDevice } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext'; 

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeButton, setActiveButton] = useState('home'); // state to track the active button

  const handleLogout = () => {
    setIsLoggedIn(false); 
    navigate('/login');
  };

  const handleButtonClick = (button, path) => {
    setActiveButton(button); // Set the clicked button as active
    navigate(path); // Navigate to the corresponding page
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 md:top-3 md:left-5 lg:top-5 lg:left-4 lg:max-w-[200px]">
      <div className="w-full md:w-[80px] h-auto md:h-[710px] lg:h-[800px] bg-red-300 border-4 border-blue-400 md:rounded-3xl rounded-t-none flex flex-row md:flex-col justify-around items-center md:justify-start md:items-start">
        <button className="m-2 md:m-5" onClick={() => handleButtonClick('home', '/')}>
          <FaHome className={`h-6 w-6 md:h-7 md:w-7 ${activeButton === 'home' ? 'text-blue-500' : 'text-black'}`} />
        </button>
        <button className="m-2 md:m-5" onClick={() => handleButtonClick('film', '/moviesPage')}>
          <FaFilm className={`h-6 w-6 md:h-7 md:w-7 ${activeButton === 'film' ? 'text-blue-500' : 'text-black'}`} />
        </button>
        <button className="m-2 md:m-5" onClick={() => handleButtonClick('device', '/TvSeriesPage')}>
          <GrDevice className={`h-6 w-6 md:h-7 md:w-7 ${activeButton === 'device' ? 'text-blue-500' : 'text-black'}`} />
        </button>
        <button className="m-2 md:m-5" onClick={() => handleButtonClick('bookmark', '/BookMarkPage')}>
          <FaBookmark className={`h-6 w-6 md:h-7 md:w-7 ${activeButton === 'bookmark' ? 'text-blue-500' : 'text-black'}`} />
        </button>

        {isLoggedIn && (
          <button className="m-2 md:m-5" onClick={() => setShowLogoutConfirm(true)}>
            <FaSignOutAlt className="h-5 w-5 md:h-6 md:w-7" />
          </button>
        )}

        <button className="m-2 md:m-4 lg:mt-[320px] p-1 border-2 border-green-500 rounded-full bg-white">
          {isLoggedIn ? (
            <img
              src="/assets/images.jpeg"
              alt="User Profile"
              className="h-8 w-10 rounded-full object-cover"
              onClick={() => handleButtonClick('profile', '/profile')}
            />
          ) : (
            <FaUser className={`h-6 w-6 md:h-7 md:w-7 ${activeButton === 'user' ? 'text-blue-500' : 'text-black'}`} onClick={() => handleButtonClick('user', '/login')} />
          )}
        </button>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="mb-4">Do you want to exit?</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
              onClick={handleLogout}
            >
              Exit
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded m-2"
              onClick={() => setShowLogoutConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
