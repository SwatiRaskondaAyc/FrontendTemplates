import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUp, BarChart3, PieChart, Sparkles, TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { sampleSectorSummaryData } from '../data/homeData';
import { CHART_COLORS } from '../../../styles/colors';

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionArticle = motion.article;
const MotionButton = motion.button;

const colors = CHART_COLORS;

function formatCurrency(value) {
  if (!value && value !== 0) return 'NA';
  if (value >= 1e7) return `Rs ${(value / 1e7).toFixed(1)} Cr`;
  if (value >= 1e5) return `Rs ${(value / 1e5).toFixed(1)} L`;
  return `Rs ${Number(value).toLocaleString('en-IN')}`;
}

export default function MarketCapBanner() {
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
  const [sectors, setSectors] = useState(sampleSectorSummaryData);
  const [selectedSector, setSelectedSector] = useState(sampleSectorSummaryData[0] || null);
  const [syncState, setSyncState] = useState('syncing');
  const [message, setMessage] = useState('Loading sample data instantly. Syncing live feed...');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('bar');

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4500);

    async function loadSectorData() {
      setSyncState('syncing');
      setMessage('Syncing live sector feed...');
      try {
        const response = await fetch(`${API_BASE}/landpage/sector-summary`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Live API unavailable. Using sample data.');
        }

        const payload = await response.json();
        const list = Array.isArray(payload?.data) ? payload.data : [];
        if (list.length === 0) {
          throw new Error('No live records. Using sample data.');
        }

        const sliced = list.slice(0, 10);
        setSectors(sliced);
        setSelectedSector((current) => sliced.find((item) => item.Sector === current?.Sector) || sliced[0]);
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

    loadSectorData();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [API_BASE]);

  const sortedSectors = useMemo(() => {
    const cloned = [...sectors];
    cloned.sort((a, b) =>
      sortOrder === 'desc'
        ? (b.SectorMarketCap || 0) - (a.SectorMarketCap || 0)
        : (a.SectorMarketCap || 0) - (b.SectorMarketCap || 0)
    );
    return cloned;
  }, [sectors, sortOrder]);

  const chartData = useMemo(
    () =>
      sortedSectors.map((sector, index) => ({
        name: sector.Sector,
        value: sector.SectorMarketCap || 0,
        color: colors[index % colors.length]
      })),
    [sortedSectors]
  );

  const totalMarketCap = useMemo(
    () => sortedSectors.reduce((sum, item) => sum + (item.SectorMarketCap || 0), 0),
    [sortedSectors]
  );

  return (
    <MotionSection
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="grid gap-6 px-4 pb-8 pt-8 lg:grid-cols-2 sm:px-6"
    >
      <MotionDiv className="space-y-5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-slate-300">
            <Sparkles className="h-4 w-4 text-[#d1de74]" />
            Sector Performance
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

        <h2 className="text-3xl font-semibold leading-tight text-slate-100 sm:text-4xl">
          Market Cap View for <span className="text-[#a1c14b]">Top Sectors</span>
        </h2>

        <p className="max-w-xl text-sm text-slate-300 sm:text-base">
          Analyze sector market cap distribution and compare momentum against one-year growth metrics using live or
          sample datasets.
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
            className="clay-card inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-200"
          >
            {sortOrder === 'desc' ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
            Sort: {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}
          </button>
          <button
            onClick={() => setViewMode((prev) => (prev === 'bar' ? 'pie' : 'bar'))}
            className="clay-card inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-200"
          >
            {viewMode === 'bar' ? <PieChart className="h-4 w-4" /> : <BarChart3 className="h-4 w-4" />}
            {viewMode === 'bar' ? 'Pie View' : 'Bar View'}
          </button>
        </div>

        <MotionArticle
          layout
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          className="clay-card rounded-2xl p-4 sm:p-5"
        >
          {selectedSector ? (
            <>
              <div className="mb-3">
                <p className="text-xs text-slate-400">Selected Sector</p>
                <h3 className="text-xl font-semibold text-slate-100">{selectedSector.Sector}</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <MotionDiv whileHover={{ y: -2 }} className="rounded-xl border border-white/10 bg-white/5 p-3 transition">
                  <p className="text-xs text-slate-400">Market Cap</p>
                  <p className="mt-1 text-sm font-medium text-slate-100">{formatCurrency(selectedSector.SectorMarketCap)}</p>
                </MotionDiv>
                <MotionDiv whileHover={{ y: -2 }} className="rounded-xl border border-white/10 bg-white/5 p-3 transition">
                  <p className="text-xs text-slate-400">TTM Growth</p>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      (selectedSector.SectorCAGR_1Y_MCap || 0) >= 0 ? 'text-[#d1de74]' : 'text-[#e0912f]'
                    }`}
                  >
                    {((selectedSector.SectorCAGR_1Y_MCap || 0) * 100).toFixed(2)}%
                  </p>
                </MotionDiv>
                <MotionDiv whileHover={{ y: -2 }} className="rounded-xl border border-white/10 bg-white/5 p-3 transition">
                  <p className="text-xs text-slate-400">PE Mode</p>
                  <p className="mt-1 text-sm font-medium text-slate-100">{selectedSector.SectorPE_Mode || 'NA'}</p>
                </MotionDiv>
                <MotionDiv whileHover={{ y: -2 }} className="rounded-xl border border-white/10 bg-white/5 p-3 transition">
                  <p className="text-xs text-slate-400">Companies</p>
                  <p className="mt-1 text-sm font-medium text-slate-100">{selectedSector.Companies?.Symbol?.length || 0}</p>
                </MotionDiv>
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400">No sector data available.</p>
          )}
        </MotionArticle>

        <p className="text-xs text-[#e0912f]">{message}</p>
      </MotionDiv>

      <MotionDiv className="clay-card rounded-2xl p-4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-100">Sector Chart</p>
          <p className="text-xs text-slate-400">Total: {formatCurrency(totalMarketCap)}</p>
        </div>

        <AnimatePresence mode="wait">
          <MotionDiv
            key={`${viewMode}-${sortOrder}-${syncState}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="h-[380px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'bar' ? (
                <BarChart data={chartData} margin={{ top: 8, right: 16, left: 8, bottom: 64 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
                  <XAxis
                    dataKey="name"
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                    height={72}
                    tick={{ fontSize: 11, fill: '#e3b849' }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#e3b849' }} tickFormatter={(value) => `${Math.round(value / 1e7)}Cr`} />
                  <Tooltip
                    formatter={(value) => [formatCurrency(value), 'Market Cap']}
                    contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.35)' }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} onClick={(_, idx) => setSelectedSector(sortedSectors[idx])}>
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <RePieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={65}
                    paddingAngle={2}
                    onClick={(_, idx) => setSelectedSector(sortedSectors[idx])}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [formatCurrency(value), 'Market Cap']}
                    contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(148,163,184,0.35)' }}
                  />
                </RePieChart>
              )}
            </ResponsiveContainer>
          </MotionDiv>
        </AnimatePresence>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {sortedSectors.slice(0, 4).map((sector, index) => (
            <MotionButton
              key={sector.Sector}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.04, 0.14) }}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedSector(sector)}
              className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left text-xs transition ${
                selectedSector?.Sector === sector.Sector
                  ? 'border-[#d1de74]/60 bg-[#d1de74]/15'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <span className="text-slate-200">{sector.Sector}</span>
              <span className="inline-flex items-center gap-1 text-[#d1de74]">
                <TrendingUp className="h-3.5 w-3.5" />
                {((sector.SectorCAGR_1Y_MCap || 0) * 100).toFixed(1)}%
              </span>
            </MotionButton>
          ))}
        </div>
      </MotionDiv>
    </MotionSection>
  );
}


