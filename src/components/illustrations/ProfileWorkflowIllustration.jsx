import { COLORS } from '../../styles/colors';

export default function ProfileWorkflowIllustration({ type = 'login' }) {
  const isUpload = type === 'upload';

  return (
    <svg viewBox="0 0 320 220" className="h-auto w-full" role="img" aria-label={isUpload ? 'Upload illustration' : 'Login illustration'}>
      <rect x="6" y="6" width="308" height="208" rx="24" fill="#f4f2fb" />
      <rect x="24" y="24" width="272" height="36" rx="18" fill="#ffffff" />
      <circle cx="38" cy="42" r="4" fill={COLORS.primary} />
      <rect x="54" y="35" width="122" height="14" rx="7" fill={COLORS.secondary} />
      <circle cx="274" cy="42" r="10" fill={COLORS.quaternary} />

      {isUpload ? (
        <>
          <ellipse cx="162" cy="122" rx="68" ry="42" fill={COLORS.secondary} />
          <circle cx="145" cy="94" r="16" fill={COLORS.quaternary} />
          <rect x="130" y="110" width="44" height="50" rx="20" fill={COLORS.primary} />
          <rect x="112" y="114" width="28" height="12" rx="6" fill={COLORS.tertiary} />
          <rect x="170" y="114" width="28" height="12" rx="6" fill={COLORS.tertiary} />
          <rect x="136" y="158" width="18" height="28" rx="9" fill={COLORS.primary} />
          <rect x="160" y="158" width="18" height="28" rx="9" fill={COLORS.primary} />
          <path d="M248 114h36v52h-36z" fill={COLORS.secondary} />
          <path d="M252 126h28v4h-28zm0 10h24v4h-24zm0 10h20v4h-20z" fill={COLORS.primary} />
          <rect x="224" y="92" width="26" height="18" rx="9" fill={COLORS.quaternary} />
        </>
      ) : (
        <>
          <ellipse cx="160" cy="132" rx="72" ry="44" fill={COLORS.tertiary} />
          <circle cx="134" cy="104" r="14" fill={COLORS.quaternary} />
          <rect x="118" y="118" width="54" height="50" rx="22" fill={COLORS.primary} />
          <rect x="102" y="122" width="24" height="10" rx="5" fill={COLORS.secondary} />
          <rect x="170" y="122" width="24" height="10" rx="5" fill={COLORS.secondary} />
          <path d="M202 114h44v34h-44z" fill="#ffffff" />
          <path d="M206 122h34v4h-34zm0 9h28v4h-28zm0 9h30v4h-30z" fill={COLORS.primary} />
          <circle cx="92" cy="110" r="11" fill={COLORS.secondary} />
          <path d="M92 104v7l5 3" stroke={COLORS.primary} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      )}

      <rect x="82" y="184" width="156" height="24" rx="12" fill={isUpload ? COLORS.secondary : COLORS.primary} />
      <rect x="118" y="193" width="84" height="6" rx="3" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}


