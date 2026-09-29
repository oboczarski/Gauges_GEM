import React from 'react';
import { TeamData } from '../types';
import { ExternalLink, ShieldCheck, Flame, AlertTriangle } from 'lucide-react';

interface Props {
  teams: TeamData[];
  onSelectTeam: (team: TeamData) => void;
}

export const AnalyticsTable: React.FC<Props> = ({ teams, onSelectTeam }) => {
  return (
    <div className="bg-[#0d111a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100 tracking-tight">
          Official Dataset & Probability Matrix
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          High-density tabular ledger comparing probabilities, seeds, projected records, and custom gauge archetypes
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#090c13] text-slate-400 font-mono border-b border-slate-800 text-[11px] uppercase tracking-wider">
              <th className="py-3.5 px-4 font-semibold text-slate-300">TMS</th>
              <th className="py-3.5 px-4 font-semibold text-slate-300">PROJ SEED</th>
              <th className="py-3.5 px-4 font-semibold text-slate-300">PROJ REC</th>
              <th className="py-3.5 px-4 font-semibold text-right text-slate-300">PLAYOFF PROB</th>
              <th className="py-3.5 px-6 font-semibold text-slate-300 w-48">PROBABILITY BAR</th>
              <th className="py-3.5 px-4 font-semibold text-slate-300">STATUS & TIER</th>
              <th className="py-3.5 px-4 font-semibold text-slate-300">GAUGE ARCHETYPE</th>
              <th className="py-3.5 px-4 font-semibold text-right text-slate-300">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
            {teams.map((t) => {
              const isLock = t.probability >= 80;
              const isBubble = t.probability >= 50 && t.probability < 80;
              const barColor = isLock
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                : isBubble
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                : 'bg-gradient-to-r from-rose-500 to-orange-400';

              return (
                <tr
                  key={t.id}
                  onClick={() => onSelectTeam(t)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                >
                  {/* TMS */}
                  <td className="py-3 px-4 font-bold text-slate-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[11px] text-cyan-400">
                      {t.teamNumber}
                    </span>
                    <span>{t.id}</span>
                  </td>

                  {/* PROJ SEED */}
                  <td className="py-3 px-4 font-semibold text-slate-200">
                    <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-200 border border-slate-700/50">
                      #{t.seed}
                    </span>
                  </td>

                  {/* PROJ REC */}
                  <td className="py-3 px-4 tabular-nums text-slate-200 font-semibold">
                    {t.projectedRecord}
                  </td>

                  {/* PLAYOFF PROB */}
                  <td className="py-3 px-4 text-right tabular-nums text-sm font-bold text-slate-100">
                    <span
                      className={
                        isLock
                          ? 'text-emerald-400'
                          : isBubble
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }
                    >
                      {t.probability.toFixed(1)}%
                    </span>
                  </td>

                  {/* PROBABILITY BAR */}
                  <td className="py-3 px-6">
                    <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${barColor}`}
                        style={{ width: `${t.probability}%` }}
                      />
                    </div>
                  </td>

                  {/* STATUS & TIER */}
                  <td className="py-3 px-4 font-sans text-xs">
                    <div className="flex items-center gap-1.5 font-medium text-slate-300">
                      {isLock ? (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : isBubble ? (
                        <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      )}
                      <span>{t.statusBadge}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {t.clinchStatus}
                    </div>
                  </td>

                  {/* GAUGE ARCHETYPE */}
                  <td className="py-3 px-4 font-sans">
                    <div className="font-semibold text-slate-200 text-xs">
                      {t.gaugeName}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {t.gaugeSubtitle}
                    </div>
                  </td>

                  {/* ACTION */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTeam(t);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-[11px] font-medium transition-colors inline-flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
