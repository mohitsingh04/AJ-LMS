import React, { useState } from 'react';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';
import Chart from '../common/Chart';
import { 
  Target, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Copy,
  Share2,
  Eye,
  ExternalLink,
  Calendar,
  Clock,
  Award,
  Link
} from 'lucide-react';

const AgentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  const referralCode = 'AG001';
  const referralLink = `https://demo.leadflow.com/register?ref=${referralCode}`;

  const stats = [
    {
      title: 'Total Referrals',
      value: '89',
      icon: Users,
      trend: { value: 23, isPositive: true },
      color: 'blue' as const
    },
    {
      title: 'Conversions',
      value: '32',
      icon: Target,
      trend: { value: 18, isPositive: true },
      color: 'green' as const
    },
    {
      title: 'Conversion Rate',
      value: '36.0%',
      icon: TrendingUp,
      trend: { value: 5, isPositive: true },
      color: 'purple' as const
    },
    {
      title: 'Earnings',
      value: '$2,840',
      icon: DollarSign,
      trend: { value: 15, isPositive: true },
      color: 'orange' as const
    }
  ];

  const performanceData = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Apr', value: 61 },
    { name: 'May', value: 58 },
    { name: 'Jun', value: 72 }
  ];

  const sourceData = [
    { name: 'Social Media', value: 34, color: '#3B82F6' },
    { name: 'Email', value: 28, color: '#10B981' },
    { name: 'Website', value: 19, color: '#F59E0B' },
    { name: 'Direct', value: 8, color: '#EF4444' }
  ];

  const recentReferrals = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      course: 'MBA',
      status: 'converted',
      commission: '$89',
      clickedAt: '2024-01-20T10:30:00Z',
      convertedAt: '2024-01-21T14:20:00Z'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      course: 'Marketing',
      status: 'pending',
      commission: '$0',
      clickedAt: '2024-01-19T15:45:00Z',
      convertedAt: null
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      course: 'Computer Science',
      status: 'converted',
      commission: '$124',
      clickedAt: '2024-01-18T09:15:00Z',
      convertedAt: '2024-01-19T11:30:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout title="Agent Dashboard">
      <div className="space-y-6">
        {/* Referral Link Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Your Referral Link</h2>
              <p className="text-blue-100 text-sm mb-4">Share this link to earn commissions on successful referrals</p>
              <div className="flex items-center space-x-2">
                <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2 flex-1 max-w-md">
                  <code className="text-sm font-mono text-white truncate block">{referralLink}</code>
                </div>
                <button
                  onClick={() => copyToClipboard(referralLink)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              {copied && <p className="text-green-200 text-sm mt-2">Link copied to clipboard!</p>}
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Referral Code</p>
              <p className="text-2xl font-bold">{referralCode}</p>
            </div>
          </div>
        </div>

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
              onClick={() => setActiveTab('referrals')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'referrals'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Referrals
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'performance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Performance
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Chart
              title="Monthly Referrals"
              data={performanceData}
              type="bar"
            />
            <Chart
              title="Traffic Sources"
              data={sourceData}
              type="pie"
            />
          </div>
        )}

        {activeTab === 'referrals' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Referrals</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
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
                      Commission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentReferrals.map((referral) => (
                    <tr key={referral.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {referral.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{referral.name}</div>
                            <div className="text-sm text-gray-500">{referral.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {referral.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(referral.status)}`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {referral.commission}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(referral.clickedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Clicks</span>
                  <span className="text-sm font-medium text-gray-900">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Click-through Rate</span>
                  <span className="text-sm font-medium text-gray-900">4.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Time to Convert</span>
                  <span className="text-sm font-medium text-gray-900">2.3 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Best Performing Day</span>
                  <span className="text-sm font-medium text-gray-900">Tuesday</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Top Performer</p>
                    <p className="text-xs text-gray-500">30+ conversions this month</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Conversion Master</p>
                    <p className="text-xs text-gray-500">35%+ conversion rate</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Rising Star</p>
                    <p className="text-xs text-gray-500">20%+ improvement this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AgentDashboard;