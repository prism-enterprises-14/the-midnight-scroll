import { useState, useEffect, useMemo } from 'react';
import type { SleepRecord, FilterState, TabId, DataQualityReport } from './types';
import { fetchDataset, applyFilters, INITIAL_FILTERS, exportFilteredToCSV } from './dataService';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { OverviewPage } from './pages/OverviewPage';
import { ExplorePage } from './pages/ExplorePage';
import { FindingsPage } from './pages/FindingsPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { DatasetPage } from './pages/DatasetPage';
import { AlertCircle, RefreshCw, Moon, Sparkles, ExternalLink } from 'lucide-react';

export function App() {
  const [allRecords, setAllRecords] = useState<SleepRecord[]>([]);
  const [, setQuality] = useState<DataQualityReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Load the dataset on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDataset();
      setAllRecords(data.records);
      setQuality(data.quality);
    } catch (err: any) {
      console.error('Failed to load dataset:', err);
      setError(err.message || 'Failed to load bedtime_screentime_sleep_debt.csv');
    } finally {
      setLoading(false);
    }
  };

  // Compute filtered records reactively
  const filteredRecords = useMemo(() => {
    return applyFilters(allRecords, filters);
  }, [allRecords, filters]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.gender !== 'all' ||
      filters.occupation_type !== 'all' ||
      filters.chronotype !== 'all' ||
      filters.primary_bedtime_app !== 'all' ||
      filters.blue_light_filter_active !== 'all' ||
      filters.sleep_debt_category !== 'all' ||
      filters.phone_usage_tier !== 'all' ||
      filters.searchQuery.trim().length > 0
    );
  }, [filters]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleExportCSV = () => {
    exportFilteredToCSV(filteredRecords, `midnight_scroll_export_${filteredRecords.length}_records.csv`);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{
          width: 54,
          height: 54,
          borderRadius: 14,
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 24px rgba(99, 102, 241, 0.5)',
          marginBottom: 18,
          animation: 'pulse 1.8s infinite ease-in-out'
        }}>
          <Moon size={28} color="#fff" />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>
          Parsing The Midnight Scroll Dataset...
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Ingesting 8,500 real survey records & computing bivariate correlation vectors
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div className="glass-panel" style={{ maxWidth: 520, padding: 32, textAlign: 'center', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
          <AlertCircle size={40} color="#f43f5e" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 10 }}>
            Unable to Load Dataset File
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>
            {error}. Ensure that <code className="font-mono" style={{ background: '#0f172a', padding: '2px 6px', borderRadius: 4 }}>bedtime_screentime_sleep_debt.csv</code> is located in the project's public folder.
          </p>
          <button onClick={loadData} className="btn btn-primary" style={{ margin: '0 auto' }}>
            <RefreshCw size={14} /> Retry Loading Dataset
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredCount={filteredRecords.length}
        totalCount={allRecords.length}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleResetFilters}
        onExportCSV={handleExportCSV}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Render Filter Bar on Overview and Explore Data tabs */}
        {(activeTab === 'overview' || activeTab === 'explore') && (
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            totalCount={allRecords.length}
            filteredCount={filteredRecords.length}
            onReset={handleResetFilters}
          />
        )}

        {/* Dynamic Tab Switcher */}
        {activeTab === 'overview' && (
          <OverviewPage
            filteredRecords={filteredRecords}
            totalRecordsCount={allRecords.length}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            records={filteredRecords}
            allRecords={allRecords}
          />
        )}

        {activeTab === 'findings' && (
          <FindingsPage
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'methodology' && (
          <MethodologyPage />
        )}

        {activeTab === 'dataset' && (
          <DatasetPage records={allRecords} />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print" style={{ borderTop: '1px solid var(--border-subtle)', background: '#070a12', padding: '24px 28px', marginTop: 'auto', fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={14} color="#818cf8" />
            <span style={{ color: 'var(--text-muted)' }}>The Midnight Scroll: College Case Study Demonstration</span>
            <span>•</span>
            <span>Data Author: <strong>Samar Talwar</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="https://www.kaggle.com/datasets/samartalwar/sleep-debt-and-screen-time-late-night-phone-habits"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-cyan)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
            >
              Kaggle Repository <ExternalLink size={12} />
            </a>
            <span>•</span>
            <span>Educational Research Only (Not Medical Diagnosis)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
