import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const DashboardLayout = ({ children, title }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="lg:ml-64 flex flex-col flex-1">
                <Navbar title={title} setSidebarOpen={setSidebarOpen} />
                <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout;
