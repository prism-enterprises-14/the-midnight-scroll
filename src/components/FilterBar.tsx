import React from 'react';
import type { FilterState } from '../types';
import { Filter, Search, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
  filteredCount: number;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalCount,
  filteredCount,
  onReset
}) => {
  const handleChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const hasFiltersApplied =
    filters.gender !== 'all' ||
    filters.occupation_type !== 'all' ||
    filters.chronotype !== 'all' ||
    filters.primary_bedtime_app !== 'all' ||
    filters.blue_light_filter_active !== 'all' ||
    filters.sleep_debt_category !== 'all' ||
    filters.phone_usage_tier !== 'all' ||
    filters.searchQuery.trim().length > 0;

  return (
    <div className="glass-panel no-print" style={{ padding: '16px 20px', marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
          <Filter size={16} color="var(--accent-indigo-light)" />
          <span>Interactive Dataset Filters</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-dim)', marginLeft: 8 }}>
            (Cross-filters all dashboard KPI cards, charts, correlations, and tables)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '0.8125rem', color: filteredCount < totalCount ? '#fbbf24' : 'var(--text-muted)' }}>
            Showing <strong>{filteredCount.toLocaleString()}</strong> of <strong>{totalCount.toLocaleString()}</strong> records
          </span>
          {hasFiltersApplied && (
            <button
              onClick={onReset}
              className="btn btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.75rem', gap: 4 }}
            >
              <RotateCcw size={12} /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Select Dropdowns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 }}>
        {/* Occupation Type */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
            Occupation
          </label>
          <select
            className="form-select"
            value={filters.occupation_type}
            onChange={e => handleChange('occupation_type', e.target.value)}
          >
            <option value="all">All Occupations (5)</option>
            <option value="Corporate 9-to-5">Corporate 9-to-5 (2,838)</option>
            <option value="Remote Tech">Remote Tech (2,142)</option>
            <option value="Student">Student (1,622)</option>
            <option value="Healthcare / Shift Worker">Healthcare / Shift (997)</option>
            <option value="Freelance / Creative">Freelance / Creative (901)</option>
          </select>
        </div>

        {/* Chronotype */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
            Circadian Chronotype
          </label>
          <select
            className="form-select"
            value={filters.chronotype}
            onChange={e => handleChange('chronotype', e.target.value)}
          >
            <option value="all">All Chronotypes (3)</option>
            <option value="Intermediate">Intermediate (3,880)</option>
            <option value="Night Owl">Night Owl (2,455)</option>
            <option value="Morning Lark">Morning Lark (2,165)</option>
          </select>
        </div>

        {/* Sleep Debt Tier */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
            Sleep Debt Tier
          </label>
          <select
            className="form-select"
            value={filters.sleep_debt_category}
            onChange={e => handleChange('sleep_debt_category', e.target.value)}
          >
            <option value="all">All Debt Categories (4)</option>
            <option value="Optimal Recovery">Optimal Recovery (1,387)</option>
            <option value="Mild Deficit">Mild Deficit (2,004)</option>
            <option value="Moderate Debt">Moderate Debt (4,462)</option>
            <option value="Severe Sleep Debt">Severe Sleep Debt (647)</option>
          </select>
        </div>

        {/* Primary App */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
            Primary Bedtime App
          </label>
          <select
            className="form-select"
            value={filters.primary_bedtime_app}
            onChange={e => handleChange('primary_bedtime_app', e.target.value)}
          >
            <option value="all">All Applications (6)</option>
            <option value="TikTok / Reels">TikTok / Reels (2,198)</option>
            <option value="YouTube">YouTube (1,928)</option>
            <option value="Instagram / Reddit">Instagram / Reddit (1,630)</option>
            <option value="Streaming (Netflix/Hulu)">Streaming Media (1,301)</option>
            <option value="Messaging / Chat">Messaging / Chat (847)</option>
            <option value="News / Reading">News / Reading (596)</option>
          </select>
        </div>

        {/* Blue Light Filter Active */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
            Blue-Light Filter
          </label>
          <select
            className="form-select"
            value={filters.blue_light_filter_active}
            onChange={e => handleChange('blue_light_filter_active', e.target.value)}
          >
            <option value="all">Filter Status: All</option>
            <option value="1">Filter Active (On) (3,976)</option>
            <option value="0">Filter Inactive (Off) (4,524)</option>
          </select>
        </div>

        {/* Phone Usage Tier */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
            Bedtime Phone Tier
          </label>
          <select
            className="form-select"
            value={filters.phone_usage_tier}
            onChange={e => handleChange('phone_usage_tier', e.target.value)}
          >
            <option value="all">All Usage Durations</option>
            <option value="0-30">Light: 0–30 mins</option>
            <option value="31-60">Moderate: 31–60 mins</option>
            <option value="61-120">Heavy: 61–120 mins</option>
            <option value="121+">Extreme: 121–180 mins</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
            Gender
          </label>
          <select
            className="form-select"
            value={filters.gender}
            onChange={e => handleChange('gender', e.target.value)}
          >
            <option value="all">All Genders</option>
            <option value="Female">Female (4,347)</option>
            <option value="Male">Male (3,905)</option>
            <option value="Non-Binary">Non-Binary (248)</option>
          </select>
        </div>

        {/* Search query */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>
            User ID Search
          </label>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: 11, color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="USR-00042..."
              className="form-input"
              value={filters.searchQuery}
              onChange={e => handleChange('searchQuery', e.target.value)}
              style={{ paddingLeft: 30 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
