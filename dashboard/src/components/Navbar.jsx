import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ setSidebarOpen, title }) => {
    const { user } = useAuth();

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-900 ml-4 lg:ml-0">{title}</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
                            <Bell className="w-5 h-5" />
                        </button>
                        <Link to="/settings" className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
                            <Settings className="w-5 h-5" />
                        </Link>
                        {/* <div className="flex items-center space-x-2">
                            <img
                                src={user?.profileImage || 'https://via.placeholder.com/40'}
                                alt={user?.name}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                {user?.name}
                            </span>
                        </div> */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
