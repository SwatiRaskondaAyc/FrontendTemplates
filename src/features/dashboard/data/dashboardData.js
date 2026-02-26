import {
  Activity,
  BarChart3,
  LayoutDashboard,
  LineChart,
  PenTool,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Wallet
} from 'lucide-react';

export const palette = {
  blue: '#d1de74',      // Primary lime green
  green: '#a1c14b',     // Secondary olive
  lime: '#f3ce6e',      // Tertiary light yellow
  orange: '#e0912f',    // Quaternary orange
  gold: '#e3b849'       // Golden text color for charts/analysis
};

export const sidebarMenu = [
  { label: 'Home', icon: LayoutDashboard, path: '/home' },
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Create', icon: PenTool, path: '/create' },
  { label: 'Portfolio', icon: Wallet },
  { label: 'Analysis', icon: LineChart },
  { label: 'Strategy Builder', icon: Target },
  { label: 'AI Insights', icon: Sparkles },
  { label: 'Reports', icon: BarChart3 },
  { label: 'Settings', icon: Settings }
];

export const kpis = [
  { title: 'Total Portfolio Value', value: '$14.82M', delta: '+2.8%', icon: Wallet, trend: 'up' },
  { title: 'P&L', value: '+$324.9K', delta: '+1.4%', icon: TrendingUp, trend: 'up' },
  { title: 'Risk Score', value: '67 / 100', delta: '-4.1%', icon: Activity, trend: 'down' },
  { title: 'Active Strategies', value: '12', delta: '+3', icon: Target, trend: 'up' }
];

export const performanceSeries = {
  '1W': [
    { date: 'Mon', value: 13.9 },
    { date: 'Tue', value: 14.1 },
    { date: 'Wed', value: 14.0 },
    { date: 'Thu', value: 14.3 },
    { date: 'Fri', value: 14.2 },
    { date: 'Sat', value: 14.5 },
    { date: 'Sun', value: 14.82 }
  ],
  '1M': [
    { date: 'W1', value: 13.2 },
    { date: 'W2', value: 13.7 },
    { date: 'W3', value: 14.0 },
    { date: 'W4', value: 14.82 }
  ],
  '1Y': [
    { date: 'Jan', value: 10.4 },
    { date: 'Feb', value: 10.9 },
    { date: 'Mar', value: 11.3 },
    { date: 'Apr', value: 11.0 },
    { date: 'May', value: 11.7 },
    { date: 'Jun', value: 12.2 },
    { date: 'Jul', value: 12.7 },
    { date: 'Aug', value: 13.1 },
    { date: 'Sep', value: 13.4 },
    { date: 'Oct', value: 13.8 },
    { date: 'Nov', value: 14.2 },
    { date: 'Dec', value: 14.82 }
  ]
};

export const sectorAllocation = [
  { name: 'Technology', value: 34, color: palette.blue },
  { name: 'Financials', value: 22, color: palette.green },
  { name: 'Healthcare', value: 18, color: palette.lime },
  { name: 'Energy', value: 14, color: palette.orange },
  { name: 'Consumer', value: 12, color: palette.gold }
];

export const assetClassData = [
  { name: 'Equity', value: 58, color: palette.blue },
  { name: 'ETF', value: 20, color: palette.green },
  { name: 'Debt', value: 10, color: palette.lime },
  { name: 'Cash', value: 7, color: palette.orange },
  { name: 'Alternatives', value: 5, color: palette.gold }
];

export const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', qty: 420, avg: 178.1, ltp: 191.2, pnl: 5502 },
  { symbol: 'MSFT', name: 'Microsoft', sector: 'Technology', qty: 260, avg: 402.7, ltp: 417.3, pnl: 3796 },
  { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Financials', qty: 350, avg: 188.4, ltp: 183.8, pnl: -1610 },
  { symbol: 'UNH', name: 'UnitedHealth', sector: 'Healthcare', qty: 180, avg: 502.5, ltp: 521.9, pnl: 3492 },
  { symbol: 'XOM', name: 'Exxon Mobil', sector: 'Energy', qty: 600, avg: 109.6, ltp: 115.2, pnl: 3360 }
];

export const riskAlerts = [
  { title: 'Volatility spike in Small-Cap Basket', level: 'High', description: 'Beta crossed 1.35 in last 24h.' },
  { title: 'Concentration risk in Tech', level: 'Medium', description: 'Sector weight now above mandate by 3.2%.' },
  { title: 'Liquidity warning on debt sleeve', level: 'Low', description: 'Bid/ask spread widened by 9 bps.' }
];

export const strategyRecommendationsByRange = {
  '1W': [],
  '1M': [
    { name: 'Momentum Pulse v4', roi: '12.4%', risk: 'Moderate', confidence: '82%' },
    { name: 'Hedged Alpha Basket', roi: '9.1%', risk: 'Low', confidence: '77%' },
    { name: 'Sector Rotation AI', roi: '15.8%', risk: 'Moderate', confidence: '85%' },
    { name: 'Macro Regime Blend', roi: '18.1%', risk: 'Moderate', confidence: '81%' },
    { name: 'Options Overlay Guard', roi: '11.7%', risk: 'Low', confidence: '79%' },
    { name: 'Long Horizon Compounder', roi: '22.5%', risk: 'High', confidence: '74%' }
  ],
  '1Y': [
    { name: 'Macro Regime Blend', roi: '18.1%', risk: 'Moderate', confidence: '81%' },
    { name: 'Options Overlay Guard', roi: '11.7%', risk: 'Low', confidence: '79%' },
    { name: 'Long Horizon Compounder', roi: '22.5%', risk: 'High', confidence: '74%' }
  ]
};

export const severityClasses = {
  High: 'bg-rose-500/20 text-rose-300 border-rose-300/40',
  Medium: 'bg-amber-500/20 text-amber-300 border-amber-300/40',
  Low: 'bg-[#8b86be]/20 text-[#8b86be] border-[#8b86be]/40'
};
