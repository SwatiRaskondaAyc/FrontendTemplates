import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

// ── Wrapper for the Dashboard page so it can use useNavigate ──
function DashboardPage({ theme, toggleTheme }) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onLogout={() => navigate('/login')}
      />
      <Dashboard />
    </>
  );
}

// ── Wrapper for the Login page ──
function LoginPage() {
  const navigate = useNavigate();
  return <Login onLogin={() => navigate('/dashboard')} />;
}

// ── Root App ──
export default function App() {
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div style={{
        height: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#0f172a'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px', height: '50px',
            border: '3px solid rgba(154,193,240,0.1)',
            borderTop: '3px solid var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p style={{ color: 'var(--text-muted)', letterSpacing: '2px', fontSize: '0.8rem' }}>
            INITIALIZING CORE...
          </p>
        </div>
        <style>{`@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default: redirect to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard route */}
          <Route
            path="/dashboard"
            element={<DashboardPage theme={theme} toggleTheme={toggleTheme} />}
          />

          {/* Login route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
