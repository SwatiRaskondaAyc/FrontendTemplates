# 🎨 Centralized Color System Guide

## Overview

This project uses a **centralized color palette** system. Change colors in **ONE place** and they automatically apply throughout the website.

---

## Color Configuration File

**Location:** `src/styles/colors.js`

### Current Color Palette

```javascript
export const COLOR_PALETTE = {
  primary: "#d1de74", // Lime green - Primary accent
  secondary: "#a1c14b", // Dark olive - Secondary accent
  tertiary: "#1a1a19", // Dark brown - Tertiary/Neutral
  quaternary: "#e0912f", // Orange - Quaternary accent
  danger: "#d23d3d", // Red - Alert/Risk/Danger
  golden: "#e3b849", // Golden/Tan - Plots/Analysis text
};
```

---

## How to Change Colors

### Step 1: Update `COLOR_PALETTE` in `src/styles/colors.js`

Simply update the hex values in the `COLOR_PALETTE` object:

```javascript
export const COLOR_PALETTE = {
  primary: "#NEW_COLOR_1", // Change this
  secondary: "#NEW_COLOR_2", // And this
  tertiary: "#NEW_COLOR_3", // And this
  quaternary: "#NEW_COLOR_4", // And this
  danger: "#NEW_COLOR_5", // And this
};
```

All other color maps (CHART_COLORS, RISK_COLORS, STRATEGY_COLORS, etc.) automatically use these values.

---

## Where Colors Are Used

### 1. **SVG Illustrations** (Automatically Updated)

These components import colors from `colors.js` and update instantly:

- `src/components/illustrations/ProfileWorkflowIllustration.jsx`
- `src/components/illustrations/ContentIllustration.jsx`

### 2. **Dynamic Components with Inline Styles** (Automatically Updated)

- `src/features/home/components/UploadWorkspace.jsx` - Uses inline styles
- `src/features/home/components/Banner.jsx` - Uses heat color function
- `src/features/home/components/RiskSignalsSection.jsx` - Uses risk colors

### 3. **CSS/Tailwind Classes** (Manual Update Required)

These files use hardcoded hex values in Tailwind class names. Update them when you change colors:

#### Files to Update When Changing Colors:

- `src/features/home/components/MarketCapBanner.jsx`
- `src/features/home/components/HomeNavbar.jsx`
- `src/features/home/components/BannerSlider.jsx`
- `src/features/home/components/Banner.jsx`
- `src/features/home/components/HomeCandlestickDemo.jsx`
- `src/features/home/components/HomeExploreSections.jsx`
- `src/features/dashboard/components/layout/Sidebar.jsx`
- `src/features/dashboard/components/layout/TopBar.jsx`
- `src/features/dashboard/data/dashboardData.js`

---

## Quick Color Identifier Guide (Understanding `bg-[#d1de74]/20`)

When you see a Tailwind class like `bg-[#d1de74]/20`, here's how to interpret it:

```
bg-[#d1de74]/20
│   │         │
│   │         └─ Opacity: /20 = 20% opacity (full opacity is /100)
│   └─ Color HEX value (find this in COLOR_PALETTE)
└─ Tailwind utility: bg = background color, text = text color, border = border color, etc.
```

### Color Mapping Quick Reference

```
#d1de74  → primary (lime green)
#a1c14b  → secondary (olive)
#1a1a19  → tertiary (dark brown)
#e0912f  → quaternary (orange)
#d23d3d  → danger (red)
#e3b849  → golden (tan/gold - for plots/analysis)
```

**Example:**

- `bg-[#d1de74]/20` = Primary color at 20% opacity (very light mint background)
- `text-[#d1de74]` = Primary color at 100% opacity (bright mint text)
- `text-[#e3b849]` = Golden color (visible on light backgrounds for charts)

---

## Contrast & Readability Rules

### ✅ GOOD CONTRAST (Use These)

- Dark text on light backgrounds: `text-[#e3b849]` (golden) on light heatmap cards
- Light text on dark backgrounds: `text-slate-100` on dark chart backgrounds
- Bright accent colors on neutral: `text-[#d1de74]` (bright) on dark backgrounds

### ❌ BAD CONTRAST (Avoid These)

- Dark colors on dark backgrounds: `text-[#1a1a19]` on dark chart = not visible
- Light colors on light backgrounds: `text-white` on white = not visible
- Using same color for background AND text: `bg-[#d1de74]` + `text-[#d1de74]` = no contrast

---

## Color Usage by Purpose

### Primary Color (#d1de74)

- Main navigation links
- Primary buttons
- Active states
- Key highlights
- Chart components

### Secondary Color (#a1c14b)

- Secondary buttons
- Alternative accents
- Hover states
- Chart bars/segments

### Tertiary Color (#1a1a19)

- Text/typography
- Neutral elements
- Backgrounds
- Disabled states

### Quaternary Color (#e0912f)

- Warnings
- Attention-grabbing elements
- Orange accents
- Alerts (non-critical)

### Danger Color (#d23d3d)

- Critical alerts
- Risk indicators
- Error states
- Destructive actions

### Golden Color (#e3b849)

- Plot and chart axis labels (✓ NOT black)
- Analysis data text
- Heatmap card text
- Chart value labels

