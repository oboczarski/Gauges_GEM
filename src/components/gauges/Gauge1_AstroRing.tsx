import React from 'react';
import { TeamData, ChartCustomization } from '../../types';

interface Props {
  team: TeamData;
  customization?: ChartCustomization;
}

export const Gauge1_AstroRing: React.FC<Props> = ({ team, customization }) => {
  const cx = 160;
  const cy = 160;
  const r = 104;
  const innerR = 88;
  const cleanId = team.id.replace(/\s+/g, '_');
  const value = customization?.probabilityOverride ?? team.probability; // 95.3%
  const clampedVal = Math.min(100, Math.max(0, value));
  const currentAngle = 180 + (180 * clampedVal) / 100;
  const currentRad = (currentAngle * Math.PI) / 180;
  const curX = cx + r * Math.cos(currentRad);
  const curY = cy + r * Math.sin(currentRad);

  // Inactive Background Track
  const trackWidth = customization?.trackWidth ?? 16;
  const trackBgColor = customization?.trackBgColor || '#13222e';
  const trackBgOpacity = customization?.trackBgOpacity ?? 0.7;

  // Active Progress Arc Multi-Stop Colors
  const arcStart = customization?.arcColorStart || '#059669';
  const arcMid = customization?.arcColorMid || '#10b981';
  const arcEnd = customization?.arcColorEnd || '#38bdf8';

  // Core Dome Styling (Rich Luminous Emerald aura, non-black)
  const corePrimary = customization?.corePrimaryColor || '#059669';
  const coreSecondary = customization?.coreSecondaryColor || '#0d9488';
  const coreGradientType = customization?.coreGradientType || 'radial';
  const coreOpacity = customization?.coreOpacity ?? 0.85;
  const coreBorderColor = customization?.coreBorderColor || '#10b981';
  const coreBorderWidth = customization?.coreBorderWidth ?? 1;
  const coreTextColor = customization?.coreTextColor || '#f8fafc';
  const coreSubtextColor = customization?.coreSubtextColor || '#94a3b8';
  const glow = customization?.glowIntensity ?? 3;

  // Structural Toggles
  const showTicks = customization?.showTicks ?? true;
  const showCutline = customization?.showCutline ?? true;
  const showBaseline = customization?.showBaseline ?? true;
  const showCoordinates = customization?.showCoordinates ?? true;
  const decimalPlaces = customization?.decimalPlaces ?? 1;

  // Perimeter Tick Scale Styling (Separate from Arc Colors)
  // Big Ticks (Major) Color and Small Ticks (Minor) Color color the entire scale; active lit ticks have 0.7 opacity
  const totalTicks = typeof customization?.tickCount === 'number'
    ? customization.tickCount
    : typeof customization?.uniqueOption1 === 'number'
    ? customization.uniqueOption1
    : 50;
  const tickMajorColor = customization?.tickMajorColor || '#38bdf8';
  const tickMinorColor = customization?.tickMinorColor || '#334155';
  const tickMajorLength = customization?.tickMajorLength ?? 10;
  const tickMinorLength = customization?.tickMinorLength ?? 6;
  const tickStrokeWidth = customization?.tickStrokeWidth ?? 1.25;

  // Leading Diamond Beacon Pin Styling
  const showBeacon = customization?.uniqueOption2 !== false;
  const beaconColor = customization?.beaconColor || '#ffffff';
  const beaconBorderColor = customization?.beaconBorderColor || arcEnd;
  const beaconSize = customization?.beaconSize ?? 6;

  // 50% Bubble Cutline Marker Styling
  const cutlineColor = customization?.cutlineColor || '#f59e0b';
  const cutlineWidth = customization?.cutlineWidth ?? 1.5;
  const cutlinePinColor = customization?.cutlinePinColor || '#f59e0b';
  const cutlinePinSize = customization?.cutlinePinSize ?? 2.5;
  const cutlineStyle = customization?.cutlineStyle || 'dashed';

  // Inner Coordinate Guides & Rings Styling
  const coordRingColor = customization?.coordRingColor || coreBorderColor;
  const coordRingOpacity = customization?.coordRingOpacity ?? 0.45;
  const coordRingDash = customization?.coordRingDash || '2 3';
  const coordPlumbColor = customization?.coordPlumbColor || coreBorderColor;
  const coordPlumbOpacity = customization?.coordPlumbOpacity ?? 0.4;

  // Track Fill Ribbon ending at Leading Beacon
  const showTrackFill = customization?.gauge1TrackFill !== false;
  const trackFillOpacity = customization?.gauge1TrackFillOpacity ?? 0.85;

  // Background 180° track path
  const bgTrackPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  // Active arc stroke path
  const activeArcPath = clampedVal > 0 ? `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${curX} ${curY}` : '';
  // Center dome path
  const centerDomePath = `M ${cx - innerR} ${cy} A ${innerR} ${innerR} 0 0 1 ${cx + innerR} ${cy} Z`;

  // Filled track ribbon ending at leading diamond beacon
  const trackHalfW = trackWidth / 2;
  const rOut = r + trackHalfW;
  const rIn = r - trackHalfW;
  const curOutX = cx + rOut * Math.cos(currentRad);
  const curOutY = cy + rOut * Math.sin(currentRad);
  const curInX = cx + rIn * Math.cos(currentRad);
  const curInY = cy + rIn * Math.sin(currentRad);

  const activeFilledRibbonPath = clampedVal > 0
    ? `M ${cx - rOut} ${cy} A ${rOut} ${rOut} 0 0 1 ${curOutX} ${curOutY} L ${curInX} ${curInY} A ${rIn} ${rIn} 0 0 0 ${cx - rIn} ${cy} Z`
    : '';

  // Tick marks around outer perimeter with 4 small ticks between 2 big ticks
  // Big ticks (major) and small ticks (minor) color the entire perimeter; active lit ticks have 0.7 opacity
  const ticks = Array.from({ length: totalTicks + 1 }).map((_, i) => {
    const angle = 180 + (180 * i) / totalTicks;
    const rad = (angle * Math.PI) / 180;
    const isMajor = i % 5 === 0;
    const rOuter = 124;
    const length = isMajor ? tickMajorLength : tickMinorLength;
    const rInner = rOuter - length;
    const x1 = cx + rOuter * Math.cos(rad);
    const y1 = cy + rOuter * Math.sin(rad);
    const x2 = cx + rInner * Math.cos(rad);
    const y2 = cy + rInner * Math.sin(rad);
    const isLit = (i / totalTicks) * 100 <= clampedVal;

    const strokeColor = isMajor ? tickMajorColor : tickMinorColor;
    const strokeOpacity = isLit ? 0.7 : isMajor ? 0.28 : 0.16;

    return { x1, y1, x2, y2, isMajor, isLit, strokeColor, strokeOpacity, index: i };
  });

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg
        viewBox="0 0 320 200"
        className="w-full max-w-[320px] h-auto select-none"
        aria-label={`${team.name} Playoff Probability ${value.toFixed(decimalPlaces)}%`}
      >
        <defs>
          {/* Main UserSpaceOnUse Multi-Stop Gradient for Active Arc & Track Fill */}
          <linearGradient
            id={`auroraGrad1_${cleanId}`}
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

          {/* Center Dome Frosted Aurora Radial Gradient (Luminous & Vibrant) */}
          <radialGradient
            id={`auroraCenterDome1_${cleanId}`}
            cx={cx}
            cy={cy - innerR * 0.3}
            r={innerR * 0.95}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={corePrimary} stopOpacity={coreOpacity} />
            <stop offset="55%" stopColor={corePrimary} stopOpacity={coreOpacity * 0.95} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </radialGradient>

          {/* Center Dome Linear Gradient */}
          <linearGradient
            id={`auroraCenterLinear1_${cleanId}`}
            x1={cx}
            y1={cy - innerR}
            x2={cx}
            y2={cy}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={corePrimary} stopOpacity={coreOpacity} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </linearGradient>

          {/* Precision Soft Glow Filter */}
          <filter id={`auroraGlow1_${cleanId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={glow} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center Frosted Dome Background */}
        <path
          d={centerDomePath}
          fill={
            coreGradientType === 'solid'
              ? corePrimary
              : coreGradientType === 'linear'
              ? `url(#auroraCenterLinear1_${cleanId})`
              : `url(#auroraCenterDome1_${cleanId})`
          }
          fillOpacity={coreGradientType === 'solid' ? coreOpacity : undefined}
          stroke={coreBorderColor}
          strokeWidth={coreBorderWidth}
        />

        {/* Inner Dome Starlight Coordinate Arcs & Rings */}
        {showCoordinates && (
          <>
            <circle
              cx={cx}
              cy={cy}
              r="62"
              fill="none"
              stroke={coordRingColor}
              strokeWidth="1"
              strokeDasharray={coordRingDash}
              strokeOpacity={coordRingOpacity}
            />
            <circle
              cx={cx}
              cy={cy}
              r="38"
              fill="none"
              stroke={coordRingColor}
              strokeWidth="0.75"
              strokeDasharray={coordRingDash}
              strokeOpacity={coordRingOpacity * 0.7}
            />
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
          </>
        )}

        {/* Perimeter Calibrated Ticks (Major & Minor separate styling, active lit ticks at 0.7 opacity) */}
        {showTicks && (
          <g>
            {ticks.map((t) => (
              <line
                key={t.index}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke={t.strokeColor}
                strokeWidth={t.isMajor ? tickStrokeWidth * 1.3 : tickStrokeWidth}
                strokeOpacity={t.strokeOpacity}
                strokeLinecap="round"
              />
            ))}
          </g>
        )}

        {/* Inactive Background Track (strictly uses trackBgColor & trackBgOpacity) */}
        <path
          d={bgTrackPath}
          fill="none"
          stroke={trackBgColor}
          strokeOpacity={trackBgOpacity}
          strokeWidth={trackWidth}
          strokeLinecap="round"
        />

        {/* Active Track Gradient Fill Ribbon ending at leading diamond beacon pin */}
        {showTrackFill && activeFilledRibbonPath && (
          <path
            d={activeFilledRibbonPath}
            fill={`url(#auroraGrad1_${cleanId})`}
            fillOpacity={trackFillOpacity}
          />
        )}

        {/* Active Progress Arc Stroke */}
        {activeArcPath && (
          <path
            d={activeArcPath}
            fill="none"
            stroke={`url(#auroraGrad1_${cleanId})`}
            strokeWidth={trackWidth}
            strokeLinecap="round"
            filter={glow > 0 ? `url(#auroraGlow1_${cleanId})` : undefined}
          />
        )}

        {/* Dynamic Leading Beacon Diamond Pin */}
        {showBeacon && clampedVal > 0 && (
          <g transform={`translate(${curX}, ${curY})`} filter={glow > 0 ? `url(#auroraGlow1_${cleanId})` : undefined}>
            <polygon
              points={`0,-${beaconSize} ${beaconSize},0 0,${beaconSize} -${beaconSize},0`}
              fill={beaconColor}
              stroke={beaconBorderColor}
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r={Math.max(1, beaconSize * 0.3)} fill={beaconBorderColor} />
          </g>
        )}

        {/* 50% Bubble Cutline Marker */}
        {showCutline && (
          <g>
            <line
              x1={cx}
              y1={cy - r - 10}
              x2={cx}
              y2={cy - innerR}
              stroke={cutlineColor}
              strokeWidth={cutlineWidth}
              strokeDasharray={cutlineStyle === 'laser' ? 'none' : cutlineStyle === 'solid' ? 'none' : '2 3'}
              strokeOpacity={0.8}
            />
            <circle cx={cx} cy={cy - r} r={cutlinePinSize} fill={cutlinePinColor} />
          </g>
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
            fill="#34d399"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            textAnchor="middle"
          >
            SEED #1 · CLINCH IMMINENT
          </text>
        </g>
      </svg>
    </div>
  );
};
