import React from 'react';
import { TeamData } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  teams: TeamData[];
  onSelectTeam: (team: TeamData) => void;
}

export const ComparativeSpectrum: React.FC<Props> = ({ teams, onSelectTeam }) => {
  return (
    <div className="bg-[#0d111a] border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-100 tracking-tight">
            Playoff Probability Comparative Spectrum
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Calibrated alignment of all 10 teams along the 0.0%–100.0% postseason threshold vector
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Lock Zone (&gt;80%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Bubble Cutline (50%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span>Danger (&lt;25%)</span>
          </div>
        </div>
      </div>

      {/* Synchronized Vector Scale */}
      <div className="relative mt-8 mb-6 pt-12 pb-4">
        {/* Horizontal Baseline Axis */}
        <div className="relative h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          {/* Danger zone background */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-rose-500/15"
            style={{ width: '25%' }}
          />
          {/* Bubble zone background */}
          <div
            className="absolute left-[25%] top-0 bottom-0 bg-amber-500/15"
            style={{ width: '55%' }}
          />
          {/* Lock zone background */}
          <div
            className="absolute left-[80%] top-0 bottom-0 bg-emerald-500/20"
            style={{ width: '20%' }}
          />
        </div>

        {/* 50% Bubble Cutline Marker Flag */}
        <div
          className="absolute top-0 bottom-0 w-px bg-amber-400/80 z-10 flex flex-col items-center"
          style={{ left: '50%' }}
        >
          <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/40 -translate-y-6">
            50.0% BUBBLE EQUATOR (TM 6)
          </span>
          <div className="w-2 h-2 bg-amber-400 rotate-45 mt-1" />
        </div>

        {/* 80% Lock Line */}
        <div
          className="absolute top-4 bottom-0 w-px border-l border-dashed border-emerald-500/60 z-10"
          style={{ left: '80%' }}
        >
          <span className="text-[9px] font-mono text-emerald-400 pl-1 -translate-y-4 block">
            80% LOCK THRESHOLD
          </span>
        </div>

        {/* 25% Danger Line */}
        <div
          className="absolute top-4 bottom-0 w-px border-l border-dashed border-rose-500/60 z-10"
          style={{ left: '25%' }}
        >
          <span className="text-[9px] font-mono text-rose-400 pl-1 -translate-y-4 block">
            25% DANGER THRESHOLD
          </span>
        </div>

        {/* 10 Team Marker Nodes positioned precisely along the spectrum */}
        {teams.map((t) => {
          const isSelected = t.teamNumber === 1;
          const pos = t.probability; // 0 to 100%
          const isTopTier = pos >= 80;
          const isBubble = pos >= 50 && pos < 80;
          const nodeColor = isTopTier
            ? '#10b981'
            : isBubble
            ? '#f59e0b'
            : '#ef4444';

          return (
            <div
              key={t.id}
              className="absolute z-20 group cursor-pointer"
              style={{
                left: `${pos}%`,
                top: '2.5rem',
                transform: 'translateX(-50%)',
              }}
              onClick={() => onSelectTeam(t)}
            >
              {/* Pin marker */}
              <div className="flex flex-col items-center">
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-125"
                  style={{
                    backgroundColor: '#090b10',
                    borderColor: nodeColor,
                    boxShadow: `0 0 10px ${nodeColor}80`,
                  }}
                >
                  <span className="text-[9px] font-mono font-bold text-slate-100">
                    {t.seed}
                  </span>
                </div>
                <div
                  className="w-0.5 h-4"
                  style={{ backgroundColor: nodeColor }}
                />
              </div>

              {/* Tooltip / Label */}
              <div className="opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all text-center mt-1">
                <div className="font-mono text-xs font-bold text-slate-200">
                  {t.id}
                </div>
                <div
                  className="font-mono text-[11px] font-semibold tabular-nums"
                  style={{ color: nodeColor }}
                >
                  {t.probability.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Axis Scale Percentages */}
      <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-16 px-1 border-t border-slate-800/60">
        <span>0.0%</span>
        <span>10.0%</span>
        <span>20.0%</span>
        <span>30.0%</span>
        <span>40.0%</span>
        <span className="text-amber-400 font-bold">50.0%</span>
        <span>60.0%</span>
        <span>70.0%</span>
        <span className="text-emerald-400 font-bold">80.0%</span>
        <span>90.0%</span>
        <span>100.0%</span>
      </div>

      {/* Detailed Team Spectrum Cards Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {teams.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelectTeam(t)}
            className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg hover:border-slate-700 cursor-pointer transition-all hover:bg-slate-900 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="font-bold text-slate-200">{t.id}</span>
                <span>Seed #{t.seed}</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-xl font-mono font-bold text-slate-100 tabular-nums">
                  {t.probability.toFixed(1)}%
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {t.projectedRecord}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 truncate mt-1">
                {t.gaugeName}
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>{t.statusBadge}</span>
              <span className="text-cyan-400 flex items-center">
                Inspect <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
