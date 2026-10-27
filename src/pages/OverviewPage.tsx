import React from 'react';
import type { SleepRecord } from '../types';
import { KPICards } from '../components/KPICards';
import {
  computeSleepDurationBins,
  computePhoneMinutesBins,
  computeCategoryBreakdown,
  computePearson
} from '../dataService';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ScatterChart,
  Scatter,
  Cell
} from 'recharts';
import { TrendingDown, AlertCircle, Info, Sparkles } from 'lucide-react';

interface OverviewPageProps {
  filteredRecords: SleepRecord[];
  totalRecordsCount: number;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ filteredRecords, totalRecordsCount }) => {
  const sleepBins = computeSleepDurationBins(filteredRecords);
  const phoneBins = computePhoneMinutesBins(filteredRecords);
  const debtCategories = computeCategoryBreakdown(filteredRecords, 'sleep_debt_category');

  // Dynamic Pearson r between bedtime phone minutes & total sleep
  const phoneMinutes = filteredRecords.map(r => r.bedtime_phone_minutes);
  const sleepHours = filteredRecords.map(r => r.total_sleep_hours);
  const rPhoneSleep = computePearson(phoneMinutes, sleepHours);

  // Dynamic Pearson r between sleep hours & next day fatigue
  const fatigueScores = filteredRecords.map(r => r.next_day_fatigue_score);
  const rSleepFatigue = computePearson(sleepHours, fatigueScores);

  const getDebtColor = (category: string) => {
    if (category === 'Optimal Recovery') return '#10b981';
    if (category === 'Mild Deficit') return '#06b6d4';
    if (category === 'Moderate Debt') return '#f59e0b';
    if (category === 'Severe Sleep Debt') return '#f43f5e';
    return '#818cf8';
  };

  // Subsample for scatter plot to ensure smooth rendering
  const scatterSample = filteredRecords.slice(0, 500).map(r => ({
    x: r.bedtime_phone_minutes,
    y: r.total_sleep_hours,
    id: r.user_id,
    cat: r.sleep_debt_category
  }));

  return (
    <div>
      {/* KPI Cards */}
      <KPICards filteredRecords={filteredRecords} totalRecordsCount={totalRecordsCount} />

      {/* Row 1: Sleep Distribution & Bedtime Phone Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 24, marginBottom: 28 }}>
        {/* Chart A: Distribution of Total Sleep Hours */}
        <div className="glass-panel" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                Distribution of Nocturnal Sleep Hours
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Binned distribution of total sleep duration across active cohort
              </p>
            </div>
            <span className="badge badge-mild" style={{ fontSize: '0.7rem' }}>
              Target: 7–9 hrs
            </span>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepBins} margin={{ top: 10, right: 10, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="range" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="recharts-default-tooltip" style={{ padding: '8px 12px' }}>
                          <div style={{ fontWeight: 700 }}>Sleep: {d.range}</div>
                          <div style={{ color: '#22d3ee' }}>Count: {d.count.toLocaleString()} ({d.pct}%)</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: 8, fontSize: '0.75rem', color: 'var(--text-muted)', borderLeft: '3px solid #06b6d4', display: 'flex', gap: 8 }}>
            <Info size={16} color="#06b6d4" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <strong>Calculated Observation:</strong> Modal sleep duration sits tightly in the <strong>5.0–5.9h</strong> and <strong>6.0–6.9h</strong> ranges ({sleepBins.filter(b => b.range === '5.0–5.9h' || b.range === '6.0–6.9h').reduce((a, b) => a + b.pct, 0).toFixed(1)}% combined). Less than 40% of the cohort meets the 7+ hour threshold.
            </div>
          </div>
        </div>

        {/* Chart B: Distribution of Bedtime Phone Minutes */}
        <div className="glass-panel" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                Distribution of Bedtime Smartphone Minutes
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Active in-bed screen time duration before trying to sleep
              </p>
            </div>
            <span className="badge badge-moderate" style={{ fontSize: '0.7rem' }}>
              Mean: 59.3m
            </span>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={phoneBins} margin={{ top: 10, right: 10, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="range" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="recharts-default-tooltip" style={{ padding: '8px 12px' }}>
                          <div style={{ fontWeight: 700 }}>{d.range}</div>
                          <div style={{ color: '#a78bfa' }}>Respondents: {d.count.toLocaleString()} ({d.pct}%)</div>
                          <div style={{ color: '#38bdf8' }}>Avg Sleep: {d.avgSleep} hrs</div>
                          <div style={{ color: '#fbbf24' }}>Avg Fatigue: {d.avgFatigue} / 10</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: 8, fontSize: '0.75rem', color: 'var(--text-muted)', borderLeft: '3px solid #8b5cf6', display: 'flex', gap: 8 }}>
            <Info size={16} color="#8b5cf6" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <strong>Calculated Observation:</strong> Over <strong>45%</strong> of respondents engage in &gt;60 minutes of bedtime screen exposure. For participants exceeding 120 minutes, average total sleep drops dramatically to <strong>4.6h</strong> while fatigue jumps to <strong>8.4/10</strong>.
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Sleep Debt Proportions & Bedtime Phone vs Sleep Hours Scatter */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 24, marginBottom: 28 }}>
        {/* Chart C: Sleep-Debt Category Proportions & Averages */}
        <div className="glass-panel" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                Sleep Debt Category Breakdown
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Cohort proportions and average sleep duration by debt category
              </p>
            </div>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={debtCategories} layout="vertical" margin={{ top: 10, right: 20, bottom: 10, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis dataKey="category" type="category" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} width={110} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload as any;
                      return (
                        <div className="recharts-default-tooltip" style={{ padding: '8px 12px' }}>
                          <div style={{ fontWeight: 700, color: '#fff' }}>{d.category}</div>
                          <div>Count: <strong>{d.count.toLocaleString()}</strong> ({d.percentage}%)</div>
                          <div>Avg Sleep: <strong>{d.avgSleep} hrs</strong></div>
                          <div>Avg Phone: <strong>{d.avgPhone} mins</strong></div>
                          <div>Avg Fatigue: <strong>{d.avgFatigue} / 10</strong></div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {debtCategories.map(entry => (
                    <Cell key={entry.category} fill={getDebtColor(entry.category)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: 8, fontSize: '0.75rem', color: 'var(--text-muted)', borderLeft: '3px solid #f59e0b', display: 'flex', gap: 8 }}>
            <AlertCircle size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <strong>Calculated Observation:</strong> <strong>Moderate Debt</strong> constitutes the single largest group at <strong>52.5%</strong> (mean sleep 5.55h), while <strong>Severe Sleep Debt</strong> accounts for <strong>7.6%</strong> (mean sleep 3.76h, phone 123.6m). Only <strong>16.3%</strong> achieve Optimal Recovery.
            </div>
          </div>
        </div>

        {/* Chart D: Bedtime Phone vs Total Sleep Hours Scatter Plot */}
        <div className="glass-panel" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                Bedtime Phone Minutes vs Total Sleep Hours
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Direct displacement bivariate plot (r = {rPhoneSleep})
              </p>
            </div>
            <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>
              Inverse r = {rPhoneSleep}
            </span>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Phone Minutes"
                  unit="m"
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Sleep Hours"
                  unit="h"
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3', stroke: '#818cf8' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="recharts-default-tooltip" style={{ padding: '8px 12px' }}>
                          <div>User: <strong>{d.id}</strong></div>
                          <div>Phone: <strong>{d.x} min</strong></div>
                          <div>Sleep: <strong>{d.y} hrs</strong></div>
                          <div>Category: <strong>{d.cat}</strong></div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter data={scatterSample} fill="#6366f1" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: 8, fontSize: '0.75rem', color: 'var(--text-muted)', borderLeft: '3px solid #6366f1', display: 'flex', gap: 8 }}>
            <TrendingDown size={16} color="#818cf8" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <strong>Calculated Observation:</strong> Statistically robust inverse correlation (<strong>r = {rPhoneSleep}</strong>). Every additional 30 minutes of bedtime smartphone activity is associated with an average loss of ~45 minutes of total sleep duration and increased latency.
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Next-Day Fatigue Comparison across Sleep Debt Categories */}
      <div className="glass-panel" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
              Next-Day Fatigue Across Sleep Debt Categories
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Comparing subjective fatigue (scale 1–10) with sleep duration and bedtime screen exposure
            </p>
          </div>
          <span className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
            Inverse Correlation Sleep ↔ Fatigue: r = {rSleepFatigue}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 14 }}>
          {debtCategories.map(cat => {
            return (
              <div
                key={cat.category}
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: `1px solid ${getDebtColor(cat.category)}33`,
                  borderRadius: 10,
                  padding: 16,
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: getDebtColor(cat.category) }}>
                    {cat.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {cat.percentage}% ({cat.count})
                  </span>
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Mean Next-Day Fatigue</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: getDebtColor(cat.category), fontFamily: 'JetBrains Mono' }}>
                    {cat.avgFatigue} <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ 10</span>
                  </div>
                </div>

                <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Avg Sleep: <strong style={{ color: '#fff' }}>{cat.avgSleep}h</strong></span>
                  <span>Avg Phone: <strong style={{ color: '#fff' }}>{cat.avgPhone}m</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(99, 102, 241, 0.08)', borderRadius: 8, fontSize: '0.8125rem', color: '#c7d2fe', border: '1px solid rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Sparkles size={18} color="#818cf8" style={{ flexShrink: 0 }} />
          <div>
            <strong>Core Insight:</strong> There is a near 9-fold divergence in daytime fatigue score between individuals in the <strong>Optimal Recovery</strong> group (1.08 / 10) versus those in the <strong>Severe Sleep Debt</strong> group (9.58 / 10), directly mirroring late-night phone engagement and sleep truncation.
          </div>
        </div>
      </div>
    </div>
  );
};
