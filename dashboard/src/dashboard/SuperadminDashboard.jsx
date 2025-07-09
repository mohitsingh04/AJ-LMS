import React, { useState } from 'react';
import Layout from '../components/common/Layout.jsx';
import StatCard from '../components/common/StatCard.jsx';
import Chart from '../components/common/Chart.jsx';
import {
    Users,
    DollarSign,
    TrendingUp,
    Shield,
    Plus,
    Search,
    Filter,
    MoreVertical,
    CheckCircle,
    XCircle,
    AlertCircle,
    Eye
} from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout.jsx';

function SuperadminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        {
            title: 'Total Admins',
            value: '156',
            icon: Users,
            trend: { value: 12, isPositive: true },
            color: 'blue'
        },
        {
            title: 'Monthly Revenue',
            value: '$24,890',
            icon: DollarSign,
            trend: { value: 8, isPositive: true },
            color: 'green'
        },
        {
            title: 'Active Subscriptions',
            value: '142',
            icon: TrendingUp,
            trend: { value: 5, isPositive: true },
            color: 'purple'
        },
        {
            title: 'System Health',
            value: '99.9%',
            icon: Shield,
            trend: { value: 0.1, isPositive: true },
            color: 'orange'
        }
    ];

    const revenueData = [
        { name: 'Jan', value: 18500 },
        { name: 'Feb', value: 22100 },
        { name: 'Mar', value: 19800 },
        { name: 'Apr', value: 24200 },
        { name: 'May', value: 21900 },
        { name: 'Jun', value: 24890 }
    ];

    const subscriptionData = [
        { name: 'Basic', value: 45, color: '#3B82F6' },
        { name: 'Pro', value: 78, color: '#10B981' },
        { name: 'Enterprise', value: 19, color: '#F59E0B' },
        { name: 'Trial', value: 14, color: '#EF4444' }
    ];

    const admins = [
        {
            id: '1',
            name: 'John Smith',
            email: 'john@school.com',
            plan: 'Pro',
            status: 'active',
            revenue: '$2,490',
            leads: 156,
            joinDate: '2024-01-15'
        },
        {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah@college.edu',
            plan: 'Enterprise',
            status: 'active',
            revenue: '$4,890',
            leads: 289,
            joinDate: '2024-02-01'
        },
        {
            id: '3',
            name: 'Michael Brown',
            email: 'mike@university.edu',
            plan: 'Basic',
            status: 'suspended',
            revenue: '$890',
            leads: 67,
            joinDate: '2024-03-10'
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'suspended':
                return <XCircle className="w-5 h-5 text-red-500" />;
            case 'pending':
                return <AlertCircle className="w-5 h-5 text-yellow-500" />;
            default:
                return <AlertCircle className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('admins')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'admins'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Admins
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Analytics
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Chart
                            title="Monthly Revenue Trend"
                            data={revenueData}
                            type="bar"
                        />
                        <Chart
                            title="Subscription Distribution"
                            data={subscriptionData}
                            type="pie"
                        />
                    </div>
                )}

                {activeTab === 'admins' && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">Admin Management</h2>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Admin
                                </button>
                            </div>
                            <div className="mt-4 flex items-center space-x-4">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search admins..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Filter className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Admin
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Plan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Revenue
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Leads
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {admins.map((admin) => (
                                        <tr key={admin.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <span className="text-blue-600 font-medium">
                                                            {admin.name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                                                        <div className="text-sm text-gray-500">{admin.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                    {admin.plan}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getStatusIcon(admin.status)}
                                                    <span className="ml-2 text-sm text-gray-900 capitalize">{admin.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {admin.revenue}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {admin.leads}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-1 hover:bg-gray-100 rounded">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Server Uptime</span>
                                    <span className="text-sm font-medium text-green-600">99.9%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Database Performance</span>
                                    <span className="text-sm font-medium text-green-600">Excellent</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">API Response Time</span>
                                    <span className="text-sm font-medium text-green-600">120ms</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Active Users</span>
                                    <span className="text-sm font-medium text-blue-600">1,247</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="flex-1 text-sm text-gray-600">
                                        New admin registration: <span className="font-medium">tech@newschool.edu</span>
                                    </div>
                                    <span className="text-xs text-gray-500">2m ago</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1 text-sm text-gray-600">
                                        Payment processed: <span className="font-medium">$199.00</span>
                                    </div>
                                    <span className="text-xs text-gray-500">5m ago</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <div className="flex-1 text-sm text-gray-600">
                                        Subscription expired: <span className="font-medium">demo@college.edu</span>
                                    </div>
                                    <span className="text-xs text-gray-500">1h ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default SuperadminDashboard
