import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../../features/auth/pages/AuthPages';
import CreatePage from '../../features/create/pages/CreatePage';
import FinancialDashboard from '../../features/dashboard/pages/FinancialDashboard';
import HomePage from '../../features/home/pages/HomePage';

export default function AppRoutes({ theme, onToggleTheme, profile, onAuthSuccess }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route
        path="/home"
        element={<HomePage theme={theme} onToggleTheme={onToggleTheme} profile={profile} />}
      />
      <Route
        path="/login"
        element={<LoginPage theme={theme} onToggleTheme={onToggleTheme} onAuthSuccess={onAuthSuccess} />}
      />
      <Route
        path="/register"
        element={<RegisterPage theme={theme} onToggleTheme={onToggleTheme} onAuthSuccess={onAuthSuccess} />}
      />
      <Route
        path="/dashboard"
        element={<FinancialDashboard theme={theme} onToggleTheme={onToggleTheme} profile={profile} />}
      />
      <Route path="/create" element={<CreatePage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
