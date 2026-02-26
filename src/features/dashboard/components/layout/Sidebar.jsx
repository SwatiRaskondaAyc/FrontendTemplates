import { BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sidebarMenu } from '../../data/dashboardData';

function SidebarContent({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-8 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-[#d1de74] via-[#a1c14b] to-[#f3ce6e] p-2 text-white">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">Capital Market Data Analytics(CMDA)</p>
            </div>
          </div>
        )}

        <button onClick={onToggle} className="clay-card rounded-xl p-2 text-slate-300">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="space-y-2">
        {sidebarMenu.map((item, index) => {
          const Icon = item.icon;
          const active = item.path ? location.pathname === item.path : index === 0;
          return (
            <button
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${
                active
                  ? 'border-[#d1de74]/45 bg-[#d1de74]/50 text-[#272625]'
                  : 'border-transparent text-slate-300 hover:border-[#d1de74]/35 hover:bg-white/5'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-gradient-to-br from-[#d1de74]/20 via-[#a1c14b]/12 to-[#f3ce6e]/20 p-4">
        {!collapsed && (
          <>
            <p className="text-xs text-slate-300">Pro Analytics</p>
            <p className="mt-1 text-sm font-medium">Unlock advanced strategy and risk workflows.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden border-r border-white/10 bg-[var(--surface-nav)] p-4 backdrop-blur-xl lg:block ${
          collapsed ? 'w-24' : 'w-72'
        }`}
      >
        <SidebarContent collapsed={collapsed} onToggle={onToggle} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onMobileClose}>
          <aside className="h-full w-72 border-r border-white/10 bg-[var(--surface-nav)] p-4" onClick={(e) => e.stopPropagation()}>
            <SidebarContent collapsed={false} onToggle={onMobileClose} />
          </aside>
        </div>
      )}
    </>
  );
}



