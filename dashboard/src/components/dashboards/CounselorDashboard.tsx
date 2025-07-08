import React, { useState } from 'react';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';
import Chart from '../common/Chart';
import { 
  Target, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Plus, 
  Search,
  Filter,
  Phone,
  Mail,
  MessageSquare,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Thermometer,
  Star
} from 'lucide-react';

const CounselorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Assigned Leads',
      value: '45',
      icon: Target,
      trend: { value: 8, isPositive: true },
      color: 'blue' as const
    },
    {
      title: 'Pending Follow-ups',
      value: '12',
      icon: Calendar,
      trend: { value: 3, isPositive: false },
      color: 'orange' as const
    },
    {
      title: 'Conversions',
      value: '18',
      icon: TrendingUp,
      trend: { value: 15, isPositive: true },
      color: 'green' as const
    },
    {
      title: 'Response Time',
      value: '2.4h',
      icon: Clock,
      trend: { value: 12, isPositive: true },
      color: 'purple' as const
    }
  ];

  const statusData = [
    { name: 'Hot', value: 8, color: '#EF4444' },
    { name: 'Warm', value: 15, color: '#F59E0B' },
    { name: 'Cold', value: 12, color: '#3B82F6' },
    { name: 'Converted', value: 18, color: '#10B981' }
  ];

  const activityData = [
    { name: 'Mon', value: 3 },
    { name: 'Tue', value: 5 },
    { name: 'Wed', value: 4 },
    { name: 'Thu', value: 7 },
    { name: 'Fri', value: 6 },
    { name: 'Sat', value: 2 },
    { name: 'Sun', value: 1 }
  ];

  const myLeads = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 123-4567',
      course: 'MBA',
      status: 'hot',
      score: 95,
      lastContact: '2024-01-20T14:30:00Z',
      nextFollowUp: '2024-01-21T10:00:00Z',
      notes: 'Very interested, ready to enroll. Needs scholarship information.'
    },
    {
      id: '2',
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '+1 (555) 987-6543',
      course: 'Computer Science',
      status: 'warm',
      score: 78,
      lastContact: '2024-01-19T16:45:00Z',
      nextFollowUp: '2024-01-22T14:00:00Z',
      notes: 'Interested but comparing with other schools. Follow up needed.'
    },
    {
      id: '3',
      name: 'Lisa Chen',
      email: 'lisa@example.com',
      phone: '+1 (555) 456-7890',
      course: 'Marketing',
      status: 'cold',
      score: 45,
      lastContact: '2024-01-18T11:30:00Z',
      nextFollowUp: '2024-01-25T09:00:00Z',
      notes: 'Not ready to commit. Needs more information about career prospects.'
    }
  ];

  const followUps = [
    {
      id: '1',
      leadName: 'Sarah Johnson',
      type: 'Call',
      scheduledAt: '2024-01-21T10:00:00Z',
      status: 'pending',
      priority: 'high',
      notes: 'Discuss scholarship options and enrollment process'
    },
    {
      id: '2',
      leadName: 'David Wilson',
      type: 'Email',
      scheduledAt: '2024-01-22T14:00:00Z',
      status: 'pending',
      priority: 'medium',
      notes: 'Send comparison document and campus tour invitation'
    },
    {
      id: '3',
      leadName: 'Lisa Chen',
      type: 'Call',
      scheduledAt: '2024-01-25T09:00:00Z',
      status: 'pending',
      priority: 'low',
      notes: 'Follow up on career prospects discussion'
    }
  ];

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout title="Counselor Dashboard">
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
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'leads'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Leads
            </button>
            <button
              onClick={() => setActiveTab('followups')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'followups'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Follow-ups
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Chart
              title="Lead Status Distribution"
              data={statusData}
              type="pie"
            />
            <Chart
              title="Weekly Activity"
              data={activityData}
              type="bar"
            />
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">My Leads</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Call
                </button>
              </div>
              <div className="mt-4 flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {myLeads.map((lead) => (
                <div key={lead.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-medium text-gray-900">{lead.name}</h3>
                          <div className="flex items-center">
                            {getStatusIcon(lead.status)}
                            <span className={`ml-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                              {lead.status}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-900">{lead.score}</span>
                          </div>
                        </div>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <span>{lead.email}</span>
                          <span>{lead.phone}</span>
                          <span>{lead.course}</span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">{lead.notes}</p>
                        </div>
                        <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                          <span>Last contact: {formatDate(lead.lastContact)}</span>
                          <span>Next follow-up: {formatDate(lead.nextFollowUp)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'followups' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Scheduled Follow-ups</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule New
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {followUps.map((followUp) => (
                <div key={followUp.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-medium text-gray-900">{followUp.leadName}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(followUp.priority)}`}>
                            {followUp.priority}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <span>{followUp.type}</span>
                          <span>{formatDate(followUp.scheduledAt)}</span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">{followUp.notes}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Complete
                      </button>
                      <button className="bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CounselorDashboard;