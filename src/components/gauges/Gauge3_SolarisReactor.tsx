import React from 'react';
import { TeamData, ChartCustomization } from '../../types';

interface Props {
  team: TeamData;
  customization?: ChartCustomization;
}

export const Gauge3_SolarisReactor: React.FC<Props> = ({ team, customization }) => {
  const cx = 160;
  const cy = 160;

  // Track & Inactive Background
  const trackWidth = customization?.trackWidth ?? 8;
  const trackBgColor = customization?.trackBgColor || '#1a1410';
  const trackBgOpacity = customization?.trackBgOpacity ?? 0.6;

  // Active Progress Multi-Stop Colors for Track 1 (Primary Playoff Prob)
  const arcStart = customization?.arcColorStart || '#eab308';
  const arcMid = customization?.arcColorMid || '#f97316';
  const arcEnd = customization?.arcColorEnd || '#f43f5e';

  // Chart-Specific: Concentric Track 2 and Track 3 Colors
  const track2Color = customization?.gauge3Track2Color || arcMid;
  const track3Color = customization?.gauge3Track3Color || arcStart;

  // Core Dome Styling (Rich Glowing Solar Amber, non-black)
  const corePrimary = customization?.corePrimaryColor || '#ea580c';
  const coreSecondary = customization?.coreSecondaryColor || '#d97706';
  const coreGradientType = customization?.coreGradientType || 'radial';
  const coreOpacity = customization?.coreOpacity ?? 0.85;
  const coreBorderColor = customization?.coreBorderColor || '#f97316';
  const coreBorderWidth = customization?.coreBorderWidth ?? 1;
  const coreTextColor = customization?.coreTextColor || '#f8fafc';
  const coreSubtextColor = customization?.coreSubtextColor || '#94a3b8';
  const glow = customization?.glowIntensity ?? 2.5;

  // Structural Toggles
  const showCutline = customization?.showCutline ?? true;
  const showBaseline = customization?.showBaseline ?? true;
  const showCoordinates = customization?.showCoordinates ?? true;
  const decimalPlaces = customization?.decimalPlaces ?? 1;

  // Chart-Specific: Sunburst Radial Rays Styling
  const rayColor = customization?.gauge3RayColor || arcMid;
  const rayOpacity = customization?.gauge3RayOpacity ?? 0.28;
  const rayCount = typeof customization?.gauge3RayCount === 'number'
    ? customization.gauge3RayCount
    : typeof customization?.uniqueOption2 === 'number'
    ? customization.uniqueOption2
    : 19;

  // Chart-Specific: Track Count
  const trackCount = typeof customization?.uniqueOption1 === 'number' ? customization.uniqueOption1 : 3;

  // 50% Bubble Cutline Styling
  const cutlineColor = customization?.cutlineColor || '#f59e0b';
  const cutlineWidth = customization?.cutlineWidth ?? 1.5;
  const cutlinePinColor = customization?.cutlinePinColor || '#f59e0b';
  const cutlinePinSize = customization?.cutlinePinSize ?? 2.5;

  // Coordinate Rings
  const coordRingColor = customization?.coordRingColor || coreBorderColor;
  const coordRingOpacity = customization?.coordRingOpacity ?? 0.35;

  // Concentric arc radii
  const r1 = 114; // Outer: Playoff Prob
  const r2 = 100; // Middle: Projected Win Rate
  const r3 = 86;  // Inner: Pace
  const innerR = 72; // Center dome
  const cleanId = team.id.replace(/\s+/g, '_');

  const probVal = customization?.probabilityOverride ?? team.probability;
  const winVal = (team.wins / 14) * 100;
  const paceVal = 82.0;

  const getArcPath = (radius: number, percent: number) => {
    const clamped = Math.min(100, Math.max(0, percent));
    const angle = 180 + (180 * clamped) / 100;
    const rad = (angle * Math.PI) / 180;
    const x = cx + radius * Math.cos(rad);
    const y = cy + radius * Math.sin(rad);
    return `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${x} ${y}`;
  };

  const getBgPath = (radius: number) => {
    return `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;
  };

  const centerDomePath = `M ${cx - innerR} ${cy} A ${innerR} ${innerR} 0 0 1 ${cx + innerR} ${cy} Z`;

  const sunburstRays = Array.from({ length: rayCount }).map((_, i) => {
    const angle = 180 + (180 * i) / Math.max(1, rayCount - 1);
    const rad = (angle * Math.PI) / 180;
    const x1 = cx + 22 * Math.cos(rad);
    const y1 = cy + 22 * Math.sin(rad);
    const x2 = cx + 66 * Math.cos(rad);
    const y2 = cy + 66 * Math.sin(rad);
    return { x1, y1, x2, y2, i };
  });

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg
        viewBox="0 0 320 200"
        className="w-full max-w-[320px] h-auto select-none"
        aria-label={`${team.name} Playoff Probability ${probVal.toFixed(decimalPlaces)}%`}
      >
        <defs>
          {/* Main UserSpaceOnUse Multi-Stop Gradient for Track 1 */}
          <linearGradient
            id={`solarGrad1_${cleanId}`}
            gradientUnits="userSpaceOnUse"
            x1={cx - r1}
            y1={cy}
            x2={cx + r1}
            y2={cy}
          >
            <stop offset="0%" stopColor={arcStart} />
            <stop offset="50%" stopColor={arcMid} />
            <stop offset="100%" stopColor={arcEnd} />
          </linearGradient>

          {/* UserSpaceOnUse Gradient for Track 2 */}
          <linearGradient
            id={`solarGrad2_${cleanId}`}
            gradientUnits="userSpaceOnUse"
            x1={cx - r2}
            y1={cy}
            x2={cx + r2}
            y2={cy}
          >
            <stop offset="0%" stopColor={arcStart} stopOpacity="0.75" />
            <stop offset="100%" stopColor={track2Color} />
          </linearGradient>

          {/* UserSpaceOnUse Gradient for Track 3 */}
          <linearGradient
            id={`solarGrad3_${cleanId}`}
            gradientUnits="userSpaceOnUse"
            x1={cx - r3}
            y1={cy}
            x2={cx + r3}
            y2={cy}
          >
            <stop offset="0%" stopColor={track3Color} stopOpacity="0.75" />
            <stop offset="100%" stopColor={arcEnd} stopOpacity="0.9" />
          </linearGradient>

          {/* Center Sunburst Radial Gradient */}
          <radialGradient
            id={`solarSunburstDome3_${cleanId}`}
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
            id={`solarSunburstLinear3_${cleanId}`}
            x1={cx}
            y1={cy - innerR}
            x2={cx}
            y2={cy}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={corePrimary} stopOpacity={coreOpacity} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </linearGradient>

          <filter id={`solarGlow3_${cleanId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={glow} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center Molten Sunburst Dome */}
        <path
          d={centerDomePath}
          fill={
            coreGradientType === 'solid'
              ? corePrimary
              : coreGradientType === 'linear'
              ? `url(#solarSunburstLinear3_${cleanId})`
              : `url(#solarSunburstDome3_${cleanId})`
          }
          fillOpacity={coreGradientType === 'solid' ? coreOpacity : undefined}
          stroke={coreBorderColor}
          strokeWidth={coreBorderWidth}
          strokeOpacity={0.9}
        />

        {/* Sunburst Radial Ray Texture */}
        {rayCount > 0 && (
          <g>
            {sunburstRays.map((ray) => (
              <line
                key={ray.i}
                x1={ray.x1}
                y1={ray.y1}
                x2={ray.x2}
                y2={ray.y2}
                stroke={rayColor}
                strokeWidth="1"
                strokeOpacity={rayOpacity}
              />
            ))}
          </g>
        )}

        {/* Concentric Guide Arcs in Dome */}
        {showCoordinates && (
          <>
            <circle
              cx={cx}
              cy={cy}
              r="48"
              fill="none"
              stroke={coordRingColor}
              strokeWidth="0.75"
              strokeDasharray="2 3"
              strokeOpacity={coordRingOpacity}
            />
            <circle
              cx={cx}
              cy={cy}
              r="26"
              fill="none"
              stroke={coordRingColor}
              strokeWidth="0.75"
              strokeDasharray="2 3"
              strokeOpacity={coordRingOpacity * 0.7}
            />
          </>
        )}

        {/* Track 3: Pace (if trackCount >= 3) */}
        {trackCount >= 3 && (
          <>
            <path
              d={getBgPath(r3)}
              fill="none"
              stroke={trackBgColor}
              strokeOpacity={trackBgOpacity}
              strokeWidth={trackWidth}
              strokeLinecap="round"
            />
            <path
              d={getArcPath(r3, paceVal)}
              fill="none"
              stroke={`url(#solarGrad3_${cleanId})`}
              strokeWidth={trackWidth}
              strokeLinecap="round"
            />
          </>
        )}

        {/* Track 2: Win Rate (if trackCount >= 2) */}
        {trackCount >= 2 && (
          <>
            <path
              d={getBgPath(r2)}
              fill="none"
              stroke={trackBgColor}
              strokeOpacity={trackBgOpacity}
              strokeWidth={trackWidth}
              strokeLinecap="round"
            />
            <path
              d={getArcPath(r2, winVal)}
              fill="none"
              stroke={`url(#solarGrad2_${cleanId})`}
              strokeWidth={trackWidth}
              strokeLinecap="round"
            />
          </>
        )}

        {/* Track 1: Playoff Prob (Primary) */}
        <path
          d={getBgPath(r1)}
          fill="none"
          stroke={trackBgColor}
          strokeOpacity={trackBgOpacity}
          strokeWidth={trackWidth}
          strokeLinecap="round"
        />
        <path
          d={getArcPath(r1, probVal)}
          fill="none"
          stroke={`url(#solarGrad1_${cleanId})`}
          strokeWidth={trackWidth}
          strokeLinecap="round"
          filter={glow > 0 ? `url(#solarGlow3_${cleanId})` : undefined}
        />

        {/* 50% Bubble Cutline */}
        {showCutline && (
          <>
            <line
              x1={cx}
              y1={cy - r1 - 10}
              x2={cx}
              y2={cy - innerR}
              stroke={cutlineColor}
              strokeWidth={cutlineWidth}
              strokeDasharray="2 3"
              strokeOpacity="0.8"
            />
            <circle cx={cx} cy={cy - r1} r={cutlinePinSize} fill={cutlinePinColor} />
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
        <g transform={`translate(${cx}, ${cy - 16})`}>
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
            fontSize="30"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="800"
            textAnchor="middle"
            letterSpacing="-0.03em"
          >
            {probVal.toFixed(decimalPlaces)}%
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
            CONCENTRIC MULTI-TRACK · #{team.seed}
          </text>
        </g>
      </svg>
    </div>
  );
};