---

## 📊 Detailed Component Usage Guide

### Charts & Data Visualization

**Rule:** Never use black (#000) for chart text or labels. Use golden (#e3b849)

✅ **Correct:**

```jsx
<XAxis tick={{ fill: '#e3b849', fontSize: 12 }} />  // Golden text
<YAxis tick={{ fill: '#e3b849', fontSize: 12 }} />  // Golden text visible on dark background
<CartesianGrid stroke="rgba(148,163,184,0.25)" />  // Subtle gray gridlines
```

❌ **Wrong:**

```jsx
<XAxis tick={{ fill: '#000000' }} />  // Black = not visible on dark charts
<XAxis tick={{ fill: '#1a1a19' }} />  // Dark tertiary = not visible
```

### Heatmap Cards (Light Background = Dark Text Problem ⚠️)

**Rule:** Light backgrounds need contrast color text

✅ **Correct:**

```jsx
style={{ background: getHeatColor(intensity) }}  // Light background
<Icon className="text-[#e3b849]" />  // Golden text = visible on light card
<p className="text-[#e3b849]">Text here</p>  // Golden = stands out
```

❌ **Wrong:**

```jsx
style={{ background: getHeatColor(intensity) }}  // Light background
<Icon className="text-slate-900" />  // Dark text barely visible
<p className="text-slate-700">Text</p>  // Can't read
```

### Risk Section (Red Background)

✅ **Correct:**

```jsx
className = "rounded-lg bg-[#d23d3d]/10 px-3 py-2 text-[#d23d3d]";
// Light red background + bright red text = visible
```

### Success Section (Primary Green Background)

✅ **Correct:**

```jsx
className = "rounded-lg bg-[#d1de74]/20 px-3 py-2 text-[#d1de74]";
// Very light green + bright green = visible
```

---

## Available Color Exports

```javascript
// All defined in src/styles/colors.js

export const COLORS; // Main palette
export const CHART_COLORS; // For charts/graphs (includes golden color)
export const TEXT_COLORS; // Plot/analysis text colors
export const RISK_COLORS; // Risk severity (critical, high, medium, low, safe)
export const STRATEGY_COLORS; // Strategy phases (objectives, entries, exits, rebalance, monitoring)
export const PORTFOLIO_COLORS; // Asset classes (equity, fixed, commodity, cash, alternative)
export const UI_COLORS; // UI states (nav, active, hover, disabled, border, background)
export const GRADIENTS; // Pre-built gradient configurations
export const COLOR_OPACITIES; // Opacity variations of primary color
```

---

## Example: Updating a Color

### Before:

```javascript
export const COLOR_PALETTE = {
  primary: "#d1de74", // Old lime green
  // ... other colors
};
```

### After:

```javascript
export const COLOR_PALETTE = {
  primary: "#ff6b6b", // New red
  // ... other colors
};
```

**Result:**

- ✅ SVG illustrations update instantly
- ✅ All inline styles update instantly
- ✅ Tailwind classes need manual update (search and replace #d1de74 with #ff6b6b)

---

## Using Colors in Components

### In Illustrations (SVG):

```jsx
import { COLORS } from '../../styles/colors';

<rect fill={COLORS.primary} />
<circle fill={COLORS.danger} />
```

### In Inline Styles:

```jsx
import { COLORS } from '../../../styles/colors';

<div style={{ color: COLORS.secondary }} />
<div style={{ backgroundColor: COLORS.primary }}>
```

### In Tailwind Classes:

```jsx
<button className={`text-[${COLORS.primary}]`} />  // ❌ Won't work
<button className="text-[#d1de74]" />            // ✅ Use actual color
```

---

## Quick Reference: Search & Replace Patterns

When updating Tailwind color classes, use these search patterns:

| Old Color | New Color      | What to Search                                       |
| --------- | -------------- | ---------------------------------------------------- |
| #d1de74   | new_primary    | `text-[#d1de74]`, `bg-[#d1de74]`, `border-[#d1de74]` |
| #a1c14b   | new_secondary  | `text-[#a1c14b]`, `bg-[#a1c14b]`, `border-[#a1c14b]` |
| #1a1a19   | new_tertiary   | `text-[#1a1a19]`, `bg-[#1a1a19]`, `border-[#1a1a19]` |
| #e0912f   | new_quaternary | `text-[#e0912f]`, `bg-[#e0912f]`, `border-[#e0912f]` |
| #d23d3d   | new_danger     | `text-[#d23d3d]`, `bg-[#d23d3d]`, `border-[#d23d3d]` |

---

## Tips for Maintenance

1. **Always update `src/styles/colors.js` first** - This is your source of truth
2. **Test SVG components immediately** - They update without rebuilding
3. **Use "Find and Replace"** (Ctrl+H) to update Tailwind classes
4. **Check gradients** - Some components use gradient backgrounds with multiple colors
5. **Keep a backup** - Save the old color values before making changes

---

## Support

If you need to add new color mappings or categories:

1. Edit `src/styles/colors.js`
2. Add your new color export
3. Import it in components that need it
4. Update this documentation

---

**Last Updated:** February 26, 2026
