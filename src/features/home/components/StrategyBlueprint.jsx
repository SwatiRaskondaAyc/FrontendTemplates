import { motion } from 'framer-motion';
import { BarChart3, LogOut, TrendingUp, Zap } from 'lucide-react';
import { STRATEGY_COLORS } from '../../../styles/colors';
import ContentIllustration from '../../../components/illustrations/ContentIllustration';

const MotionDiv = motion.div;

const strategyBlocks = [
  {
    id: 'objectives',
    title: 'Objectives',
    description: 'Target: 12% CAGR with <15% volatility',
    icon: TrendingUp,
    color: STRATEGY_COLORS.objectives
  },
  {
    id: 'entries',
    title: 'Entry Points',
    description: 'Triggered on sector dips >5%',
    icon: BarChart3,
    color: STRATEGY_COLORS.entries
  },
  {
    id: 'exits',
    title: 'Exit Rules',
    description: 'Profit-take at +20% or stop at -8%',
    icon: LogOut,
    color: STRATEGY_COLORS.exits
  },
  {
    id: 'rebalance',
    title: 'Rebalance Cadence',
    description: 'Quarterly or trigger-based',
    icon: Zap,
    color: STRATEGY_COLORS.rebalance
  }
];

export default function StrategyBlueprint() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]"
    >
      <div className="rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(18,27,52,0.4),rgba(11,17,34,0.5))] p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Blueprint</p>
          <h3 className="mt-3 text-2xl font-semibold">Strategy Framework</h3>
          <p className="mt-2 text-sm text-slate-300">Define your investment plan with visual blocks for objectives, entries, exits, and rebalance cadence.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {strategyBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <MotionDiv
                key={block.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20"
              >
                <div
                  className="mb-3 inline-flex rounded-lg p-2 transition"
                  style={{ backgroundColor: `${block.color}20`, color: block.color }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <h4 className="font-semibold text-slate-100">{block.title}</h4>
                <p className="mt-1 text-xs text-slate-400">{block.description}</p>
              </MotionDiv>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm transition hover:border-white/30 hover:bg-white/10">
            <TrendingUp className="h-4 w-4" style={{ color: STRATEGY_COLORS.objectives }} />
            View Full Plan
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6">
        <ContentIllustration type="strategy" />
      </div>
    </MotionDiv>
  );
}
