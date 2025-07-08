import React, { useState } from 'react';
import Layout from '../common/Layout';
import { 
  Plus, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';

const FollowUpsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const followUps = [
    {
      id: '1',
      leadName: 'Sarah Johnson',
      leadEmail: 'sarah@example.com',
      type: 'Call',
      scheduledAt: '2024-01-21T10:00:00Z',
      status: 'pending',
      priority: 'high',
      notes: 'Discuss scholarship options and enrollment process',
      course: 'MBA'
    },
    {
      id: '2',
      leadName: 'David Wilson',
      leadEmail: 'david@example.com',
      type: 'Email',
      scheduledAt: '2024-01-22T14:00:00Z',
      status: 'pending',
      priority: 'medium',
      notes: 'Send comparison document and campus tour invitation',
      course: 'Computer Science'
    },
    {
      id: '3',
      leadName: 'Lisa Chen',
      leadEmail: 'lisa@example.com',
      type: 'WhatsApp',
      scheduledAt: '2024-01-25T09:00:00Z',
      status: 'pending',
      priority: 'low',
      notes: 'Follow up on career prospects discussion',
      course: 'Marketing'
    },
    {
      id: '4',
      leadName: 'John Smith',
      leadEmail: 'john@example.com',
      type: 'Call',
      scheduledAt: '2024-01-20T15:00:00Z',
      status: 'completed',
      priority: 'high',
      notes: 'Enrollment completed successfully',
      course: 'Data Science'
    }
  ];

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Call':
        return <Phone className="w-4 h-4" />;
      case 'Email':
        return <Mail className="w-4 h-4" />;
      case 'WhatsApp':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
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

  const filteredFollowUps = followUps.filter(followUp => {
    if (activeTab === 'pending') return followUp.status === 'pending';
    if (activeTab === 'completed') return followUp.status === 'completed';
    if (activeTab === 'overdue') return followUp.status === 'overdue';
    return true;
  });

  return (
    <Layout title="Follow-ups">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Follow-ups</h1>
            <p className="text-gray-600">Manage your scheduled follow-ups and reminders</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Follow-up
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending ({followUps.filter(f => f.status === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed ({followUps.filter(f => f.status === 'completed').length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All ({followUps.length})
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
                placeholder="Search follow-ups..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">All Types</option>
              <option value="call">Calls</option>
              <option value="email">Emails</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Follow-ups List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-200">
            {filteredFollowUps.map((followUp) => (
              <div key={followUp.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {getTypeIcon(followUp.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">{followUp.leadName}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(followUp.priority)}`}>
                          {followUp.priority}
                        </span>
                        <div className="flex items-center">
                          {getStatusIcon(followUp.status)}
                          <span className="ml-1 text-sm text-gray-500 capitalize">{followUp.status}</span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <span>{followUp.leadEmail}</span>
                        <span>{followUp.course}</span>
                        <span>{followUp.type}</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">{followUp.notes}</p>
                      </div>
                      <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Scheduled: {formatDate(followUp.scheduledAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {followUp.status === 'pending' && (
                      <>
                        <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Complete
                        </button>
                        <button className="bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                          Reschedule
                        </button>
                      </>
                    )}
                    {followUp.status === 'completed' && (
                      <span className="text-green-600 text-sm font-medium">✓ Completed</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Phone className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Schedule Call</span>
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Mail className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Send Email</span>
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <MessageSquare className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">WhatsApp Message</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FollowUpsPage;