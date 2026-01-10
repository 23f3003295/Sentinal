import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SplashScreen from '../components/SplashScreen';
import DashboardLayout from '../components/DashboardLayout';
import AllocationDashboard from '../components/AllocationDashboard';
import CasesView from '../components/CasesView';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const renderPageContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <AllocationDashboard />;
      case 'cases':
        return <CasesView />;
      case 'dca-performance':
        return <div style={{ color: '#fff', padding: '40px' }}>DCA Performance - Coming Soon</div>;
      case 'analytics':
        return <div style={{ color: '#fff', padding: '40px' }}>Analytics & Reporting - Coming Soon</div>;
      case 'user-management':
        return <div style={{ color: '#fff', padding: '40px' }}>User Management - Coming Soon</div>;
      case 'sla-tracking':
        return <div style={{ color: '#fff', padding: '40px' }}>SLA Tracking & Alerts - Coming Soon</div>;
      case 'bulk-operations':
        return <div style={{ color: '#fff', padding: '40px' }}>Bulk Operations - Coming Soon</div>;
      case 'audit-logs':
        return <div style={{ color: '#fff', padding: '40px' }}>Audit Logs - Coming Soon</div>;
      default:
        return <AllocationDashboard />;
    }
  };

  return (
    <DashboardLayout activePage={activePage} onPageChange={setActivePage}>
      {renderPageContent()}
    </DashboardLayout>
  );
}
