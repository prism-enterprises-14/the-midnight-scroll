import React from 'react';
import { DATA_DICTIONARY, DATASET_PROVENANCE, exportFilteredToCSV } from '../dataService';
import type { SleepRecord } from '../types';
import { Database, Download, CheckCircle, ExternalLink } from 'lucide-react';

interface DatasetPageProps {
  records: SleepRecord[];
}

export const DatasetPage: React.FC<DatasetPageProps> = ({ records }) => {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '28px 32px', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#818cf8', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
              <Database size={16} /> Data Architecture & Catalog
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>
              Complete Data Dictionary (18 Attributes)
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Comprehensive schema catalog for the 8,500 observation dataset supplied by Samar Talwar.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => exportFilteredToCSV(records, 'bedtime_screentime_sleep_debt_full.csv')}
              className="btn btn-primary"
              style={{ fontSize: '0.8125rem' }}
            >
              <Download size={14} /> Download CSV ({records.length.toLocaleString()} Rows)
            </button>
            <a
              href={DATASET_PROVENANCE.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: '0.8125rem' }}
            >
              Kaggle Source <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Quick Schema Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 22 }}>
          <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Total Rows</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: 'JetBrains Mono' }}>8,500</div>
          </div>
          <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Total Columns</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#818cf8', fontFamily: 'JetBrains Mono' }}>18 Columns</div>
          </div>
          <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Missing Cells</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', fontFamily: 'JetBrains Mono' }}>0 Nulls</div>
          </div>
          <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Duplicate Rows</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', fontFamily: 'JetBrains Mono' }}>0 Duplicates</div>
          </div>
        </div>
      </div>

      {/* Data Dictionary Table */}
      <div className="glass-panel" style={{ padding: 24, marginBottom: 32 }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
          Attribute Specifications & Metadata
        </h3>

        <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 8 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
            <thead style={{ background: 'rgba(15, 23, 42, 0.85)', borderBottom: '1px solid var(--border-strong)' }}>
              <tr>
                <th style={{ padding: '10px 14px' }}>#</th>
                <th style={{ padding: '10px 14px' }}>Column Identifier</th>
                <th style={{ padding: '10px 14px' }}>Data Type</th>
                <th style={{ padding: '10px 14px' }}>Measurement Unit</th>
                <th style={{ padding: '10px 14px' }}>Completeness</th>
                <th style={{ padding: '10px 14px' }}>Operational Description</th>
              </tr>
            </thead>
            <tbody>
              {DATA_DICTIONARY.map((d, idx) => (
                <tr key={d.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '10px 14px', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono' }}>
                    {idx + 1}
                  </td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#818cf8' }}>
                    {d.name}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: '0.7rem',
                      fontFamily: 'JetBrains Mono',
                      background: d.type === 'numeric' || d.type === 'integer' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(167, 139, 250, 0.15)',
                      color: d.type === 'numeric' || d.type === 'integer' ? '#22d3ee' : '#c084fc'
                    }}>
                      {d.type}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>
                    {d.unit}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#34d399', fontSize: '0.75rem', fontWeight: 600 }}>
                      <CheckCircle size={12} /> 100% (0 nulls)
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {d.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
