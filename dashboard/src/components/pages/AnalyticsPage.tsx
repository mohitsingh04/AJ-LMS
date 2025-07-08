import React, { useState } from 'react';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';
import Chart from '../common/Chart';
import { 
  Target, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');

  const stats = [
    {
      title: 'Total Leads',
      value: '1,247',
      icon: Target,
      trend: { value: 15, isPositive: true },
      color: 'blue' as const
    },
    {
      title: 'Conversion Rate',
      value: '32.5%',
      icon: TrendingUp,
      trend: { value: 5, isPositive: true },
      color: 'green' as const
    },
    {
      title: 'Active Users',
      value: '89',
      icon: Users,
      trend: { value: 8, isPositive: true },
      color: 'purple' as const
    },
    {
      title: 'Revenue',
      value: '$89,420',
      icon: DollarSign,
      trend: { value: 12, isPositive: true },
      color: 'orange' as const
    }
  ];

  const leadsOverTime = [
    { name: 'Jan', value: 156 },
    { name: 'Feb', value: 189 },
    { name: 'Mar', value: 234 },
    { name: 'Apr', value: 298 },
    { name: 'May', value: 342 },
    { name: 'Jun', value: 389 }
  ];

  const conversionFunnel = [
    { name: 'Visitors', value: 5420, color: '#3B82F6' },
    { name: 'Leads', value: 1247, color: '#10B981' },
    { name: 'Qualified', value: 567, color: '#F59E0B' },
    { name: 'Converted', value: 189, color: '#EF4444' }
  ];

  const sourceBreakdown = [
    { name: 'Google Ads', value: 342 },
    { name: 'Facebook', value: 298 },
    { name: 'Website', value: 234 },
    { name: 'Referrals', value: 189 },
    { name: 'Direct', value: 154 },
    { name: 'Other', value: 89 }
  ];

  const coursePopularity = [
    { name: 'MBA', value: 45, color: '#3B82F6' },
    { name: 'Computer Science', value: 38, color: '#10B981' },
    { name: 'Marketing', value: 28, color: '#F59E0B' },
    { name: 'Data Science', value: 22, color: '#EF4444' },
    { name: 'Engineering', value: 18, color: '#8B5CF6' }
  ];

  return (
    <Layout title="Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Track your performance and insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Chart
            title="Leads Over Time"
            data={leadsOverTime}
            type="bar"
          />
          <Chart
            title="Conversion Funnel"
            data={conversionFunnel}
            type="bar"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Chart
            title="Lead Sources"
            data={sourceBreakdown}
            type="bar"
          />
          <Chart
            title="Course Popularity"
            data={coursePopularity}
            type="pie"
          />
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Counselors</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Michael Brown</span>
                <span className="text-sm font-medium text-gray-900">40% conversion</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Emma Davis</span>
                <span className="text-sm font-medium text-gray-900">37.5% conversion</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">James Wilson</span>
                <span className="text-sm font-medium text-gray-900">28.6% conversion</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">10:00 AM - 12:00 PM</span>
                <span className="text-sm font-medium text-gray-900">34 leads</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">2:00 PM - 4:00 PM</span>
                <span className="text-sm font-medium text-gray-900">28 leads</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">6:00 PM - 8:00 PM</span>
                <span className="text-sm font-medium text-gray-900">22 leads</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">California</span>
                <span className="text-sm font-medium text-gray-900">23%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">New York</span>
                <span className="text-sm font-medium text-gray-900">18%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Texas</span>
                <span className="text-sm font-medium text-gray-900">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;