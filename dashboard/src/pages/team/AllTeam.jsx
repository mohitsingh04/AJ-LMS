import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    Edit,
    Trash2,
    UserPlus,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout'

function AllTeam() {
    const [activeTab, setActiveTab] = useState('counselors');

    const counselors = [
        {
            id: '1',
            name: 'Michael Brown',
            email: 'michael@school.com',
            phone: '+1 (555) 234-5678',
            role: 'Senior Counselor',
            status: 'active',
            leadsAssigned: 45,
            leadsConverted: 18,
            conversionRate: 40,
            joinDate: '2024-01-15',
            lastActive: '2024-01-20T14:30:00Z'
        },
        {
            id: '2',
            name: 'Emma Davis',
            email: 'emma@school.com',
            phone: '+1 (555) 345-6789',
            role: 'Counselor',
            status: 'active',
            leadsAssigned: 32,
            leadsConverted: 12,
            conversionRate: 37.5,
            joinDate: '2024-02-01',
            lastActive: '2024-01-20T16:45:00Z'
        },
        {
            id: '3',
            name: 'James Wilson',
            email: 'james@school.com',
            phone: '+1 (555) 456-7890',
            role: 'Junior Counselor',
            status: 'busy',
            leadsAssigned: 28,
            leadsConverted: 8,
            conversionRate: 28.6,
            joinDate: '2024-03-10',
            lastActive: '2024-01-20T12:15:00Z'
        }
    ];

    const agents = [
        {
            id: '1',
            name: 'Sarah Johnson',
            email: 'sarah@agent.com',
            phone: '+1 (555) 567-8901',
            referralCode: 'AG001',
            status: 'active',
            totalReferrals: 89,
            convertedReferrals: 32,
            conversionRate: 36.0,
            totalEarnings: 2840,
            joinDate: '2024-01-20'
        },
        {
            id: '2',
            name: 'David Martinez',
            email: 'david@agent.com',
            phone: '+1 (555) 678-9012',
            referralCode: 'AG002',
            status: 'active',
            totalReferrals: 67,
            convertedReferrals: 24,
            conversionRate: 35.8,
            totalEarnings: 2160,
            joinDate: '2024-02-05'
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'busy':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'inactive':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Clock className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'busy':
                return 'bg-yellow-100 text-yellow-800';
            case 'inactive':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
                        <p className="text-gray-600">Manage your counselors and agents</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Boom
                    </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('counselors')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'counselors'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Counselors ({counselors.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('agents')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'agents'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Agents ({agents.length})
                        </button>
                    </nav>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="busy">Busy</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'counselors' && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Counselor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Assigned
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Converted
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rate
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {counselors.map((counselor) => (
                                        <tr key={counselor.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                        <span className="text-green-600 font-medium">
                                                            {counselor.name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{counselor.name}</div>
                                                        <div className="text-sm text-gray-500">{counselor.email}</div>
                                                        <div className="text-sm text-gray-500">{counselor.phone}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {counselor.role}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getStatusIcon(counselor.status)}
                                                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(counselor.status)}`}>
                                                        {counselor.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {counselor.leadsAssigned}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {counselor.leadsConverted}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                        <div
                                                            className="h-2 bg-green-500 rounded-full"
                                                            style={{ width: `${counselor.conversionRate}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-gray-900">{counselor.conversionRate}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Email">
                                                        <Mail className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Call">
                                                        <Phone className="w-4 h-4" />
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
                )}

                {activeTab === 'agents' && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Agent
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Referral Code
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Referrals
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Converted
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Earnings
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {agents.map((agent) => (
                                        <tr key={agent.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                        <span className="text-purple-600 font-medium">
                                                            {agent.name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                                                        <div className="text-sm text-gray-500">{agent.email}</div>
                                                        <div className="text-sm text-gray-500">{agent.phone}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                    {agent.referralCode}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getStatusIcon(agent.status)}
                                                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}>
                                                        {agent.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {agent.totalReferrals}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {agent.convertedReferrals}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${agent.totalEarnings.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Email">
                                                        <Mail className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-100 rounded" title="Call">
                                                        <Phone className="w-4 h-4" />
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
                )}
            </div>
        </DashboardLayout>
    )
}

export default AllTeam
