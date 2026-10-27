import React, { useState } from 'react';
import type { SleepRecord } from '../types';
import { computeNumericSummary, computeCategoryBreakdown } from '../dataService';
import { CorrelationMatrix } from '../components/CorrelationMatrix';
import { ScatterExplorer } from '../components/ScatterExplorer';
import { DataTable } from '../components/DataTable';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { Table, BarChart3, Grid, Activity } from 'lucide-react';

interface ExplorePageProps {
  records: SleepRecord[];
  allRecords: SleepRecord[];
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ records, allRecords }) => {
  const [selectedCategoryGrouping, setSelectedCategoryGrouping] = useState<keyof SleepRecord>('occupation_type');
  const [activeTab, setActiveTab] = useState<'categorical' | 'summary' | 'heatmap' | 'scatter' | 'table'>('categorical');

  // Compute category grouped data
  const groupedData = computeCategoryBreakdown(records, selectedCategoryGrouping);

  // Numeric column summaries
  const numericColumns: { key: keyof SleepRecord; label: string; unit: string }[] = [
    { key: 'total_sleep_hours', label: 'Total Sleep Hours', unit: 'hrs' },
    { key: 'bedtime_phone_minutes', label: 'Bedtime Phone Minutes', unit: 'min' },
    { key: 'sleep_latency_min', label: 'Sleep Latency', unit: 'min' },
    { key: 'next_day_fatigue_score', label: 'Next-Day Fatigue', unit: 'scale 1-10' },
    { key: 'screen_brightness_pct', label: 'Screen Brightness', unit: '%' },
    { key: 'caffeine_post_5pm_mg', label: 'Post-5pm Caffeine', unit: 'mg' },
    { key: 'physical_activity_min', label: 'Physical Activity', unit: 'min' },
    { key: 'deep_sleep_pct', label: 'Deep Sleep Ratio', unit: '%' },
    { key: 'rem_sleep_pct', label: 'REM Sleep Ratio', unit: '%' },
    { key: 'morning_alarm_snoozes', label: 'Alarm Snoozes', unit: 'count' },
    { key: 'age', label: 'Participant Age', unit: 'years' }
  ];

  const summaries = numericColumns.map(col => {
    const vals = records.map(r => Number(r[col.key])).filter(v => !isNaN(v));
    const allVals = allRecords.map(r => Number(r[col.key])).filter(v => !isNaN(v));
    return {
      col,
      current: computeNumericSummary(vals),
      whole: computeNumericSummary(allVals)
    };
  });

  return (
    <div>
      {/* Sub-Navigation for Explore Sections */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12 }}>
        {[
          { id: 'categorical', label: 'Category Grouped Comparisons', icon: <BarChart3 size={15} /> },
          { id: 'heatmap', label: 'Correlation Heatmap', icon: <Grid size={15} /> },
          { id: 'scatter', label: 'Custom Scatter Explorer', icon: <Activity size={15} /> },
          { id: 'summary', label: 'Summary Statistics Table', icon: <Table size={15} /> },
          { id: 'table', label: 'Raw Records Table', icon: <Table size={15} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.8125rem' }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Category Comparisons Section */}
      {activeTab === 'categorical' && (
        <div className="glass-panel" style={{ padding: 24, marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>
                Grouped Demographic & Lifestyle Comparison
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Compare average sleep hours, bedtime smartphone usage, and fatigue scores across cohort classifications.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Group By:</span>
              <select
                className="form-select"
                value={selectedCategoryGrouping}
                onChange={e => setSelectedCategoryGrouping(e.target.value as keyof SleepRecord)}
                style={{ width: 'auto', minWidth: 200, fontSize: '0.8125rem' }}
              >
                <option value="occupation_type">Occupation Type (5 groups)</option>
                <option value="chronotype">Circadian Chronotype (3 groups)</option>
                <option value="primary_bedtime_app">Primary Bedtime App (6 apps)</option>
                <option value="blue_light_filter_active">Blue-Light Filter Status (On/Off)</option>
                <option value="gender">Gender (3 classes)</option>
                <option value="sleep_debt_category">Sleep Debt Tier (4 categories)</option>
              </select>
            </div>
          </div>

          {/* Grouped Bar Chart */}
          <div style={{ width: '100%', height: 380, marginBottom: 20 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={groupedData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="category"
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  tickFormatter={val => val === '0' ? 'Filter Off' : val === '1' ? 'Filter On' : val}
                />
                <YAxis yAxisId="left" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const displayLabel = label === '0' ? 'Filter Inactive (Off)' : label === '1' ? 'Filter Active (On)' : label;
                      return (
                        <div className="recharts-default-tooltip" style={{ padding: '10px 14px' }}>
                          <div style={{ fontWeight: 700, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 4, marginBottom: 6 }}>
                            {displayLabel}
                          </div>
                          {payload.map((p: any) => (
                            <div key={p.dataKey} style={{ color: p.color, fontSize: '0.75rem' }}>
                              {p.name}: <strong>{p.value}</strong>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
                <Bar yAxisId="left" dataKey="avgSleep" name="Avg Sleep (hrs)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="avgPhone" name="Avg Phone (mins)" fill="#818cf8" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="avgFatigue" name="Avg Fatigue (scale 1-10)" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Grouped Statistics Table */}
          <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 8 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
              <thead style={{ background: 'rgba(15, 23, 42, 0.8)' }}>
                <tr>
                  <th style={{ padding: '8px 12px' }}>Group Classification</th>
                  <th style={{ padding: '8px 12px' }}>Count (N)</th>
                  <th style={{ padding: '8px 12px' }}>Proportion (%)</th>
                  <th style={{ padding: '8px 12px' }}>Mean Sleep Duration</th>
                  <th style={{ padding: '8px 12px' }}>Mean Bedtime Phone</th>
                  <th style={{ padding: '8px 12px' }}>Mean Sleep Latency</th>
                  <th style={{ padding: '8px 12px' }}>Mean Next-Day Fatigue</th>
                </tr>
              </thead>
              <tbody>
                {groupedData.map(g => (
                  <tr key={g.category} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600, color: '#fff' }}>
                      {g.category === '0' ? 'Filter Inactive (Off)' : g.category === '1' ? 'Filter Active (On)' : g.category}
                    </td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono' }}>{g.count.toLocaleString()}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono' }}>{g.percentage}%</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', color: '#22d3ee', fontWeight: 600 }}>{g.avgSleep} hrs</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', color: '#a78bfa', fontWeight: 600 }}>{g.avgPhone} mins</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono' }}>{g.avgLatency} mins</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', color: '#fbbf24', fontWeight: 600 }}>{g.avgFatigue} / 10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Correlation Heatmap */}
      {activeTab === 'heatmap' && <CorrelationMatrix records={records} />}

      {/* 3. Custom Scatter Explorer */}
      {activeTab === 'scatter' && <ScatterExplorer records={records} />}

      {/* 4. Numeric Summary Statistics Table */}
      {activeTab === 'summary' && (
        <div className="glass-panel" style={{ padding: 24, marginBottom: 28 }}>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>
              Parametric & Non-Parametric Summary Statistics
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Computed metrics across all numeric variables. Compares currently active filter cohort with the full 8,500 record baseline.
            </p>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 8 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
              <thead style={{ background: 'rgba(15, 23, 42, 0.8)' }}>
                <tr>
                  <th style={{ padding: '10px 12px' }}>Variable</th>
                  <th style={{ padding: '10px 12px' }}>Unit</th>
                  <th style={{ padding: '10px 12px' }}>Min</th>
                  <th style={{ padding: '10px 12px' }}>Q1 (25th)</th>
                  <th style={{ padding: '10px 12px' }}>Median (50th)</th>
                  <th style={{ padding: '10px 12px' }}>Mean (x̄)</th>
                  <th style={{ padding: '10px 12px' }}>Q3 (75th)</th>
                  <th style={{ padding: '10px 12px' }}>Max</th>
                  <th style={{ padding: '10px 12px' }}>Std Dev (s)</th>
                  <th style={{ padding: '10px 12px' }}>IQR</th>
                </tr>
              </thead>
              <tbody>
                {summaries.map(s => (
                  <tr key={s.col.key} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600, color: '#fff' }}>{s.col.label}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--text-dim)' }}>{s.col.unit}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono' }}>{s.current.min}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono' }}>{s.current.q1}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', fontWeight: 600, color: '#22d3ee' }}>{s.current.median}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#818cf8' }}>{s.current.mean}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono' }}>{s.current.q3}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono' }}>{s.current.max}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', color: 'var(--text-muted)' }}>{s.current.std}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', color: 'var(--text-dim)' }}>{s.current.iqr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Raw Records Table */}
      {activeTab === 'table' && <DataTable records={records} />}
    </div>
  );
};
