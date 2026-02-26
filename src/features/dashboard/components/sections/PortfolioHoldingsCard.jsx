import { holdings } from '../../data/dashboardData';
import GlassCard from '../ui/GlassCard';

export default function PortfolioHoldingsCard() {
  return (
    <GlassCard>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Portfolio Holdings</h3>
          <p className="text-sm text-slate-400">Visible sample data for positions and mark-to-market values</p>
        </div>
        <div className="clay-card rounded-xl px-3 py-2 text-xs text-slate-300">Sample Data</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] text-left text-sm">
          <thead className="text-xs uppercase text-slate-400">
            <tr className="border-b border-white/10">
              <th className="pb-3 pr-4">Asset</th>
              <th className="pb-3 pr-4">Sector</th>
              <th className="pb-3 pr-4">Qty</th>
              <th className="pb-3 pr-4">Avg Cost</th>
              <th className="pb-3 pr-4">LTP</th>
              <th className="pb-3 pr-4">Market Value</th>
              <th className="pb-3">P&L</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((row) => {
              const marketValue = row.qty * row.ltp;
              const positive = row.pnl >= 0;

              return (
                <tr key={row.symbol} className="border-b border-white/5 text-slate-200 hover:bg-white/5">
                  <td className="py-3 pr-4">
                    <p className="font-medium">{row.symbol}</p>
                    <p className="text-xs text-slate-400">{row.name}</p>
                  </td>
                  <td className="py-3 pr-4">{row.sector}</td>
                  <td className="py-3 pr-4">{row.qty}</td>
                  <td className="py-3 pr-4">${row.avg.toFixed(2)}</td>
                  <td className="py-3 pr-4">${row.ltp.toFixed(2)}</td>
                  <td className="py-3 pr-4">${marketValue.toLocaleString()}</td>
                  <td className={`py-3 font-medium ${positive ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {positive ? '+' : '-'}${Math.abs(row.pnl).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
