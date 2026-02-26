import { motion } from 'framer-motion';
import { Activity, Coins, TrendingUp, Zap } from 'lucide-react';
import { PORTFOLIO_COLORS, COLORS } from '../../../styles/colors';
import ContentIllustration from '../../../components/illustrations/ContentIllustration';

const MotionDiv = motion.div;

const portfolioSleeves = [
  {
    id: 'equity',
    title: 'Equity Sleeve',
    allocation: 50,
    description: 'Growth-focused, index + active',
    icon: TrendingUp,
    color: PORTFOLIO_COLORS.equity,
    items: ['Large Cap', 'Mid Cap', 'Small Cap', 'Emerging']
  },
  {
    id: 'fixed',
    title: 'Fixed Income',
    allocation: 30,
    description: 'Bonds & Government securities',
    icon: Coins,
    color: PORTFOLIO_COLORS.fixed,
    items: ['Bonds', 'G-Secs', 'Debentures']
  },
  {
    id: 'commodity',
    title: 'Commodities',
    allocation: 12,
    description: 'Hedge and diversification',
    icon: Activity,
    color: PORTFOLIO_COLORS.commodity,
    items: ['Gold', 'Silver', 'Crude']
  },
  {
    id: 'cash',
    title: 'Cash Reserve',
    allocation: 8,
    description: 'Liquidity for opportunities',
    icon: Coins,
    color: PORTFOLIO_COLORS.cash,
    items: ['FD', 'Money Market']
  }
];

export default function PortfolioMix() {
  const totalAllocation = portfolioSleeves.reduce((sum, item) => sum + item.allocation, 0);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-6 lg:grid-cols-[0.9fr_1.3fr]"
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
        <ContentIllustration type="portfolio" />
      </div>

      <div className="rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(18,27,52,0.4),rgba(11,17,34,0.5))] p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Allocation</p>
          <h3 className="mt-3 text-2xl font-semibold">Portfolio Mix</h3>
          <p className="mt-2 text-sm text-slate-300">Your capital distributed across diversified sleeves for balanced risk-adjusted returns.</p>
        </div>

        <div className="space-y-4">
          {portfolioSleeves.map((sleeve, index) => {
            const Icon = sleeve.icon;
            const percentage = (sleeve.allocation / totalAllocation) * 100;

            return (
              <MotionDiv
                key={sleeve.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-lg p-2"
                      style={{ backgroundColor: `${sleeve.color}20`, color: sleeve.color }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-100">{sleeve.title}</h4>
                      <p className="text-xs text-slate-400">{sleeve.description}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold" style={{ color: sleeve.color }}>
                    {sleeve.allocation}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: sleeve.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 + 0.1, duration: 0.6 }}
                  />
                </div>

                {/* Sub-items */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {sleeve.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg px-2 py-1 text-[11px] font-medium text-slate-300"
                      style={{ backgroundColor: `${sleeve.color}15` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </MotionDiv>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-300">Total Allocation</span>
            <span className="text-2xl font-bold text-slate-100">{totalAllocation}%</span>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
