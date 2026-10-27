import React from 'react';
import type { TabId } from '../types';
import { Moon, Sparkles, RefreshCw, Printer, Download, ExternalLink, BarChart2, Compass, FileText, BookOpen, Database } from 'lucide-react';

interface HeaderProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onExportCSV: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  filteredCount,
  totalCount,
  hasActiveFilters,
  onResetFilters,
  onExportCSV
}) => {
  const navTabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart2 size={16} /> },
    { id: 'explore', label: 'Explore Data', icon: <Compass size={16} /> },
    { id: 'findings', label: 'Key Findings', icon: <FileText size={16} /> },
    { id: 'methodology', label: 'Methodology', icon: <BookOpen size={16} /> },
    { id: 'dataset', label: 'Dataset & Dictionary', icon: <Database size={16} /> }
  ];

  return (
    <header className="no-print" style={{ borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(180deg, #0d1424 0%, #090d16 100%)' }}>
      {/* Top Banner with Author Attribution & Metadata */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#818cf8', fontWeight: 600 }}>
            <Sparkles size={14} /> Academic Case Study
          </span>
          <span>•</span>
          <span>Dataset: <strong>Sleep Debt & Screen Time</strong></span>
          <span>•</span>
          <span>Author: <strong>Samar Talwar</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            href="https://www.kaggle.com/datasets/samartalwar/sleep-debt-and-screen-time-late-night-phone-habits"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--accent-cyan)', textDecoration: 'none' }}
          >
            Kaggle Source <ExternalLink size={12} />
          </a>
          <span style={{ color: 'var(--border-strong)' }}>|</span>
          <span style={{ color: '#94a3b8' }}>Verified Records: <strong style={{ color: '#fff' }}>8,500</strong></span>
        </div>
      </div>

      {/* Main Branding & Action Bar */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '20px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
          }}>
            <Moon size={26} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                The Midnight Scroll
              </h1>
              <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>Kaggle EDA</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 2 }}>
              An Exploratory Data Analysis of Bedtime Smartphone Use and Sleep Debt
            </p>
          </div>
        </div>

        {/* Global Filter Action Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="btn btn-danger"
              title="Reset all active data filters"
              style={{ fontSize: '0.8125rem' }}
            >
              <RefreshCw size={14} /> Reset Filters ({filteredCount}/{totalCount})
            </button>
          )}

          <button
            onClick={onExportCSV}
            className="btn btn-secondary"
            title="Download currently filtered rows as CSV"
            style={{ fontSize: '0.8125rem' }}
          >
            <Download size={14} /> Export Filtered CSV ({filteredCount})
          </button>

          <button
            onClick={() => window.print()}
            className="btn btn-secondary"
            title="Print or export clean academic report as PDF"
            style={{ fontSize: '0.8125rem' }}
          >
            <Printer size={14} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 28px' }}>
        <nav style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
          {navTabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 18px',
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #818cf8' : '3px solid transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ color: isActive ? '#818cf8' : 'var(--text-dim)' }}>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
