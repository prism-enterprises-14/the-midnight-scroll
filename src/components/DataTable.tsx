import React, { useState, useMemo } from 'react';
import type { SleepRecord } from '../types';
import { ArrowUpDown, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { exportFilteredToCSV } from '../dataService';

interface DataTableProps {
  records: SleepRecord[];
}

export const DataTable: React.FC<DataTableProps> = ({ records }) => {
  const [sortKey, setSortKey] = useState<keyof SleepRecord>('user_id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sorting
  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return sortOrder === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [records, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedRecords.length / pageSize) || 1;
  const pageIdx = Math.min(currentPage, totalPages);
  const startIdx = (pageIdx - 1) * pageSize;
  const currentRows = sortedRecords.slice(startIdx, startIdx + pageSize);

  const handleSort = (key: keyof SleepRecord) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getBadgeClass = (cat: string) => {
    if (cat === 'Optimal Recovery') return 'badge badge-optimal';
    if (cat === 'Mild Deficit') return 'badge badge-mild';
    if (cat === 'Moderate Debt') return 'badge badge-moderate';
    if (cat === 'Severe Sleep Debt') return 'badge badge-severe';
    return 'badge badge-neutral';
  };

  return (
    <div className="glass-panel" style={{ padding: 24, marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>
            Empirical Record Inspector
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Showing {records.length.toLocaleString()} records matching current filters. Click column headers to sort.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => exportFilteredToCSV(records)}
            className="btn btn-secondary"
            style={{ fontSize: '0.8125rem', padding: '6px 12px' }}
          >
            <Download size={14} /> Download Filtered CSV ({records.length})
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            <span>Page size:</span>
            <select
              className="form-select"
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ width: 'auto', padding: '4px 8px', fontSize: '0.8125rem' }}
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
          <thead style={{ background: 'rgba(15, 23, 42, 0.85)', borderBottom: '1px solid var(--border-strong)' }}>
            <tr>
              {[
                { key: 'user_id', label: 'User ID' },
                { key: 'age', label: 'Age' },
                { key: 'gender', label: 'Gender' },
                { key: 'occupation_type', label: 'Occupation' },
                { key: 'chronotype', label: 'Chronotype' },
                { key: 'bedtime_phone_minutes', label: 'Phone Min' },
                { key: 'primary_bedtime_app', label: 'Bedtime App' },
                { key: 'blue_light_filter_active', label: 'Blue Filter' },
                { key: 'caffeine_post_5pm_mg', label: 'Caffeine' },
                { key: 'sleep_latency_min', label: 'Latency' },
                { key: 'total_sleep_hours', label: 'Sleep Hrs' },
                { key: 'next_day_fatigue_score', label: 'Fatigue' },
                { key: 'sleep_debt_category', label: 'Sleep Debt Category' }
              ].map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key as keyof SleepRecord)}
                  style={{
                    padding: '10px 12px',
                    fontWeight: 600,
                    color: sortKey === col.key ? '#818cf8' : 'var(--text-muted)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {col.label}
                    <ArrowUpDown size={12} style={{ opacity: sortKey === col.key ? 1 : 0.3 }} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan={13} style={{ textAlign: 'center', padding: '36px 0', color: 'var(--text-dim)' }}>
                  No matching records found. Please adjust or reset your active filters.
                </td>
              </tr>
            ) : (
              currentRows.map((r, i) => (
                <tr
                  key={r.user_id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)'
                  }}
                >
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', color: '#fff' }}>{r.user_id}</td>
                  <td style={{ padding: '8px 12px' }}>{r.age}</td>
                  <td style={{ padding: '8px 12px' }}>{r.gender}</td>
                  <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>{r.occupation_type}</td>
                  <td style={{ padding: '8px 12px' }}>{r.chronotype}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', fontWeight: 600, color: r.bedtime_phone_minutes > 90 ? '#f43f5e' : '#fff' }}>
                    {r.bedtime_phone_minutes}m
                  </td>
                  <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>{r.primary_bedtime_app}</td>
                  <td style={{ padding: '8px 12px' }}>
                    {r.blue_light_filter_active === 1 ? (
                      <span style={{ color: '#34d399', fontSize: '0.75rem' }}>● On</span>
                    ) : (
                      <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>○ Off</span>
                    )}
                  </td>
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono' }}>{r.caffeine_post_5pm_mg} mg</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono' }}>{r.sleep_latency_min}m</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', fontWeight: 700, color: r.total_sleep_hours < 5.0 ? '#f43f5e' : '#22d3ee' }}>
                    {r.total_sleep_hours}h
                  </td>
                  <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono', fontWeight: 700, color: r.next_day_fatigue_score >= 7.0 ? '#f43f5e' : '#fbbf24' }}>
                    {r.next_day_fatigue_score}
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <span className={getBadgeClass(r.sleep_debt_category)}>
                      {r.sleep_debt_category}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, flexWrap: 'wrap', gap: 10, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
        <div>
          Showing row <strong>{records.length > 0 ? startIdx + 1 : 0}</strong> to <strong>{Math.min(startIdx + pageSize, records.length)}</strong> of <strong>{records.length.toLocaleString()}</strong> records
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-secondary"
            style={{ padding: '4px 8px', opacity: currentPage === 1 ? 0.4 : 1 }}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <span style={{ padding: '0 8px', fontFamily: 'JetBrains Mono' }}>
            Page {pageIdx} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className="btn btn-secondary"
            style={{ padding: '4px 8px', opacity: currentPage >= totalPages ? 0.4 : 1 }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
