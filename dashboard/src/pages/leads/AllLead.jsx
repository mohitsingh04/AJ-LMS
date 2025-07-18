import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Phone,
    Mail,
    Calendar,
    Star,
    AlertCircle,
    CheckCircle,
    Clock,
    Thermometer,
    Edit,
    Eye,
    UserCheck,
    History,
    Download,
    Upload
} from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout'

function AllLead() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedLeads, setSelectedLeads] = useState([]);

    const leads = [
        {
            id: '1',
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '+1 (555) 123-4567',
            course: 'MBA',
            status: 'hot',
            score: 95,
            source: 'Google Ads',
            assignedTo: 'Michael Brown',
            createdAt: '2024-01-20T10:30:00Z',
            lastContact: '2024-01-20T14:30:00Z',
            notes: 'Very interested, ready to enroll. Needs scholarship information.',
            location: 'New York, NY',
            budget: 50000
        },
        {
            id: '2',
            name: 'David Wilson',
            email: 'david@example.com',
            phone: '+1 (555) 987-6543',
            course: 'Computer Science',
            status: 'warm',
            score: 78,
            source: 'Facebook',
            assignedTo: 'Emma Davis',
            createdAt: '2024-01-20T09:15:00Z',
            lastContact: '2024-01-19T16:45:00Z',
            notes: 'Interested but comparing with other schools. Follow up needed.',
            location: 'California',
            budget: 35000
        },
        {
            id: '3',
            name: 'Lisa Chen',
            email: 'lisa@example.com',
            phone: '+1 (555) 456-7890',
            course: 'Marketing',
            status: 'cold',
            score: 45,
            source: 'Website',
            assignedTo: 'Michael Brown',
            createdAt: '2024-01-19T16:20:00Z',
            lastContact: '2024-01-18T11:30:00Z',
            notes: 'Not ready to commit. Needs more information about career prospects.',
            location: 'Texas',
            budget: 25000
        },
        {
            id: '4',
            name: 'John Smith',
            email: 'john@example.com',
            phone: '+1 (555) 321-0987',
            course: 'Data Science',
            status: 'converted',
            score: 100,
            source: 'Referral',
            assignedTo: 'Emma Davis',
            createdAt: '2024-01-18T14:45:00Z',
            lastContact: '2024-01-19T10:15:00Z',
            notes: 'Successfully enrolled. Payment completed.',
            location: 'Florida',
            budget: 45000
        },
        {
            id: '5',
            name: 'Maria Garcia',
            email: 'maria@example.com',
            phone: '+1 (555) 654-3210',
            course: 'Business Administration',
            status: 'warm',
            score: 82,
            source: 'LinkedIn',
            assignedTo: 'James Wilson',
            createdAt: '2024-01-17T11:20:00Z',
            lastContact: '2024-01-18T15:30:00Z',
            notes: 'Interested in part-time program. Working professional.',
            location: 'Illinois',
            budget: 40000
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'hot':
                return 'bg-red-100 text-red-800';
            case 'warm':
                return 'bg-yellow-100 text-yellow-800';
            case 'cold':
                return 'bg-blue-100 text-blue-800';
            case 'converted':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'hot':
                return <Thermometer className="w-4 h-4 text-red-500" />;
            case 'warm':
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'cold':
                return <AlertCircle className="w-4 h-4 text-blue-500" />;
            case 'converted':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            default:
                return <AlertCircle className="w-4 h-4 text-gray-500" />;
        }
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.course.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleSelectLead = (leadId) => {
        setSelectedLeads(prev =>
            prev.includes(leadId)
                ? prev.filter(id => id !== leadId)
                : [...prev, leadId]
        );
    };

    const handleSelectAll = () => {
        setSelectedLeads(
            selectedLeads.length === filteredLeads.length
                ? []
                : filteredLeads.map(lead => lead.id)
        );
    };

    const bulkActions = [
        { label: 'Assign to Counselor', action: 'assign' },
        { label: 'Update Status', action: 'status' },
        { label: 'Send Email', action: 'email' },
        { label: 'Export Selected', action: 'export' },
        { label: 'Delete', action: 'delete' }
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Leads - 💥BOOM</h1>
                        <p className="text-gray-600">Manage and track all your leads</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                            <Upload className="w-4 h-4 mr-2" />
                            Import
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </button>
                        <Link
                            to="/leads/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Lead
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Star className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                                <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Thermometer className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Hot Leads</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {leads.filter(l => l.status === 'hot').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Converted</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {leads.filter(l => l.status === 'converted').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Star className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length)}
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
                                placeholder="Search leads..."
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
                            <option value="hot">Hot</option>
                            <option value="warm">Warm</option>
                            <option value="cold">Cold</option>
                            <option value="converted">Converted</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="all">All Courses</option>
                            <option value="mba">MBA</option>
                            <option value="cs">Computer Science</option>
                            <option value="marketing">Marketing</option>
                            <option value="data-science">Data Science</option>
                        </select>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <Filter className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedLeads.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-blue-900">
                                    {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
                                </span>
                                <select className="px-3 py-1 border border-blue-300 rounded text-sm bg-white">
                                    <option value="">Bulk Actions</option>
                                    {bulkActions.map(action => (
                                        <option key={action.action} value={action.action}>
                                            {action.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={() => setSelectedLeads([])}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                )}

                {/* Leads Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                                            onChange={handleSelectAll}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lead
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Course
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Score
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Source
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Assigned To
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedLeads.includes(lead.id)}
                                                onChange={() => handleSelectLead(lead.id)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-medium">
                                                        {lead.name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                                                    <div className="text-sm text-gray-500">{lead.email}</div>
                                                    <div className="text-sm text-gray-500">{lead.phone}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {lead.course}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getStatusIcon(lead.status)}
                                                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                                                    {lead.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                                <span className="text-sm text-gray-900">{lead.score}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {lead.source}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {lead.assignedTo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    to={`/leads/view/${lead.id}`}
                                                    className="p-1 hover:bg-gray-100 rounded"
                                                    title="View Lead"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    to={`/leads/edit/${lead.id}`}
                                                    className="p-1 hover:bg-gray-100 rounded"
                                                    title="Edit Lead"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    to={`/leads/assign/${lead.id}`}
                                                    className="p-1 hover:bg-gray-100 rounded"
                                                    title="Assign Lead"
                                                >
                                                    <UserCheck className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    to={`/leads/history/${lead.id}`}
                                                    className="p-1 hover:bg-gray-100 rounded"
                                                    title="View History"
                                                >
                                                    <History className="w-4 h-4" />
                                                </Link>
                                                <button className="p-1 hover:bg-gray-100 rounded" title="Call">
                                                    <Phone className="w-4 h-4" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded" title="Email">
                                                    <Mail className="w-4 h-4" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded" title="Schedule">
                                                    <Calendar className="w-4 h-4" />
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
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredLeads.length}</span> of{' '}
                            <span className="font-medium">{leads.length}</span> results
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

export default AllLead
