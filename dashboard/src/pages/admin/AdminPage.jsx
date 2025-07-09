import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    AlertCircle,
    DollarSign,
    Users,
    Target
} from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout'

function AdminPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const admins = [
        {
            id: '1',
            name: 'John Smith',
            email: 'john@school.com',
            organization: 'Springfield University',
            plan: 'Pro',
            status: 'active',
            revenue: 2490,
            leads: 156,
            teamMembers: 8,
            joinDate: '2024-01-15',
            lastActive: '2024-01-20T14:30:00Z',
            domain: 'springfield.leadflow.com'
        },
        {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah@college.edu',
            organization: 'Metro College',
            plan: 'Enterprise',
            status: 'active',
            revenue: 4890,
            leads: 289,
            teamMembers: 15,
            joinDate: '2024-02-01',
            lastActive: '2024-01-20T16:45:00Z',
            domain: 'metro.leadflow.com'
        },
        {
            id: '3',
            name: 'Michael Brown',
            email: 'mike@university.edu',
            organization: 'Tech University',
            plan: 'Basic',
            status: 'suspended',
            revenue: 890,
            leads: 67,
            teamMembers: 3,
            joinDate: '2024-03-10',
            lastActive: '2024-01-18T09:20:00Z',
            domain: 'tech.leadflow.com'
        },
        {
            id: '4',
            name: 'Emily Davis',
            email: 'emily@academy.com',
            organization: 'Business Academy',
            plan: 'Pro',
            status: 'trial',
            revenue: 0,
            leads: 23,
            teamMembers: 2,
            joinDate: '2024-01-18',
            lastActive: '2024-01-20T11:15:00Z',
            domain: 'business.leadflow.com'
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'suspended':
                return <XCircle className="w-5 h-5 text-red-500" />;
            case 'trial':
                return <AlertCircle className="w-5 h-5 text-yellow-500" />;
            default:
                return <AlertCircle className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'suspended':
                return 'bg-red-100 text-red-800';
            case 'trial':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPlanColor = (plan) => {
        switch (plan) {
            case 'Basic':
                return 'bg-gray-100 text-gray-800';
            case 'Pro':
                return 'bg-blue-100 text-blue-800';
            case 'Enterprise':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredAdmins = admins.filter(admin => {
        const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.organization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || admin.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
                        <p className="text-gray-600">Manage all admin accounts and their organizations</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Admin
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Admins</p>
                                <p className="text-2xl font-bold text-gray-900">{admins.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {admins.filter(a => a.status === 'active').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <DollarSign className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${admins.reduce((sum, admin) => sum + admin.revenue, 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Target className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {admins.reduce((sum, admin) => sum + admin.leads, 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search admins..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="trial">Trial</option>
                            <option value="suspended">Suspended</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="all">All Plans</option>
                            <option value="basic">Basic</option>
                            <option value="pro">Pro</option>
                            <option value="enterprise">Enterprise</option>
                        </select>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Admins Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Admin
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Organization
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
                                        Team
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAdmins.map((admin) => (
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
                                                    <div className="text-xs text-gray-400">{admin.domain}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {admin.organization}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPlanColor(admin.plan)}`}>
                                                {admin.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getStatusIcon(admin.status)}
                                                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(admin.status)}`}>
                                                    {admin.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${admin.revenue.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {admin.leads}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {admin.teamMembers}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-1 hover:bg-gray-100 rounded" title="View Details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded" title="More">
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

                {/* Pagination */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAdmins.length}</span> of{' '}
                            <span className="font-medium">{admins.length}</span> results
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                                Previous
                            </button>
                            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                                1
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminPage
