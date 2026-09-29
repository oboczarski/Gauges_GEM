import React, { useState, useMemo } from 'react';
import { TEAMS_DATA } from './data/teams';
import { TeamData, ViewMode, FilterTier, SortOption, ChartCustomization } from './types';
import { Header } from './components/Header';
import { ExecutiveMetrics } from './components/ExecutiveMetrics';
import { FilterControls } from './components/FilterControls';
import { GaugeCardWrapper } from './components/gauges/GaugeCardWrapper';
import { ComparativeSpectrum } from './components/ComparativeSpectrum';
import { AnalyticsTable } from './components/AnalyticsTable';
import { GaugeDetailModal } from './components/GaugeDetailModal';
import { ToolsLab } from './components/ToolsLab';
import { ShieldCheck, BarChart3, Sparkles, Sliders } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTier, setActiveTier] = useState<FilterTier>('all');
  const [sortBy, setSortBy] = useState<SortOption>('seed');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedTeam, setInspectedTeam] = useState<TeamData | null>(null);

  // Tools Lab state: customizations dictionary per team
  const [customizations, setCustomizations] = useState<Record<string, ChartCustomization>>({});
  const [labSelectedTeamId, setLabSelectedTeamId] = useState<string>('TM 1');

  const handleUpdateCustomization = (teamId: string, updates: Partial<ChartCustomization>) => {
    setCustomizations((prev) => ({
      ...prev,
      [teamId]: {
        ...(prev[teamId] || {}),
        ...updates,
      },
    }));
  };

  const handleResetTeam = (teamId: string) => {
    setCustomizations((prev) => {
      const next = { ...prev };
      delete next[teamId];
      return next;
    });
  };

  const handleResetAll = () => {
    setCustomizations({});
  };

  const handleApplyToAll = (sourceTeamId: string) => {
    const sourceCustom = customizations[sourceTeamId];
    if (!sourceCustom) return;

    // Apply color, dome, and geometry styling to all teams without overwriting their individual probabilities
    const styleProps: Partial<ChartCustomization> = {
      arcColorStart: sourceCustom.arcColorStart,
      arcColorMid: sourceCustom.arcColorMid,
      arcColorEnd: sourceCustom.arcColorEnd,
      trackWidth: sourceCustom.trackWidth,
      trackBgColor: sourceCustom.trackBgColor,
      trackBgOpacity: sourceCustom.trackBgOpacity,
      stageBackdropColor: sourceCustom.stageBackdropColor,
      stageBackdropOpacity: sourceCustom.stageBackdropOpacity,
      corePrimaryColor: sourceCustom.corePrimaryColor,
      coreSecondaryColor: sourceCustom.coreSecondaryColor,
      coreGradientType: sourceCustom.coreGradientType,
      coreOpacity: sourceCustom.coreOpacity,
      coreBorderColor: sourceCustom.coreBorderColor,
      coreBorderWidth: sourceCustom.coreBorderWidth,
      coreTextColor: sourceCustom.coreTextColor,
      coreSubtextColor: sourceCustom.coreSubtextColor,
      glowIntensity: sourceCustom.glowIntensity,
      showTicks: sourceCustom.showTicks,
      showCutline: sourceCustom.showCutline,
      showBaseline: sourceCustom.showBaseline,
      showCoordinates: sourceCustom.showCoordinates,
      decimalPlaces: sourceCustom.decimalPlaces,
    };

    setCustomizations((prev) => {
      const next: Record<string, ChartCustomization> = {};
      TEAMS_DATA.forEach((t) => {
        next[t.id] = {
          ...(prev[t.id] || {}),
          ...styleProps,
        };
      });
      return next;
    });
  };

  const handleOpenLab = (team: TeamData) => {
    setLabSelectedTeamId(team.id);
    setViewMode('lab');
  };

  // Filter and sort teams
  const filteredTeams = useMemo(() => {
    let result = [...TEAMS_DATA];

    // Filter by tier
    if (activeTier === 'locks') {
      result = result.filter((t) => {
        const prob = customizations[t.id]?.probabilityOverride ?? t.probability;
        return prob >= 80;
      });
    } else if (activeTier === 'bubble') {
      result = result.filter((t) => {
        const prob = customizations[t.id]?.probabilityOverride ?? t.probability;
        return prob >= 50 && prob < 80;
      });
    } else if (activeTier === 'danger') {
      result = result.filter((t) => {
        const prob = customizations[t.id]?.probabilityOverride ?? t.probability;
        return prob < 50;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.name.toLowerCase().includes(q) ||
          t.gaugeName.toLowerCase().includes(q) ||
          t.projectedRecord.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      const probA = customizations[a.id]?.probabilityOverride ?? a.probability;
      const probB = customizations[b.id]?.probabilityOverride ?? b.probability;

      if (sortBy === 'seed') return a.seed - b.seed;
      if (sortBy === 'prob-desc') return probB - probA;
      if (sortBy === 'prob-asc') return probA - probB;
      if (sortBy === 'wins') return b.wins - a.wins;
      return 0;
    });

    return result;
  }, [activeTier, searchQuery, sortBy, customizations]);

  const handleNavClick = (nav: string) => {
    if (nav === 'all') {
      setActiveTier('all');
      setViewMode('grid');
    } else if (nav === 'locks') {
      setActiveTier('locks');
      setViewMode('grid');
    } else if (nav === 'bubble') {
      setActiveTier('bubble');
      setViewMode('grid');
    } else if (nav === 'danger') {
      setActiveTier('danger');
      setViewMode('grid');
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col">
      {/* 3-Zone Header Contract */}
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        activeNav={activeTier}
        onNavClick={handleNavClick}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Editorial Hero Banner */}
        <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#111624] to-[#0c101a] border border-slate-800 shadow-2xl overflow-hidden mb-6">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Postseason Probability Intelligence & Tools Lab</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight font-display text-balance">
                8 Half-Circle Analytics Gauge Charts
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed text-balance">
                Eight production-grade, 180° semi-circular gauge charts custom-engineered with multi-stop
                radial dome gradients, calibrated vernier scales, and an interactive <strong>Tools Lab</strong> to
                directly tweak progress arc gradients, core dome styling, inactive background tracks, and live data telemetry.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  100% Half-Circle 180° Architectures
                </span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                  Custom Center Dome Gradients
                </span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <Sliders className="w-3.5 h-3.5" />
                  Live Tools Lab Tuning Enabled
                </span>
              </div>
            </div>

            {/* Quick Hero CTA to launch Tools Lab */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'lab' ? 'grid' : 'lab')}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs tracking-wide transition-all shadow-lg ${
                  viewMode === 'lab'
                    ? 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>{viewMode === 'lab' ? 'Return to 10 Gauges' : 'Open Tools Lab'}</span>
              </button>
              {Object.keys(customizations).length > 0 && (
                <button
                  onClick={handleResetAll}
                  className="px-4 py-2 bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg text-xs font-mono transition-colors text-center"
                >
                  Reset {Object.keys(customizations).length} Customization(s)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* View Mode Switching: When in Tools Lab, show the Lab Workbench */}
        {viewMode === 'lab' ? (
          <ToolsLab
            teams={TEAMS_DATA}
            selectedTeamId={labSelectedTeamId}
            onSelectTeamId={setLabSelectedTeamId}
            customizations={customizations}
            onUpdateCustomization={handleUpdateCustomization}
            onResetTeam={handleResetTeam}
            onResetAll={handleResetAll}
            onApplyToAll={handleApplyToAll}
          />
        ) : (
          <>
            {/* Executive Summary Metrics Strip */}
            <ExecutiveMetrics teams={TEAMS_DATA} />

            {/* Filter & Sort Controls */}
            <FilterControls
              activeTier={activeTier}
              onTierChange={setActiveTier}
              sortBy={sortBy}
              onSortChange={setSortBy}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalCount={TEAMS_DATA.length}
              filteredCount={filteredTeams.length}
            />

            {/* Content View Modes */}
            <div className="mt-6">
              {viewMode === 'grid' && (
                <div>
                  {filteredTeams.length === 0 ? (
                    <div className="p-12 text-center bg-[#0d111a] border border-slate-800 rounded-xl">
                      <p className="text-slate-400 text-sm">
                        No teams match your current filter or search criteria.
                      </p>
                      <button
                        onClick={() => {
                          setActiveTier('all');
                          setSearchQuery('');
                        }}
                        className="mt-3 px-3 py-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                      {filteredTeams.map((team) => (
                        <GaugeCardWrapper
                          key={team.id}
                          team={team}
                          customization={customizations[team.id]}
                          onInspect={(t) => setInspectedTeam(t)}
                          onOpenLab={handleOpenLab}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {viewMode === 'spectrum' && (
                <ComparativeSpectrum
                  teams={TEAMS_DATA}
                  onSelectTeam={(t) => setInspectedTeam(t)}
                />
              )}

              {viewMode === 'table' && (
                <AnalyticsTable
                  teams={filteredTeams}
                  onSelectTeam={(t) => setInspectedTeam(t)}
                />
              )}
            </div>
          </>
        )}
      </main>

      {/* Deep-Dive Inspection Modal */}
      <GaugeDetailModal
        team={inspectedTeam}
        customization={inspectedTeam ? customizations[inspectedTeam.id] : undefined}
        onClose={() => setInspectedTeam(null)}
        onSelectTeam={(t) => setInspectedTeam(t)}
        allTeams={TEAMS_DATA}
        onOpenLab={handleOpenLab}
      />

      {/* Editorial Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-[#06080d] py-8 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">ProbMatrix Analytics</span>
            <span>·</span>
            <span>Official Sample Dataset: 10 Teams Playoff Probability Rates</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Interactive Tools Lab</span>
            <span>·</span>
            <span>10 Distinct 180° Half-Circle Arch Topologies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
