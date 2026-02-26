import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { assetClassData, sectorAllocation } from '../../data/dashboardData';
import GlassCard from '../ui/GlassCard';
import Skeleton from '../ui/Skeleton';

export default function AllocationCard({ loading }) {
  return (
    <GlassCard className="min-h-[360px]">
      <h3 className="mb-1 text-lg font-semibold">Allocation</h3>
      <p className="mb-5 text-sm text-slate-400">Sector and asset distribution</p>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-52" />
          <Skeleton className="h-52" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sectorAllocation} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={54} outerRadius={78} paddingAngle={2} animationDuration={900}>
                  {sectorAllocation.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    border: '1px solid rgba(148,163,184,0.2)',
                    borderRadius: '12px',
                    background: 'var(--surface-nav)',
                    color: 'var(--text-base)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assetClassData}>
                <XAxis dataKey="name" tick={{ fill: '#e3b849', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#e3b849', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    border: '1px solid rgba(148,163,184,0.2)',
                    borderRadius: '12px',
                    background: 'var(--surface-nav)',
                    color: 'var(--text-base)'
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={900}>
                  {assetClassData.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
