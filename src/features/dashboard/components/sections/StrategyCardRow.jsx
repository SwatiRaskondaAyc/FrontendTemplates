import { strategyRecommendationsByRange } from '../../data/dashboardData';
import GlassCard from '../ui/GlassCard';

export default function StrategyCardRow({ range }) {
  const strategies = strategyRecommendationsByRange[range];

  return (
    <GlassCard className="w-full">
      <h3 className="w-full mb-1 text-lg font-semibold">Strategy Recommendations</h3>
      <p className="mb-5 text-sm text-slate-400">AI-ranked opportunities by ROI and risk confidence</p>
      {strategies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/20 p-6 text-sm text-slate-400">
          No strategy recommendations for {range}. Switch to `1M` or `1Y`.
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {strategies.map((item) => (
            <article key={item.name} className="min-w-[240px] rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:border-[#8b86be]/40">
              <p className="text-sm font-medium text-slate-100">{item.name}</p>
              <div className="mt-4 space-y-2 text-xs text-slate-300">
                <p className="flex justify-between">
                  <span>ROI</span>
                  <span className="text-emerald-300">{item.roi}</span>
                </p>
                <p className="flex justify-between">
                  <span>Risk</span>
                  <span>{item.risk}</span>
                </p>
                <p className="flex justify-between">
                  <span>Confidence</span>
                  <span className="text-[#8b86be]">{item.confidence}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </GlassCard>
  );
}


