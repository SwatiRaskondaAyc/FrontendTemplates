import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CandlestickChart, Sparkles } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { sampleCandlestickData } from '../data/homeData';
import ProfileWorkflowIllustration from '../../../components/illustrations/ProfileWorkflowIllustration';

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionButton = motion.button;

const ranges = ['1D', '1W', '1M'];

function buildChartPoints(data, width, height, padding) {
  const highs = data.map((d) => d.high);
  const lows = data.map((d) => d.low);
  const max = Math.max(...highs);
  const min = Math.min(...lows);
  const span = Math.max(max - min, 1);

  return data.map((candle, index) => {
    const xStep = (width - padding * 2) / Math.max(data.length, 1);
    const x = padding + xStep * index + xStep / 2;
    const scaleY = (value) => padding + ((max - value) / span) * (height - padding * 2);
    return {
      ...candle,
      x,
      bodyTop: scaleY(Math.max(candle.open, candle.close)),
      bodyBottom: scaleY(Math.min(candle.open, candle.close)),
      highY: scaleY(candle.high),
      lowY: scaleY(candle.low)
    };
  });
}

export default function HomeCandlestickDemo() {
  const [range, setRange] = useState('1W');
  const [activeIndex, setActiveIndex] = useState(0);

  const dataset = sampleCandlestickData[range];
  const activeCandle = dataset[activeIndex] || dataset[0];

  const points = useMemo(() => buildChartPoints(dataset, 860, 320, 28), [dataset]);

  return (
    <MotionSection
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6"
      aria-label="EquityInsights candlestick demo"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#d1de74]/12 via-[#f3ce6e]/10 to-[#a1c14b]/10 p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#e0912f]/20 blur-[70px]" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#a1c14b]/20 blur-[65px]" />

        <header className="relative z-10 mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-[#e0912f]" />
              EquityInsights Demo
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl">
              Explore Candlestick Intelligence
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Understand open/high/low/close behavior and spot momentum zones before placing decisions.
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#d1de74]">
              <CandlestickChart className="h-3.5 w-3.5" />
              EquityInsights pattern explorer
            </p>
          </div>

          <div className="flex items-center gap-2">
            {ranges.map((option) => (
              <MotionButton
                key={option}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setRange(option);
                  setActiveIndex(0);
                }}
                className={`rounded-lg px-3 py-1.5 text-xs transition ${
                  range === option ? 'bg-[#d1de74]/25 text-[#d1de74]' : 'bg-white/5 text-slate-300 hover:text-slate-100'
                }`}
              >
                {option}
              </MotionButton>
            ))}
          </div>
        </header>

        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.08, duration: 0.35 }}
          className="relative z-10 overflow-x-auto rounded-2xl border border-white/10 bg-[#0b1226]/35 p-3"
        >
          <svg viewBox="0 0 860 320" className="h-[320px] min-w-[820px] w-full">
            <rect x="0" y="0" width="860" height="320" fill="transparent" />
            {[1, 2, 3, 4].map((line) => (
              <line
                key={line}
                x1="28"
                y1={line * 56}
                x2="832"
                y2={line * 56}
                stroke="rgba(255,255,255,0.09)"
                strokeDasharray="4 4"
              />
            ))}

            {points.map((point, index) => {
              const bullish = point.close >= point.open;
              const candleColor = bullish ? '#d1de74' : '#d23d3d';
              const bodyHeight = Math.max(point.bodyBottom - point.bodyTop, 3);

              return (
                <g key={`${point.time}-${index}`} onMouseEnter={() => setActiveIndex(index)} style={{ cursor: 'pointer' }}>
                  <line x1={point.x} x2={point.x} y1={point.highY} y2={point.lowY} stroke={candleColor} strokeWidth="2" />
                  <rect
                    x={point.x - 14}
                    y={point.bodyTop}
                    width="28"
                    height={bodyHeight}
                    rx="4"
                    fill={candleColor}
                    opacity={activeIndex === index ? 1 : 0.82}
                  />
                  <text x={point.x} y="305" textAnchor="middle" fontSize="11" fill="#e3b849">
                    {point.time}
                  </text>
                </g>
              );
            })}
          </svg>
        </MotionDiv>

        <div className="relative z-10 mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-slate-400">Selected Candle</p>
              <div className="mt-2 grid gap-2 text-sm text-slate-200 sm:grid-cols-3">
                <p>
                  Open: <span className="text-[#a1c14b]">{activeCandle.open}</span>
                </p>
                <p>
                  High: <span className="text-[#d1de74]">{activeCandle.high}</span>
                </p>
                <p>
                  Low: <span className="text-[#deb0bd]">{activeCandle.low}</span>
                </p>
                <p>
                  Close: <span className="text-[#e0912f]">{activeCandle.close}</span>
                </p>
                <p>Volume: {activeCandle.volume}</p>
                <p className="inline-flex items-center gap-1">
                  <BarChart3 className="h-3.5 w-3.5 text-[#d1de74]" />
                  Price Action Node
                </p>
              </div>
            </div>

            <Button type="button" className="md:min-w-[170px]">
              Explore More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <MotionDiv
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Illustration Preview</p>
            <ProfileWorkflowIllustration type="login" />
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}
