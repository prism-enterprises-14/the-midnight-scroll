import React, { useState, useMemo } from 'react';
import type { SleepRecord } from '../types';
import { computePearson } from '../dataService';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ZAxis } from 'recharts';
import { Sliders } from 'lucide-react';

interface ScatterExplorerProps {
  records: SleepRecord[];
}

type NumericKey = 'bedtime_phone_minutes' | 'total_sleep_hours' | 'sleep_latency_min' | 'next_day_fatigue_score' | 'screen_brightness_pct' | 'caffeine_post_5pm_mg' | 'physical_activity_min' | 'deep_sleep_pct' | 'rem_sleep_pct' | 'morning_alarm_snoozes' | 'age';

const VARIABLE_OPTIONS: { key: NumericKey; label: string; unit: string }[] = [
  { key: 'bedtime_phone_minutes', label: 'Bedtime Phone Minutes', unit: 'min' },
  { key: 'total_sleep_hours', label: 'Total Sleep Hours', unit: 'hrs' },
  { key: 'sleep_latency_min', label: 'Sleep Latency', unit: 'min' },
  { key: 'next_day_fatigue_score', label: 'Next-Day Fatigue Score', unit: 'pts' },
  { key: 'screen_brightness_pct', label: 'Screen Brightness', unit: '%' },
  { key: 'caffeine_post_5pm_mg', label: 'Caffeine Post-5pm', unit: 'mg' },
  { key: 'physical_activity_min', label: 'Physical Activity', unit: 'min' },
  { key: 'deep_sleep_pct', label: 'Deep Sleep Proportion', unit: '%' },
  { key: 'rem_sleep_pct', label: 'REM Sleep Proportion', unit: '%' },
  { key: 'morning_alarm_snoozes', label: 'Morning Alarm Snoozes', unit: 'count' },
  { key: 'age', label: 'Participant Age', unit: 'years' }
];

