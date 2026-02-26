import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import { setProfile, toggleTheme } from '../store';

export default function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const profile = useSelector((state) => state.ui.profile);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleAuthSuccess = (nextProfile) => {
    const safeProfile = {
      name: nextProfile?.name || 'Guest User',
      email: nextProfile?.email || ''
    };
    dispatch(setProfile(safeProfile));
    localStorage.setItem('cmda_profile', JSON.stringify(safeProfile));
  };

  return (
    <Router>
      <AppRoutes
        theme={theme}
        onToggleTheme={() => dispatch(toggleTheme())}
        profile={profile}
        onAuthSuccess={handleAuthSuccess}
      />
    </Router>
  );
}
