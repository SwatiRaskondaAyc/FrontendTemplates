import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, LogOut, Moon, Sun, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeNavbar({ theme, onToggleTheme, profile }) {
  const navigate = useNavigate();
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
    <>
      <div className="h-[74px]" aria-hidden="true" />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[var(--surface-nav)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#d1de74] via-[#a1c14b] to-[#f3ce6e]" />
            <div>
              <p className="text-sm font-semibold text-slate-100">CMDA Hub</p>
              <p className="text-xs text-slate-400">Capital Market Intelligence</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            <Link to="/home" className="rounded-lg bg-[#d1de74]/50 px-3 py-2 text-xs text-[#272625] transition hover:bg-[#d1de74]/30 hover:text-[#272625]">
              Home
            </Link>
            <Link
              to="/dashboard"
              className="rounded-lg px-3 py-2 text-xs text-slate-300 transition hover:bg-white/10 hover:text-[#d1de74]"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="rounded-lg px-3 py-2 text-xs text-slate-300 transition hover:bg-white/10 hover:text-[#d1de74]"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg px-3 py-2 text-xs text-slate-300 transition hover:bg-white/10 hover:text-[#d1de74]"
            >
              Register
            </Link>
          </nav>

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
                <span className="hidden max-w-32 truncate text-slate-200 sm:inline">{displayName}</span>
                <ChevronDown className={`h-4 w-4 text-slate-300 transition ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-white/15 bg-[var(--surface-nav)] p-2 shadow-xl">
                  <div className="rounded-lg px-3 py-2">
                    {/* <p className="text-xs text-slate-400">Signed in as</p> */}
                    <p className="truncate text-sm text-slate-200">{displayName}</p>
                    <p className="truncate text-xs text-slate-400">{profile?.email || 'No email added'}</p>
                  </div>

                  <Link
                    to="/login"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="mt-1 block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-[#d1de74]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="mt-1 block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-[#d1de74]"
                  >
                    Register
                  </Link>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/login');
                    }}
                    className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#e0912f] transition hover:bg-[#e0912f]/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                  <button
                    onClick={() => {
                      onToggleTheme?.();
                      setProfileDropdownOpen(false);
                    }}
                    className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-white/10 hover:text-[#d1de74]"
                  >
                    {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}



