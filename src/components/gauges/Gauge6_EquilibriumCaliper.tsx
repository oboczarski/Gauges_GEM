import React from 'react';
import { TeamData, ChartCustomization } from '../../types';

interface Props {
  team: TeamData;
  customization?: ChartCustomization;
}

export const Gauge6_EquilibriumCaliper: React.FC<Props> = ({ team, customization }) => {
  const cx = 160;
  const cy = 160;
  const r = 104;
  const innerR = 86;
  const cleanId = team.id.replace(/\s+/g, '_');
  const value = customization?.probabilityOverride ?? team.probability; // 50.0%

  // Progress Bar Multi-Stop Colors
  const arcStart = customization?.arcColorStart || '#ef4444';
  const arcMid = customization?.arcColorMid || '#f59e0b';
  const arcEnd = customization?.arcColorEnd || '#10b981';

  // Inactive Background Track
  const trackWidth = customization?.trackWidth ?? 14;
  const trackBgColor = customization?.trackBgColor || '#141c2b';
  const trackBgOpacity = customization?.trackBgOpacity ?? 0.6;

  // Core Dome Styling
  const corePrimary = customization?.corePrimaryColor || customization?.gauge6LeftDomeColor || '#dc2626';
  const coreSecondary = customization?.coreSecondaryColor || customization?.gauge6RightDomeColor || '#059669';
  const leftDomeColor = customization?.gauge6LeftDomeColor || corePrimary;
  const rightDomeColor = customization?.gauge6RightDomeColor || coreSecondary;
  const coreGradientType = customization?.coreGradientType || 'radial';
  const coreOpacity = customization?.coreOpacity ?? 0.85;
  const coreBorderColor = customization?.coreBorderColor || '#475569';
  const coreBorderWidth = customization?.coreBorderWidth ?? 1;
  const coreTextColor = customization?.coreTextColor || '#f8fafc';
  const coreSubtextColor = customization?.coreSubtextColor || '#94a3b8';
  const glow = customization?.glowIntensity ?? 2.5;

  // Structural Toggles
  const showCutline = customization?.showCutline ?? true;
  const showBaseline = customization?.showBaseline ?? true;
  const decimalPlaces = customization?.decimalPlaces ?? 1;

  // Chart-Specific: Meridian Cutline & Flag Styling
  const cutlineStyle = customization?.cutlineStyle || (customization?.uniqueOption1 as string) || 'flag';
  const cutlineThreshold = typeof customization?.cutlineThreshold === 'number'
    ? customization.cutlineThreshold
    : typeof customization?.uniqueOption2 === 'number'
    ? customization.uniqueOption2
    : 50;

  const cutlineColor = customization?.cutlineColor || '#38bdf8';
  const cutlineWidth = customization?.cutlineWidth ?? 2.5;
  const cutlinePinColor = customization?.cutlinePinColor || '#38bdf8';
  const cutlinePinSize = customization?.cutlinePinSize ?? 4;
  const badgeBg = customization?.cutlineBadgeBg || '#0b1320';
  const badgeText = customization?.cutlineBadgeText || cutlineColor;

  // Chart-Specific: Zone Labels Styling
  const labelColorOut = customization?.gauge6LabelColorOut || coreSubtextColor;
  const labelColorIn = customization?.gauge6LabelColorIn || coreSubtextColor;

  // Active Head Beacon Pin
  const beaconColor = customization?.beaconColor || '#ffffff';
  const beaconBorder = customization?.beaconBorderColor || arcMid;
  const beaconSize = customization?.beaconSize ?? (trackWidth * 0.45);

  // Split-dome paths based on cutlineThreshold
  const cutlineAngle = 180 + (180 * Math.min(100, Math.max(0, cutlineThreshold))) / 100;
  const cutlineRad = (cutlineAngle * Math.PI) / 180;
  const cutlineApexX = cx + innerR * Math.cos(cutlineRad);
  const cutlineApexY = cy + innerR * Math.sin(cutlineRad);

  const centerDomePath = `M ${cx - innerR} ${cy} A ${innerR} ${innerR} 0 0 1 ${cx + innerR} ${cy} Z`;
  const leftDomePath = `M ${cx - innerR} ${cy} A ${innerR} ${innerR} 0 0 1 ${cutlineApexX} ${cutlineApexY} L ${cx} ${cy} Z`;
  const rightDomePath = `M ${cutlineApexX} ${cutlineApexY} A ${innerR} ${innerR} 0 0 1 ${cx + innerR} ${cy} L ${cx} ${cy} Z`;

  // Dynamic active progress arc
  const clampedVal = Math.min(100, Math.max(0, value));
  const curAngle = 180 + (180 * clampedVal) / 100;
  const rad = (curAngle * Math.PI) / 180;
  const curX = cx + r * Math.cos(rad);
  const curY = cy + r * Math.sin(rad);

  const fullBgArcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const activeArcPath = clampedVal > 0 ? `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${curX} ${curY}` : '';

  // Cutline marker coordinates on the track
  const cutlineTrackX = cx + r * Math.cos(cutlineRad);
  const cutlineTrackY = cy + r * Math.sin(cutlineRad);

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg
        viewBox="0 0 320 200"
        className="w-full max-w-[320px] h-auto select-none"
        aria-label={`${team.name} Playoff Probability ${value.toFixed(decimalPlaces)}%`}
      >
        <defs>
          {/* UserSpaceOnUse Multi-Stop Gradient mapped across full 0%–100% sweep of the gauge */}
          <linearGradient
            id={`activeProgressGrad6_${cleanId}`}
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

          {/* Unified Center Dome Linear Gradient */}
          <linearGradient
            id={`centerDomeLinear6_${cleanId}`}
            x1={cx}
            y1={cy - innerR}
            x2={cx}
            y2={cy}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={corePrimary} stopOpacity={coreOpacity} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </linearGradient>

          {/* Left Split Dome Radial Gradient */}
          <radialGradient
            id={`leftDomeGrad6_${cleanId}`}
            cx={cx - innerR * 0.35}
            cy={cy - innerR * 0.3}
            r={innerR * 0.95}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={leftDomeColor} stopOpacity={coreOpacity} />
            <stop offset="60%" stopColor={leftDomeColor} stopOpacity={coreOpacity * 0.95} />
            <stop offset="100%" stopColor={coreSecondary} stopOpacity={coreOpacity} />
          </radialGradient>

          {/* Right Split Dome Radial Gradient */}
          <radialGradient
            id={`rightDomeGrad6_${cleanId}`}
            cx={cx + innerR * 0.35}
            cy={cy - innerR * 0.3}
            r={innerR * 0.95}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={rightDomeColor} stopOpacity={coreOpacity} />
            <stop offset="60%" stopColor={rightDomeColor} stopOpacity={coreOpacity * 0.95} />
            <stop offset="100%" stopColor={corePrimary} stopOpacity={coreOpacity} />
          </radialGradient>

          {/* Glowing filter for the active progress bar */}
          <filter id={`progressGlow6_${cleanId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={glow} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center Dome: Solid Color, Linear Drop, or Split Radial Hemispheres */}
        {coreGradientType === 'solid' ? (
          <path
            d={centerDomePath}
            fill={corePrimary}
            fillOpacity={coreOpacity}
            stroke={coreBorderColor}
            strokeWidth={coreBorderWidth}
          />
        ) : coreGradientType === 'linear' ? (
          <path
            d={centerDomePath}
            fill={`url(#centerDomeLinear6_${cleanId})`}
            stroke={coreBorderColor}
            strokeWidth={coreBorderWidth}
          />
        ) : (
          <>
            {/* Left Split Dome (Hazard Zone) */}
            <path
              d={leftDomePath}
              fill={`url(#leftDomeGrad6_${cleanId})`}
              stroke={coreBorderColor}
              strokeWidth={coreBorderWidth}
            />

            {/* Right Split Dome (Safe Zone) */}
            <path
              d={rightDomePath}
              fill={`url(#rightDomeGrad6_${cleanId})`}
              stroke={coreBorderColor}
              strokeWidth={coreBorderWidth}
            />
          </>
        )}

        {/* Inactive Background Track */}
        <path
          d={fullBgArcPath}
          fill="none"
          stroke={trackBgColor}
          strokeOpacity={trackBgOpacity}
          strokeWidth={trackWidth}
          strokeLinecap="round"
        />

        {/* Active Progress Bar */}
        {activeArcPath && (
          <path
            d={activeArcPath}
            fill="none"
            stroke={`url(#activeProgressGrad6_${cleanId})`}
            strokeWidth={trackWidth}
            strokeLinecap="round"
            filter={glow > 0 ? `url(#progressGlow6_${cleanId})` : undefined}
          />
        )}

        {/* Subtle illuminated core ray on active bar */}
        {activeArcPath && (
          <path
            d={activeArcPath}
            fill="none"
            stroke="#ffffff"
            strokeWidth={Math.max(1.5, trackWidth * 0.16)}
            strokeLinecap="round"
            strokeOpacity={0.25}
          />
        )}

        {/* Active Head Beacon Pin */}
        {clampedVal > 0 && (
          <circle
            cx={curX}
            cy={curY}
            r={beaconSize}
            fill={beaconColor}
            stroke={beaconBorder}
            strokeWidth="2"
            filter={glow > 0 ? `url(#progressGlow6_${cleanId})` : undefined}
          />
        )}

        {/* Meridian Cutline Divider */}
        {showCutline && (
          <>
            {cutlineStyle === 'laser' ? (
              <line
                x1={cx + (r + 14) * Math.cos(cutlineRad)}
                y1={cy + (r + 14) * Math.sin(cutlineRad)}
                x2={cx}
                y2={cy}
                stroke={cutlineColor}
                strokeWidth={cutlineWidth}
                strokeDasharray="4 2"
              />
            ) : cutlineStyle === 'dashed' ? (
              <line
                x1={cx + (r + 12) * Math.cos(cutlineRad)}
                y1={cy + (r + 12) * Math.sin(cutlineRad)}
                x2={cx + (innerR - 6) * Math.cos(cutlineRad)}
                y2={cy + (innerR - 6) * Math.sin(cutlineRad)}
                stroke={cutlineColor}
                strokeWidth={cutlineWidth}
                strokeDasharray="3 3"
              />
            ) : cutlineStyle === 'solid' ? (
              <line
                x1={cx + (r + 14) * Math.cos(cutlineRad)}
                y1={cy + (r + 14) * Math.sin(cutlineRad)}
                x2={cx + (innerR - 6) * Math.cos(cutlineRad)}
                y2={cy + (innerR - 6) * Math.sin(cutlineRad)}
                stroke={cutlineColor}
                strokeWidth={cutlineWidth}
              />
            ) : (
              <>
                <line
                  x1={cx + (r + 14) * Math.cos(cutlineRad)}
                  y1={cy + (r + 14) * Math.sin(cutlineRad)}
                  x2={cx + (innerR - 6) * Math.cos(cutlineRad)}
                  y2={cy + (innerR - 6) * Math.sin(cutlineRad)}
                  stroke={cutlineColor}
                  strokeWidth={cutlineWidth}
                />
                <circle
                  cx={cutlineTrackX}
                  cy={cutlineTrackY}
                  r={cutlinePinSize}
                  fill="#0b1320"
                  stroke={cutlinePinColor}
                  strokeWidth="2"
                />

                {cutlineStyle === 'flag' && (
                  <g transform={`translate(${cutlineTrackX}, ${cutlineTrackY - 14})`}>
                    <rect
                      x="-36"
                      y="-12"
                      width="72"
                      height="15"
                      rx="3"
                      fill={badgeBg}
                      stroke={cutlineColor}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="-2"
                      fill={badgeText}
                      fontSize="8"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      CUTLINE {cutlineThreshold.toFixed(0)}%
                    </text>
                  </g>
                )}
              </>
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

        {/* Boundary Scale Labels */}
        <text
          x="30"
          y={cy + 18}
          fill={labelColorOut}
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          textAnchor="start"
          fontWeight="600"
        >
          [OUT] 0%
        </text>
        <text
          x="290"
          y={cy + 18}
          fill={labelColorIn}
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          textAnchor="end"
          fontWeight="600"
        >
          100% [IN]
        </text>

        {/* Center Dome Readout Content */}
        <g transform={`translate(${cx}, ${cy - 20})`}>
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
            {value.toFixed(decimalPlaces)}%
          </text>

          <text
            x="0"
            y="22"
            fill={clampedVal >= cutlineThreshold ? '#34d399' : '#f87171'}
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            textAnchor="middle"
          >
            {clampedVal >= cutlineThreshold ? '▲ ABOVE CUTLINE' : '▼ BELOW CUTLINE'} · SEED #6
          </text>
        </g>
      </svg>
    </div>
  );
};
