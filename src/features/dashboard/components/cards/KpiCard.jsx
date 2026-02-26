import GlassCard from '../ui/GlassCard';

export default function KpiCard({ item }) {
  const Icon = item.icon;
  const trendClass = item.trend === 'up' ? 'text-emerald-300' : 'text-amber-300';

  return (
    <GlassCard className="transition duration-300 hover:-translate-y-1 hover:border-[#8b86be]/35">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm text-slate-400">{item.title}</p>
          <h3 className="text-2xl font-semibold">{item.value}</h3>
          <p className={`text-xs ${trendClass}`}>{item.delta}</p>
        </div>
        <div className="clay-card rounded-2xl p-3">
          <Icon className="h-5 w-5 text-[#8b86be]" />
        </div>
      </div>
    </GlassCard>
  );
}


