import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import SuperadminDashboard from './components/dashboards/SuperadminDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import AgentDashboard from './components/dashboards/AgentDashboard';
import CounselorDashboard from './components/dashboards/CounselorDashboard';
import LeadsPage from './components/pages/LeadsPage';
import LeadView from './components/pages/LeadView';
import LeadEdit from './components/pages/LeadEdit';
import LeadCreate from './components/pages/LeadCreate';
import LeadAssign from './components/pages/LeadAssign';
import LeadHistory from './components/pages/LeadHistory';
import TeamPage from './components/pages/TeamPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import SettingsPage from './components/pages/SettingsPage';
import PerformancePage from './components/pages/PerformancePage';
import FollowUpsPage from './components/pages/FollowUpsPage';
import CallsPage from './components/pages/CallsPage';
import AdminsPage from './components/pages/AdminsPage';
import BillingPage from './components/pages/BillingPage';
import FormsPage from './components/pages/FormsPage';

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const getRoutes = () => {
    switch (user.role) {
      case 'superadmin':
        return (
          <Routes>
            <Route path="/" element={<SuperadminDashboard />} />
            <Route path="/admins" element={<AdminsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        );
      case 'admin':
        return (
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/leads/view/:id" element={<LeadView />} />
            <Route path="/leads/edit/:id" element={<LeadEdit />} />
            <Route path="/leads/create" element={<LeadCreate />} />
            <Route path="/leads/assign/:id" element={<LeadAssign />} />
            <Route path="/leads/history/:id" element={<LeadHistory />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        );
      case 'agent':
        return (
          <Routes>
            <Route path="/" element={<AgentDashboard />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/leads/view/:id" element={<LeadView />} />
            <Route path="/leads/history/:id" element={<LeadHistory />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        );
      case 'counselor':
        return (
          <Routes>
            <Route path="/" element={<CounselorDashboard />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/leads/view/:id" element={<LeadView />} />
            <Route path="/leads/edit/:id" element={<LeadEdit />} />
            <Route path="/leads/history/:id" element={<LeadHistory />} />
            <Route path="/followups" element={<FollowUpsPage />} />
            <Route path="/calls" element={<CallsPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        );
      default:
        return <Navigate to="/" replace />;
    }
  };

  return getRoutes();
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;