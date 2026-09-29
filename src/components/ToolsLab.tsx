import React, { useState } from 'react';
import { TeamData, ChartCustomization } from '../types';
import { Gauge1_AstroRing } from './gauges/Gauge1_AstroRing';
import { Gauge2_AvionicsReticle } from './gauges/Gauge2_AvionicsReticle';
import { Gauge3_SolarisReactor } from './gauges/Gauge3_SolarisReactor';
import { Gauge5_QuantumPhaseDial } from './gauges/Gauge5_QuantumPhaseDial';
import { Gauge6_EquilibriumCaliper } from './gauges/Gauge6_EquilibriumCaliper';
import { Gauge7_SonarRadarSweep } from './gauges/Gauge7_SonarRadarSweep';
import { Gauge8_IndustrialBarometer } from './gauges/Gauge8_IndustrialBarometer';
import { Gauge10_EclipseArc } from './gauges/Gauge10_EclipseArc';
import { COLORWAY_PRESETS, Preset } from './tools/ToolsLabPresets';
import { ArchetypeControls } from './tools/ArchetypeControls';
import {
  Sliders,
  Palette,
  Compass,
  Layers,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Zap,
  Wand2,
  Hash,
} from 'lucide-react';

interface Props {
  teams: TeamData[];
  selectedTeamId: string;
  onSelectTeamId: (id: string) => void;
  customizations: Record<string, ChartCustomization>;
  onUpdateCustomization: (teamId: string, updates: Partial<ChartCustomization>) => void;
  onResetTeam: (teamId: string) => void;
  onResetAll: () => void;
  onApplyToAll: (sourceTeamId: string) => void;
}

export const getDefaultCoreForTeam = (teamNumber: number) => {
  switch (teamNumber) {
    case 1:
      return { primary: '#047857', secondary: '#065f46', border: '#10b981', text: '#f8fafc', subtext: '#94a3b8', name: 'Luminous Emerald' };
    case 2:
      return { primary: '#6d28d9', secondary: '#4c1d95', border: '#a855f7', text: '#faf5ff', subtext: '#c084fc', name: 'Royal Violet' };
    case 3:
      return { primary: '#c2410c', secondary: '#9a3412', border: '#f97316', text: '#fffbeb', subtext: '#fbbf24', name: 'Solar Amber' };
    case 5:
      return { primary: '#0f766e', secondary: '#115e59', border: '#14b8a6', text: '#f0fdfa', subtext: '#5eead4', name: 'Oceanic Teal' };
    case 6:
      return { primary: '#991b1b', secondary: '#047857', border: '#475569', text: '#f8fafc', subtext: '#94a3b8', name: 'Meridian Split' };
    case 7:
      return { primary: '#1d4ed8', secondary: '#1e40af', border: '#3b82f6', text: '#f0f9ff', subtext: '#7dd3fc', name: 'Electric Sapphire' };
    case 8:
      return { primary: '#b45309', secondary: '#92400e', border: '#f59e0b', text: '#fef3c7', subtext: '#fbbf24', name: 'Warm Bronze' };
    case 10:
      return { primary: '#4338ca', secondary: '#3730a3', border: '#818cf8', text: '#ffffff', subtext: '#c7d2fe', name: 'Starlight Indigo' };
    default:
      return { primary: '#047857', secondary: '#065f46', border: '#10b981', text: '#f8fafc', subtext: '#94a3b8', name: 'Emerald' };
  }
};

export const QUICK_CORE_THEMES = [
  { name: 'Emerald', primary: '#047857', secondary: '#065f46', border: '#10b981' },
  { name: 'Violet', primary: '#6d28d9', secondary: '#4c1d95', border: '#a855f7' },
  { name: 'Amber', primary: '#c2410c', secondary: '#9a3412', border: '#f97316' },
  { name: 'Teal', primary: '#0f766e', secondary: '#115e59', border: '#14b8a6' },
  { name: 'Sapphire', primary: '#1d4ed8', secondary: '#1e40af', border: '#3b82f6' },
  { name: 'Ruby', primary: '#be123c', secondary: '#881337', border: '#fb7185' },
  { name: 'Bronze', primary: '#b45309', secondary: '#78350f', border: '#f59e0b' },
  { name: 'Indigo', primary: '#4338ca', secondary: '#312e81', border: '#818cf8' },
  { name: 'Magenta', primary: '#be185d', secondary: '#831843', border: '#f43f5e' },
  { name: 'Slate', primary: '#334155', secondary: '#1e293b', border: '#64748b' },
];

