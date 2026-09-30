import React from 'react';
import { TeamData, ChartCustomization } from '../../types';
import { interpolate3StopColor } from '../../utils/colors';

interface Props {
  team: TeamData;
  customization?: ChartCustomization;
}

export const Gauge7_SonarRadarSweep: React.FC<Props> = ({ team, customization }) => {
  const cx = 160;
  const cy = 160;
  const innerR = 76;
  const cleanId = team.id.replace(/\s+/g, '_');
  const value = customization?.probabilityOverride ?? team.probability; // 33.2%

  // Progress Bar Multi-Stop Colors
  const arcStart = customization?.arcColorStart || '#2563eb';
  const arcMid = customization?.arcColorMid || '#06b6d4';
  const arcEnd = customization?.arcColorEnd || '#2dd4bf';

  // Inactive Background Track & Nodes
  const trackBgColor = customization?.trackBgColor || '#1e293b';
  const trackBgOpacity = customization?.trackBgOpacity ?? 0.35;
  const trackWidth = customization?.trackWidth ?? 5;
  const unlitOpacity = customization?.gauge7UnlitOpacity ?? trackBgOpacity;

  // Core Dome Styling (Rich Electric Sapphire Blue, non-black)
  const corePrimary = customization?.corePrimaryColor || '#2563eb';
  const coreSecondary = customization?.coreSecondaryColor || '#4f46e5';
  const coreGradientType = customization?.coreGradientType || 'radial';
  const coreOpacity = customization?.coreOpacity ?? 0.85;
  const coreBorderColor = customization?.coreBorderColor || '#3b82f6';
  const coreBorderWidth = customization?.coreBorderWidth ?? 1;
  const coreTextColor = customization?.coreTextColor || '#f8fafc';
  const coreSubtextColor = customization?.coreSubtextColor || '#94a3b8';
  const glow = customization?.glowIntensity ?? 2;

  // Structural Toggles
  const showCutline = customization?.showCutline ?? true;
  const showBaseline = customization?.showBaseline ?? true;
  const showCoordinates = customization?.showCoordinates ?? true;
  const decimalPlaces = customization?.decimalPlaces ?? 1;

  // Chart-Specific: Scatter Matrix Parameters
  const ringCount = typeof customization?.gauge7RingCount === 'number'
    ? customization.gauge7RingCount
    : typeof customization?.uniqueOption1 === 'number'
    ? customization.uniqueOption1
    : 5;

  const dotRadius = typeof customization?.gauge7DotRadius === 'number'
    ? customization.gauge7DotRadius
    : typeof customization?.uniqueOption2 === 'number'
    ? customization.uniqueOption2
    : 2.2;

  // Chart-Specific: Pointer Ray / Beam Needle
  const showPointerRay = customization?.uniqueOption3 !== false;
  const rayColor = customization?.gauge7RayColor || customization?.beaconBorderColor || arcEnd;
  const pinFill = customization?.beaconColor || '#ffffff';
  const pinSize = customization?.beaconSize ?? 3.5;

  // 50% Bubble Cutline Styling
  const cutlineColor = customization?.cutlineColor || '#f59e0b';
  const cutlineWidth = customization?.cutlineWidth ?? 1.5;
  const cutlinePinColor = customization?.cutlinePinColor || '#f59e0b';
  const cutlinePinSize = customization?.cutlinePinSize ?? 2.5;

  // Dome Coordinate Rings & Guides
  const coordRingColor = customization?.coordRingColor || coreBorderColor;
  const coordRingOpacity = customization?.coordRingOpacity ?? 0.35;
  const coordRingDash = customization?.coordRingDash || '2 3';
  const coordPlumbColor = customization?.coordPlumbColor || coreBorderColor;
  const coordPlumbOpacity = customization?.coordPlumbOpacity ?? 0.35;

  // Dynamic concentric ring radii based on ringCount
  const rings = Array.from({ length: ringCount }).map((_, i) => {
    return 86 + (32 / Math.max(1, ringCount - 1)) * i;
  });

  const outerArcR = 124;
  const dotsPerRing = 36;
  const clampedVal = Math.min(100, Math.max(0, value));
  const litDots = Math.round((dotsPerRing * clampedVal) / 100);

  // Generate matrix points
  const dotGrid = rings.flatMap((r, ringIdx) => {
    return Array.from({ length: dotsPerRing }).map((_, dotIdx) => {
      const angle = 180 + (180 * (dotIdx + 0.5)) / dotsPerRing;
      const rad = (angle * Math.PI) / 180;
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      const isLit = dotIdx < litDots;

      const progressFactor = dotIdx / Math.max(1, dotsPerRing);
      const color = isLit
        ? interpolate3StopColor(arcStart, arcMid, arcEnd, progressFactor)
        : trackBgColor;

      return { x, y, isLit, color, ringIdx, dotIdx };
    });
  });

  const centerDomePath = `M ${cx - innerR} ${cy} A ${innerR} ${innerR} 0 0 1 ${cx + innerR} ${cy} Z`;

  // Perimeter active progress arc
  const curAngle = 180 + (180 * clampedVal) / 100;
  const curRad = (curAngle * Math.PI) / 180;
  const curOuterX = cx + outerArcR * Math.cos(curRad);
  const curOuterY = cy + outerArcR * Math.sin(curRad);

  const bgOuterArcPath = `M ${cx - outerArcR} ${cy} A ${outerArcR} ${outerArcR} 0 0 1 ${cx + outerArcR} ${cy}`;
  const activeOuterArcPath = clampedVal > 0 ? `M ${cx - outerArcR} ${cy} A ${outerArcR} ${outerArcR} 0 0 1 ${curOuterX} ${curOuterY}` : '';

  // Pointer sweep needle
  const pointerRad = curRad;
  const ptX1 = cx + (innerR + 2) * Math.cos(pointerRad);
  const ptY1 = cy + (innerR + 2) * Math.sin(pointerRad);
  const ptX2 = cx + (outerArcR + 4) * Math.cos(pointerRad);
  const ptY2 = cy + (outerArcR + 4) * Math.sin(pointerRad);

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg
        viewBox="0 0 320 200"
        className="w-full max-w-[320px] h-auto select-none"
        aria-label={`${team.name} Playoff Probability ${value.toFixed(decimalPlaces)}%`}
      >
        <defs>
          <linearGradient
            id={`activeProgressGrad7_${cleanId}`}
            gradientUnits="userSpaceOnUse"
            x1={cx - outerArcR}
            y1={cy}
            x2={cx + outerArcR}
            y2={cy}
          >
            <stop offset="0%" stopColor={arcStart} />
            <stop offset="50%" stopColor={arcMid} />
            <stop offset="100%" stopColor={arcEnd} />
          </linearGradient>

          <radialGradient
            id={`sapphireDome7_${cleanId}`}
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
            id={`sapphireLinear7_${cleanId}`}
            x1={cx}
            y1={cy - innerR}
            x2={cx}
            y2={cy}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={corePrimary} stopOpacity={coreOpacity} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </linearGradient>

          <filter id={`dotGlow7_${cleanId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={glow} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center Sapphire Dome */}
        <path
          d={centerDomePath}
          fill={
            coreGradientType === 'solid'
              ? corePrimary
              : coreGradientType === 'linear'
              ? `url(#sapphireLinear7_${cleanId})`
              : `url(#sapphireDome7_${cleanId})`
          }
          fillOpacity={coreGradientType === 'solid' ? coreOpacity : undefined}
          stroke={coreBorderColor}
          strokeWidth={coreBorderWidth}
          strokeOpacity={0.9}
        />

        {/* Dome Internal Coordinate Guides */}
        {showCoordinates && (
          <>
            <line
              x1={cx}
              y1={cy - innerR}
              x2={cx}
              y2={cy}
              stroke={coordPlumbColor}
              strokeWidth="1"
              strokeDasharray="3 3"
              strokeOpacity={coordPlumbOpacity}
            />
            <circle
              cx={cx}
              cy={cy}
              r="48"
              fill="none"
              stroke={coordRingColor}
              strokeWidth="1"
              strokeDasharray={coordRingDash}
              strokeOpacity={coordRingOpacity}
            />
            <circle
              cx={cx}
              cy={cy}
              r="26"
              fill="none"
              stroke={coordRingColor}
              strokeWidth="0.75"
              strokeDasharray={coordRingDash}
              strokeOpacity={coordRingOpacity * 0.7}
            />
          </>
        )}

        {/* Inactive Background Outer Progress Track */}
        <path
          d={bgOuterArcPath}
          fill="none"
          stroke={trackBgColor}
          strokeOpacity={trackBgOpacity}
          strokeWidth={trackWidth}
          strokeLinecap="round"
        />

        {/* Active Progress Perimeter Arc */}
        {activeOuterArcPath && (
          <path
            d={activeOuterArcPath}
            fill="none"
            stroke={`url(#activeProgressGrad7_${team.id})`}
            strokeWidth={trackWidth}
            strokeLinecap="round"
            filter={glow > 0 ? `url(#dotGlow7_${team.id})` : undefined}
          />
        )}

        {/* Matrix Micro-Dots */}
        <g filter={glow > 0 ? `url(#dotGlow7_${team.id})` : undefined}>
          {dotGrid.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.isLit ? dotRadius : dotRadius * 0.75}
              fill={d.color}
              fillOpacity={d.isLit ? 0.95 : unlitOpacity}
            />
          ))}
        </g>

        {/* Active Deficit Pointer Ray */}
        {showPointerRay && clampedVal > 0 && (
          <g filter={glow > 0 ? `url(#dotGlow7_${cleanId})` : undefined}>
            <line
              x1={ptX1}
              y1={ptY1}
              x2={ptX2}
              y2={ptY2}
              stroke={rayColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx={curOuterX}
              cy={curOuterY}
              r={pinSize}
              fill={pinFill}
              stroke={rayColor}
              strokeWidth="1.5"
            />
          </g>
        )}

        {/* 50% Bubble Cutline Guideline */}
        {showCutline && (
          <>
            <line
              x1={cx}
              y1={cy - outerArcR - 8}
              x2={cx}
              y2={cy - innerR}
              stroke={cutlineColor}
              strokeWidth={cutlineWidth}
              strokeDasharray="2 3"
              strokeOpacity="0.75"
            />
            <circle cx={cx} cy={cy - outerArcR} r={cutlinePinSize} fill={cutlinePinColor} />
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

        {/* Boundary Scale Labels */}
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
            y="-20"
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
            fontSize="28"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="800"
            textAnchor="middle"
            letterSpacing="-0.03em"
          >
            {value.toFixed(decimalPlaces)}%
          </text>

          <text
            x="0"
            y="20"
            fill={coreSubtextColor}
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
            textAnchor="middle"
          >
            SEED #7 · 1.5 GB
          </text>
        </g>
      </svg>
    </div>
  );
};
