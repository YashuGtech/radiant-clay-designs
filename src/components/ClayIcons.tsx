type IconProps = { className?: string };

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--sky)" />
        <stop offset="100%" stopColor="var(--primary)" />
      </linearGradient>
      <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--mint)" />
        <stop offset="100%" stopColor="var(--sky)" />
      </linearGradient>
      <linearGradient id={`${id}-c`} x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor="oklch(1 0 0 / 0.85)" />
        <stop offset="100%" stopColor="oklch(1 0 0 / 0)" />
      </linearGradient>
    </defs>
  );
}

export function ClaySpark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Defs id="spark" />
      <rect x="4" y="4" width="56" height="56" rx="20" fill="url(#spark-b)" />
      <rect x="4" y="4" width="56" height="30" rx="18" fill="url(#spark-c)" opacity="0.5" />
      <path
        d="M32 14c1.8 8.6 7.6 14.4 16 16-8.4 1.6-14.2 7.4-16 16-1.8-8.6-7.6-14.4-16-16 8.4-1.6 14.2-7.4 16-16Z"
        fill="oklch(1 0 0)"
      />
    </svg>
  );
}

export function ClayCard3D({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Defs id="card" />
      <rect x="6" y="16" width="52" height="34" rx="12" fill="url(#card-a)" />
      <rect x="6" y="16" width="52" height="16" rx="10" fill="url(#card-c)" opacity="0.55" />
      <rect x="12" y="38" width="20" height="6" rx="3" fill="oklch(1 0 0 / 0.75)" />
      <circle cx="46" cy="41" r="5" fill="oklch(1 0 0 / 0.9)" />
      <path d="M24 8c1 5 4.4 8.4 9.4 9.4C28.4 18.4 25 21.8 24 26.8 23 21.8 19.6 18.4 14.6 17.4 19.6 16.4 23 13 24 8Z" fill="var(--sun)" />
    </svg>
  );
}

export function ClayGift({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Defs id="gift" />
      <rect x="8" y="24" width="48" height="32" rx="12" fill="url(#gift-b)" />
      <rect x="6" y="16" width="52" height="14" rx="7" fill="url(#gift-a)" />
      <rect x="6" y="16" width="52" height="7" rx="4" fill="url(#gift-c)" opacity="0.6" />
      <rect x="28" y="16" width="8" height="40" rx="4" fill="oklch(1 0 0 / 0.85)" />
      <circle cx="24" cy="12" r="7" fill="var(--candy)" />
      <circle cx="40" cy="12" r="7" fill="var(--sun)" />
    </svg>
  );
}

export function ClayWallet({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Defs id="wal" />
      <rect x="7" y="14" width="50" height="38" rx="13" fill="url(#wal-a)" />
      <rect x="7" y="14" width="50" height="17" rx="12" fill="url(#wal-c)" opacity="0.5" />
      <path d="M40 28h18v10H40a5 5 0 0 1 0-10Z" fill="oklch(1 0 0 / 0.92)" />
      <circle cx="46" cy="33" r="3" fill="var(--primary)" />
    </svg>
  );
}

export function ClayUsers({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Defs id="usr" />
      <circle cx="42" cy="24" r="10" fill="url(#usr-b)" />
      <path d="M24 52c0-9 8-15 18-15s18 6 18 15Z" fill="url(#usr-b)" />
      <circle cx="22" cy="26" r="11" fill="url(#usr-a)" />
      <circle cx="22" cy="21" r="7" fill="url(#usr-c)" opacity="0.55" />
      <path d="M2 54c0-10 9-17 20-17s20 7 20 17Z" fill="url(#usr-a)" />
    </svg>
  );
}

export function ClayHome({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Defs id="hme" />
      <path d="M32 8 6 28v24a6 6 0 0 0 6 6h40a6 6 0 0 0 6-6V28L32 8Z" fill="url(#hme-a)" />
      <path d="M32 8 6 28h52L32 8Z" fill="url(#hme-c)" opacity="0.6" />
      <rect x="24" y="36" width="16" height="22" rx="5" fill="oklch(1 0 0 / 0.92)" />
    </svg>
  );
}

export function ClayCoin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <Defs id="coin" />
      <ellipse cx="32" cy="42" rx="24" ry="16" fill="var(--sun)" opacity="0.55" />
      <circle cx="32" cy="30" r="22" fill="url(#coin-b)" />
      <circle cx="32" cy="30" r="16" fill="oklch(1 0 0 / 0.28)" />
      <path d="M26 20h13m-13 6h13m-13 0c8 0 8 9 0 9h3l9 9M26 35h6" stroke="oklch(1 0 0)" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
