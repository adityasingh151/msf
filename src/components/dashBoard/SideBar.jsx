import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineMenu,
  AiOutlineClose
} from "react-icons/ai";
import { BiSolidLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div>
      {/* Toggle button for small screens */}
      <div className="md:hidden fixed top-0 left-0 w-full flex items-center py-2 pl-4 bg-gray-100 text-gray-300 shadow-lg">
        <button
          onClick={toggleSidebar}
          className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition duration-300"
        >
          <AiOutlineMenu className="w-6 h-6 text-white" />
        </button>
        <h2 className="md:text-4xl lg:text-6xl sm:text-2xl text-xl font-bold mx-auto text-center text-indigo-900 ">
          Mathematical Sciences Foundation
        </h2>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 h-full bg-gray-900 text-gray-300 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 md:flex md:flex-col min-h-screen`}
      >
        <div className="flex items-center justify-between p-1 md:hidden">
          <button
            onClick={toggleSidebar}
            className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition duration-300"
          >
            <AiOutlineClose className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="mt-4 flex flex-col h-full justify-between space-y-2 px-4 flex-grow">
          <div>
            <img
              src="/msflogo.png"
              onClick={() => {
                navigate("/");
              }}
              className="h-20 w-20 mx-auto cursor-pointer"
            />
            <NavLink
              to="/admin/dashboard"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 text-white flex items-center p-4 rounded-lg transition duration-300"
                  : "flex items-center p-4 rounded-lg transition duration-300 hover:bg-gray-700 hover:text-white"
              }
            >
              <AiOutlineDashboard className="w-6 h-6 mr-4" />
              <span className="text-lg">Dashboard</span>
            </NavLink>
          </div>

          {/* Spacer div to push logout button to the bottom */}
          <div className="flex-grow"></div>

          <div>
            <button
              onClick={handleLogout}
              className="bg-gray-700 mb-20 w-full text-white flex items-center p-4 rounded-lg transition duration-300 hover:bg-gray-600 md:mb-4"
            >
              <BiSolidLogOut className="w-6 h-6 mr-4" />
              <span className="text-lg">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