export const ScatterExplorer: React.FC<ScatterExplorerProps> = ({ records }) => {
  const [xVar, setXVar] = useState<NumericKey>('bedtime_phone_minutes');
  const [yVar, setYVar] = useState<NumericKey>('total_sleep_hours');
  const [sampleLimit, setSampleLimit] = useState<number>(600); // Default sub-sample for responsive canvas rendering

  const xOption = VARIABLE_OPTIONS.find(o => o.key === xVar)!;
  const yOption = VARIABLE_OPTIONS.find(o => o.key === yVar)!;

  // Subsample records evenly if record count exceeds sampleLimit for smooth 60fps rendering
  const chartData = useMemo(() => {
    if (records.length <= sampleLimit || sampleLimit === 0) {
      return records.map(r => ({
        x: r[xVar],
        y: r[yVar],
        id: r.user_id,
        category: r.sleep_debt_category,
        occupation: r.occupation_type,
        app: r.primary_bedtime_app
      }));
    }
    const step = Math.ceil(records.length / sampleLimit);
    const sampled: any[] = [];
    for (let i = 0; i < records.length; i += step) {
      const r = records[i];
      sampled.push({
        x: r[xVar],
        y: r[yVar],
        id: r.user_id,
        category: r.sleep_debt_category,
        occupation: r.occupation_type,
        app: r.primary_bedtime_app
      });
    }
    return sampled;
  }, [records, xVar, yVar, sampleLimit]);

  // Calculate Linear Trend Statistics
  const stats = useMemo(() => {
    const xVals = records.map(r => Number(r[xVar]));
    const yVals = records.map(r => Number(r[yVar]));
    const n = Math.min(xVals.length, yVals.length);
    if (n === 0) return { r: 0, r2: 0, slope: 0, intercept: 0 };

    const r = computePearson(xVals, yVals);
    const r2 = +(Math.pow(r, 2) * 100).toFixed(1);

    const meanX = xVals.reduce((a, b) => a + b, 0) / n;
    const meanY = yVals.reduce((a, b) => a + b, 0) / n;

    let cov = 0;
    let varX = 0;
    for (let i = 0; i < n; i++) {
      cov += (xVals[i] - meanX) * (yVals[i] - meanY);
      varX += Math.pow(xVals[i] - meanX, 2);
    }
    const slope = varX !== 0 ? +(cov / varX).toFixed(4) : 0;
    const intercept = +(meanY - slope * meanX).toFixed(2);

    return { r, r2, slope, intercept };
  }, [records, xVar, yVar]);

  return (
    <div className="glass-panel" style={{ padding: 24, marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sliders size={18} color="var(--accent-indigo-light)" />
            Custom Bivariate Scatter Explorer
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Select arbitrary X and Y quantitative variables to investigate non-linearities, clustering, and regression trends.
          </p>
        </div>

        {/* Variable Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-dim)', marginBottom: 2 }}>
              X-AXIS VARIABLE
            </label>
            <select
              className="form-select"
              value={xVar}
              onChange={e => setXVar(e.target.value as NumericKey)}
              style={{ fontSize: '0.8125rem', padding: '6px 10px', minWidth: 180 }}
            >
              {VARIABLE_OPTIONS.map(opt => (
                <option key={opt.key} value={opt.key}>{opt.label} ({opt.unit})</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-dim)', marginBottom: 2 }}>
              Y-AXIS VARIABLE
            </label>
            <select
              className="form-select"
              value={yVar}
              onChange={e => setYVar(e.target.value as NumericKey)}
              style={{ fontSize: '0.8125rem', padding: '6px 10px', minWidth: 180 }}
            >
              {VARIABLE_OPTIONS.map(opt => (
                <option key={opt.key} value={opt.key}>{opt.label} ({opt.unit})</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-dim)', marginBottom: 2 }}>
              DENSITY SAMPLING
            </label>
            <select
              className="form-select"
              value={sampleLimit}
              onChange={e => setSampleLimit(Number(e.target.value))}
              style={{ fontSize: '0.8125rem', padding: '6px 10px', minWidth: 140 }}
            >
              <option value={300}>300 points (Fastest)</option>
              <option value={600}>600 points (Balanced)</option>
              <option value={1500}>1,500 points (Dense)</option>
              <option value={0}>All {records.length.toLocaleString()} points</option>
            </select>
          </div>
        </div>
      </div>

      {/* Regression Bar Summary */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '10px 16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8, marginBottom: 16, fontSize: '0.8125rem', flexWrap: 'wrap', border: '1px solid var(--border-subtle)' }}>
        <div>
          <span style={{ color: 'var(--text-dim)' }}>Correlation: </span>
          <strong style={{ color: stats.r >= 0 ? '#818cf8' : '#fb7185', fontFamily: 'JetBrains Mono' }}>
            r = {stats.r >= 0 ? `+${stats.r.toFixed(4)}` : stats.r.toFixed(4)}
          </strong>
        </div>
        <div>
          <span style={{ color: 'var(--text-dim)' }}>Variance Explained: </span>
          <strong style={{ color: '#fbbf24', fontFamily: 'JetBrains Mono' }}>R² = {stats.r2}%</strong>
        </div>
        <div>
          <span style={{ color: 'var(--text-dim)' }}>Fitted Line: </span>
          <span style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
            y = {stats.slope}x {stats.intercept >= 0 ? `+ ${stats.intercept}` : `- ${Math.abs(stats.intercept)}`}
          </span>
        </div>
        <div style={{ marginLeft: 'auto', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
          Plotting {chartData.length.toLocaleString()} sampled records ({records.length.toLocaleString()} in filter)
        </div>
      </div>

      {/* Recharts Scatter Plot */}
      <div style={{ width: '100%', height: 380 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              type="number"
              dataKey="x"
              name={xOption.label}
              unit={` ${xOption.unit}`}
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={{ stroke: '#64748b' }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name={yOption.label}
              unit={` ${yOption.unit}`}
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={{ stroke: '#64748b' }}
            />
            <ZAxis range={[25, 25]} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3', stroke: '#818cf8' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="recharts-default-tooltip" style={{ padding: '10px 14px' }}>
                      <div style={{ fontWeight: 700, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 4, marginBottom: 6 }}>
                        {d.id} • {d.occupation}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, fontSize: '0.75rem' }}>
                        <div><span style={{ color: 'var(--text-dim)' }}>{xOption.label}:</span> <strong>{d.x} {xOption.unit}</strong></div>
                        <div><span style={{ color: 'var(--text-dim)' }}>{yOption.label}:</span> <strong>{d.y} {yOption.unit}</strong></div>
                        <div><span style={{ color: 'var(--text-dim)' }}>Debt Category:</span> <strong>{d.category}</strong></div>
                        <div><span style={{ color: 'var(--text-dim)' }}>Primary App:</span> <strong>{d.app}</strong></div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              name="Respondents"
              data={chartData}
              fill="#6366f1"
              fillOpacity={0.65}
              stroke="#818cf8"
              strokeWidth={0.8}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
