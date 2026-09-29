import React from 'react';
import { FilterTier, SortOption } from '../types';
import { Search, ArrowUpDown } from 'lucide-react';

interface Props {
  activeTier: FilterTier;
  onTierChange: (tier: FilterTier) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
}

export const FilterControls: React.FC<Props> = ({
  activeTier,
  onTierChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-slate-800/80">
      {/* Tier Filter Tabs (Zero-Pill discipline: segmented button control) */}
      <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto">
        <button
          onClick={() => onTierChange('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTier === 'all'
              ? 'bg-slate-800 text-slate-100 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Teams ({totalCount})
        </button>

        <button
          onClick={() => onTierChange('locks')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTier === 'locks'
              ? 'bg-slate-800 text-emerald-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Playoff Locks (3)
        </button>

        <button
          onClick={() => onTierChange('bubble')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTier === 'bubble'
              ? 'bg-slate-800 text-amber-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Bubble / Contenders (3)
        </button>

        <button
          onClick={() => onTierChange('danger')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTier === 'danger'
              ? 'bg-slate-800 text-rose-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Elimination Risk (4)
        </button>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-36 sm:w-48 pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
          <ArrowUpDown className="w-3 h-3 text-slate-500 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="seed" className="bg-slate-900">Sort by Seed</option>
            <option value="prob-desc" className="bg-slate-900">Highest Prob</option>
            <option value="prob-asc" className="bg-slate-900">Lowest Prob</option>
            <option value="wins" className="bg-slate-900">Projected Wins</option>
          </select>
        </div>
      </div>
    </div>
  );
};
