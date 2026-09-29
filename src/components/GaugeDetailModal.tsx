import React, { useEffect } from 'react';
import { TeamData, ChartCustomization } from '../types';
import { Gauge1_AstroRing } from './gauges/Gauge1_AstroRing';
import { Gauge2_AvionicsReticle } from './gauges/Gauge2_AvionicsReticle';
import { Gauge3_SolarisReactor } from './gauges/Gauge3_SolarisReactor';
import { Gauge5_QuantumPhaseDial } from './gauges/Gauge5_QuantumPhaseDial';
import { Gauge6_EquilibriumCaliper } from './gauges/Gauge6_EquilibriumCaliper';
import { Gauge7_SonarRadarSweep } from './gauges/Gauge7_SonarRadarSweep';
import { Gauge8_IndustrialBarometer } from './gauges/Gauge8_IndustrialBarometer';
import { Gauge10_EclipseArc } from './gauges/Gauge10_EclipseArc';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Layers, Cpu, Compass, Sliders } from 'lucide-react';

interface Props {
  team: TeamData | null;
  customization?: ChartCustomization;
  onClose: () => void;
  onSelectTeam: (team: TeamData) => void;
  allTeams: TeamData[];
  onOpenLab?: (team: TeamData) => void;
}

export const GaugeDetailModal: React.FC<Props> = ({
  team,
  customization,
  onClose,
  onSelectTeam,
  allTeams,
  onOpenLab,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!team) return null;

  const currentIndex = allTeams.findIndex((t) => t.id === team.id);
  const prevTeam = allTeams[(currentIndex - 1 + allTeams.length) % allTeams.length];
  const nextTeam = allTeams[(currentIndex + 1) % allTeams.length];

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-4xl bg-[#0c1017] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090c13]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-cyan-400">
              {team.id}
            </span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span className="text-sm font-semibold text-slate-200">
              {team.gaugeName}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">
              Seed #{team.seed}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenLab && (
              <button
                onClick={() => {
                  onClose();
                  onOpenLab(team);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/50 rounded-lg text-xs font-semibold text-cyan-300 transition-colors mr-2"
                title="Open in Tools Lab to adjust this chart"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Tune in Tools Lab</span>
              </button>
            )}
            <button
              onClick={() => onSelectTeam(prevTeam)}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors"
              aria-label="Previous Team"
              title="Previous Team"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => onSelectTeam(nextTeam)}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors"
              aria-label="Next Team"
              title="Next Team"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors ml-2"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Left Column: Enlarged Visual Gauge */}
          <div className="md:col-span-6 p-6 flex flex-col items-center justify-center bg-[#07090e]">
            <div className="w-full max-w-sm flex items-center justify-center">
              {renderGauge()}
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs text-slate-500 font-mono">
                180° Half-Circle Arch · Precision SVG Vector
              </span>
            </div>
          </div>

          {/* Right Column: Architectural & Analytics Blueprint */}
          <div className="md:col-span-6 p-6 space-y-6 bg-[#0c1017]">
            {/* Primary Stat Block */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Official Sample Data
              </div>
              <div className="grid grid-cols-3 gap-4 mt-3 text-center">
                <div>
                  <div className="text-xs text-slate-500 font-medium">PLAYOFF PROB</div>
                  <div className="text-2xl font-mono font-bold text-cyan-400 tabular-nums">
                    {effProb.toFixed(customization?.decimalPlaces ?? 1)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">PROJ SEED</div>
                  <div className="text-2xl font-mono font-bold text-slate-100 tabular-nums">
                    #{team.seed}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">PROJ REC</div>
                  <div className="text-2xl font-mono font-bold text-slate-100 tabular-nums">
                    {team.projectedRecord}
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{team.conferenceRank}</span>
                <span className="text-emerald-400">{team.clinchStatus}</span>
              </div>
            </div>

            {/* Design Concept & Geometry */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Design Concept & Geometry</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {team.designConcept}
              </p>
            </div>

            {/* Visual Engineering Features */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Visual Engineering Elements</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {team.visualHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Postseason Path Telemetry */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Playoff Implications & Scenarios</span>
              </div>
              <div className="p-3 bg-slate-900/40 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
                <div>
                  <span className="text-slate-500 font-mono">Tier Classification:</span>{' '}
                  <strong className="text-slate-200">{team.tierLabel}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-mono">Projected Wins:</span>{' '}
                  <strong className="text-slate-200">{team.wins} W</strong> ·{' '}
                  <span className="text-slate-500 font-mono">Projected Losses:</span>{' '}
                  <strong className="text-slate-200">{team.losses} L</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-mono">Bubble Delta:</span>{' '}
                  <strong
                    className={
                      effProb >= 50 ? 'text-emerald-400' : 'text-rose-400'
                    }
                  >
                    {effProb >= 50
                      ? `+${(effProb - 50.0).toFixed(1)}% above cutline`
                      : `${(effProb - 50.0).toFixed(1)}% below cutline`}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#090c13] flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">
            Navigation: Press Left / Right arrows or Esc to close
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