type TabType = 'palette' | 'core' | 'archetype' | 'geometry' | 'display';

export const ToolsLab: React.FC<Props> = ({
  teams,
  selectedTeamId,
  onSelectTeamId,
  customizations,
  onUpdateCustomization,
  onResetTeam,
  onResetAll,
  onApplyToAll,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('palette');
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const currentTeam = teams.find((t) => t.id === selectedTeamId) || teams[0];
  const custom = customizations[currentTeam.id] || {};
  const currentVal = custom.probabilityOverride ?? currentTeam.probability;
  const defaultCore = getDefaultCoreForTeam(currentTeam.teamNumber);

  const renderGauge = () => {
    switch (currentTeam.teamNumber) {
      case 1:
        return <Gauge1_AstroRing team={currentTeam} customization={custom} />;
      case 2:
        return <Gauge2_AvionicsReticle team={currentTeam} customization={custom} />;
      case 3:
        return <Gauge3_SolarisReactor team={currentTeam} customization={custom} />;
      case 5:
        return <Gauge5_QuantumPhaseDial team={currentTeam} customization={custom} />;
      case 6:
        return <Gauge6_EquilibriumCaliper team={currentTeam} customization={custom} />;
      case 7:
        return <Gauge7_SonarRadarSweep team={currentTeam} customization={custom} />;
      case 8:
        return <Gauge8_IndustrialBarometer team={currentTeam} customization={custom} />;
      case 10:
        return <Gauge10_EclipseArc team={currentTeam} customization={custom} />;
      default:
        return null;
    }
  };

  const handleCopySvg = () => {
    const svgElem = document.querySelector('#lab-stage-container svg');
    if (svgElem) {
      navigator.clipboard.writeText(svgElem.outerHTML);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplyPreset = (preset: Preset) => {
    onUpdateCustomization(currentTeam.id, {
      arcColorStart: preset.start,
      arcColorMid: preset.mid,
      arcColorEnd: preset.end,
      trackBgColor: preset.trackBg,
      trackBgOpacity: preset.trackOpacity,
      stageBackdropColor: preset.backdrop,
      stageBackdropOpacity: 0.28,
      corePrimaryColor: preset.corePrimary,
      coreSecondaryColor: preset.coreSecondary,
      coreOpacity: preset.coreOpacity,
      coreBorderColor: preset.coreBorder,
      coreTextColor: preset.coreText,
      coreSubtextColor: preset.coreSubtext,
      coreGradientType: 'radial',
    });
  };

  const categories = ['All', 'Vibrant & Cyber', 'Molten & Solar', 'Horology & Luxury', 'Oceanic & Arctic'];
  const filteredPresets = activeCategory === 'All'
    ? COLORWAY_PRESETS
    : COLORWAY_PRESETS.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner / Switcher */}
      <div className="bg-[#0d111a] border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Chart Tuning Studio</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 font-display mt-0.5">
              Tools Lab · Real-Time Chart Customizer
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select any of the 8 half-circle charts below to adjust progress arc multi-stop gradients, colorful core dome styling, separate stage ambient backdrops, and unique archetype parameters.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onResetTeam(currentTeam.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-xs font-medium text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset {currentTeam.id}</span>
            </button>
            <button
              onClick={() => onApplyToAll(currentTeam.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-cyan-800/50 rounded-lg text-xs font-medium text-cyan-400 transition-colors"
              title="Apply current styling to all 8 charts"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Sync All Charts</span>
            </button>
            <button
              onClick={onResetAll}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-xs font-medium text-rose-400 transition-colors"
            >
              Reset All
            </button>
          </div>
        </div>

        {/* 8 Team Fast Switcher Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-4">
          {teams.map((t) => {
            const isSelected = t.id === selectedTeamId;
            const tCustom = customizations[t.id] || {};
            const effVal = tCustom.probabilityOverride ?? t.probability;

            return (
              <button
                key={t.id}
                onClick={() => onSelectTeamId(t.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/80 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={`font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-300'}`}>
                    {t.id}
                  </span>
                  <span className="text-slate-500">#{t.seed}</span>
                </div>
                <div className="text-base font-mono font-bold text-slate-100 tabular-nums mt-0.5">
                  {effVal.toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5" title={t.gaugeName}>
                  {t.gaugeName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Workbench (Stage Left, Controls Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Canvas Stage */}
        <div className="lg:col-span-6 bg-[#0a0d14] border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-mono font-semibold text-cyan-400">
                Live Rendering Canvas
              </span>
              <h3 className="text-lg font-bold text-slate-100 font-display">
                {currentTeam.gaugeName}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {currentTeam.gaugeSubtitle}
              </p>
            </div>

            <button
              onClick={handleCopySvg}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy SVG</span>
                </>
              )}
            </button>
          </div>

          {/* Central Stage Viewer with Dedicated Ambient Backdrop */}
          <div
            id="lab-stage-container"
            className="my-5 p-8 flex items-center justify-center bg-[#07090e] border border-slate-800/80 rounded-xl relative overflow-hidden"
          >
            {/* Separate Stage Ambient Glow (independent from custom arc multi-stop colors) */}
            <div
              className="absolute inset-0 pointer-events-none blur-3xl transition-all duration-300"
              style={{
                background: `radial-gradient(circle at 50% 75%, ${custom.stageBackdropColor || custom.corePrimaryColor || '#064e3b'}, transparent 75%)`,
                opacity: custom.stageBackdropOpacity ?? 0.28,
              }}
            />
            <div className="w-full max-w-sm flex items-center justify-center relative z-10">
              {renderGauge()}
            </div>
          </div>

          {/* Dedicated Stage Ambient Backdrop Glow Controls */}
          <div className="mb-4 p-3 bg-slate-900/40 rounded-xl border border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-mono text-slate-400">
                  Stage Backdrop Glow Color:
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={custom.stageBackdropColor || custom.corePrimaryColor || '#064e3b'}
                    onChange={(e) =>
                      onUpdateCustomization(currentTeam.id, {
                        stageBackdropColor: e.target.value,
                      })
                    }
                    className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={custom.stageBackdropColor || custom.corePrimaryColor || '#064e3b'}
                    onChange={(e) =>
                      onUpdateCustomization(currentTeam.id, {
                        stageBackdropColor: e.target.value,
                      })
                    }
                    className="w-20 px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[11px] font-mono text-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">Glow Opacity:</span>
                <input
                  type="range"
                  min="0.05"
                  max="0.6"
                  step="0.05"
                  value={custom.stageBackdropOpacity ?? 0.28}
                  onChange={(e) =>
                    onUpdateCustomization(currentTeam.id, {
                      stageBackdropOpacity: parseFloat(e.target.value),
                    })
                  }
                  className="w-24 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <span className="text-[11px] font-mono text-cyan-400 font-bold w-8 text-right">
                  {Math.round((custom.stageBackdropOpacity ?? 0.28) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Live Probability Range Slider */}
          <div className="space-y-3 p-4 bg-slate-900/60 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Live Probability Test Slider
              </span>
              <span className="font-mono font-bold text-cyan-400 text-sm tabular-nums">
                {currentVal.toFixed(1)}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={currentVal}
              onChange={(e) =>
                onUpdateCustomization(currentTeam.id, {
                  probabilityOverride: parseFloat(e.target.value),
                })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />

            {/* Quick jump milestone tags */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
              <button
                onClick={() =>
                  onUpdateCustomization(currentTeam.id, {
                    probabilityOverride: 0,
                  })
                }
                className="hover:text-slate-100"
              >
                0%
              </button>
              <button
                onClick={() =>
                  onUpdateCustomization(currentTeam.id, {
                    probabilityOverride: 25,
                  })
                }
                className="hover:text-rose-400"
              >
                25% (Danger)
              </button>
              <button
                onClick={() =>
                  onUpdateCustomization(currentTeam.id, {
                    probabilityOverride: 50,
                  })
                }
                className="hover:text-amber-400 font-bold"
              >
                50% (Bubble)
              </button>
              <button
                onClick={() =>
                  onUpdateCustomization(currentTeam.id, {
                    probabilityOverride: 80,
                  })
                }
                className="hover:text-emerald-400"
              >
                80% (Lock)
              </button>
              <button
                onClick={() =>
                  onUpdateCustomization(currentTeam.id, {
                    probabilityOverride: 100,
                  })
                }
                className="hover:text-slate-100"
              >
                100%
              </button>
              <button
                onClick={() =>
                  onUpdateCustomization(currentTeam.id, {
                    probabilityOverride: currentTeam.probability,
                  })
                }
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Reset Original ({currentTeam.probability}%)
              </button>
            </div>
          </div>
        </div>

        {/* Right: Controls Inspector Tabs */}
        <div className="lg:col-span-6 bg-[#0a0d14] border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col">
          {/* Tab Selector Buttons */}
          <div className="grid grid-cols-5 p-1 bg-slate-900 border border-slate-800 rounded-xl mb-6">
            <button
              onClick={() => setActiveTab('palette')}
              className={`flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'palette'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Palette</span>
            </button>

            <button
              onClick={() => setActiveTab('core')}
              className={`flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'core'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Core</span>
            </button>

            <button
              onClick={() => setActiveTab('archetype')}
              className={`flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'archetype'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Style</span>
            </button>

            <button
              onClick={() => setActiveTab('geometry')}
              className={`flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'geometry'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Geometry</span>
            </button>

            <button
              onClick={() => setActiveTab('display')}
              className={`flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'display'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Hash className="w-3.5 h-3.5" />
              <span>Display</span>
            </button>
          </div>

          {/* TAB 1: PALETTE & PROGRESS COLORS */}
          {activeTab === 'palette' && (
            <div className="space-y-6">
              {/* Presets Header with Category Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    1-Click Colorway Presets ({filteredPresets.length})
                  </label>
                  <div className="flex items-center gap-1 text-[11px]">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          activeCategory === cat
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                  {filteredPresets.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => handleApplyPreset(p)}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-all group hover:bg-slate-800/80"
                    >
                      <div className="flex h-2.5 w-full rounded overflow-hidden mb-1">
                        <div className="w-1/3 h-full" style={{ backgroundColor: p.start }} />
                        <div className="w-1/3 h-full" style={{ backgroundColor: p.mid }} />
                        <div className="w-1/3 h-full" style={{ backgroundColor: p.end }} />
                      </div>
                      <div className="text-[11px] font-medium text-slate-300 group-hover:text-slate-100 truncate">
                        {p.name}
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono truncate">
                        {p.category}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Progress Bar Multi-Stop Colors */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    Custom Arc Multi-Stop Colors
                  </div>
                  <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">
                    Strictly affects the active illuminated progress bar portion of the gauge
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                      Start Stop (0%)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={custom.arcColorStart || '#059669'}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            arcColorStart: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={custom.arcColorStart || '#059669'}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            arcColorStart: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                      Mid Stop (50%)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={custom.arcColorMid || '#10b981'}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            arcColorMid: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={custom.arcColorMid || '#10b981'}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            arcColorMid: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                      End Apex Stop (100%)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={custom.arcColorEnd || '#38bdf8'}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            arcColorEnd: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={custom.arcColorEnd || '#38bdf8'}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            arcColorEnd: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Inactive Background Track Controls (Separate from Progress) */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    Inactive Background Track Styling
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Controls the empty baseline track underlying the gauge
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                      Background Track Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={custom.trackBgColor || '#141c2b'}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            trackBgColor: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={custom.trackBgColor || '#141c2b'}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            trackBgColor: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                      <span>Track Opacity</span>
                      <span className="text-cyan-400 font-bold">
                        {Math.round((custom.trackBgOpacity ?? 0.6) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={custom.trackBgOpacity ?? 0.6}
                      onChange={(e) =>
                        onUpdateCustomization(currentTeam.id, {
                          trackBgOpacity: parseFloat(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Stage / Panel Ambient Backdrop (Separate from Progress Arc Multi-Stops) */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    Stage & Card Ambient Backdrop Glow
                  </div>
                  <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">
                    Separate color picker for the gauge panel background glow. Does NOT alter Custom Arc Multi-Stop Colors.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                      Backdrop Glow Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={custom.stageBackdropColor || defaultCore.primary}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            stageBackdropColor: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={custom.stageBackdropColor || defaultCore.primary}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            stageBackdropColor: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                      <span>Backdrop Opacity</span>
                      <span className="text-cyan-400 font-bold">
                        {Math.round((custom.stageBackdropOpacity ?? 0.28) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.8"
                      step="0.05"
                      value={custom.stageBackdropOpacity ?? 0.28}
                      onChange={(e) =>
                        onUpdateCustomization(currentTeam.id, {
                          stageBackdropOpacity: parseFloat(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CORE DOME / HUB STYLING (FOR ALL OF THEM - VIBRANT & NON-BLACK!) */}
          {activeTab === 'core' && (
            <div className="space-y-6">
              {/* 1-Click Quick Core Color Themes */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    1-Click Core Color Themes
                  </div>
                  <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">
                    Instantly paint the core with vibrant, rich colors (no black fallback)
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {QUICK_CORE_THEMES.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() =>
                        onUpdateCustomization(currentTeam.id, {
                          corePrimaryColor: theme.primary,
                          coreSecondaryColor: theme.secondary,
                          coreBorderColor: theme.border,
                        })
                      }
                      className="flex items-center gap-1.5 p-2 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950/70 hover:bg-slate-900 transition-all text-left group"
                      title={`Apply ${theme.name} Core`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20 shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                      />
                      <span className="text-[11px] font-mono text-slate-300 group-hover:text-slate-100 truncate">
                        {theme.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Gradient Fill Style */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    Core Fill Gradient Style
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Choose radial aura, linear drop gradient, or solid color fill
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'radial', label: 'Radial Aura' },
                    { id: 'linear', label: 'Linear Drop' },
                    { id: 'solid', label: 'Solid Color' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() =>
                        onUpdateCustomization(currentTeam.id, {
                          coreGradientType: g.id as any,
                        })
                      }
                      className={`py-2 px-3 rounded-lg border text-xs font-mono transition-all ${
                        (custom.coreGradientType || 'radial') === g.id
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Center Core Dome Custom Colors */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    Center Core Colors
                  </div>
                  <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">
                    Active palette: {defaultCore.name} (Customizable center & base tints)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                      Core Primary (Center Tint)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={custom.corePrimaryColor || defaultCore.primary}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            corePrimaryColor: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={custom.corePrimaryColor || defaultCore.primary}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            corePrimaryColor: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                      Core Secondary (Base / Rim Tint)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={custom.coreSecondaryColor || defaultCore.secondary}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            coreSecondaryColor: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={custom.coreSecondaryColor || defaultCore.secondary}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            coreSecondaryColor: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Core Dome Opacity Slider */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-slate-300">
                      Center Core Fill Opacity
                    </span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {Math.round((custom.coreOpacity ?? 0.85) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={custom.coreOpacity ?? 0.85}
                    onChange={(e) =>
                      onUpdateCustomization(currentTeam.id, {
                        coreOpacity: parseFloat(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              </div>

              {/* Core Rim Border & Stroke */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    Core Rim Border & Stroke
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Perimeter rim line separating core dome from active tracks
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                      Rim Border Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={custom.coreBorderColor || defaultCore.border}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            coreBorderColor: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={custom.coreBorderColor || defaultCore.border}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            coreBorderColor: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                      <span>Rim Border Width</span>
                      <span className="text-cyan-400 font-bold">
                        {custom.coreBorderWidth ?? 1}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="4"
                      step="0.5"
                      value={custom.coreBorderWidth ?? 1}
                      onChange={(e) =>
                        onUpdateCustomization(currentTeam.id, {
                          coreBorderWidth: parseFloat(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Core Typography Colors */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    Core Readout Typography Colors
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Colors for the percentage headline, labels, and badges inside the dome
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                      Primary Probability Text
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={custom.coreTextColor || defaultCore.text}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            coreTextColor: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={custom.coreTextColor || defaultCore.text}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            coreTextColor: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                      Subtext & Axis Labels
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={custom.coreSubtextColor || defaultCore.subtext}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            coreSubtextColor: e.target.value,
                          })
                        }
                        className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={custom.coreSubtextColor || defaultCore.subtext}
                        onChange={(e) =>
                          onUpdateCustomization(currentTeam.id, {
                            coreSubtextColor: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Optical Glow Filter Blur */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">
                    Optical Glow Filter Blur
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">
                    {(custom.glowIntensity ?? 2.5).toFixed(1)}px
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.5"
                  value={custom.glowIntensity ?? 2.5}
                  onChange={(e) =>
                    onUpdateCustomization(currentTeam.id, {
                      glowIntensity: parseFloat(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>
          )}

          {/* TAB 3: ARCHETYPE UNIQUE OPTIONS */}
          {activeTab === 'archetype' && (
            <ArchetypeControls
              team={currentTeam}
              custom={custom}
              onUpdate={(updates) => onUpdateCustomization(currentTeam.id, updates)}
            />
          )}

          {/* TAB 4: GEOMETRY & STRUCTURAL TOGGLES */}
          {activeTab === 'geometry' && (
            <div className="space-y-6">
              {/* Track Stroke Width */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">
                    Arc Track Stroke Thickness
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">
                    {(custom.trackWidth ?? 14)}px
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="26"
                  step="1"
                  value={custom.trackWidth ?? 14}
                  onChange={(e) =>
                    onUpdateCustomization(currentTeam.id, {
                      trackWidth: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Perimeter Ticks Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Perimeter Precision Tick Scale
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Render calibrated radial tick marks around the perimeter
                  </div>
                </div>
                <button
                  onClick={() =>
                    onUpdateCustomization(currentTeam.id, {
                      showTicks: !(custom.showTicks ?? true),
                    })
                  }
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    (custom.showTicks ?? true) ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      (custom.showTicks ?? true) ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 50% Cutline Marker */}
              <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    50.0% Bubble Cutline Marker
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Show vertical milestone pin at the postseason cutline
                  </div>
                </div>
                <button
                  onClick={() =>
                    onUpdateCustomization(currentTeam.id, {
                      showCutline: !(custom.showCutline ?? true),
                    })
                  }
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    (custom.showCutline ?? true) ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      (custom.showCutline ?? true) ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Horizon Baseline */}
              <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Horizon Baseline Axis
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Dashed 180° horizontal reference baseline
                  </div>
                </div>
                <button
                  onClick={() =>
                    onUpdateCustomization(currentTeam.id, {
                      showBaseline: !(custom.showBaseline ?? true),
                    })
                  }
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    (custom.showBaseline ?? true) ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      (custom.showBaseline ?? true) ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Coordinate Guides */}
              <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Inner Coordinate Guides & Rings
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Display concentric internal coordinate lines inside dome
                  </div>
                </div>
                <button
                  onClick={() =>
                    onUpdateCustomization(currentTeam.id, {
                      showCoordinates: !(custom.showCoordinates ?? true),
                    })
                  }
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    (custom.showCoordinates ?? true) ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      (custom.showCoordinates ?? true) ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: DISPLAY & NUMERICAL DATA */}
          {activeTab === 'display' && (
            <div className="space-y-6">
              {/* Decimal Precision */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Percentage Decimal Precision
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((dec) => (
                    <button
                      key={dec}
                      onClick={() =>
                        onUpdateCustomization(currentTeam.id, {
                          decimalPlaces: dec,
                        })
                      }
                      className={`py-2 px-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                        (custom.decimalPlaces ?? 1) === dec
                          ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {dec === 0 && '0 Decimals (95%)'}
                      {dec === 1 && '1 Decimal (95.3%)'}
                      {dec === 2 && '2 Decimals (95.30%)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exact Numerical Probability Override */}
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Manual Probability Value Entry
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={currentVal}
                    onChange={(e) =>
                      onUpdateCustomization(currentTeam.id, {
                        probabilityOverride: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-32 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-slate-100 font-bold focus:outline-none focus:border-cyan-400"
                  />
                  <span className="text-xs text-slate-400">
                    Direct mathematical probability input (0.0% – 100.0%)
                  </span>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
                <div>Team: <strong className="text-slate-200">{currentTeam.name} ({currentTeam.id})</strong></div>
                <div>Seed: <strong className="text-slate-200">#{currentTeam.seed}</strong></div>
                <div>Projected Record: <strong className="text-slate-200">{currentTeam.projectedRecord}</strong></div>
                <div>Clinch Status: <strong className="text-emerald-400">{currentTeam.clinchStatus}</strong></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
