import React from 'react';
import { TeamData, ChartCustomization } from '../../types';

interface Props {
  team: TeamData;
  custom: ChartCustomization;
  onUpdate: (updates: Partial<ChartCustomization>) => void;
}

export const ArchetypeControls: React.FC<Props> = ({ team, custom, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="p-3.5 bg-cyan-950/30 rounded-xl border border-cyan-800/40">
        <div className="text-xs font-mono text-cyan-400 font-semibold uppercase">
          {team.id} · {team.gaugeName}
        </div>
        <p className="text-xs text-slate-300 mt-1">
          Bespoke architectural styling controls engineered specifically for this chart archetype:
        </p>
      </div>

      {/* ========================================================================= */}
      {/* GAUGE 1: LUMINOUS AURORA SEMI-CIRCLE */}
      {/* ========================================================================= */}
      {team.teamNumber === 1 && (
        <div className="space-y-5">
          {/* Active Track Fill Ribbon to Beacon */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  Active Track Gradient Fill Ribbon
                </div>
                <div className="text-[11px] text-cyan-400/90 font-mono">
                  Controlled by Custom Arc Multi-Stop Colors; fills track up to the beacon pin
                </div>
              </div>
              <button
                onClick={() =>
                  onUpdate({
                    gauge1TrackFill: !(custom.gauge1TrackFill !== false),
                  })
                }
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  (custom.gauge1TrackFill !== false) ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    (custom.gauge1TrackFill !== false) ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {custom.gauge1TrackFill !== false && (
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Track Ribbon Fill Opacity</span>
                  <span className="font-mono text-cyan-400 font-bold">
                    {Math.round((custom.gauge1TrackFillOpacity ?? 0.4) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={custom.gauge1TrackFillOpacity ?? 0.4}
                  onChange={(e) =>
                    onUpdate({
                      gauge1TrackFillOpacity: parseFloat(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            )}
          </div>

          {/* Perimeter Precision Tick Scale (Big & Small Ticks) */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Perimeter Precision Tick Scale
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Calibrated scale with 4 small ticks positioned between each major big tick
              </div>
            </div>

            {/* Density Selector */}
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1.5">
                Tick Scale Density
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[30, 50, 100].map((t) => (
                  <button
                    key={t}
                    onClick={() => onUpdate({ tickCount: t, uniqueOption1: t })}
                    className={`py-1.5 px-3 rounded-lg border text-xs font-mono transition-all ${
                      (custom.tickCount ?? custom.uniqueOption1 ?? 50) === t
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t} Ticks
                  </button>
                ))}
              </div>
            </div>

            {/* Big Ticks Styling */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                  Big Ticks (Major) Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.tickMajorColor || '#38bdf8'}
                    onChange={(e) => onUpdate({ tickMajorColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.tickMajorColor || '#38bdf8'}
                    onChange={(e) => onUpdate({ tickMajorColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>Big Ticks Length</span>
                  <span className="text-cyan-400 font-bold">{custom.tickMajorLength ?? 10}px</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="16"
                  step="1"
                  value={custom.tickMajorLength ?? 10}
                  onChange={(e) => onUpdate({ tickMajorLength: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
                />
              </div>
            </div>

            {/* Small Ticks Styling */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                  Small Ticks (Minor) Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.tickMinorColor || '#334155'}
                    onChange={(e) => onUpdate({ tickMinorColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.tickMinorColor || '#334155'}
                    onChange={(e) => onUpdate({ tickMinorColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>Small Ticks Length</span>
                  <span className="text-cyan-400 font-bold">{custom.tickMinorLength ?? 6}px</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  step="1"
                  value={custom.tickMinorLength ?? 6}
                  onChange={(e) => onUpdate({ tickMinorLength: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
                />
              </div>
            </div>

            {/* Lit Ticks Color */}
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                Active Lit Ticks Color (Inside Probability Range)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={custom.tickLitColor || custom.arcColorEnd || '#38bdf8'}
                  onChange={(e) => onUpdate({ tickLitColor: e.target.value })}
                  className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={custom.tickLitColor || custom.arcColorEnd || '#38bdf8'}
                  onChange={(e) => onUpdate({ tickLitColor: e.target.value })}
                  className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Leading Diamond Beacon Pin */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  Leading Diamond Beacon Pin
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Custom styling for the terminal indicator pin on the progress arc
                </div>
              </div>
              <button
                onClick={() =>
                  onUpdate({
                    uniqueOption2: !(custom.uniqueOption2 !== false),
                  })
                }
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  (custom.uniqueOption2 !== false) ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    (custom.uniqueOption2 !== false) ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                  Beacon Fill
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={custom.beaconColor || '#ffffff'}
                    onChange={(e) => onUpdate({ beaconColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.beaconColor || '#ffffff'}
                    onChange={(e) => onUpdate({ beaconColor: e.target.value })}
                    className="w-full px-1.5 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                  Beacon Border
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={custom.beaconBorderColor || custom.arcColorEnd || '#38bdf8'}
                    onChange={(e) => onUpdate({ beaconBorderColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.beaconBorderColor || custom.arcColorEnd || '#38bdf8'}
                    onChange={(e) => onUpdate({ beaconBorderColor: e.target.value })}
                    className="w-full px-1.5 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>Beacon Size</span>
                  <span className="text-cyan-400 font-bold">{custom.beaconSize ?? 6}px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="1"
                  value={custom.beaconSize ?? 6}
                  onChange={(e) => onUpdate({ beaconSize: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
                />
              </div>
            </div>
          </div>

          {/* 50.0% Bubble Cutline Marker */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                50.0% Bubble Cutline Marker
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Calibrated cutline marker line and terminal milestone pin
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                  Cutline Line Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.cutlineColor || '#f59e0b'}
                    onChange={(e) => onUpdate({ cutlineColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.cutlineColor || '#f59e0b'}
                    onChange={(e) => onUpdate({ cutlineColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                  Cutline Pin Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.cutlinePinColor || '#f59e0b'}
                    onChange={(e) => onUpdate({ cutlinePinColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.cutlinePinColor || '#f59e0b'}
                    onChange={(e) => onUpdate({ cutlinePinColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>Cutline Width</span>
                  <span className="text-cyan-400 font-bold">{(custom.cutlineWidth ?? 1.5).toFixed(1)}px</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={custom.cutlineWidth ?? 1.5}
                  onChange={(e) => onUpdate({ cutlineWidth: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>Pin Radius</span>
                  <span className="text-cyan-400 font-bold">{(custom.cutlinePinSize ?? 2.5).toFixed(1)}px</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="5.5"
                  step="0.5"
                  value={custom.cutlinePinSize ?? 2.5}
                  onChange={(e) => onUpdate({ cutlinePinSize: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Inner Coordinate Guides & Rings */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Inner Coordinate Guides & Rings
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Concentric starlight rings and vertical apex plumb line inside the dome
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                  Coordinate Rings Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.coordRingColor || custom.coreBorderColor || '#0f2b2c'}
                    onChange={(e) => onUpdate({ coordRingColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.coordRingColor || custom.coreBorderColor || '#0f2b2c'}
                    onChange={(e) => onUpdate({ coordRingColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>Rings Opacity</span>
                  <span className="text-cyan-400 font-bold">{Math.round((custom.coordRingOpacity ?? 0.45) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={custom.coordRingOpacity ?? 0.45}
                  onChange={(e) => onUpdate({ coordRingOpacity: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAUGE 2: RADIAL HISTOGRAM ARCH */}
      {/* ========================================================================= */}
      {team.teamNumber === 2 && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-2 font-mono uppercase">
                Histogram Micro-Bar Density
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[30, 45, 60].map((bars) => (
                  <button
                    key={bars}
                    onClick={() => onUpdate({ tickCount: bars, uniqueOption1: bars })}
                    className={`py-2 px-3 rounded-lg border text-xs font-mono transition-all ${
                      (custom.tickCount ?? custom.uniqueOption1 ?? 45) === bars
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {bars} Bars
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Frequency Wave Crest Amplitude</span>
                <span className="font-mono text-cyan-400 font-bold">{(custom.gauge2WaveAmp ?? custom.uniqueOption2 ?? 10)}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="18"
                step="2"
                value={typeof custom.gauge2WaveAmp === 'number' ? custom.gauge2WaveAmp : typeof custom.uniqueOption2 === 'number' ? custom.uniqueOption2 : 10}
                onChange={(e) => onUpdate({ gauge2WaveAmp: parseInt(e.target.value), uniqueOption2: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">Avionics Reticle Needle</div>
                <div className="text-[11px] text-slate-400 font-mono">Attitude vector pin at current angle</div>
              </div>
              <button
                onClick={() => onUpdate({ uniqueOption3: !(custom.uniqueOption3 !== false) })}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  (custom.uniqueOption3 !== false) ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    (custom.uniqueOption3 !== false) ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">Needle Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.gauge2NeedleColor || custom.arcColorEnd || '#ec4899'}
                    onChange={(e) => onUpdate({ gauge2NeedleColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.gauge2NeedleColor || custom.arcColorEnd || '#ec4899'}
                    onChange={(e) => onUpdate({ gauge2NeedleColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">Pitch Ladder Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.gauge2LadderColor || custom.coreBorderColor || '#312e81'}
                    onChange={(e) => onUpdate({ gauge2LadderColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.gauge2LadderColor || custom.coreBorderColor || '#312e81'}
                    onChange={(e) => onUpdate({ gauge2LadderColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAUGE 3: CONCENTRIC MULTI-TRACK */}
      {/* ========================================================================= */}
      {team.teamNumber === 3 && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-2 font-mono uppercase">
                Concentric Nested Track Count
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((tc) => (
                  <button
                    key={tc}
                    onClick={() => onUpdate({ uniqueOption1: tc })}
                    className={`py-2 px-3 rounded-lg border text-xs font-mono transition-all ${
                      (custom.uniqueOption1 ?? 3) === tc
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tc === 1 ? '1 Arc (Prob)' : tc === 2 ? '2 Arcs (+Win%)' : '3 Arcs (+Pace)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">Track 2 (Win%) Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.gauge3Track2Color || custom.arcColorMid || '#f97316'}
                    onChange={(e) => onUpdate({ gauge3Track2Color: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.gauge3Track2Color || custom.arcColorMid || '#f97316'}
                    onChange={(e) => onUpdate({ gauge3Track2Color: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">Track 3 (Pace) Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.gauge3Track3Color || custom.arcColorStart || '#eab308'}
                    onChange={(e) => onUpdate({ gauge3Track3Color: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.gauge3Track3Color || custom.arcColorStart || '#eab308'}
                    onChange={(e) => onUpdate({ gauge3Track3Color: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Molten Sunburst Radial Rays
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Radiant thermal ray pattern emitted from center dome
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">Ray Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.gauge3RayColor || custom.arcColorMid || '#f97316'}
                    onChange={(e) => onUpdate({ gauge3RayColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.gauge3RayColor || custom.arcColorMid || '#f97316'}
                    onChange={(e) => onUpdate({ gauge3RayColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>Ray Opacity</span>
                  <span className="text-cyan-400 font-bold">{Math.round((custom.gauge3RayOpacity ?? 0.28) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={custom.gauge3RayOpacity ?? 0.28}
                  onChange={(e) => onUpdate({ gauge3RayOpacity: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAUGE 5: SEGMENTED DECILE BLOCK ARCH */}
      {/* ========================================================================= */}
      {team.teamNumber === 5 && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-2 font-mono uppercase">
                Block Segment Density
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 20].map((bCount) => (
                  <button
                    key={bCount}
                    onClick={() => onUpdate({ gauge5BlockCount: bCount, uniqueOption1: bCount })}
                    className={`py-2 px-3 rounded-lg border text-xs font-mono transition-all ${
                      (custom.gauge5BlockCount ?? custom.uniqueOption1 ?? 20) === bCount
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {bCount} Blocks
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Inter-Block Angular Gap</span>
                <span className="font-mono text-cyan-400 font-bold">{(custom.gauge5BlockGap ?? custom.uniqueOption2 ?? 1.2)}°</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="2.5"
                step="0.2"
                value={typeof custom.gauge5BlockGap === 'number' ? custom.gauge5BlockGap : typeof custom.uniqueOption2 === 'number' ? custom.uniqueOption2 : 1.2}
                onChange={(e) => onUpdate({ gauge5BlockGap: parseFloat(e.target.value), uniqueOption2: parseFloat(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                3D Specular Bevel Highlights
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Glossy edge lighting applied across each block pill
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">Bevel Stroke Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.gauge5BevelColor || '#ffffff'}
                    onChange={(e) => onUpdate({ gauge5BevelColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.gauge5BevelColor || '#ffffff'}
                    onChange={(e) => onUpdate({ gauge5BevelColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span>Bevel Shine Opacity</span>
                  <span className="text-cyan-400 font-bold">{Math.round((custom.gauge5BevelOpacity ?? 0.45) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={custom.gauge5BevelOpacity ?? 0.45}
                  onChange={(e) => onUpdate({ gauge5BevelOpacity: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAUGE 6: EQUATORIAL SPLIT-HEMISPHERE */}
      {/* ========================================================================= */}
      {team.teamNumber === 6 && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Dual-Zone Split Dome Colors
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Sub-cutline hazard zone vs. supra-cutline safe zone
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">Left Dome (Under Cutline)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.gauge6LeftDomeColor || custom.corePrimaryColor || '#451a03'}
                    onChange={(e) => onUpdate({ gauge6LeftDomeColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.gauge6LeftDomeColor || custom.corePrimaryColor || '#451a03'}
                    onChange={(e) => onUpdate({ gauge6LeftDomeColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">Right Dome (Above Cutline)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.gauge6RightDomeColor || custom.coreSecondaryColor || '#064e3b'}
                    onChange={(e) => onUpdate({ gauge6RightDomeColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.gauge6RightDomeColor || custom.coreSecondaryColor || '#064e3b'}
                    onChange={(e) => onUpdate({ gauge6RightDomeColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-2 font-mono uppercase">
                Meridian Cutline Divider Style
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['flag', 'laser', 'dashed', 'solid'].map((style) => (
                  <button
                    key={style}
                    onClick={() => onUpdate({ cutlineStyle: style as any, uniqueOption1: style })}
                    className={`py-2 px-2.5 rounded-lg border text-xs font-mono uppercase transition-all ${
                      (custom.cutlineStyle ?? custom.uniqueOption1 ?? 'flag') === style
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Cutline Threshold Position</span>
                <span className="font-mono text-cyan-400 font-bold">{(custom.cutlineThreshold ?? custom.uniqueOption2 ?? 50)}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="70"
                step="1"
                value={typeof custom.cutlineThreshold === 'number' ? custom.cutlineThreshold : typeof custom.uniqueOption2 === 'number' ? custom.uniqueOption2 : 50}
                onChange={(e) => onUpdate({ cutlineThreshold: parseInt(e.target.value), uniqueOption2: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAUGE 7: MATRIX-POINT SCATTER ARCH */}
      {/* ========================================================================= */}
      {team.teamNumber === 7 && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-2 font-mono uppercase">
                Concentric Scatter Rings
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 4, 5, 6].map((rings) => (
                  <button
                    key={rings}
                    onClick={() => onUpdate({ gauge7RingCount: rings, uniqueOption1: rings })}
                    className={`py-2 px-2.5 rounded-lg border text-xs font-mono transition-all ${
                      (custom.gauge7RingCount ?? custom.uniqueOption1 ?? 5) === rings
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {rings} Rings
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Matrix Dot Radius</span>
                <span className="font-mono text-cyan-400 font-bold">
                  {(typeof custom.gauge7DotRadius === 'number' ? custom.gauge7DotRadius : typeof custom.uniqueOption2 === 'number' ? custom.uniqueOption2 : 2.2).toFixed(1)}px
                </span>
              </div>
              <input
                type="range"
                min="1.5"
                max="3.8"
                step="0.3"
                value={typeof custom.gauge7DotRadius === 'number' ? custom.gauge7DotRadius : typeof custom.uniqueOption2 === 'number' ? custom.uniqueOption2 : 2.2}
                onChange={(e) => onUpdate({ gauge7DotRadius: parseFloat(e.target.value), uniqueOption2: parseFloat(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">Radial Deficit Pointer Ray</div>
                <div className="text-[11px] text-slate-400 font-mono">Directional pointer beam at current angle</div>
              </div>
              <button
                onClick={() => onUpdate({ uniqueOption3: !(custom.uniqueOption3 !== false) })}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  (custom.uniqueOption3 !== false) ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    (custom.uniqueOption3 !== false) ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-mono">Pointer Ray Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={custom.gauge7RayColor || custom.beaconBorderColor || custom.arcColorEnd || '#2dd4bf'}
                  onChange={(e) => onUpdate({ gauge7RayColor: e.target.value })}
                  className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={custom.gauge7RayColor || custom.beaconBorderColor || custom.arcColorEnd || '#2dd4bf'}
                  onChange={(e) => onUpdate({ gauge7RayColor: e.target.value })}
                  className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAUGE 8: TARGET BENCHMARK SEMI-CIRCLE */}
      {/* ========================================================================= */}
      {team.teamNumber === 8 && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Target Benchmark Threshold</span>
                <span className="font-mono text-cyan-400 font-bold">{(custom.gauge8TargetPct ?? custom.uniqueOption1 ?? 50)}%</span>
              </div>
              <input
                type="range"
                min="25"
                max="75"
                step="1"
                value={typeof custom.gauge8TargetPct === 'number' ? custom.gauge8TargetPct : typeof custom.uniqueOption1 === 'number' ? custom.uniqueOption1 : 50}
                onChange={(e) => onUpdate({ gauge8TargetPct: parseInt(e.target.value), uniqueOption1: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">Deficit Gap Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={custom.gauge8GapColor || '#fb923c'}
                    onChange={(e) => onUpdate({ gauge8GapColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.gauge8GapColor || '#fb923c'}
                    onChange={(e) => onUpdate({ gauge8GapColor: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">Gap Arc Style</label>
                <div className="grid grid-cols-3 gap-1">
                  {['dashed', 'solid', 'dots'].map((s) => (
                    <button
                      key={s}
                      onClick={() => onUpdate({ gauge8GapStyle: s as any, uniqueOption2: s })}
                      className={`py-1 rounded border text-[10px] font-mono uppercase ${
                        (custom.gauge8GapStyle ?? custom.uniqueOption2 ?? 'dashed') === s
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAUGE 10: HAIRLINE MINIMALIST CALIPER */}
      {/* ========================================================================= */}
      {team.teamNumber === 10 && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Hairline Arc Stroke Weight</span>
                <span className="font-mono text-cyan-400 font-bold">{(custom.gauge10HairlineWidth ?? custom.uniqueOption1 ?? 3.5)}px</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="6.0"
                step="0.5"
                value={typeof custom.gauge10HairlineWidth === 'number' ? custom.gauge10HairlineWidth : typeof custom.uniqueOption1 === 'number' ? custom.uniqueOption1 : 3.5}
                onChange={(e) => onUpdate({ gauge10HairlineWidth: parseFloat(e.target.value), uniqueOption1: parseFloat(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[18, 36, 72].map((tCount) => (
                <button
                  key={tCount}
                  onClick={() => onUpdate({ tickCount: tCount, uniqueOption2: tCount })}
                  className={`py-2 px-3 rounded-lg border text-xs font-mono transition-all ${
                    (custom.tickCount ?? custom.uniqueOption2 ?? 36) === tCount
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tCount} Ticks
                </button>
              ))}
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-mono">Micro-Notch Style</label>
              <div className="grid grid-cols-3 gap-2">
                {['diamond', 'cross', 'dot'].map((nStyle) => (
                  <button
                    key={nStyle}
                    onClick={() => onUpdate({ gauge10NotchStyle: nStyle as any, uniqueOption3: nStyle })}
                    className={`py-2 px-3 rounded-lg border text-xs font-mono uppercase transition-all ${
                      (custom.gauge10NotchStyle ?? custom.uniqueOption3 ?? 'diamond') === nStyle
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {nStyle}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
