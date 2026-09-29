import React from 'react';
import { TeamData, ChartCustomization } from '../../types';
import { Gauge1_AstroRing } from './Gauge1_AstroRing';
import { Gauge2_AvionicsReticle } from './Gauge2_AvionicsReticle';
import { Gauge3_SolarisReactor } from './Gauge3_SolarisReactor';
import { Gauge5_QuantumPhaseDial } from './Gauge5_QuantumPhaseDial';
import { Gauge6_EquilibriumCaliper } from './Gauge6_EquilibriumCaliper';
import { Gauge7_SonarRadarSweep } from './Gauge7_SonarRadarSweep';
import { Gauge8_IndustrialBarometer } from './Gauge8_IndustrialBarometer';
import { Gauge10_EclipseArc } from './Gauge10_EclipseArc';
import { Maximize2, ShieldCheck, AlertTriangle, Flame, Sliders } from 'lucide-react';

interface Props {
  team: TeamData;
  customization?: ChartCustomization;
  onInspect: (team: TeamData) => void;
  onOpenLab?: (team: TeamData) => void;
}

export const GaugeCardWrapper: React.FC<Props> = ({
  team,
  customization,
  onInspect,
  onOpenLab,
}) => {
  const effProb = customization?.probabilityOverride ?? team.probability;

  const renderGauge = () => {
    switch (team.teamNumber) {
      case 1:
        return <Gauge1_AstroRing team={team} customization={customization} />;
      case 2:
        return <Gauge2_AvionicsReticle team={team} customization={customization} />;
      case 3:
        return <Gauge3_SolarisReactor team={team} customization={customization} />;
      case 5:
        return <Gauge5_QuantumPhaseDial team={team} customization={customization} />;
      case 6:
        return <Gauge6_EquilibriumCaliper team={team} customization={customization} />;
      case 7:
        return <Gauge7_SonarRadarSweep team={team} customization={customization} />;
      case 8:
        return <Gauge8_IndustrialBarometer team={team} customization={customization} />;
      case 10:
        return <Gauge10_EclipseArc team={team} customization={customization} />;
      default:
        return null;
    }
  };

  const getStatusIcon = () => {
    if (effProb >= 80) return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />;
    if (effProb >= 50) return <Flame className="w-3.5 h-3.5 text-amber-400" />;
    return <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />;
  };

  return (
    <div className="group relative flex flex-col bg-[#0d111a]/95 border border-slate-800/90 rounded-xl overflow-hidden hover:border-slate-700 transition-colors duration-200">
      {/* Top ambient color bar based on probability */}
      <div
        className="h-1 w-full"
        style={{
          background:
            effProb >= 80
              ? 'linear-gradient(90deg, #10b981, #06b6d4)'
              : effProb >= 50
              ? 'linear-gradient(90deg, #f59e0b, #eab308)'
              : 'linear-gradient(90deg, #ef4444, #f97316)',
        }}
      />

      {/* Card Header */}
      <div className="flex items-start justify-between p-4 pb-2 border-b border-slate-800/50">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-mono font-semibold text-slate-200">{team.id}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Seed #{team.seed}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 font-medium text-slate-300">
              {getStatusIcon()}
              {team.statusBadge}
            </span>
          </div>
          <h3 className="mt-1 text-base font-semibold text-slate-100 tracking-tight flex items-baseline gap-2">
            <span>{team.gaugeName}</span>
          </h3>
          <p className="text-xs text-slate-400 font-mono tracking-tight">
            {team.gaugeSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-1">
          {onOpenLab && (
            <button
              onClick={() => onOpenLab(team)}
              title="Open in Tools Lab"
              className="p-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/80 rounded transition-colors"
              aria-label={`Open ${team.id} in Tools Lab`}
            >
              <Sliders className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onInspect(team)}
            title="Inspect gauge architecture"
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 rounded transition-colors"
            aria-label={`Inspect ${team.gaugeName}`}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Gauge Rendering Area */}
      <div
        className="p-4 flex-1 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300"
        style={
          customization?.stageBackdropColor
            ? {
                background: `radial-gradient(ellipse at 50% 65%, ${customization.stageBackdropColor}${Math.min(
                  255,
                  Math.max(10, Math.round((customization.stageBackdropOpacity ?? 0.28) * 255))
                )
                  .toString(16)
                  .padStart(2, '0')}, transparent 70%)`,
              }
            : undefined
        }
      >
        {renderGauge()}
      </div>

      {/* Card Footer / Record Details */}
      <div className="px-4 py-2.5 bg-[#090c13] border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3 text-slate-400">
          <span>
            PROJ <strong className="text-slate-200 font-semibold">{team.projectedRecord}</strong>
          </span>
          <span className="text-slate-600">·</span>
          <span>
            SEED <strong className="text-slate-200 font-semibold">#{team.seed}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {onOpenLab && (
            <button
              onClick={() => onOpenLab(team)}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold tracking-wide transition-colors flex items-center gap-1"
            >
              <Sliders className="w-3 h-3" />
              <span>Tune Lab</span>
            </button>
          )}
          <button
            onClick={() => onInspect(team)}
            className="text-[11px] text-slate-400 hover:text-slate-200 font-medium tracking-wide transition-colors"
          >
            Inspect →
          </button>
        </div>
      </div>
    </div>
  );
};
