import { riskAlerts, severityClasses } from '../../data/dashboardData';
import GlassCard from '../ui/GlassCard';

export default function RiskAlertsCard() {
  return (
    <GlassCard className="min-h-[360px]">
      <h3 className="mb-1 text-lg font-semibold">Risk Alerts</h3>
      <p className="mb-5 text-sm text-slate-400">Severity-based monitoring</p>
      <div className="space-y-3">
        {riskAlerts.map((alert) => (
            <article key={alert.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-[#d1de74]/35\">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h4 className="text-sm font-medium text-slate-100">{alert.title}</h4>
              <span className={`rounded-full border px-2 py-1 text-xs ${severityClasses[alert.level]}`}>{alert.level}</span>
            </div>
            <p className="text-xs text-slate-400">{alert.description}</p>
          </article>
        ))}
      </div>
    </GlassCard>
  );
}


