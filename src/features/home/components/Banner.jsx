import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, Code2, Factory, HeartPulse, PieChart, Sparkles, X } from 'lucide-react';
import { sampleIndustryDividendData } from '../data/homeData';

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionArticle = motion.article;
const MotionButton = motion.button;

const industryIcons = {
  'Pharmaceuticals & Drugs': HeartPulse,
  'IT - Software': Code2,
  'Finance - NBFC': Building2,
  'Automobiles - Passenger Cars': Factory
};

function parseDividendBracket(bracket) {
  if (!bracket || typeof bracket !== 'string') return 0;
  const cleaned = bracket.replace(/[()[\]]/g, '').replace(/\s+/g, '');
  const parts = cleaned.split(',').map(Number);
  if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) return 0;
  return (parts[0] + parts[1]) / 2;
}

function formatDividendBracket(bracket) {
  if (!bracket) return 'N/A';
  const cleaned = bracket.replace(/[()[\]]/g, '');
  const values = cleaned.split(',').map((value) => Number(value));
  if (values.length !== 2 || Number.isNaN(values[0]) || Number.isNaN(values[1])) return 'N/A';
  return `${(values[0] * 100).toFixed(2)}% - ${(values[1] * 100).toFixed(2)}%`;
}

function getHeatColor(intensity) {
  const clamped = Math.max(0.1, Math.min(1, intensity));
  // Blend from white (255, 255, 255) to #a1c14b (161, 193, 75)
  const r = Math.round(255 - (255 - 161) * clamped);
  const g = Math.round(255 - (255 - 193) * clamped);
  const b = Math.round(255 - (255 - 75) * clamped);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function Banner() {
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
  const sampleIndustries = useMemo(
    () =>
      sampleIndustryDividendData.map((item) => ({
        ...item,
        bracketAvg: parseDividendBracket(item.DividendBracket)
      })),
    []
  );

  const [industries, setIndustries] = useState(sampleIndustries);
  const [selectedIndustry, setSelectedIndustry] = useState(sampleIndustries[0] || null);
  const [syncState, setSyncState] = useState('syncing');
  const [message, setMessage] = useState('Loading sample data instantly. Syncing live feed...');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4500);

    async function loadIndustryData() {
      setSyncState('syncing');
      setMessage('Syncing live dividend feed...');

      try {
        const response = await fetch(`${API_BASE}/landpage/industry-dividend-yield`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Live API unavailable. Using sample data.');
        }

        const payload = await response.json();
        const list = Array.isArray(payload?.data) ? payload.data : [];
        const normalized = list
          .filter((item) => item?.industry && item?.DividendBracket)
          .map((item) => ({
            ...item,
            bracketAvg: parseDividendBracket(item.DividendBracket)
          }));

        if (normalized.length === 0) {
          throw new Error('No live records. Using sample data.');
        }

        const sliced = normalized.slice(0, 25);
        setIndustries(sliced);
        setSelectedIndustry((current) => sliced.find((item) => item.industry === current?.industry) || sliced[0]);
        setSyncState('live');
        setMessage('Live data connected.');
      } catch (err) {
        if (err.name === 'AbortError') {
          setSyncState('sample');
          setMessage('Live API timed out. Showing sample data.');
          return;
        }
        setSyncState('sample');
        setMessage(err.message || 'Showing sample data.');
      } finally {
        clearTimeout(timeoutId);
      }
    }

    loadIndustryData();
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [API_BASE]);

  const maxBracket = useMemo(() => {
    const values = industries.map((item) => item.bracketAvg || 0);
    const max = Math.max(...values, 0);
    return max || 1;
  }, [industries]);

  return (
    <>
      <MotionSection
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full grid gap-6 px-4 pb-8 pt-8 lg:grid-cols-2 sm:px-6"
      >
        <MotionDiv
          className="space-y-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-slate-300">
              <Sparkles className="h-4 w-4 text-[#d1de74]" />
              Dividend Intelligence
            </div>
            <div
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] ${
                syncState === 'live'
                  ? 'border-[#d1de74]/50 bg-[#d1de74]/15 text-[#d1de74]'
                  : 'border-[#e0912f]/45 bg-[#e0912f]/15 text-[#e0912f]'
              }`}
            >
              {syncState === 'live' ? 'LIVE' : 'SAMPLE'}
              {syncState === 'syncing' ? ' | SYNCING' : ''}
            </div>
          </div>

          <h1 className="text-3xl font-semibold leading-tight text-slate-100 sm:text-5xl">
            Capital Market <span className="text-[#d1de74]">Data Analytics</span> for Strategic Portfolios
          </h1>
          <p className="max-w-xl text-sm text-slate-300 sm:text-base">
            Track sector income opportunities, monitor dividend yield clusters, and turn sample or live API data into
            actionable allocation plans.
          </p>

          <MotionDiv
            layout
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
            className="w-full clay-card rounded-2xl p-4 sm:p-5"
          >
            {selectedIndustry ? (
              <div>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-400">Selected Industry</p>
                    <h3 className="text-lg font-semibold text-slate-100">{selectedIndustry.industry}</h3>
                  </div>
                  <button
                    onClick={() => setShowAll(true)}
                    className="group inline-flex items-center gap-1 text-xs text-slate-300 hover:text-[#d1de74]"
                  >
                    View More
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <MotionArticle
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 transition"
                  >
                    <p className="text-xs text-slate-400">Dividend Range</p>
                    <p className="mt-1 text-sm font-medium text-slate-100">
                      {formatDividendBracket(selectedIndustry.DividendBracket)}
                    </p>
                  </MotionArticle>
                  <MotionArticle
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 transition"
                  >
                    <p className="text-xs text-slate-400">Average Yield</p>
                    <p className="mt-1 text-sm font-medium text-slate-100">
                      {((selectedIndustry.AvgDividendYield || 0) * 100).toFixed(2)}%
                    </p>
                  </MotionArticle>
                  <MotionArticle
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 transition"
                  >
                    <p className="text-xs text-slate-400">Range Frequency</p>
                    <p className="mt-1 text-sm font-medium text-slate-100">{selectedIndustry.CountInBracket || 0}</p>
                  </MotionArticle>
                  <MotionArticle
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 transition"
                  >
                    <p className="text-xs text-slate-400">Company Count</p>
                    <p className="mt-1 text-sm font-medium text-slate-100">{selectedIndustry.CompanyCount || 0}</p>
                  </MotionArticle>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">No data available.</p>
            )}
          </MotionDiv>

          <p className="text-xs text-[#e0912f]">{message}</p>
        </MotionDiv>

        <MotionDiv
          className="clay-card rounded-2xl p-3 sm:p-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-100">Dividend Heatmap</p>
            <p className="text-xs text-slate-400">Top {industries.length} industries</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((industry, index) => {
              const intensity = (industry.bracketAvg || 0) / maxBracket;
              const Icon = industryIcons[industry.industry] || PieChart;
              const isSelected = selectedIndustry?.industry === industry.industry;

              return (
                <MotionButton
                  key={industry.industry}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.02, 0.25) }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`rounded-xl border p-3 text-left transition ${
                    isSelected ? 'border-[#8b86be]/70 ring-1 ring-[#8b86be]/40' : 'border-transparent'
                  }`}
                  style={{ background: getHeatColor(intensity) }}
                >
                  <Icon className="mb-2 h-4 w-4 text-slate-900" />
                  <p className="line-clamp-2 text-xs font-medium text-slate-900">{industry.industry}</p>
                  <p className="mt-1 text-[11px] text-slate-700">{formatDividendBracket(industry.DividendBracket)}</p>
                </MotionButton>
              );
            })}
          </div>
        </MotionDiv>
      </MotionSection>

      <AnimatePresence>
        {showAll && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setShowAll(false)}
          >
            <MotionDiv
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="clay-card max-h-[80vh] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <h3 className="text-lg font-semibold text-slate-100">Industry Dividend Details</h3>
                <button
                  onClick={() => setShowAll(false)}
                  className="rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="overflow-auto p-4">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {industries.map((item) => (
                    <article key={item.industry} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="text-sm font-semibold text-slate-100">{item.industry}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-300">
                        <p>Range: {formatDividendBracket(item.DividendBracket)}</p>
                        <p>Avg: {((item.AvgDividendYield || 0) * 100).toFixed(2)}%</p>
                        <p>Freq: {item.CountInBracket || 0}</p>
                        <p>Companies: {item.CompanyCount || 0}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}

