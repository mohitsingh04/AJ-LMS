import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import SuperadminDashboard from './dashboard/SuperadminDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import AgentDashboard from './dashboard/AgentDashboard';
import CounselorDashboard from './dashboard/CounselorDashboard';
// import LeadsPage from './components/pages/LeadsPage';
import AllLead from './pages/leads/AllLead';
// import LeadView from './components/pages/LeadView';
import ViewLead from './pages/leads/ViewLead';
// import LeadEdit from './components/pages/LeadEdit';
import EditLead from './pages/leads/EditLead';
// import LeadCreate from './components/pages/LeadCreate';
import AddLead from './pages/leads/AddLead';
import LeadAssign from './components/pages/LeadAssign';
// import LeadHistory from './components/pages/LeadHistory';
import LeadHistory from './pages/leads/LeadHistory';
// import TeamPage from './components/pages/TeamPage';
import AllTeam from './pages/team/AllTeam';
// import AnalyticsPage from './components/pages/AnalyticsPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
// import SettingPage from './components/pages/SettingsPage';
import SettingPage from './pages/Setting/SettingPage';
// import PerformancePage from './components/pages/PerformancePage';
import Performance from './pages/performance/Performance';
// import FollowUpsPage from './components/pages/FollowUpsPage';
import FollowUps from './pages/Follow-ups/Follow-ups';
// import CallsPage from './components/pages/CallsPage';
import CallManagement from './pages/call-management/CallManagement';
// import AdminsPage from './components/pages/AdminsPage';
import AdminPage from './pages/Admin/AdminPage';
import BillingPage from './components/pages/BillingPage';
import NotFound from './components/common/404NotFound';
import AddTeam from './pages/team/AddTeam';
import EditTeam from './pages/team/EditTeam';
import ViewTeam from './pages/team/ViewTeam';
import Home from './pages/home/Home';

{/* AJ Preneur */ }
import AllAJPreneur from './pages/users/AJPreneur/AllAJPreneur';
import AddAJPreneur from './pages/users/AJPreneur/AddAJPreneur';
import EditAJPreneur from './pages/users/AJPreneur/EditAJPreneur';
import ViewAJPreneur from './pages/users/AJPreneur/ViewAJPreneur';

{/* Counselor */ }
import AllCounselor from './pages/users/Counselor/AllCounselor';
import AddCounselor from './pages/users/Counselor/AddCounselor';
import EditCounselor from './pages/users/Counselor/EditCounselor';
import ViewCounselor from './pages/users/Counselor/ViewCounselor';

{/* Enquiry */ }
import AllEnquiry from './pages/enquiry/AllEnquiry';
import AddEnquiry from './pages/enquiry/AddEnquiry';
import EditEnquiry from './pages/enquiry/EditEnquiry';
import ViewEnquiry from './pages/enquiry/ViewEnquiry';

{/* Support & About us */ }
import Support from './pages/administrative-pages/Support';
import AboutUs from './pages/administrative-pages/About';
import TermsAndConditions from './pages/administrative-pages/TermsAndConditions';

const PublicRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Home />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginForm />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <RegisterForm />} />
      <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" replace /> : <ForgotPasswordForm />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const getRoutes = (role) => {
  switch (role) {
    case 'superadmin':
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard">
            <Route index element={<SuperadminDashboard />} />
            <Route path="admins" element={<AdminPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="settings" element={<SettingPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      );

    case 'admin':
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard">
            <Route index element={<AdminDashboard />} />

            {/* AJ Preneur */}
            <Route path="aj-preneur/all" element={<AllAJPreneur />} />
            <Route path="aj-preneur/add" element={<AddAJPreneur />} />
            <Route path="aj-preneur/edit/:id" element={<EditAJPreneur />} />
            <Route path="aj-preneur/view/:id" element={<ViewAJPreneur />} />

            {/* Counselor */}
            <Route path="counselor/all" element={<AllCounselor />} />
            <Route path="counselor/add" element={<AddCounselor />} />
            <Route path="counselor/edit/:id" element={<EditCounselor />} />
            <Route path="counselor/view/:id" element={<ViewCounselor />} />

            {/* Enquiry */}
            <Route path="enquiry/all" element={<AllEnquiry />} />
            <Route path="enquiry/add" element={<AddEnquiry />} />
            <Route path="enquiry/edit/:id" element={<EditEnquiry />} />
            <Route path="enquiry/view/:id" element={<ViewEnquiry />} />

            {/* Support & About us */}
            <Route path="support" element={<Support />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />

            {/* Leads */}
            <Route path="leads" element={<AllLead />} />
            <Route path="leads/view/:id" element={<ViewLead />} />
            <Route path="leads/edit/:id" element={<EditLead />} />
            <Route path="leads/add" element={<AddLead />} />
            <Route path="leads/assign/:id" element={<LeadAssign />} />
            <Route path="leads/history/:id" element={<LeadHistory />} />

            {/* Team */}
            <Route path="team" element={<AllTeam />} />
            <Route path="team/add" element={<AddTeam />} />
            <Route path="team/edit/:id" element={<EditTeam />} />
            <Route path="team/view/:id" element={<ViewTeam />} />

            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      );

    case 'agent':
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard">
            <Route index element={<AgentDashboard />} />

            {/* Enquiry */}
            <Route path="enquiry/all" element={<AllEnquiry />} />
            <Route path="enquiry/view/:id" element={<ViewEnquiry />} />

            {/* Support & About us */}
            <Route path="support" element={<Support />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />

            {/* Leads */}
            <Route path="leads" element={<AllLead />} />
            <Route path="leads/view/:id" element={<ViewLead />} />
            <Route path="leads/history/:id" element={<LeadHistory />} />
            <Route path="performance" element={<Performance />} />
            <Route path="settings" element={<SettingPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      );

    case 'counselor':
      return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard">
            <Route index element={<CounselorDashboard />} />

            {/* Enquiry */}
            <Route path="enquiry/all" element={<AllEnquiry />} />
            <Route path="enquiry/add" element={<AddEnquiry />} />
            <Route path="enquiry/edit/:id" element={<EditEnquiry />} />
            <Route path="enquiry/view/:id" element={<ViewEnquiry />} />

            {/* My Work */}
            <Route path="my-work" element={<AllEnquiry />} />

            {/* Support & About us */}
            <Route path="support" element={<Support />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />

            {/* Leads */}
            <Route path="leads" element={<AllLead />} />
            <Route path="leads/view/:id" element={<ViewLead />} />
            <Route path="leads/edit/:id" element={<EditLead />} />
            <Route path="leads/history/:id" element={<LeadHistory />} />

            {/* Others */}
            <Route path="followups" element={<FollowUps />} />
            <Route path="calls" element={<CallManagement />} />
            <Route path="performance" element={<Performance />} />
            <Route path="settings" element={<SettingPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      );

    default:
      return (
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      );
  }
};

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

  return user ? getRoutes(user.role) : <PublicRoutes />;
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
