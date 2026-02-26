import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { palette } from '../../data/dashboardData';
import GlassCard from '../ui/GlassCard';
import Skeleton from '../ui/Skeleton';

export default function PerformanceCard({ range, setRange, data, loading }) {
  return (
    <GlassCard className="min-h-[360px]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Portfolio Performance</h3>
          <p className="text-sm text-slate-400">Net value trend (USD, millions)</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-1">
          {['1W', '1M', '1Y'].map((option) => (
            <button
              key={option}
              onClick={() => setRange(option)}
              className={`rounded-lg px-3 py-1.5 text-xs transition ${
                range === option ? 'bg-[#8b86be]/20 text-[#8b86be]' : 'text-slate-300 hover:text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Skeleton className="h-64" />
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={palette.blue} stopOpacity={0.45} />
                  <stop offset="95%" stopColor={palette.blue} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: '#e3b849', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#e3b849', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ stroke: '#64748b', strokeWidth: 1, strokeDasharray: '4 4' }}
                contentStyle={{
                  border: '1px solid rgba(148,163,184,0.2)',
                  borderRadius: '12px',
                  background: 'var(--surface-nav)',
                  color: 'var(--text-base)'
                }}
              />
              <Area type="monotone" dataKey="value" stroke={palette.blue} fill="url(#portfolioFill)" strokeWidth={2.5} animationDuration={1000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </GlassCard>
  );
}


