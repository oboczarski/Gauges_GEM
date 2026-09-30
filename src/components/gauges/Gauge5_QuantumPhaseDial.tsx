import React from 'react';
import { TeamData, ChartCustomization } from '../../types';
import { interpolate3StopColor } from '../../utils/colors';

interface Props {
  team: TeamData;
  customization?: ChartCustomization;
}

export const Gauge5_QuantumPhaseDial: React.FC<Props> = ({ team, customization }) => {
  const cx = 160;
  const cy = 160;
  const innerR = 86;
  const cleanId = team.id.replace(/\s+/g, '_');
  const value = customization?.probabilityOverride ?? team.probability; // 65.2%
  const clampedVal = Math.min(100, Math.max(0, value));

  // Inactive Background Track & Blocks
  const trackBgColor = customization?.trackBgColor || '#151d2a';
  const trackBgOpacity = customization?.trackBgOpacity ?? 0.5;

  // Active Progress Multi-Stop Colors
  const arcStart = customization?.arcColorStart || '#0891b2';
  const arcMid = customization?.arcColorMid || '#0d9488';
  const arcEnd = customization?.arcColorEnd || '#34d399';

  // Core Dome Styling (Rich Oceanic Teal Vignette, non-black)
  const corePrimary = customization?.corePrimaryColor || '#0d9488';
  const coreSecondary = customization?.coreSecondaryColor || '#0284c7';
  const coreGradientType = customization?.coreGradientType || 'radial';
  const coreOpacity = customization?.coreOpacity ?? 0.85;
  const coreBorderColor = customization?.coreBorderColor || '#14b8a6';
  const coreBorderWidth = customization?.coreBorderWidth ?? 1;
  const coreTextColor = customization?.coreTextColor || '#f8fafc';
  const coreSubtextColor = customization?.coreSubtextColor || '#94a3b8';
  const glow = customization?.glowIntensity ?? 2;

  // Structural Toggles
  const showCutline = customization?.showCutline ?? true;
  const showBaseline = customization?.showBaseline ?? true;
  const showCoordinates = customization?.showCoordinates ?? true;
  const decimalPlaces = customization?.decimalPlaces ?? 1;

  // Chart-Specific: Decile Stadium Block Parameters
  const totalBlocks = typeof customization?.gauge5BlockCount === 'number'
    ? customization.gauge5BlockCount
    : typeof customization?.tickCount === 'number'
    ? customization.tickCount
    : typeof customization?.uniqueOption1 === 'number'
    ? customization.uniqueOption1
    : 20;

  const blockGap = typeof customization?.gauge5BlockGap === 'number'
    ? customization.gauge5BlockGap
    : typeof customization?.uniqueOption2 === 'number'
    ? customization.uniqueOption2
    : 1.2;

  const bevelColor = customization?.gauge5BevelColor || '#ffffff';
  const bevelOpacity = customization?.gauge5BevelOpacity ?? 0.45;

  // 50% Bubble Cutline Styling
  const cutlineColor = customization?.cutlineColor || '#f59e0b';
  const cutlineWidth = customization?.cutlineWidth ?? 1.5;
  const cutlinePinColor = customization?.cutlinePinColor || '#f59e0b';
  const cutlinePinSize = customization?.cutlinePinSize ?? 2.5;

  // Coordinate Guides in Dome
  const coordRingColor = customization?.coordRingColor || coreBorderColor;
  const coordRingOpacity = customization?.coordRingOpacity ?? 0.35;

  const litCount = Math.round((totalBlocks * clampedVal) / 100);

  const blocks = Array.from({ length: totalBlocks }).map((_, i) => {
    const startAngle = 180 + (180 * i) / totalBlocks + blockGap;
    const endAngle = 180 + (180 * (i + 1)) / totalBlocks - blockGap;

    const rOuter = 118;
    const rInner = 98;

    const rad1 = (startAngle * Math.PI) / 180;
    const rad2 = (endAngle * Math.PI) / 180;

    const x1 = cx + rOuter * Math.cos(rad1);
    const y1 = cy + rOuter * Math.sin(rad1);
    const x2 = cx + rOuter * Math.cos(rad2);
    const y2 = cy + rOuter * Math.sin(rad2);
    const x3 = cx + rInner * Math.cos(rad2);
    const y3 = cy + rInner * Math.sin(rad2);
    const x4 = cx + rInner * Math.cos(rad1);
    const y4 = cy + rInner * Math.sin(rad1);

    const path = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`;

    const isLit = i < litCount;
    const pct = i / Math.max(1, totalBlocks - 1);
    const color = isLit
      ? interpolate3StopColor(arcStart, arcMid, arcEnd, pct)
      : trackBgColor;

    return { path, isLit, color, index: i };
  });

  const centerDomePath = `M ${cx - innerR} ${cy} A ${innerR} ${innerR} 0 0 1 ${cx + innerR} ${cy} Z`;

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg
        viewBox="0 0 320 200"
        className="w-full max-w-[320px] h-auto select-none"
        aria-label={`${team.name} Playoff Probability ${value.toFixed(decimalPlaces)}%`}
      >
        <defs>
          <radialGradient
            id={`tealDome5_${cleanId}`}
            cx={cx}
            cy={cy - innerR * 0.3}
            r={innerR * 0.95}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={corePrimary} stopOpacity={coreOpacity} />
            <stop offset="55%" stopColor={corePrimary} stopOpacity={coreOpacity * 0.95} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </radialGradient>

          <linearGradient
            id={`tealLinear5_${cleanId}`}
            x1={cx}
            y1={cy - innerR}
            x2={cx}
            y2={cy}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={corePrimary} stopOpacity={coreOpacity} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </linearGradient>

          <filter id={`blockGlow5_${cleanId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={glow} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center Teal Vignette Dome */}
        <path
          d={centerDomePath}
          fill={
            coreGradientType === 'solid'
              ? corePrimary
              : coreGradientType === 'linear'
              ? `url(#tealLinear5_${cleanId})`
              : `url(#tealDome5_${cleanId})`
          }
          fillOpacity={coreGradientType === 'solid' ? coreOpacity : undefined}
          stroke={coreBorderColor}
          strokeWidth={coreBorderWidth}
          strokeOpacity={0.9}
        />

        {/* Inner coordinate grid guides */}
        {showCoordinates && (
          <>
            <circle
              cx={cx}
              cy={cy}
              r="60"
              fill="none"
              stroke={coordRingColor}
              strokeWidth="0.75"
              strokeDasharray="2 3"
              strokeOpacity={coordRingOpacity}
            />
            <circle
              cx={cx}
              cy={cy}
              r="34"
              fill="none"
              stroke={coordRingColor}
              strokeWidth="0.75"
              strokeDasharray="2 3"
              strokeOpacity={coordRingOpacity * 0.7}
            />
          </>
        )}

        {/* Segmented Decile Stadium Blocks */}
        <g filter={glow > 0 ? `url(#blockGlow5_${cleanId})` : undefined}>
          {blocks.map((b) => (
            <path
              key={b.index}
              d={b.path}
              fill={b.color}
              fillOpacity={b.isLit ? 0.95 : trackBgOpacity}
              stroke={b.isLit ? bevelColor : '#1e293b'}
              strokeWidth={b.isLit ? 0.85 : 0.5}
              strokeOpacity={b.isLit ? bevelOpacity : 0.3}
            />
          ))}
        </g>

        {/* 50% Bubble Cutline */}
        {showCutline && (
          <>
            <line
              x1={cx}
              y1={cy - 124}
              x2={cx}
              y2={cy - innerR}
              stroke={cutlineColor}
              strokeWidth={cutlineWidth}
              strokeDasharray="2 3"
              strokeOpacity="0.8"
            />
            <circle cx={cx} cy={cy - 124} r={cutlinePinSize} fill={cutlinePinColor} />
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
            fill="#2dd4bf"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            textAnchor="middle"
          >
            SEED #5 · SOLID CONTENDER
          </text>
        </g>
      </svg>
    </div>
  );
};
