import React from 'react';
import { TeamData, ChartCustomization } from '../../types';
import { interpolate3StopColor } from '../../utils/colors';

interface Props {
  team: TeamData;
  customization?: ChartCustomization;
}

export const Gauge2_AvionicsReticle: React.FC<Props> = ({ team, customization }) => {
  const cx = 160;
  const cy = 160;
  const innerR = 86;
  const value = customization?.probabilityOverride ?? team.probability; // 89.5%
  const clampedVal = Math.min(100, Math.max(0, value));

  // Inactive Background Track & Bars
  const trackBgColor = customization?.trackBgColor || '#1e2538';
  const trackBgOpacity = customization?.trackBgOpacity ?? 0.45;

  // Active Progress Multi-Stop Colors
  const arcStart = customization?.arcColorStart || '#6366f1';
  const arcMid = customization?.arcColorMid || '#a855f7';
  const arcEnd = customization?.arcColorEnd || '#ec4899';

  // Core Dome Styling (Rich Royal Violet gradient, non-black)
  const corePrimary = customization?.corePrimaryColor || '#6d28d9';
  const coreSecondary = customization?.coreSecondaryColor || '#4c1d95';
  const coreGradientType = customization?.coreGradientType || 'radial';
  const coreOpacity = customization?.coreOpacity ?? 0.85;
  const coreBorderColor = customization?.coreBorderColor || '#a855f7';
  const coreBorderWidth = customization?.coreBorderWidth ?? 1;
  const coreTextColor = customization?.coreTextColor || '#f8fafc';
  const coreSubtextColor = customization?.coreSubtextColor || '#94a3b8';
  const glow = customization?.glowIntensity ?? 2.5;

  // Structural Toggles
  const showCutline = customization?.showCutline ?? true;
  const showBaseline = customization?.showBaseline ?? true;
  const showCoordinates = customization?.showCoordinates ?? true;
  const decimalPlaces = customization?.decimalPlaces ?? 1;

  // Chart-Specific: Histogram Bars & Wave
  const barCount = typeof customization?.tickCount === 'number'
    ? customization.tickCount
    : typeof customization?.uniqueOption1 === 'number'
    ? customization.uniqueOption1
    : 45;
  const waveAmp = typeof customization?.gauge2WaveAmp === 'number'
    ? customization.gauge2WaveAmp
    : typeof customization?.uniqueOption2 === 'number'
    ? customization.uniqueOption2
    : 10;
  const barWidth = customization?.gauge2BarWidth ?? Math.max(1.8, (280 / barCount) * 0.45);

  // Chart-Specific: Avionics Vector Reticle Pointer
  const showReticlePin = customization?.uniqueOption3 !== false;
  const needleColor = customization?.gauge2NeedleColor || customization?.beaconBorderColor || arcEnd;
  const needlePinFill = customization?.beaconColor || '#ffffff';
  const needlePinSize = customization?.beaconSize ?? 3.5;

  // Chart-Specific: Laser Horizon Pitch Ladder Guides
  const ladderColor = customization?.gauge2LadderColor || customization?.coordRingColor || coreBorderColor;

  // 50% Bubble Cutline Styling
  const cutlineColor = customization?.cutlineColor || '#f59e0b';
  const cutlineWidth = customization?.cutlineWidth ?? 1.5;
  const cutlinePinColor = customization?.cutlinePinColor || '#f59e0b';
  const cutlinePinSize = customization?.cutlinePinSize ?? 2.5;

  const litBars = Math.round((barCount * clampedVal) / 100);

  const bars = Array.from({ length: barCount }).map((_, i) => {
    const angle = 180 + (180 * (i + 0.5)) / barCount;
    const rad = (angle * Math.PI) / 180;
    const isLit = i < litBars;
    const rStart = 94;
    const baseHeight = 16;
    const peakBonus = Math.sin((i / barCount) * Math.PI) * waveAmp;
    const rEnd = rStart + baseHeight + peakBonus;

    const x1 = cx + rStart * Math.cos(rad);
    const y1 = cy + rStart * Math.sin(rad);
    const x2 = cx + rEnd * Math.cos(rad);
    const y2 = cy + rEnd * Math.sin(rad);

    const pct = i / Math.max(1, barCount - 1);
    const color = isLit
      ? interpolate3StopColor(arcStart, arcMid, arcEnd, pct)
      : trackBgColor;

    return { x1, y1, x2, y2, isLit, color, index: i, angle };
  });

  const centerDomePath = `M ${cx - innerR} ${cy} A ${innerR} ${innerR} 0 0 1 ${cx + innerR} ${cy} Z`;

  // Reticle pin position
  const pinAngle = 180 + (180 * clampedVal) / 100;
  const pinRad = (pinAngle * Math.PI) / 180;
  const pinOuterX = cx + 130 * Math.cos(pinRad);
  const pinOuterY = cy + 130 * Math.sin(pinRad);
  const pinInnerX = cx + 88 * Math.cos(pinRad);
  const pinInnerY = cy + 88 * Math.sin(pinRad);

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg
        viewBox="0 0 320 200"
        className="w-full max-w-[320px] h-auto select-none"
        aria-label={`${team.name} Playoff Probability ${value.toFixed(decimalPlaces)}%`}
      >
        <defs>
          <radialGradient id={`twilightDome2_${team.id}`} cx="50%" cy="50%" r="85%">
            <stop offset="0%" stopColor={corePrimary} stopOpacity={coreOpacity} />
            <stop offset="60%" stopColor={corePrimary} stopOpacity={coreOpacity * 0.95} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </radialGradient>

          <linearGradient id={`twilightLinear2_${team.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={corePrimary} stopOpacity={coreOpacity} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </linearGradient>

          <filter id={`histoGlow2_${team.id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={glow} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center Twilight Dome */}
        <path
          d={centerDomePath}
          fill={
            coreGradientType === 'solid'
              ? corePrimary
              : coreGradientType === 'linear'
              ? `url(#twilightLinear2_${team.id})`
              : `url(#twilightDome2_${team.id})`
          }
          fillOpacity={coreGradientType === 'solid' ? coreOpacity : undefined}
          stroke={coreBorderColor}
          strokeWidth={coreBorderWidth}
          strokeOpacity={0.9}
        />

        {/* Laser Horizon Pitch Ladder Guides inside Dome */}
        {showCoordinates && (
          <>
            <line
              x1="90"
              y1={cy - 20}
              x2="230"
              y2={cy - 20}
              stroke={ladderColor}
              strokeWidth="0.75"
              strokeDasharray="2 3"
              strokeOpacity="0.45"
            />
            <line
              x1="110"
              y1={cy - 45}
              x2="210"
              y2={cy - 45}
              stroke={ladderColor}
              strokeWidth="0.75"
              strokeDasharray="2 3"
              strokeOpacity="0.35"
            />
            <circle
              cx={cx}
              cy={cy}
              r="44"
              fill="none"
              stroke={ladderColor}
              strokeWidth="0.75"
              strokeDasharray="2 3"
              strokeOpacity="0.35"
            />
          </>
        )}

        {/* Radial Histogram Bars */}
        <g filter={glow > 0 ? `url(#histoGlow2_${team.id})` : undefined}>
          {bars.map((b) => (
            <line
              key={b.index}
              x1={b.x1}
              y1={b.y1}
              x2={b.x2}
              y2={b.y2}
              stroke={b.color}
              strokeWidth={barWidth}
              strokeLinecap="round"
              strokeOpacity={b.isLit ? 0.95 : trackBgOpacity}
            />
          ))}
        </g>

        {/* Reticle Vector Pointer Needle Indicator */}
        {showReticlePin && clampedVal > 0 && (
          <g filter={glow > 0 ? `url(#histoGlow2_${team.id})` : undefined}>
            <line
              x1={pinInnerX}
              y1={pinInnerY}
              x2={pinOuterX}
              y2={pinOuterY}
              stroke={needleColor}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx={pinOuterX}
              cy={pinOuterY}
              r={needlePinSize}
              fill={needlePinFill}
              stroke={needleColor}
              strokeWidth="1.5"
            />
          </g>
        )}

        {/* 50% Bubble Cutline */}
        {showCutline && (
          <>
            <line
              x1={cx}
              y1={cy - 128}
              x2={cx}
              y2={cy - innerR}
              stroke={cutlineColor}
              strokeWidth={cutlineWidth}
              strokeDasharray="2 3"
              strokeOpacity="0.8"
            />
            <circle cx={cx} cy={cy - 128} r={cutlinePinSize} fill={cutlinePinColor} />
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
            fill="#a78bfa"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            textAnchor="middle"
          >
            SEED #2 · DIVISION LEADER
          </text>
        </g>
      </svg>
    </div>
  );
};
