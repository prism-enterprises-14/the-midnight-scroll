import React, { useState } from 'react';
import type { SleepRecord } from '../types';
import { computePearson, computeSpearman, getCorrelationInterpretation } from '../dataService';
import { Info } from 'lucide-react';

interface CorrelationMatrixProps {
  records: SleepRecord[];
}

export const CorrelationMatrix: React.FC<CorrelationMatrixProps> = ({ records }) => {
  const variables: { key: keyof SleepRecord; label: string; short: string }[] = [
    { key: 'bedtime_phone_minutes', label: 'Bedtime Phone (min)', short: 'Phone Min' },
    { key: 'total_sleep_hours', label: 'Total Sleep (hrs)', short: 'Sleep Hrs' },
    { key: 'sleep_latency_min', label: 'Sleep Latency (min)', short: 'Latency' },
    { key: 'next_day_fatigue_score', label: 'Next-Day Fatigue', short: 'Fatigue' },
    { key: 'screen_brightness_pct', label: 'Screen Brightness (%)', short: 'Brightness' },
    { key: 'caffeine_post_5pm_mg', label: 'Caffeine Post-5pm (mg)', short: 'Caffeine' },
    { key: 'deep_sleep_pct', label: 'Deep Sleep (%)', short: 'Deep Sleep' },
    { key: 'morning_alarm_snoozes', label: 'Alarm Snoozes', short: 'Snoozes' }
  ];

  const [selectedPair, setSelectedPair] = useState<{
    var1: string;
    var2: string;
    r: number;
    spearmanR: number;
    n: number;
    interpretation: string;
  } | null>(null);

  // Compute 2D matrix
  const matrix: number[][] = [];
  const spearmanMatrix: number[][] = [];

  variables.forEach((v1, rIdx) => {
    matrix[rIdx] = [];
    spearmanMatrix[rIdx] = [];
    const arr1 = records.map(r => Number(r[v1.key]));

    variables.forEach((v2, cIdx) => {
      const arr2 = records.map(r => Number(r[v2.key]));
      const rVal = computePearson(arr1, arr2);
      const sVal = computeSpearman(arr1, arr2);
      matrix[rIdx][cIdx] = rVal;
      spearmanMatrix[rIdx][cIdx] = sVal;
    });
  });

  const getBgColor = (r: number) => {
    if (r === 1) return 'rgba(99, 102, 241, 0.4)';
    if (r > 0) {
      // Blue/Indigo scale
      const alpha = Math.min(0.85, Math.max(0.12, r));
      return `rgba(99, 102, 241, ${alpha})`;
    } else {
      // Rose/Crimson scale for negative
      const alpha = Math.min(0.85, Math.max(0.12, Math.abs(r)));
      return `rgba(244, 63, 94, ${alpha})`;
    }
  };

  const handleCellClick = (rIdx: number, cIdx: number) => {
    const v1 = variables[rIdx];
    const v2 = variables[cIdx];
    const r = matrix[rIdx][cIdx];
    const s = spearmanMatrix[rIdx][cIdx];
    setSelectedPair({
      var1: v1.label,
      var2: v2.label,
      r,
      spearmanR: s,
      n: records.length,
      interpretation: getCorrelationInterpretation(r)
    });
  };

  return (
    <div className="glass-panel" style={{ padding: 24, marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>
            Bivariate Correlation Heatmap
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Pearson correlation coefficient (r) calculated across {records.length.toLocaleString()} active records. Click any cell to inspect rank & linear statistics.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 12, height: 12, background: 'rgba(99, 102, 241, 0.8)', borderRadius: 2 }}></span> Positive
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 12, height: 12, background: 'rgba(244, 63, 94, 0.8)', borderRadius: 2 }}></span> Negative
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto', paddingBottom: 10 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-dim)', fontWeight: 600 }}>Variable</th>
              {variables.map(v => (
                <th key={v.key} style={{ padding: '8px 6px', color: 'var(--text-muted)', fontWeight: 600, minWidth: 70 }}>
                  {v.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variables.map((rowVar, rIdx) => (
              <tr key={rowVar.key} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {rowVar.label}
                </td>
                {variables.map((colVar, cIdx) => {
                  const r = matrix[rIdx][cIdx];
                  const isDiag = rIdx === cIdx;
                  return (
                    <td
                      key={colVar.key}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      style={{
                        padding: '10px 4px',
                        backgroundColor: getBgColor(r),
                        color: Math.abs(r) > 0.4 ? '#ffffff' : '#cbd5e1',
                        fontWeight: Math.abs(r) > 0.5 ? 700 : 500,
                        fontFamily: 'JetBrains Mono',
                        cursor: 'pointer',
                        transition: 'transform 0.1s ease',
                        border: '1px solid rgba(0,0,0,0.1)'
                      }}
                      title={`${rowVar.label} vs ${colVar.label}: r = ${r}`}
                    >
                      {isDiag ? '1.00' : (r > 0 ? `+${r.toFixed(2)}` : r.toFixed(2))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Pair Detail Box */}
      {selectedPair && (
        <div style={{ marginTop: 16, padding: '14px 18px', background: 'rgba(15, 23, 42, 0.75)', borderRadius: 10, border: '1px solid var(--border-focus)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#818cf8' }}><Info size={20} /></span>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>
                {selectedPair.var1} <span style={{ color: 'var(--text-dim)' }}>vs</span> {selectedPair.var2}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 2 }}>
                {selectedPair.interpretation} (Sample Size N = {selectedPair.n.toLocaleString()})
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontFamily: 'JetBrains Mono' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>PEARSON (r)</span>
              <strong style={{ fontSize: '1.125rem', color: selectedPair.r >= 0 ? '#818cf8' : '#fb7185' }}>
                {selectedPair.r >= 0 ? `+${selectedPair.r.toFixed(4)}` : selectedPair.r.toFixed(4)}
              </strong>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>SPEARMAN (ρ)</span>
              <strong style={{ fontSize: '1.125rem', color: selectedPair.spearmanR >= 0 ? '#38bdf8' : '#fb7185' }}>
                {selectedPair.spearmanR >= 0 ? `+${selectedPair.spearmanR.toFixed(4)}` : selectedPair.spearmanR.toFixed(4)}
              </strong>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>R-SQUARED (r²)</span>
              <strong style={{ fontSize: '1.125rem', color: '#fbbf24' }}>
                {(Math.pow(selectedPair.r, 2) * 100).toFixed(1)}%
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
