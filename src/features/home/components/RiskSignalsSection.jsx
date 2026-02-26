import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
import { RISK_COLORS } from '../../../styles/colors';

const MotionDiv = motion.div;

const riskSignals = [
  {
    id: 'drawdown',
    title: 'Maximum Drawdown',
    value: '-12.5%',
    threshold: '-15%',
    status: 'high',
    description: 'Portfolio down 12.5% from peak',
    icon: AlertTriangle
  },
  {
    id: 'volatility',
    title: 'Volatility Index',
    value: '32.8',
    threshold: '30',
    status: 'high',
    description: 'Above normal market volatility',
    icon: Zap
  },
  {
    id: 'concentration',
    title: 'Sector Concentration',
    value: '45%',
    threshold: '40%',
    status: 'medium',
    description: 'Tech sector exposure above target',
    icon: AlertCircle
  },
  {
    id: 'exposure',
    title: 'Leverage Exposure',
    value: '1.2x',
    threshold: '1.5x',
    status: 'safe',
    description: 'Healthy leverage levels',
    icon: CheckCircle
  },
  {
    id: 'liquidity',
    title: 'Cash Liquidity',
    value: '18%',
    threshold: '15%',
    status: 'safe',
    description: 'Adequate reserves for rebalancing',
    icon: CheckCircle
  },
  {
    id: 'correlation',
    title: 'Portfolio Correlation',
    value: '0.68',
    threshold: '0.75',
    status: 'safe',
    description: 'Diversification healthy',
    icon: CheckCircle
  }
];

export default function RiskSignalsSection() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-4"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-100">Risk Signals & Monitoring</h3>
        <p className="mt-1 text-sm text-slate-400">Real-time portfolio health checks across key metrics</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {riskSignals.map((signal, index) => {
          const IconComponent = signal.icon;
          const statusColor = RISK_COLORS[signal.status];
          
          return (
            <MotionDiv
              key={signal.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/8"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-300">
                      {signal.title}
                    </p>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-slate-100">{signal.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{signal.description}</p>
                </div>
                <div
                  className="rounded-full p-2 transition"
                  style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                >
                  <IconComponent className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 h-1 w-full rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: statusColor }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(parseFloat(signal.value) / parseFloat(signal.threshold)) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.6 }}
                />
              </div>
            </MotionDiv>
          );
        })}
      </div>
    </MotionDiv>
  );
}
