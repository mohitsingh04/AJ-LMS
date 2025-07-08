import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Bell, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Home,
  Users,
  Target,
  BarChart3,
  Phone,
  FileText,
  Calendar,
  DollarSign,
  Eye,
  Edit,
  UserCheck,
  History,
  Plus
} from 'lucide-react';

const Layout = ({ children, title }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'superadmin':
        return [
          { icon: Home, label: 'Dashboard', path: '/' },
          { icon: Users, label: 'Admins', path: '/admins' },
          { icon: BarChart3, label: 'Analytics', path: '/analytics' },
          { icon: DollarSign, label: 'Billing', path: '/billing' },
          { icon: Settings, label: 'Settings', path: '/settings' }
        ];
      case 'admin':
        return [
          { icon: Home, label: 'Dashboard', path: '/' },
          { 
            icon: Target, 
            label: 'Leads', 
            path: '/leads',
            subItems: [
              { icon: Eye, label: 'View All', path: '/leads' },
              { icon: Plus, label: 'Add New', path: '/leads/create' }
            ]
          },
          { icon: Users, label: 'Team', path: '/team' },
          { icon: BarChart3, label: 'Analytics', path: '/analytics' },
          { icon: FileText, label: 'Forms', path: '/forms' },
          { icon: Settings, label: 'Settings', path: '/settings' }
        ];
      case 'agent':
        return [
          { icon: Home, label: 'Dashboard', path: '/' },
          { 
            icon: Target, 
            label: 'My Leads', 
            path: '/leads',
            subItems: [
              { icon: Eye, label: 'View All', path: '/leads' }
            ]
          },
          { icon: BarChart3, label: 'Performance', path: '/performance' },
          { icon: Settings, label: 'Settings', path: '/settings' }
        ];
      case 'counselor':
        return [
          { icon: Home, label: 'Dashboard', path: '/' },
          { 
            icon: Target, 
            label: 'Leads', 
            path: '/leads',
            subItems: [
              { icon: Eye, label: 'View All', path: '/leads' }
            ]
          },
          { icon: Calendar, label: 'Follow-ups', path: '/followups' },
          { icon: Phone, label: 'Calls', path: '/calls' },
          { icon: BarChart3, label: 'Performance', path: '/performance' }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const isActiveRoute = (path) => {
    if (path === '/leads') {
      return location.pathname.startsWith('/leads');
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">LeadFlow</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                    isActiveRoute(item.path) ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
                
                {/* Sub-items for leads */}
                {item.subItems && isActiveRoute(item.path) && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <subItem.icon className="w-4 h-4 mr-2" />
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={user?.profileImage || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900 ml-4 lg:ml-0">{title}</h1>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
                  <Bell className="w-5 h-5" />
                </button>
                <Link 
                  to="/settings"
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full"
                >
                  <Settings className="w-5 h-5" />
                </Link>
                <div className="flex items-center space-x-2">
                  <img
                    src={user?.profileImage || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;