import React, { useState } from 'react';
import Layout from '../common/Layout';
import { 
  Phone, 
  PhoneCall, 
  PhoneIncoming, 
  PhoneOutgoing, 
  Clock, 
  Calendar,
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  Download
} from 'lucide-react';

const CallsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const calls = [
    {
      id: '1',
      leadName: 'Sarah Johnson',
      leadEmail: 'sarah@example.com',
      type: 'outgoing',
      duration: '15:32',
      status: 'completed',
      scheduledAt: '2024-01-20T10:00:00Z',
      completedAt: '2024-01-20T10:15:32Z',
      notes: 'Discussed MBA program details and scholarship options. Very interested.',
      recording: true,
      course: 'MBA'
    },
    {
      id: '2',
      leadName: 'David Wilson',
      leadEmail: 'david@example.com',
      type: 'incoming',
      duration: '8:45',
      status: 'completed',
      scheduledAt: '2024-01-19T14:30:00Z',
      completedAt: '2024-01-19T14:38:45Z',
      notes: 'Asked about Computer Science curriculum and job placement rates.',
      recording: true,
      course: 'Computer Science'
    },
    {
      id: '3',
      leadName: 'Lisa Chen',
      leadEmail: 'lisa@example.com',
      type: 'outgoing',
      duration: null,
      status: 'missed',
      scheduledAt: '2024-01-18T16:00:00Z',
      completedAt: null,
      notes: 'No answer. Left voicemail about Marketing program.',
      recording: false,
      course: 'Marketing'
    },
    {
      id: '4',
      leadName: 'Michael Brown',
      leadEmail: 'michael@example.com',
      type: 'scheduled',
      duration: null,
      status: 'scheduled',
      scheduledAt: '2024-01-22T11:00:00Z',
      completedAt: null,
      notes: 'Follow-up call to discuss Data Science program requirements.',
      recording: false,
      course: 'Data Science'
    }
  ];

  const getCallTypeIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return <PhoneIncoming className="w-4 h-4 text-green-600" />;
      case 'outgoing':
        return <PhoneOutgoing className="w-4 h-4 text-blue-600" />;
      case 'scheduled':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      default:
        return <Phone className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
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

  const filteredCalls = calls.filter(call => {
    if (activeTab === 'completed') return call.status === 'completed';
    if (activeTab === 'scheduled') return call.status === 'scheduled';
    if (activeTab === 'missed') return call.status === 'missed';
    return true;
  });

  return (
    <Layout title="Calls">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Call Management</h1>
            <p className="text-gray-600">Track and manage all your calls with leads</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Call
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <PhoneCall className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Calls</p>
                <p className="text-2xl font-bold text-gray-900">{calls.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <PhoneCall className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {calls.filter(c => c.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {calls.filter(c => c.status === 'scheduled').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold text-gray-900">12:08</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Calls ({calls.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed ({calls.filter(c => c.status === 'completed').length})
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scheduled'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Scheduled ({calls.filter(c => c.status === 'scheduled').length})
            </button>
            <button
              onClick={() => setActiveTab('missed')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'missed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Missed ({calls.filter(c => c.status === 'missed').length})
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
                placeholder="Search calls..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">All Types</option>
              <option value="incoming">Incoming</option>
              <option value="outgoing">Outgoing</option>
              <option value="scheduled">Scheduled</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Calls List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-200">
            {filteredCalls.map((call) => (
              <div key={call.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {getCallTypeIcon(call.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">{call.leadName}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(call.status)}`}>
                          {call.status}
                        </span>
                        {call.duration && (
                          <span className="text-sm text-gray-500">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {call.duration}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <span>{call.leadEmail}</span>
                        <span>{call.course}</span>
                        <span className="capitalize">{call.type} call</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">{call.notes}</p>
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>Scheduled: {formatDate(call.scheduledAt)}</span>
                        {call.completedAt && (
                          <span>Completed: {formatDate(call.completedAt)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {call.recording && call.status === 'completed' && (
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg" title="Play Recording">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg" title="Download Recording">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {call.status === 'scheduled' && (
                      <div className="flex items-center space-x-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Start Call
                        </button>
                        <button className="bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                          Reschedule
                        </button>
                      </div>
                    )}
                    {call.status === 'missed' && (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Call Back
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CallsPage;