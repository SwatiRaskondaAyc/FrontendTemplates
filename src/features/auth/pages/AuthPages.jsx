import { ArrowLeft, ArrowRight, BarChart3, Lock, Mail, Moon, ShieldCheck, Sun, User2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import ProfileWorkflowIllustration from '../../../components/illustrations/ProfileWorkflowIllustration';

function AuthShell({
  title,
  subtitle,
  ctaText,
  ctaLink,
  ctaLabel,
  onSubmit,
  children,
  theme,
  onToggleTheme,
  activeAuth,
  onBack
}) {
  return (
    <div className="fintech-bg relative min-h-screen overflow-hidden px-4 py-10 text-slate-100">
      <div className="dashboard-orb dashboard-orb-one" aria-hidden="true" />
      <div className="dashboard-orb dashboard-orb-two" aria-hidden="true" />

      <main className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <aside className="space-y-6">
          <header style={{ animationDelay: '0.06s' }} className="reveal-up flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-wide text-slate-300">
              <ShieldCheck className="h-4 w-4 text-[#cbd690]" />
              INSTITUTIONAL ANALYTICS PLATFORM
            </div>
           
          </header>
          <h1 style={{ animationDelay: '0.12s' }} className="reveal-up text-4xl font-semibold leading-tight sm:text-5xl">
            Financial intelligence for modern portfolio teams.
          </h1>
          <p style={{ animationDelay: '0.18s' }} className="reveal-up max-w-xl text-sm text-slate-300 sm:text-base">
            Build resilient, data-backed strategy with live risk monitoring, AI insight streams, and predictive
            allocation analysis.
          </p>
          <article style={{ animationDelay: '0.22s' }} className="reveal-up clay-elevated rounded-3xl p-4 sm:p-5">
            <header className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-100">Your skill is required for many jobs</h3>
              <span className="rounded-full bg-[#8b86be]/25 px-3 py-1 text-xs text-[#8b86be]">Live profile</span>
            </header>
            <ProfileWorkflowIllustration type="login" />
          </article>
          <section style={{ animationDelay: '0.24s' }} className="reveal-up grid gap-3 sm:grid-cols-2" aria-label="Auth feature highlights">
            {[
              'Real-time portfolio telemetry',
              'AI strategy recommendations',
              'Institutional risk workflow',
              'Audit-ready reporting stream'
            ].map((line) => (
              <article key={line} className="clay-elevated rounded-2xl p-4 text-sm text-slate-300">
                {line}
              </article>
            ))}
          </section>
        </aside>

        <article style={{ animationDelay: '0.28s' }} className="reveal-up clay-elevated rounded-3xl p-6 sm:p-8">
          <header className="mb-5 flex items-center justify-between gap-2">
            <Button onClick={onBack} variant="outline" type="button">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Button>

            <div className="flex gap-2">
            <Link
              to="/login"
              className={`rounded-xl px-3 py-2 text-xs transition ${
                activeAuth === 'login'
                  ? 'bg-[#8b86be]/20 text-[#8b86be]'
                  : 'border border-white/15 bg-white/5 text-slate-200 hover:border-[#8b86be]/40'
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`rounded-xl px-3 py-2 text-xs transition ${
                activeAuth === 'register'
                  ? 'bg-[#8b86be]/20 text-[#8b86be]'
                  : 'border border-white/15 bg-white/5 text-slate-200 hover:border-[#8b86be]/40'
              }`}
            >
                Register
              </Link>
            </div>
             <button
              onClick={onToggleTheme}
              className="clay-card inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-200"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </header>

          <section className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[#8b86be] via-[#cbd690] to-[#deb0bd] p-3 text-[#86abba]">
              <BarChart3 className="h-6 w-6" />
            </div>
          </section>

          <form className="space-y-4" onSubmit={onSubmit}>
            {children}
            <Button type="submit" className="mt-2 w-full">
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            {ctaLabel}{' '}
            <Link className="text-[#8b86be] transition hover:text-[#cbd690]" to={ctaLink}>
              {ctaText === 'Sign In' ? 'Create account' : 'Sign in'}
            </Link>
          </p>
          <footer className="mt-6 text-center text-xs text-slate-500">
            Secure access to CMDA workspace
          </footer>
        </article>
      </main>
    </div>
  );
}

function InputField({ icon, type, placeholder }) {
  const IconComponent = icon;
  return (
    <label className="block">
      <span className="sr-only">{placeholder}</span>
      <div className="clay-card flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 transition focus-within:border-[#8b86be]/60">
        <IconComponent className="h-4 w-4 text-slate-400" />
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
        />
      </div>
    </label>
  );
}

function formatNameFromEmail(email) {
  const localPart = email.split('@')[0] || 'User';
  return localPart
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
}

export function LoginPage({ theme, onToggleTheme, onAuthSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let resolvedName = formatNameFromEmail(email);
    const storedProfileRaw = localStorage.getItem('cmda_profile');
    if (storedProfileRaw) {
      try {
        const storedProfile = JSON.parse(storedProfileRaw);
        if (storedProfile?.email?.toLowerCase() === email.toLowerCase() && storedProfile?.name) {
          resolvedName = storedProfile.name;
        }
      } catch {
        // Ignore invalid localStorage shape and continue with derived name.
      }
    }
    const profile = {
      name: resolvedName,
      email
    };
    onAuthSuccess?.(profile);
    navigate('/');
  };

  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Sign in to your analytics workspace"
      ctaText="Sign In"
      ctaLink="/register"
      ctaLabel="New to the platform?"
      onSubmit={handleSubmit}
      theme={theme}
      onToggleTheme={onToggleTheme}
      activeAuth="login"
      onBack={() => navigate('/home')}
    >
      <label className="block">
        <span className="sr-only">Work Email</span>
        <div className="clay-card flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 transition focus-within:border-[#8b86be]/60">
          <Mail className="h-4 w-4 text-slate-400" />
          <input
            type="email"
            placeholder="Work Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
          />
        </div>
      </label>
      <InputField icon={Lock} type="password" placeholder="Password" />
    </AuthShell>
  );
}

export function RegisterPage({ theme, onToggleTheme, onAuthSuccess }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const profile = {
      name: fullName || 'User',
      email
    };
    onAuthSuccess?.(profile);
    navigate('/');
  };

  return (
    <AuthShell
      title="Create Account"
      subtitle="Set up your institutional workspace"
      ctaText="Create Account"
      ctaLink="/login"
      ctaLabel="Already have an account?"
      onSubmit={handleSubmit}
      theme={theme}
      onToggleTheme={onToggleTheme}
      activeAuth="register"
      onBack={() => navigate('/login')}
    >
      <label className="block">
        <span className="sr-only">Full Name</span>
        <div className="clay-card flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 transition focus-within:border-[#8b86be]/60">
          <User2 className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
          />
        </div>
      </label>
      <label className="block">
        <span className="sr-only">Work Email</span>
        <div className="clay-card flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 transition focus-within:border-[#8b86be]/60">
          <Mail className="h-4 w-4 text-slate-400" />
          <input
            type="email"
            placeholder="Work Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
          />
        </div>
      </label>
      <InputField icon={Lock} type="password" placeholder="Create Password" />
    </AuthShell>
  );
}

