export interface TeamData {
  id: string; // 'TM 1'
  teamNumber: number; // 1
  name: string; // 'Team 01'
  probability: number; // 95.3
  seed: number; // 1
  projectedRecord: string; // '11.9–2.1'
  wins: number; // 11.9
  losses: number; // 2.1
  tier: 'dominant' | 'secure' | 'contender' | 'bubble' | 'chaser' | 'jeopardy';
  tierLabel: string;
  statusBadge: string;
  conferenceRank: string;
  clinchStatus: string;
  gaugeName: string;
  gaugeSubtitle: string;
  designConcept: string;
  visualHighlights: string[];
}

export type ViewMode = 'grid' | 'spectrum' | 'table' | 'lab';
export type FilterTier = 'all' | 'locks' | 'bubble' | 'danger';
export type SortOption = 'seed' | 'prob-desc' | 'prob-asc' | 'wins';

export interface ChartCustomization {
  probabilityOverride?: number;
  
  // Progress Bar Multi-Stop Colors (strictly drives active progress fill/stroke)
  arcColorStart?: string;
  arcColorMid?: string;
  arcColorEnd?: string;

  // Inactive Background Track & Geometry
  trackWidth?: number; // 4 to 28
  trackBgColor?: string;
  trackBgOpacity?: number; // 0.1 to 1.0

  // Stage / Panel Ambient Backdrop
  stageBackdropColor?: string;
  stageBackdropOpacity?: number; // 0.05 to 0.8

  // Core Dome / Hub Styling (applies to all charts - colorful, not black!)
  corePrimaryColor?: string;
  coreSecondaryColor?: string;
  coreGradientType?: 'radial' | 'linear' | 'solid';
  coreOpacity?: number; // 0.1 to 1.0
  coreBorderColor?: string;
  coreBorderWidth?: number; // 0 to 5
  coreTextColor?: string;
  coreSubtextColor?: string;
  glowIntensity?: number; // 0 to 6

  // Structural Toggles
  showTicks?: boolean;
  showCutline?: boolean;
  showBaseline?: boolean;
  showCoordinates?: boolean;
  decimalPlaces?: number; // 0, 1, 2

  // Cutline & Threshold Markers
  cutlineColor?: string;
  cutlineWidth?: number;
  cutlineStyle?: 'flag' | 'laser' | 'dashed' | 'solid' | 'minimal';
  cutlineThreshold?: number; // 20 to 80
  cutlinePinColor?: string;
  cutlinePinSize?: number;
  cutlineBadgeBg?: string;
  cutlineBadgeText?: string;

  // Precision Ticks Scale Styling
  tickMajorColor?: string;
  tickMinorColor?: string;
  tickLitColor?: string;
  tickMajorLength?: number;
  tickMinorLength?: number;
  tickStrokeWidth?: number;
  tickCount?: number;

  // Leading Beacon / Pointer Pin Styling
  beaconColor?: string;
  beaconBorderColor?: string;
  beaconSize?: number;
  beaconStyle?: 'diamond' | 'circle' | 'cross' | 'arrow';

  // Coordinate Guides & Rings
  coordRingColor?: string;
  coordRingOpacity?: number;
  coordRingDash?: string;
  coordPlumbColor?: string;
  coordPlumbOpacity?: number;

  // Gauge 1 Specific: Track Fill Sweep to Beacon
  gauge1TrackFill?: boolean;
  gauge1TrackFillOpacity?: number;

  // Gauge 2 Specific: Avionics Vector Reticle & Pitch Ladder
  gauge2NeedleColor?: string;
  gauge2NeedleLength?: number;
  gauge2NeedleWidth?: number;
  gauge2BarWidth?: number;
  gauge2WaveAmp?: number;
  gauge2LadderColor?: string;
  gauge2ShowLadder?: boolean;

  // Gauge 3 Specific: Concentric Multi-Tracks & Sunburst
  gauge3TrackCount?: number;
  gauge3Track2Color?: string;
  gauge3Track3Color?: string;
  gauge3RayColor?: string;
  gauge3RayCount?: number;
  gauge3RayOpacity?: number;
  gauge3SunburstEnabled?: boolean;

  // Gauge 5 Specific: Decile Blocks & 3D Bevel
  gauge5BlockGap?: number;
  gauge5BlockCount?: number;
  gauge5BevelColor?: string;
  gauge5BevelOpacity?: number;
  gauge5ColorMode?: 'smooth' | 'stepped';

  // Gauge 6 Specific: Split Hemisphere Dual Zones
  gauge6LeftDomeColor?: string;
  gauge6RightDomeColor?: string;
  gauge6MeridianColor?: string;
  gauge6MeridianWidth?: number;
  gauge6LabelColorOut?: string;
  gauge6LabelColorIn?: string;
  gauge6ShowLabels?: boolean;

  // Gauge 7 Specific: Matrix Scatter & Deficit Ray
  gauge7RingCount?: number;
  gauge7DotRadius?: number;
  gauge7RayColor?: string;
  gauge7UnlitOpacity?: number;
  gauge7PointerEnabled?: boolean;

  // Gauge 8 Specific: Target Benchmark & Deficit Gap
  gauge8TargetPct?: number;
  gauge8GapStyle?: 'dashed' | 'solid' | 'dots';
  gauge8GapColor?: string;
  gauge8DeltaFlag?: boolean;
  gauge8ShowDeltaBadge?: boolean;

  // Gauge 10 Specific: Hairline Horizon & Starlight Notch
  gauge10HairlineWidth?: number;
  gauge10NotchStyle?: 'diamond' | 'cross' | 'dot';
  gauge10NotchColor?: string;
  gauge10NotchSize?: number;
  gauge10UnderlayOpacity?: number;

  // Backwards compatibility legacy slots
  uniqueOption1?: number | string | boolean;
  uniqueOption2?: number | string | boolean;
  uniqueOption3?: number | string | boolean;
}
