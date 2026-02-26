// CENTRALIZED COLOR PALETTE
// Update these colors and they automatically apply throughout the entire website
export const COLOR_PALETTE = {
  primary: '#d1de74',      // Lime green - Primary accent
  secondary: '#a1c14b',    // Dark olive - Secondary accent
  tertiary: '#1a1a19',     // Dark brown - Tertiary/Neutral
  quaternary: '#e0912f',   // Orange - Quaternary accent
  danger: '#d23d3d',       // Red - Alert/Risk/Danger
  golden: '#e3b849',       // Golden/Tan - Plots/Analysis text color
};

// Primary color palette for the entire application
export const COLORS = COLOR_PALETTE;

// Chart colors for data visualization
export const CHART_COLORS = [
  COLORS.primary,    // #d1de74
  COLORS.secondary,  // #a1c14b
  COLORS.quaternary, // #e0912f
  COLORS.danger,     // #d23d3d
  COLORS.tertiary,   // #1a1a19
  COLORS.golden,     // #e3b849
];

// Risk signal colors - mapped by severity
export const RISK_COLORS = {
  critical: COLORS.danger,      // #d23d3d - Red
  high: COLORS.quaternary,      // #e0912f - Orange
  medium: COLORS.primary,       // #d1de74 - Lime green
  low: COLORS.secondary,        // #a1c14b - Olive
  safe: COLORS.primary,         // #d1de74 - Lime green
};

// Strategy blueprint colors - mapped by phase
export const STRATEGY_COLORS = {
  objectives: COLORS.primary,    // #d1de74
  entries: COLORS.secondary,     // #a1c14b
  exits: COLORS.danger,          // #d23d3d
  rebalance: COLORS.quaternary,  // #e0912f
  monitoring: COLORS.tertiary,   // #1a1a19
};

// Portfolio allocation colors - mapped by asset class
export const PORTFOLIO_COLORS = {
  equity: COLORS.primary,        // #d1de74
  fixed: COLORS.secondary,       // #a1c14b
  commodity: COLORS.quaternary,  // #e0912f
  cash: COLORS.tertiary,         // #1a1a19
  alternative: COLORS.danger,    // #d23d3d
};

// Navigation and UI colors
export const UI_COLORS = {
  nav: COLORS.primary,           // Navigation highlights
  active: COLORS.primary,        // Active states
  hover: COLORS.secondary,       // Hover states
  disabled: COLORS.tertiary,     // Disabled states
  border: '#ffffff20',           // Subtle borders
  background: '#0f172a',         // Dark background
};

// Chart and analysis text colors
export const TEXT_COLORS = {
  plot: COLORS.golden,           // #e3b849 - Plot/chart labels and text
  axis: COLORS.golden,           // #e3b849 - Axis labels
  analysis: COLORS.golden,       // #e3b849 - Analysis section text
  hover: COLORS.primary,         // Primary color for hover states
};

// Gradient configurations using the palette
export const GRADIENTS = {
  primary: `from-[${COLORS.primary}] via-[${COLORS.secondary}] to-[${COLORS.quaternary}]`,
  accent: `from-[${COLORS.secondary}] via-[${COLORS.primary}] to-[${COLORS.tertiary}]`,
  danger: `from-[${COLORS.danger}] to-[${COLORS.quaternary}]`,
};

// Opacities for the primary color
export const COLOR_OPACITIES = {
  full: COLORS.primary,
  75: `${COLORS.primary}BF`,
  50: `${COLORS.primary}80`,
  25: `${COLORS.primary}40`,
  10: `${COLORS.primary}1A`,
  5: `${COLORS.primary}0D`,
};
