import { useRef, useState } from 'react';
import KpiCard from '../components/cards/KpiCard';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import AllocationCard from '../components/sections/AllocationCard';
import PerformanceCard from '../components/sections/PerformanceCard';
import PortfolioHoldingsCard from '../components/sections/PortfolioHoldingsCard';
import RiskAlertsCard from '../components/sections/RiskAlertsCard';
import StrategyCardRow from '../components/sections/StrategyCardRow';
import { Menu, Upload } from 'lucide-react';
import { kpis } from '../data/dashboardData';
import { useDashboardState } from '../hooks/useDashboardState';
import Button from '../../../components/ui/Button';
import ProfileWorkflowIllustration from '../../../components/illustrations/ProfileWorkflowIllustration';

export default function FinancialDashboard({ theme, onToggleTheme, profile }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef(null);

  const {
    range,
    setRange,
    loading,
    series
  } = useDashboardState();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    setUploadedFileName(selectedFile ? selectedFile.name : '');
  };

  return (
    <div className="fintech-bg min-h-screen text-slate-100">
      <div className="dashboard-orb dashboard-orb-one" aria-hidden="true" />
      <div className="dashboard-orb dashboard-orb-two" aria-hidden="true" />

      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className={`${sidebarCollapsed ? 'lg:pl-24' : 'lg:pl-72'} transition-all duration-300`}>
        <TopBar theme={theme} onToggleTheme={onToggleTheme} profile={profile} sidebarCollapsed={sidebarCollapsed} />

        <main className="px-2 pb-6 pt-24 sm:px-3">
          <button
            style={{ animationDelay: '0.05s' }}
            className="reveal-up mb-4 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200 lg:hidden"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
            Open Menu
          </button>
        

          <section className="space-y-6" aria-label="Dashboard overview">
            <section className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4" aria-label="KPI cards">
              {kpis.map((item) => (
                <article
                  key={item.title}
                  style={{ animationDelay: '0.1s' }}
                  className="reveal-up clay-elevated rounded-2xl p-1 transition-transform duration-200 hover:-translate-y-1"
                >
                  <KpiCard item={item} />
                </article>
              ))}
            </section>

            <section style={{ animationDelay: '0.16s' }} className="reveal-up clay-elevated rounded-2xl p-2" aria-label="Performance analytics">
              <PerformanceCard range={range} setRange={setRange} data={series} loading={loading} />
            </section>

            

            <section style={{ animationDelay: '0.22s' }} className="reveal-up grid gap-6 xl:grid-cols-2" aria-label="Allocation and risk">
              <article className="clay-elevated rounded-2xl p-2">
                <AllocationCard loading={loading} />
              </article>
              <article className="clay-elevated rounded-2xl p-2">
                <RiskAlertsCard />
              </article>
            </section>

            <section style={{ animationDelay: '0.28s' }} className="reveal-up clay-elevated rounded-2xl p-2" aria-label="Strategy insights">
              <StrategyCardRow range={range} />
            </section>

            <section style={{ animationDelay: '0.32s' }} className="reveal-up clay-elevated rounded-2xl p-4 sm:p-6" aria-label="File upload workspace">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                <article>
                  <p className="mb-2 text-xs uppercase tracking-wider text-slate-400">Upload Workspace</p>
                  <h3 className="text-xl font-semibold text-slate-100">Upload Transaction Data</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Add your latest file after login. This panel matches your requested give you the proper data analysis.
                  </p>
                  <div className="mt-4 rounded-2xl border border-dashed border-[#d1de74]/45 bg-[#d1de74]/10 p-5">
                    <p className="text-sm text-slate-200">{uploadedFileName ? `Selected file: ${uploadedFileName}` : 'Drop a file or choose from device.'}</p>
                    <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                    <Button className="mt-4" onClick={() => fileInputRef.current?.click()} type="button">
                      <Upload className="h-4 w-4" />
                      Upload Transaction Data
                    </Button>
                  </div>
                </article>
                <article className="clay-elevated rounded-2xl p-4">
                  <ProfileWorkflowIllustration type="upload" />
                </article>
              </div>
            </section>

            <section style={{ animationDelay: '0.36s' }} className="reveal-up clay-elevated rounded-2xl p-2" aria-label="Portfolio holdings">
              <PortfolioHoldingsCard />
            </section>
          </section>
        </main>

        <footer style={{ animationDelay: '0.4s' }} className="reveal-up px-2 pb-6 text-xs text-slate-400 sm:px-3">
          CMDA Dashboard v3 semantic template layout
        </footer>
      </div>
    </div>
  );
}
