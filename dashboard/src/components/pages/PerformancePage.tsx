import React from 'react';
import Layout from '../common/Layout';
import StatCard from '../common/StatCard';
import Chart from '../common/Chart';
import { 
  Target, 
  TrendingUp, 
  Clock, 
  Award,
  Calendar,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';

const PerformancePage: React.FC = () => {
  const stats = [
    {
      title: 'Total Conversions',
      value: '18',
      icon: Target,
      trend: { value: 15, isPositive: true },
      color: 'green' as const
    },
    {
      title: 'Conversion Rate',
      value: '40.0%',
      icon: TrendingUp,
      trend: { value: 5, isPositive: true },
      color: 'blue' as const
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      icon: Clock,
      trend: { value: 12, isPositive: true },
      color: 'purple' as const
    },
    {
      title: 'Performance Score',
      value: '95',
      icon: Award,
      trend: { value: 8, isPositive: true },
      color: 'orange' as const
    }
  ];

  const monthlyPerformance = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 15 },
    { name: 'Mar', value: 18 },
    { name: 'Apr', value: 22 },
    { name: 'May', value: 19 },
    { name: 'Jun', value: 25 }
  ];

  const activityBreakdown = [
    { name: 'Calls', value: 45, color: '#3B82F6' },
    { name: 'Emails', value: 32, color: '#10B981' },
    { name: 'Messages', value: 28, color: '#F59E0B' },
    { name: 'Meetings', value: 15, color: '#EF4444' }
  ];

  const goals = [
    {
      title: 'Monthly Conversions',
      current: 18,
      target: 25,
      percentage: 72
    },
    {
      title: 'Response Time',
      current: 2.4,
      target: 2.0,
      percentage: 83
    },
    {
      title: 'Follow-up Rate',
      current: 95,
      target: 100,
      percentage: 95
    }
  ];

  return (
    <Layout title="Performance">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Dashboard</h1>
          <p className="text-gray-600">Track your performance metrics and goals</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Chart
            title="Monthly Conversions"
            data={monthlyPerformance}
            type="bar"
          />
          <Chart
            title="Activity Breakdown"
            data={activityBreakdown}
            type="pie"
          />
        </div>

        {/* Goals and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Goals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals Progress</h3>
            <div className="space-y-4">
              {goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                    <span className="text-sm text-gray-500">
                      {goal.current} / {goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${goal.percentage}%` }}
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-500">{goal.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Called Sarah Johnson</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Sent follow-up email to David Wilson</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Scheduled meeting with Lisa Chen</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">WhatsApp message to John Smith</p>
                  <p className="text-xs text-gray-500">8 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Excellent Performance</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your conversion rate is 15% above average
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Quick Response</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your average response time is 20% faster than team average
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Top Performer</h4>
              <p className="text-sm text-gray-600 mt-1">
                You're in the top 10% of counselors this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PerformancePage;