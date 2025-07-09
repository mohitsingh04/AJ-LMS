import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Edit,
    Phone,
    Mail,
    Calendar,
    MapPin,
    Star,
    Clock,
    User,
    Building,
    DollarSign,
    MessageSquare,
    FileText,
    History,
    UserCheck,
    Thermometer,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import DashboardLayout from '../../layout/DashboardLayout'

function ViewLead() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('details');

    // Mock lead data - in real app, fetch based on ID
    const lead = {
        id: id,
        name: 'Sarah Johnson - 💥BOOM',
        email: 'sarah@example.com',
        phone: '+1 (555) 123-4567',
        course: 'MBA',
        status: 'hot',
        score: 95,
        source: 'Google Ads',
        assignedTo: 'Michael Brown',
        createdAt: '2024-01-20T10:30:00Z',
        lastContact: '2024-01-20T14:30:00Z',
        nextFollowUp: '2024-01-21T10:00:00Z',
        location: 'New York, NY',
        budget: 50000,
        educationLevel: 'Bachelor\'s Degree',
        workExperience: '5 years',
        company: 'Tech Corp Inc.',
        notes: 'Very interested, ready to enroll. Needs scholarship information.',
        tags: ['High Priority', 'Scholarship', 'Working Professional']
    };

    const activities = [
        {
            id: '1',
            type: 'call',
            title: 'Phone Call',
            description: 'Discussed MBA program details and scholarship options',
            timestamp: '2024-01-20T14:30:00Z',
            duration: '15 minutes',
            user: 'Michael Brown'
        },
        {
            id: '2',
            type: 'email',
            title: 'Email Sent',
            description: 'Sent program brochure and application form',
            timestamp: '2024-01-20T11:15:00Z',
            user: 'Michael Brown'
        },
        {
            id: '3',
            type: 'note',
            title: 'Note Added',
            description: 'Lead is very interested in evening MBA program',
            timestamp: '2024-01-20T10:45:00Z',
            user: 'Michael Brown'
        },
        {
            id: '4',
            type: 'status',
            title: 'Status Changed',
            description: 'Status updated from Warm to Hot',
            timestamp: '2024-01-20T10:30:00Z',
            user: 'System'
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

    const getActivityIcon = (type) => {
        switch (type) {
            case 'call':
                return <Phone className="w-4 h-4 text-green-600" />;
            case 'email':
                return <Mail className="w-4 h-4 text-blue-600" />;
            case 'note':
                return <FileText className="w-4 h-4 text-purple-600" />;
            case 'status':
                return <History className="w-4 h-4 text-orange-600" />;
            default:
                return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/leads"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
                            <p className="text-gray-600">Lead ID: #{lead.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link
                            to={`/leads/edit/${lead.id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Lead
                        </Link>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Now
                        </button>
                    </div>
                </div>

                {/* Lead Summary Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-bold text-xl">
                                        {lead.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h2 className="text-xl font-semibold text-gray-900">{lead.name}</h2>
                                        <div className="flex items-center">
                                            {getStatusIcon(lead.status)}
                                            <span className={`ml-1 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(lead.status)}`}>
                                                {lead.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                            <span className="text-sm font-medium text-gray-900">{lead.score}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <Mail className="w-4 h-4 mr-2" />
                                            {lead.email}
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="w-4 h-4 mr-2" />
                                            {lead.phone}
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {lead.location}
                                        </div>
                                        <div className="flex items-center">
                                            <Building className="w-4 h-4 mr-2" />
                                            {lead.company}
                                        </div>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {lead.tags.map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h3>
                                <div className="space-y-2">
                                    <button className="w-full flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                        <Phone className="w-4 h-4 mr-2" />
                                        Call Lead
                                    </button>
                                    <button className="w-full flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Send Email
                                    </button>
                                    <button className="w-full flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Schedule Follow-up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'details'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Details
                        </button>
                        <button
                            onClick={() => setActiveTab('activity')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'activity'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Activity
                        </button>
                        <button
                            onClick={() => setActiveTab('notes')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'notes'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Notes
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'details' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Information</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Course Interest</label>
                                        <p className="mt-1 text-sm text-gray-900">{lead.course}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Lead Source</label>
                                        <p className="mt-1 text-sm text-gray-900">{lead.source}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Education Level</label>
                                        <p className="mt-1 text-sm text-gray-900">{lead.educationLevel}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Work Experience</label>
                                        <p className="mt-1 text-sm text-gray-900">{lead.workExperience}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Budget</label>
                                        <p className="mt-1 text-sm text-gray-900">${lead.budget.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                                        <p className="mt-1 text-sm text-gray-900">{lead.assignedTo}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                                    <p className="mt-1 text-sm text-gray-900">{lead.notes}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Created</span>
                                    <span className="text-sm text-gray-900">{formatDate(lead.createdAt)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Last Contact</span>
                                    <span className="text-sm text-gray-900">{formatDate(lead.lastContact)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Next Follow-up</span>
                                    <span className="text-sm text-gray-900">{formatDate(lead.nextFollowUp)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
                        <div className="space-y-4">
                            {activities.map((activity) => (
                                <div key={activity.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                                            <span className="text-xs text-gray-500">{formatDate(activity.timestamp)}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                            <span>By {activity.user}</span>
                                            {activity.duration && <span>Duration: {activity.duration}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'notes' && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Add Note
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-900">Michael Brown</span>
                                    <span className="text-xs text-gray-500">2 hours ago</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Had a great conversation with Sarah. She's very interested in the evening MBA program
                                    and is looking for scholarship opportunities. She mentioned she has 5 years of experience
                                    in marketing and wants to transition to a leadership role.
                                </p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-900">Michael Brown</span>
                                    <span className="text-xs text-gray-500">1 day ago</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Initial contact made. Lead came through Google Ads campaign. Very responsive and
                                    asked detailed questions about curriculum and admission requirements.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default ViewLead
