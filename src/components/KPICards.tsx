import React from 'react';
import type { SleepRecord } from '../types';
import { Users, Clock, Smartphone, Zap, Activity } from 'lucide-react';

interface KPICardsProps {
  filteredRecords: SleepRecord[];
  totalRecordsCount: number;
}

export const KPICards: React.FC<KPICardsProps> = ({ filteredRecords, totalRecordsCount }) => {
  const n = filteredRecords.length;

  const avgSleep = n > 0
    ? (filteredRecords.reduce((acc, r) => acc + r.total_sleep_hours, 0) / n).toFixed(2)
    : '0.00';

  const avgPhone = n > 0
    ? (filteredRecords.reduce((acc, r) => acc + r.bedtime_phone_minutes, 0) / n).toFixed(1)
    : '0.0';

  const avgFatigue = n > 0
    ? (filteredRecords.reduce((acc, r) => acc + r.next_day_fatigue_score, 0) / n).toFixed(2)
    : '0.00';

  const avgLatency = n > 0
    ? (filteredRecords.reduce((acc, r) => acc + r.sleep_latency_min, 0) / n).toFixed(1)
    : '0.0';

  // Sleep debt categories count & percentage
  const debtBreakdown = [
    { label: 'Optimal Recovery', count: filteredRecords.filter(r => r.sleep_debt_category === 'Optimal Recovery').length, color: 'var(--cat-optimal)' },
    { label: 'Mild Deficit', count: filteredRecords.filter(r => r.sleep_debt_category === 'Mild Deficit').length, color: 'var(--cat-mild)' },
    { label: 'Moderate Debt', count: filteredRecords.filter(r => r.sleep_debt_category === 'Moderate Debt').length, color: 'var(--cat-moderate)' },
    { label: 'Severe Sleep Debt', count: filteredRecords.filter(r => r.sleep_debt_category === 'Severe Sleep Debt').length, color: 'var(--cat-severe)' }
  ];

  const isFiltered = n !== totalRecordsCount;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, marginBottom: 28 }}>
      {/* 1. Valid Records Count */}
      <div className="kpi-card">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
            <span>Valid Sample Size</span>
            <span style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <Users size={14} />
            </span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: '#fff', marginTop: 10, fontFamily: 'JetBrains Mono' }}>
            {n.toLocaleString()}
          </div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
          {isFiltered ? (
            <span style={{ color: '#fbbf24' }}>
              Showing {((n / totalRecordsCount) * 100).toFixed(1)}% of total {totalRecordsCount.toLocaleString()} records
            </span>
          ) : (
            <span>100% of verified respondents (0 nulls, 0 duplicates)</span>
          )}
        </div>
      </div>

      {/* 2. Mean Total Sleep Hours */}
      <div className="kpi-card">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
            <span>Mean Sleep Duration</span>
            <span style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
              <Clock size={14} />
            </span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: '#22d3ee', marginTop: 10, fontFamily: 'JetBrains Mono' }}>
            {avgSleep} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>hrs / night</span>
          </div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
          Recommended minimum is 7.0–9.0 hrs. Observed range: 3.2–9.8 hrs.
        </div>
      </div>

      {/* 3. Mean Bedtime Phone Usage */}
      <div className="kpi-card">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
            <span>Bedtime Phone Use</span>
            <span style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>
              <Smartphone size={14} />
            </span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: '#a78bfa', marginTop: 10, fontFamily: 'JetBrains Mono' }}>
            {avgPhone} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>min / night</span>
          </div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
          Avg latency: <strong style={{ color: '#fff' }}>{avgLatency} min</strong> to fall asleep.
        </div>
      </div>

      {/* 4. Mean Next-Day Fatigue Score */}
      <div className="kpi-card">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
            <span>Mean Next-Day Fatigue</span>
            <span style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <Zap size={14} />
            </span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: '#fbbf24', marginTop: 10, fontFamily: 'JetBrains Mono' }}>
            {avgFatigue} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ 10.0</span>
          </div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
          Subjective fatigue scale (1.0 = rested, 10.0 = severe exhaustion).
        </div>
      </div>

      {/* 5. Sleep Debt Breakdown Mini-Card */}
      <div className="kpi-card" style={{ gridColumn: 'span 1' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
            <span>Sleep Debt Distribution</span>
            <span style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <Activity size={14} />
            </span>
          </div>
          
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {debtBreakdown.map(cat => {
              const pct = n > 0 ? ((cat.count / n) * 100).toFixed(1) : '0';
              return (
                <div key={cat.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: cat.color }} />
                    <span style={{ color: 'var(--text-muted)' }}>{cat.label}</span>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono', color: '#fff', fontWeight: 600 }}>
                    {pct}% <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>({cat.count})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 6 }}>
          Denominator: N = {n.toLocaleString()} active records.
        </div>
      </div>
    </div>
  );
};
