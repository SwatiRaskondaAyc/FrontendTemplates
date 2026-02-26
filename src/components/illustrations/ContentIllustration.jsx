import { COLORS } from '../../styles/colors';

function StrategyIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" role="img" aria-label="Strategy illustration">
      <rect x="10" y="10" width="300" height="180" rx="22" fill="#f4f2fb" />
      <rect x="30" y="30" width="260" height="30" rx="15" fill="#ffffff" />
      <circle cx="48" cy="45" r="6" fill={COLORS.primary} />
      <rect x="62" y="38" width="90" height="14" rx="7" fill={COLORS.secondary} />
      <rect x="36" y="84" width="84" height="80" rx="14" fill={COLORS.primary} />
      <rect x="130" y="76" width="72" height="88" rx="14" fill={COLORS.quaternary} />
      <rect x="210" y="98" width="74" height="66" rx="14" fill={COLORS.danger} />
      <path d="M78 132 L166 120 L246 130" stroke={COLORS.primary} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="78" cy="132" r="5" fill={COLORS.primary} />
      <circle cx="166" cy="120" r="5" fill={COLORS.primary} />
      <circle cx="246" cy="130" r="5" fill={COLORS.primary} />
    </svg>
  );
}

function PortfolioIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" role="img" aria-label="Portfolio illustration">
      <rect x="10" y="10" width="300" height="180" rx="22" fill="#f4f2fb" />
      <rect x="30" y="30" width="260" height="30" rx="15" fill="#ffffff" />
      <circle cx="48" cy="45" r="6" fill={COLORS.primary} />
      <rect x="62" y="38" width="102" height="14" rx="7" fill={COLORS.secondary} />
      <circle cx="110" cy="118" r="44" fill={COLORS.primary} />
      <path d="M110 118 L110 84 A34 34 0 0 1 143 124 Z" fill={COLORS.secondary} />
      <path d="M110 118 L143 124 A34 34 0 0 1 90 148 Z" fill={COLORS.quaternary} />
      <path d="M110 118 L90 148 A34 34 0 0 1 78 98 Z" fill={COLORS.danger} />
      <path d="M110 118 L78 98 A34 34 0 0 1 110 84 Z" fill={COLORS.tertiary} />
      <rect x="176" y="84" width="108" height="16" rx="8" fill={COLORS.secondary} />
      <rect x="176" y="110" width="84" height="16" rx="8" fill={COLORS.quaternary} />
      <rect x="176" y="136" width="66" height="16" rx="8" fill={COLORS.danger} />
    </svg>
  );
}

function RiskIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" role="img" aria-label="Risk illustration">
      <rect x="10" y="10" width="300" height="180" rx="22" fill="#f4f2fb" />
      <rect x="30" y="30" width="260" height="30" rx="15" fill="#ffffff" />
      <circle cx="48" cy="45" r="6" fill={COLORS.primary} />
      <rect x="62" y="38" width="86" height="14" rx="7" fill={COLORS.secondary} />
      <path d="M160 72 L252 156 H68 Z" fill={COLORS.quaternary} />
      <path d="M160 92 L236 150 H84 Z" fill={COLORS.danger} />
      <rect x="154" y="110" width="12" height="28" rx="6" fill={COLORS.primary} />
      <circle cx="160" cy="146" r="6" fill={COLORS.primary} />
      <rect x="70" y="150" width="54" height="8" rx="4" fill={COLORS.secondary} />
      <rect x="196" y="150" width="54" height="8" rx="4" fill={COLORS.quaternary} />
    </svg>
  );
}

export default function ContentIllustration({ type }) {
  if (type === 'portfolio') {
    return <PortfolioIllustration />;
  }

  if (type === 'risk') {
    return <RiskIllustration />;
  }

  return <StrategyIllustration />;
}
