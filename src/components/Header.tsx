import React from 'react';
import { ViewMode } from '../types';
import { LayoutGrid, BarChart2, Table, Sliders } from 'lucide-react';

interface Props {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  activeNav: string;
  onNavClick: (nav: string) => void;
}

export const Header: React.FC<Props> = ({
  viewMode,
  onViewModeChange,
  activeNav,
  onNavClick,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090b10]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-slate-100 font-display">
            ProbMatrix
          </span>
          <span className="text-xs text-cyan-400 font-mono font-medium hidden sm:inline">
            · Postseason Visual Intelligence
          </span>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => onNavClick('all')}
            className={`hover:text-slate-100 transition-colors ${
              activeNav === 'all' && viewMode !== 'lab' ? 'text-slate-100 font-semibold' : ''
            }`}
          >
            All Gauges
          </button>
          <button
            onClick={() => onNavClick('locks')}
            className={`hover:text-slate-100 transition-colors ${
              activeNav === 'locks' && viewMode !== 'lab' ? 'text-slate-100 font-semibold' : ''
            }`}
          >
            Playoff Locks
          </button>
          <button
            onClick={() => onNavClick('bubble')}
            className={`hover:text-slate-100 transition-colors ${
              activeNav === 'bubble' && viewMode !== 'lab' ? 'text-slate-100 font-semibold' : ''
            }`}
          >
            Bubble Watch
          </button>
          <button
            onClick={() => onNavClick('danger')}
            className={`hover:text-slate-100 transition-colors ${
              activeNav === 'danger' && viewMode !== 'lab' ? 'text-slate-100 font-semibold' : ''
            }`}
          >
            Elimination Risk
          </button>
          <button
            onClick={() => onViewModeChange('lab')}
            className={`hover:text-slate-100 transition-colors flex items-center gap-1.5 ${
              viewMode === 'lab' ? 'text-cyan-400 font-bold' : ''
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tools Lab</span>
          </button>
        </nav>

        {/* Zone 3: Segmented view toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => onViewModeChange('grid')}
              title="8-Gauge Grid View"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                viewMode === 'grid'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gauges Grid</span>
            </button>

            <button
              onClick={() => onViewModeChange('spectrum')}
              title="Comparative Spectrum View"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                viewMode === 'spectrum'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Spectrum</span>
            </button>

            <button
              onClick={() => onViewModeChange('table')}
              title="Full Data Table"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                viewMode === 'table'
                  ? 'bg-slate-800 text-cyan-400 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Matrix Table</span>
            </button>

            <button
              onClick={() => onViewModeChange('lab')}
              title="Interactive Tools Lab"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                viewMode === 'lab'
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                  : 'text-cyan-400 hover:text-cyan-300'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="font-semibold">Tools Lab</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

