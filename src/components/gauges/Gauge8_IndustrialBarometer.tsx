import React from 'react';
import { TeamData, ChartCustomization } from '../../types';

interface Props {
  team: TeamData;
  customization?: ChartCustomization;
}

export const Gauge8_IndustrialBarometer: React.FC<Props> = ({ team, customization }) => {
  const cx = 160;
  const cy = 160;
  const r = 104;
  const innerR = 86;
  const cleanId = team.id.replace(/\s+/g, '_');
  const value = customization?.probabilityOverride ?? team.probability; // 21.6%
  const clampedVal = Math.min(100, Math.max(0, value));

  // Inactive Background Track
  const trackWidth = customization?.trackWidth ?? 14;
  const trackBgColor = customization?.trackBgColor || '#1c1917';
  const trackBgOpacity = customization?.trackBgOpacity ?? 0.65;

  // Active Progress Multi-Stop Colors
  const arcStart = customization?.arcColorStart || '#b45309';
  const arcMid = customization?.arcColorMid || '#d97706';
  const arcEnd = customization?.arcColorEnd || '#f59e0b';

  // Core Dome Styling (Rich Warm Bronze Amber, non-black)
  const corePrimary = customization?.corePrimaryColor || '#d97706';
  const coreSecondary = customization?.coreSecondaryColor || '#b45309';
  const coreGradientType = customization?.coreGradientType || 'radial';
  const coreOpacity = customization?.coreOpacity ?? 0.85;
  const coreBorderColor = customization?.coreBorderColor || '#f59e0b';
  const coreBorderWidth = customization?.coreBorderWidth ?? 1;
  const coreTextColor = customization?.coreTextColor || '#f8fafc';
  const coreSubtextColor = customization?.coreSubtextColor || '#94a3b8';
  const glow = customization?.glowIntensity ?? 2.5;

  // Structural Toggles
  const showCutline = customization?.showCutline ?? true;
  const showBaseline = customization?.showBaseline ?? true;
  const showCoordinates = customization?.showCoordinates ?? true;
  const decimalPlaces = customization?.decimalPlaces ?? 1;

  // Chart-Specific: Target Benchmark & Deficit Gap
  const targetPct = typeof customization?.gauge8TargetPct === 'number'
    ? customization.gauge8TargetPct
    : typeof customization?.cutlineThreshold === 'number'
    ? customization.cutlineThreshold
    : typeof customization?.uniqueOption1 === 'number'
    ? customization.uniqueOption1
    : 50;

  const gapStyle = customization?.gauge8GapStyle || (customization?.uniqueOption2 as string) || 'dashed';
  const gapColor = customization?.gauge8GapColor || '#fb923c';
  const showDeltaFlag = customization?.gauge8DeltaFlag !== false && customization?.uniqueOption3 !== false;

  // Target Marker Line & Badge Styling
  const targetColor = customization?.cutlineColor || '#fbbf24';
  const targetWidth = customization?.cutlineWidth ?? 2;
  const targetPinColor = customization?.cutlinePinColor || '#fbbf24';
  const targetPinSize = customization?.cutlinePinSize ?? 4;
  const targetBadgeBg = customization?.cutlineBadgeBg || '#1c1917';
  const targetBadgeText = customization?.cutlineBadgeText || targetColor;

  // Active Cap Styling
  const capColor = customization?.beaconColor || '#ffffff';
  const capBorder = customization?.beaconBorderColor || arcEnd;
  const capSize = customization?.beaconSize ?? (trackWidth * 0.4);

  // Coordinate Guides in Disc
  const coordRingColor = customization?.coordRingColor || coreBorderColor;
  const coordRingOpacity = customization?.coordRingOpacity ?? 0.35;

  const angle = 180 + (180 * clampedVal) / 100;
  const rad = (angle * Math.PI) / 180;
  const curX = cx + r * Math.cos(rad);
  const curY = cy + r * Math.sin(rad);

  const targetAngle = 180 + (180 * targetPct) / 100;
  const targetRad = (targetAngle * Math.PI) / 180;
  const targetX = cx + r * Math.cos(targetRad);
  const targetY = cy + r * Math.sin(targetRad);

  const bgTrackPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const activeArcPath = clampedVal > 0 ? `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${curX} ${curY}` : '';
  const centerDomePath = `M ${cx - innerR} ${cy} A ${innerR} ${innerR} 0 0 1 ${cx + innerR} ${cy} Z`;

  // Deficit gap arc from current prob to target
  const gapArcPath = clampedVal < targetPct
    ? `M ${curX} ${curY} A ${r} ${r} 0 0 1 ${targetX} ${targetY}`
    : `M ${targetX} ${targetY} A ${r} ${r} 0 0 1 ${curX} ${curY}`;

  const deltaVal = targetPct - clampedVal;

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg
        viewBox="0 0 320 200"
        className="w-full max-w-[320px] h-auto select-none"
        aria-label={`${team.name} Playoff Probability ${value.toFixed(decimalPlaces)}%`}
      >
        <defs>
          <linearGradient
            id={`copperGrad8_${cleanId}`}
            gradientUnits="userSpaceOnUse"
            x1={cx - r}
            y1={cy}
            x2={cx + r}
            y2={cy}
          >
            <stop offset="0%" stopColor={arcStart} />
            <stop offset="50%" stopColor={arcMid} />
            <stop offset="100%" stopColor={arcEnd} />
          </linearGradient>

          <radialGradient
            id={`bronzeHaloDome8_${cleanId}`}
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
            id={`bronzeHaloLinear8_${cleanId}`}
            x1={cx}
            y1={cy - innerR}
            x2={cx}
            y2={cy}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={corePrimary} stopOpacity={coreOpacity} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </linearGradient>

          <filter id={`baroGlow8_${cleanId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={glow} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center Brushed Obsidian Dome */}
        <path
          d={centerDomePath}
          fill={
            coreGradientType === 'solid'
              ? corePrimary
              : coreGradientType === 'linear'
              ? `url(#bronzeHaloLinear8_${cleanId})`
              : `url(#bronzeHaloDome8_${cleanId})`
          }
          fillOpacity={coreGradientType === 'solid' ? coreOpacity : undefined}
          stroke={coreBorderColor}
          strokeWidth={coreBorderWidth}
          strokeOpacity={0.9}
        />

        {/* Concentric Coordinate Guides */}
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
              r="35"
              fill="none"
              stroke={coordRingColor}
              strokeWidth="0.75"
              strokeDasharray="2 3"
              strokeOpacity={coordRingOpacity * 0.7}
            />
          </>
        )}

        {/* Inactive Background Track */}
        <path
          d={bgTrackPath}
          fill="none"
          stroke={trackBgColor}
          strokeOpacity={trackBgOpacity}
          strokeWidth={trackWidth}
          strokeLinecap="round"
        />

        {/* Deficit Gap Indicator */}
        {gapArcPath && Math.abs(deltaVal) > 0.5 && (
          <path
            d={gapArcPath}
            fill="none"
            stroke={gapColor}
            strokeWidth="3"
            strokeDasharray={gapStyle === 'solid' ? 'none' : gapStyle === 'dots' ? '2 3' : '4 3'}
            strokeOpacity="0.75"
          />
        )}

        {/* Active Probability Arc */}
        {activeArcPath && (
          <path
            d={activeArcPath}
            fill="none"
            stroke={`url(#copperGrad8_${cleanId})`}
            strokeWidth={trackWidth}
            strokeLinecap="round"
            filter={glow > 0 ? `url(#baroGlow8_${cleanId})` : undefined}
          />
        )}

        {/* Active Horizon Leading Cap */}
        {clampedVal > 0 && (
          <circle
            cx={curX}
            cy={curY}
            r={capSize}
            fill={capColor}
            stroke={capBorder}
            strokeWidth="1.5"
            filter={glow > 0 ? `url(#baroGlow8_${team.id})` : undefined}
          />
        )}

        {/* Target Benchmark Marker */}
        {showCutline && (
          <>
            <line
              x1={cx + (r + 14) * Math.cos(targetRad)}
              y1={cy + (r + 14) * Math.sin(targetRad)}
              x2={cx + (innerR - 6) * Math.cos(targetRad)}
              y2={cy + (innerR - 6) * Math.sin(targetRad)}
              stroke={targetColor}
              strokeWidth={targetWidth}
            />
            <circle
              cx={targetX}
              cy={targetY}
              r={targetPinSize}
              fill="#1c1917"
              stroke={targetPinColor}
              strokeWidth="1.5"
            />

            {showDeltaFlag && (
              <g transform={`translate(${targetX}, ${targetY - 14})`}>
                <rect
                  x="-32"
                  y="-12"
                  width="64"
                  height="14"
                  rx="3"
                  fill={targetBadgeBg}
                  stroke={targetColor}
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="-2"
                  fill={targetBadgeText}
                  fontSize="7.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  TARGET {targetPct}%
                </text>
              </g>
            )}
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
            fill="#f59e0b"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            textAnchor="middle"
          >
            {deltaVal > 0 ? `DEFICIT -${deltaVal.toFixed(1)}%` : `SURPLUS +${Math.abs(deltaVal).toFixed(1)}%`} · SEED #8
          </text>
        </g>
      </svg>
    </div>
  );
};
