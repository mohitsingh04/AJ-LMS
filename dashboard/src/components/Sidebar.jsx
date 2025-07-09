import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    CircleFadingPlus, Dot, Headset, Info, LayoutDashboard,
    LogOut, NotebookText, Users2, X, Home, Users, Target,
    BarChart3, Phone, FileText, Calendar, DollarSign, Eye, Plus, Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from "../assets/images/AJPreneur-logo copy.jpeg";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [expandedItem, setExpandedItem] = useState(null);

    // Determine if a route or subroute is active
    const isActiveRoute = (item) => {
        if (!item) return false;

        if (item.subItems) {
            return item.subItems.some(sub => location.pathname.startsWith(sub.path));
        }

        // Ensure dashboard root only matches exactly
        if (item.path === '/dashboard') {
            return location.pathname === '/dashboard';
        }

        return location.pathname === item.path || location.pathname.startsWith(item.path);
    };
    // Expand the correct menu item on page load
    useEffect(() => {
        const items = getNavigationItems();
        const found = items.find((item) =>
            item.subItems?.some(sub => location.pathname.startsWith(sub.path))
        );
        if (found) setExpandedItem(found.label);
    }, [location.pathname]);

    const getNavigationItems = () => {
        switch (user?.role) {
            case 'superadmin':
                return [
                    { icon: Home, label: 'Dashboard', path: '/dashboard' },
                    { icon: Users, label: 'Admins', path: '/dashboard/admins' },
                    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
                    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
                ];
            case 'admin':
                return [
                    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
                    {
                        icon: Users2, label: 'Users', path: '/dashboard/aj-preneur/all',
                        subItems: [
                            { icon: Dot, label: 'AJ Preneur', path: '/dashboard/aj-preneur/all' },
                            { icon: Dot, label: 'Counselor', path: '/dashboard/counselor/all' }
                        ]
                    },
                    {
                        icon: NotebookText, label: 'Enquiry', path: '/dashboard/enquiry/all',
                        subItems: [
                            { icon: Dot, label: 'All Enquiry', path: '/dashboard/enquiry/all' },
                            { icon: Dot, label: 'Add Enquiry', path: '/dashboard/enquiry/add' }
                        ]
                    },
                    { icon: Headset, label: 'Support', path: '/dashboard/support' },
                    { icon: Info, label: 'About us', path: '/dashboard/about-us' },
                    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
                ];
            case 'agent':
                return [
                    { icon: Home, label: 'Dashboard', path: '/dashboard' },
                    { icon: NotebookText, label: 'Enquiry', path: '/dashboard/enquiry/all' },
                    { icon: Headset, label: 'Support', path: '/dashboard/support' },
                    { icon: Info, label: 'About us', path: '/dashboard/about-us' },
                    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
                ];
            case 'counselor':
                return [
                    { icon: Home, label: 'Dashboard', path: '/dashboard' },
                    { icon: Home, label: 'My Work', path: '/dashboard/my-work' },
                    {
                        icon: NotebookText, label: 'Enquiry', path: '/dashboard/enquiry/all',
                        subItems: [
                            { icon: Dot, label: 'All Enquiry', path: '/dashboard/enquiry/all' },
                            { icon: Dot, label: 'Add Enquiry', path: '/dashboard/enquiry/add' }
                        ]
                    },
                    { icon: Headset, label: 'Support', path: '/dashboard/support' },
                    { icon: Info, label: 'About us', path: '/dashboard/about-us' },
                    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
                ];
            default:
                return [];
        }
    };

    const navigationItems = getNavigationItems();

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-4 border-b">
                    <div className="flex items-center space-x-2">
                        <img src={Logo} alt="Logo" className="h-10" />
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="mt-8 px-4 space-y-2">
                    {navigationItems.map((item) => (
                        <div key={item.label}>
                            {item.subItems ? (
                                <button
                                    type="button"
                                    onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                                    className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 ${isActiveRoute(item) ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </button>
                            ) : (
                                <Link
                                    to={item.path}
                                    className={`flex items-center px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 ${isActiveRoute(item) ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                                        }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </Link>
                            )}

                            {item.subItems && expandedItem === item.label && (
                                <div className="ml-8 mt-2 space-y-1">
                                    {item.subItems.map((sub) => (
                                        <Link
                                            key={sub.path}
                                            to={sub.path}
                                            className={`flex items-center px-3 py-2 text-sm rounded-lg hover:bg-blue-50 hover:text-blue-600 ${location.pathname.startsWith(sub.path)
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-600'
                                                }`}
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <sub.icon className="w-4 h-4 mr-2" />
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t">
                    <div className="flex items-center space-x-3 mb-4">
                        <img
                            src={user?.profileImage || 'https://via.placeholder.com/40'}
                            alt={user?.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
