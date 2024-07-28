// src/components/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './dashBoard/SideBar';

const AdminLayout = () => {
    return (
        <div className="md:flex">
            <Sidebar />
            <div className="flex-grow pl-2 bg-gray-100 min-h-screen"> 
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
