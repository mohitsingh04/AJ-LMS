import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Star,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';

const LeadAssign = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [assignmentNotes, setAssignmentNotes] = useState('');

  // Mock lead data
  const lead = {
    id: id,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    course: 'MBA',
    status: 'hot',
    score: 95,
    currentAssignee: 'Michael Brown'
  };

  // Mock counselor data with performance metrics
  const counselors = [
    {
      id: '1',
      name: 'Michael Brown',
      role: 'Senior Counselor',
      currentLeads: 45,
      conversionRate: 40,
      avgResponseTime: '2.1h',
      specialties: ['MBA', 'Business Administration'],
      availability: 'Available',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Emma Davis',
      role: 'Counselor',
      currentLeads: 32,
      conversionRate: 37.5,
      avgResponseTime: '1.8h',
      specialties: ['Computer Science', 'Data Science'],
      availability: 'Available',
      rating: 4.6
    },
    {
      id: '3',
      name: 'James Wilson',
      role: 'Junior Counselor',
      currentLeads: 28,
      conversionRate: 28.6,
      avgResponseTime: '3.2h',
      specialties: ['Marketing', 'Business Administration'],
      availability: 'Busy',
      rating: 4.3
    },
    {
      id: '4',
      name: 'Lisa Chen',
      role: 'Senior Counselor',
      currentLeads: 38,
      conversionRate: 42.1,
      avgResponseTime: '1.5h',
      specialties: ['MBA', 'Marketing', 'Data Science'],
      availability: 'Available',
      rating: 4.9
    }
  ];

  const handleAssign = (e) => {
    e.preventDefault();
    if (!selectedCounselor) return;
    
    // In real app, submit to API
    console.log('Assigning lead:', {
      leadId: id,
      counselorId: selectedCounselor,
      notes: assignmentNotes
    });
    
    navigate(`/leads/view/${id}`);
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'Unavailable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecommendationScore = (counselor) => {
    let score = 0;
    
    // Specialty match
    if (counselor.specialties.includes(lead.course)) score += 30;
    
    // Availability
    if (counselor.availability === 'Available') score += 25;
    
    // Conversion rate (normalized to 25 points)
    score += (counselor.conversionRate / 50) * 25;
    
    // Workload (inverse relationship - fewer leads = higher score)
    score += (50 - counselor.currentLeads) / 50 * 20;
    
    return Math.round(score);
  };

  const sortedCounselors = [...counselors].sort((a, b) => 
    getRecommendationScore(b) - getRecommendationScore(a)
  );

  return (
    <Layout title="Assign Lead">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to={`/leads/view/${id}`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Assign Lead</h1>
              <p className="text-gray-600">Assign {lead.name} to a counselor</p>
            </div>
          </div>
        </div>

        {/* Lead Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-sm text-gray-900">{lead.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Interest</label>
              <p className="mt-1 text-sm text-gray-900">{lead.course}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <p className="mt-1 text-sm text-gray-900 capitalize">{lead.status}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Assignee</label>
              <p className="mt-1 text-sm text-gray-900">{lead.currentAssignee || 'Unassigned'}</p>
            </div>
          </div>
        </div>

        {/* Assignment Form */}
        <form onSubmit={handleAssign} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Select Counselor</h2>
            <div className="space-y-4">
              {sortedCounselors.map((counselor) => {
                const recommendationScore = getRecommendationScore(counselor);
                const isRecommended = recommendationScore >= 70;
                
                return (
                  <div
                    key={counselor.id}
                    className={`relative border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedCounselor === counselor.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${isRecommended ? 'ring-2 ring-green-200' : ''}`}
                    onClick={() => setSelectedCounselor(counselor.id)}
                  >
                    <input
                      type="radio"
                      name="counselor"
                      value={counselor.id}
                      checked={selectedCounselor === counselor.id}
                      onChange={() => setSelectedCounselor(counselor.id)}
                      className="absolute top-4 right-4"
                    />
                    
                    {isRecommended && (
                      <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          <Star className="w-3 h-3 mr-1" />
                          Recommended
                        </span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{counselor.name}</h3>
                            <p className="text-sm text-gray-600">{counselor.role}</p>
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-600">{counselor.rating}</span>
                            </div>
                            <div className="mt-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(counselor.availability)}`}>
                                {counselor.availability}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Current Leads</span>
                          <span className="text-sm font-medium text-gray-900">{counselor.currentLeads}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Conversion Rate</span>
                          <span className="text-sm font-medium text-gray-900">{counselor.conversionRate}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Avg Response</span>
                          <span className="text-sm font-medium text-gray-900">{counselor.avgResponseTime}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                        <div className="flex flex-wrap gap-1">
                          {counselor.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs rounded-full ${
                                specialty === lead.course
                                  ? 'bg-blue-100 text-blue-800 font-medium'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>Match Score</span>
                            <span>{recommendationScore}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                recommendationScore >= 70 ? 'bg-green-500' :
                                recommendationScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${recommendationScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Assignment Notes</h2>
            <textarea
              value={assignmentNotes}
              onChange={(e) => setAssignmentNotes(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add notes about this assignment (optional)..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4">
            <Link
              to={`/leads/view/${id}`}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!selectedCounselor}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Assign Lead
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default LeadAssign;