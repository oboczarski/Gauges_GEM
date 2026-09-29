import React from 'react';
import { TeamData } from '../types';

interface Props {
  teams: TeamData[];
}

export const ExecutiveMetrics: React.FC<Props> = ({ teams }) => {
  const avgProb = teams.reduce((acc, t) => acc + t.probability, 0) / teams.length;
  const topTeam = teams[0];
  const bubbleTeam = teams.find((t) => t.seed === 6) || teams[5];
  const bottomTeam = teams[teams.length - 1];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-6">
      {/* Metric 1: Clinch Leader */}
      <div className="p-4 bg-[#0d111a]/80 border border-slate-800 rounded-xl relative overflow-hidden">
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          Top Clinch Proximity
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums">
            {topTeam.probability.toFixed(1)}%
          </span>
          <span className="text-xs text-slate-300 font-mono font-semibold">
            {topTeam.id} (Seed #1)
          </span>
        </div>
        <div className="mt-2 text-xs text-slate-500 font-mono">
          Rec: {topTeam.projectedRecord} · Clinch Magic #: 1
        </div>
      </div>

      {/* Metric 2: Bubble Equator */}
      <div className="p-4 bg-[#0d111a]/80 border border-slate-800 rounded-xl relative overflow-hidden">
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          Postseason Bubble Cutline
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 tabular-nums">
            {bubbleTeam.probability.toFixed(1)}%
          </span>
          <span className="text-xs text-slate-300 font-mono font-semibold">
            {bubbleTeam.id} (Seed #6)
          </span>
        </div>
        <div className="mt-2 text-xs text-slate-500 font-mono">
          Rec: {bubbleTeam.projectedRecord} · Final Seed
        </div>
      </div>

      {/* Metric 3: Danger Zone */}
      <div className="p-4 bg-[#0d111a]/80 border border-slate-800 rounded-xl relative overflow-hidden">
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          Elimination Brink
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-rose-400 tabular-nums">
            {bottomTeam.probability.toFixed(1)}%
          </span>
          <span className="text-xs text-slate-300 font-mono font-semibold">
            {bottomTeam.id} (Seed #10)
          </span>
        </div>
        <div className="mt-2 text-xs text-slate-500 font-mono">
          Rec: {bottomTeam.projectedRecord} · Elimination #: 1
        </div>
      </div>

      {/* Metric 4: Field Average */}
      <div className="p-4 bg-[#0d111a]/80 border border-slate-800 rounded-xl relative overflow-hidden">
        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          10-Team Mean Probability
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 tabular-nums">
            {avgProb.toFixed(1)}%
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Spread: 84.2%
          </span>
        </div>
        <div className="mt-2 text-xs text-slate-500 font-mono">
          Top 6 Average: 78.0%
        </div>
      </div>
    </div>
  );
};
