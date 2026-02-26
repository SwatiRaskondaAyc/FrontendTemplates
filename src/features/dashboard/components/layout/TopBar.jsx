import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, LogOut, Search, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

// const navItems = ['Dashboard', 'Portfolio', 'Analysis', 'Strategy Builder', 'AI Insights', 'Reports'];

export default function TopBar({ theme, onToggleTheme, profile, sidebarCollapsed }) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const displayName = profile?.name || 'Guest User';

  return (
    <header
      className={`fixed top-0 z-40 border-b border-white/10 bg-[var(--surface-nav)] px-4 py-4 backdrop-blur-xl sm:px-6 ${
        sidebarCollapsed ? 'left-0 lg:left-24' : 'left-0 lg:left-72'
      } right-0`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative w-52 sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              placeholder="Search assets, sectors, strategies..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-slate-100 outline-none transition focus:border-[#d1de74]/60"
            />
          </div>
        </div>

        {/* <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item, index) => (
            <button
              key={item}
              className={`rounded-lg px-3 py-2 text-xs transition ${
                index === 0
                  ? 'bg-[#8b86be]/20 text-[#8b86be]'
                  : 'text-slate-300 hover:bg-white/10 hover:text-[#8b86be]'
              }`}
            >
              {item}
            </button>
          ))}
        </nav> */}

        <div className="flex items-center gap-3">
          {/* <button className="clay-card relative rounded-xl p-2 text-slate-300">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#cbd690]" />
          </button> */}

          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileDropdownOpen((open) => !open)}
              className="clay-card flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
            >
              <div className="rounded-lg bg-gradient-to-br from-[#d1de74] via-[#a1c14b] to-[#f3ce6e] p-1 text-slate-800">
                <UserRound className="h-4 w-4" />
              </div>
              <span className="hidden text-slate-200 sm:inline">{displayName}</span>
              <ChevronDown className={`h-4 w-4 text-slate-300 transition ${profileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-xl border border-white/15 bg-[var(--surface-nav)] p-2 shadow-xl">
                <div className="rounded-lg px-3 py-2">
                  <p className="text-xs text-slate-400">Profile</p>
                  <p className="text-sm text-slate-200">{displayName}</p>
                </div>
                <Link
                  to="/login"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-[#d1de74]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-[#d1de74]"
                >
                  Register
                </Link>
                <button
                  onClick={() => {
                    onToggleTheme();
                    setProfileDropdownOpen(false);
                  }}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-white/10 hover:text-[#d1de74]"
                >
                  {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
                <Link
                  to="/login"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-[#d1de74]"
                >
                  Back to Auth Page
                </Link>
                <Link
                  to="/login"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#e0912f] transition hover:bg-[#e0912f]/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}



