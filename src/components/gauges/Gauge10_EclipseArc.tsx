import React from 'react';
import { TeamData, ChartCustomization } from '../../types';

interface Props {
  team: TeamData;
  customization?: ChartCustomization;
}

export const Gauge10_EclipseArc: React.FC<Props> = ({ team, customization }) => {
  const cx = 160;
  const cy = 160;
  const r = 106;
  const innerR = 86;
  const value = customization?.probabilityOverride ?? team.probability; // 11.1%
  const clampedVal = Math.min(100, Math.max(0, value));

  // Inactive Background Track
  const trackBgColor = customization?.trackBgColor || '#1e1b4b';
  const trackBgOpacity = customization?.trackBgOpacity ?? 0.45;

  // Active Progress Multi-Stop Colors
  const arcStart = customization?.arcColorStart || '#4f46e5';
  const arcMid = customization?.arcColorMid || '#818cf8';
  const arcEnd = customization?.arcColorEnd || '#f8fafc';

  // Core Dome Styling (Rich Starlight Indigo Navy, non-black)
  const corePrimary = customization?.corePrimaryColor || '#4338ca';
  const coreSecondary = customization?.coreSecondaryColor || '#3730a3';
  const coreGradientType = customization?.coreGradientType || 'radial';
  const coreOpacity = customization?.coreOpacity ?? 0.85;
  const coreBorderColor = customization?.coreBorderColor || '#818cf8';
  const coreBorderWidth = customization?.coreBorderWidth ?? 1;
  const coreTextColor = customization?.coreTextColor || '#f8fafc';
  const coreSubtextColor = customization?.coreSubtextColor || '#94a3b8';
  const glow = customization?.glowIntensity ?? 3;

  // Structural Toggles
  const showCutline = customization?.showCutline ?? true;
  const showBaseline = customization?.showBaseline ?? true;
  const showTicks = customization?.showTicks ?? true;
  const showCoordinates = customization?.showCoordinates ?? true;
  const decimalPlaces = customization?.decimalPlaces ?? 1;

  // Chart-Specific: Hairline Weight
  const hairlineWeight = typeof customization?.gauge10HairlineWidth === 'number'
    ? customization.gauge10HairlineWidth
    : typeof customization?.uniqueOption1 === 'number'
    ? customization.uniqueOption1
    : (customization?.trackWidth ?? 3.5);

  // Chart-Specific: Micro-Tick Count & Colors
  const tickCount = typeof customization?.tickCount === 'number'
    ? customization.tickCount
    : typeof customization?.uniqueOption2 === 'number'
    ? customization.uniqueOption2
    : 36;

  const tickMajorColor = customization?.tickMajorColor || '#475569';
  const tickMinorColor = customization?.tickMinorColor || '#1e293b';

  // Chart-Specific: Apex Notch Marker
  const notchStyle = customization?.gauge10NotchStyle || (customization?.uniqueOption3 as string) || 'diamond';
  const notchColor = customization?.gauge10NotchColor || customization?.beaconColor || '#ffffff';
  const notchBorder = customization?.beaconBorderColor || arcEnd;
  const notchSize = customization?.gauge10NotchSize ?? (customization?.beaconSize ?? 5);

  // 50% Bubble Cutline Styling
  const cutlineColor = customization?.cutlineColor || '#f59e0b';
  const cutlineWidth = customization?.cutlineWidth ?? 1.25;
  const cutlinePinColor = customization?.cutlinePinColor || '#f59e0b';
  const cutlinePinSize = customization?.cutlinePinSize ?? 2;

  // Coordinate Rings in Dome
  const coordRingColor = customization?.coordRingColor || coreBorderColor;
  const coordRingOpacity = customization?.coordRingOpacity ?? 0.4;
  const coordRingDash = customization?.coordRingDash || '2 4';

  const angle = 180 + (180 * clampedVal) / 100;
  const rad = (angle * Math.PI) / 180;
  const curX = cx + r * Math.cos(rad);
  const curY = cy + r * Math.sin(rad);

  const bgHairlinePath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const activeArcPath = clampedVal > 0 ? `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${curX} ${curY}` : '';
  const centerDomePath = `M ${cx - innerR} ${cy} A ${innerR} ${innerR} 0 0 1 ${cx + innerR} ${cy} Z`;

  // Perimeter micro-ticks
  const ticks = Array.from({ length: tickCount + 1 }).map((_, i) => {
    const a = 180 + (180 * i) / tickCount;
    const rd = (a * Math.PI) / 180;
    const isMajor = i % 9 === 0;
    const rOuter = 118;
    const rInner = isMajor ? 110 : 114;
    const x1 = cx + rOuter * Math.cos(rd);
    const y1 = cy + rOuter * Math.sin(rd);
    const x2 = cx + rInner * Math.cos(rd);
    const y2 = cy + rInner * Math.sin(rd);
    return { x1, y1, x2, y2, isMajor, i };
  });

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg
        viewBox="0 0 320 200"
        className="w-full max-w-[320px] h-auto select-none"
        aria-label={`${team.name} Playoff Probability ${value.toFixed(decimalPlaces)}%`}
      >
        <defs>
          <linearGradient
            id={`hairlineGrad10_${team.id}`}
            gradientUnits="userSpaceOnUse"
            x1={cx - r}
            y1={cy}
            x2={cx + r}
            y2={cy}
          >
            <stop offset="0%" stopColor={arcStart} />
            <stop offset="60%" stopColor={arcMid} />
            <stop offset="100%" stopColor={arcEnd} />
          </linearGradient>

          <radialGradient id={`obsidianDome10_${team.id}`} cx="50%" cy="50%" r="85%">
            <stop offset="0%" stopColor={corePrimary} stopOpacity={coreOpacity} />
            <stop offset="60%" stopColor={corePrimary} stopOpacity={coreOpacity * 0.95} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </radialGradient>

          <linearGradient id={`obsidianLinear10_${team.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={corePrimary} stopOpacity={coreOpacity} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </linearGradient>

          <filter id={`coronaGlow10_${team.id}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation={glow} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center Obsidian Starlight Dome */}
        <path
          d={centerDomePath}
          fill={
            coreGradientType === 'solid'
              ? corePrimary
              : coreGradientType === 'linear'
              ? `url(#obsidianLinear10_${team.id})`
              : `url(#obsidianDome10_${team.id})`
          }
          fillOpacity={coreGradientType === 'solid' ? coreOpacity : undefined}
          stroke={coreBorderColor}
          strokeWidth={coreBorderWidth}
          strokeOpacity={0.9}
        />

        {/* Micro-Coordinate Guide Rings in Dome */}
        {showCoordinates && (
          <>
            <circle
              cx={cx}
              cy={cy}
              r="65"
              fill="none"
              stroke={coordRingColor}
              strokeWidth="0.75"
              strokeDasharray={coordRingDash}
              strokeOpacity={coordRingOpacity}
            />
            <circle
              cx={cx}
              cy={cy}
              r="40"
              fill="none"
              stroke={coordRingColor}
              strokeWidth="0.75"
              strokeDasharray="1 3"
              strokeOpacity={coordRingOpacity * 0.7}
            />
          </>
        )}

        {/* Micro-Ticks */}
        {showTicks && (
          <g>
            {ticks.map((t) => (
              <line
                key={t.i}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke={t.isMajor ? tickMajorColor : tickMinorColor}
                strokeWidth={t.isMajor ? 1.25 : 0.75}
                strokeOpacity={t.isMajor ? 0.7 : 0.4}
              />
            ))}
          </g>
        )}

        {/* Inactive Hairline Background Track */}
        <path
          d={bgHairlinePath}
          fill="none"
          stroke={trackBgColor}
          strokeOpacity={trackBgOpacity}
          strokeWidth={hairlineWeight}
          strokeLinecap="round"
        />

        {/* Active Hairline Arc */}
        {activeArcPath && (
          <path
            d={activeArcPath}
            fill="none"
            stroke={`url(#hairlineGrad10_${team.id})`}
            strokeWidth={hairlineWeight}
            strokeLinecap="round"
            filter={glow > 0 ? `url(#coronaGlow10_${team.id})` : undefined}
          />
        )}

        {/* Precision Micro-Notch at Current Probability */}
        {clampedVal > 0 && (
          <g transform={`translate(${curX}, ${curY})`} filter={glow > 0 ? `url(#coronaGlow10_${team.id})` : undefined}>
            {notchStyle === 'dot' ? (
              <circle cx="0" cy="0" r={notchSize * 0.7} fill={notchColor} stroke={notchBorder} strokeWidth="1.5" />
            ) : notchStyle === 'cross' ? (
              <>
                <line x1={-notchSize} y1="0" x2={notchSize} y2="0" stroke={notchColor} strokeWidth="1.5" />
                <line x1="0" y1={-notchSize} x2="0" y2={notchSize} stroke={notchColor} strokeWidth="1.5" />
              </>
            ) : (
              <polygon
                points={`0,-${notchSize} ${notchSize},0 0,${notchSize} -${notchSize},0`}
                fill={notchColor}
                stroke={notchBorder}
                strokeWidth="1.2"
              />
            )}
          </g>
        )}

        {/* 50% Bubble Cutline Guideline */}
        {showCutline && (
          <>
            <line
              x1={cx}
              y1={cy - r - 12}
              x2={cx}
              y2={cy - innerR}
              stroke={cutlineColor}
              strokeWidth={cutlineWidth}
              strokeDasharray="2 3"
              strokeOpacity="0.8"
            />
            <circle cx={cx} cy={cy - r} r={cutlinePinSize} fill={cutlinePinColor} />
          </>
        )}

        {/* Horizon Baseline */}
        {showBaseline && (
          <line
            x1="26"
            y1={cy}
            x2="294"
            y2={cy}
            stroke="#1e293b"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        )}

        {/* Horizon Coordinates */}
        <text
          x="30"
          y={cy + 18}
          fill={coreSubtextColor}
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          textAnchor="start"
          fontWeight="600"
        >
          0%
        </text>
        <text
          x="290"
          y={cy + 18}
          fill={coreSubtextColor}
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          textAnchor="end"
          fontWeight="600"
        >
          100%
        </text>

        {/* Center Readout Content */}
        <g transform={`translate(${cx}, ${cy - 18})`}>
          <text
            x="0"
            y="-22"
            fill={coreSubtextColor}
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
            textAnchor="middle"
            letterSpacing="0.08em"
          >
            PLAYOFF PROBABILITY
          </text>

          <text
            x="0"
            y="6"
            fill={coreTextColor}
            fontSize="32"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="800"
            textAnchor="middle"
            letterSpacing="-0.03em"
          >
            {value.toFixed(decimalPlaces)}%
          </text>

          <text
            x="0"
            y="22"
            fill="#f43f5e"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            textAnchor="middle"
          >
            SEED #10 · ELIMINATION BRINK
          </text>
        </g>
      </svg>
    </div>
  );
};
