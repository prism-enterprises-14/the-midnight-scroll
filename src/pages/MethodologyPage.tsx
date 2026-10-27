import React from 'react';
import { DATASET_PROVENANCE } from '../dataService';
import { ExternalLink, BookOpen, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';

export const MethodologyPage: React.FC = () => {
  return (
    <div style={{ maxWidth: 1040, margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '28px 32px', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#818cf8', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
          <BookOpen size={16} /> Technical Documentation & Statistical Methodology
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
          Analysis Framework & Provenance
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          This page outlines the computational procedures, data cleaning audits, statistical formulas, and verification checks implemented across the application.
        </p>
      </div>

      {/* Provenance & Citation Card */}
      <div className="glass-panel" style={{ padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldCheck size={18} color="#34d399" /> Dataset Provenance & Attribution
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, fontSize: '0.8125rem' }}>
          <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8 }}>
            <div style={{ color: 'var(--text-dim)' }}>Dataset Name</div>
            <div style={{ fontWeight: 700, color: '#fff', marginTop: 2 }}>{DATASET_PROVENANCE.title}</div>
          </div>
          <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8 }}>
            <div style={{ color: 'var(--text-dim)' }}>Author / Contributor</div>
            <div style={{ fontWeight: 700, color: '#fff', marginTop: 2 }}>{DATASET_PROVENANCE.author}</div>
          </div>
          <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8 }}>
            <div style={{ color: 'var(--text-dim)' }}>Kaggle Source Repository</div>
            <a
              href={DATASET_PROVENANCE.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 2, textDecoration: 'none', fontWeight: 600 }}
            >
              Kaggle Dataset Page <ExternalLink size={12} />
            </a>
          </div>
          <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8 }}>
            <div style={{ color: 'var(--text-dim)' }}>Kaggle License Verification</div>
            <div style={{ fontWeight: 600, color: '#fbbf24', marginTop: 2 }}>
              Open Database / Community License (Check Kaggle source for commercial restrictions)
            </div>
          </div>
        </div>
      </div>

      {/* Data Cleaning Decisions & Quality Audit */}
      <div className="glass-panel" style={{ padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Cpu size={18} color="#818cf8" /> Data Cleaning Decisions & Quality Audit
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 14 }}>
          Upon project initialization, an exhaustive automated data integrity scan was conducted across the source file (<span className="font-mono" style={{ color: '#818cf8' }}>bedtime_screentime_sleep_debt.csv</span>):
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
          <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8, borderLeft: '3px solid #10b981' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Total Records Ingested</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: 'JetBrains Mono' }}>8,500</div>
            <div style={{ fontSize: '0.7rem', color: '#34d399' }}>100% matched expected schema</div>
          </div>
          <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8, borderLeft: '3px solid #10b981' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Missing / Null Values</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: 'JetBrains Mono' }}>0 (0.00%)</div>
            <div style={{ fontSize: '0.7rem', color: '#34d399' }}>Full record completeness</div>
          </div>
          <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8, borderLeft: '3px solid #10b981' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Duplicate User IDs</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: 'JetBrains Mono' }}>0 (0.00%)</div>
            <div style={{ fontSize: '0.7rem', color: '#34d399' }}>Unique respondent IDs</div>
          </div>
          <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8, borderLeft: '3px solid #10b981' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Outlier / Malformed Values</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: 'JetBrains Mono' }}>0 Identified</div>
            <div style={{ fontSize: '0.7rem', color: '#34d399' }}>Numeric bounds verified</div>
          </div>
        </div>

        <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          <strong>Cleaning Exclusions:</strong> Because the dataset exhibited 100% field completeness, zero row-level exclusions or synthetic imputation techniques were applied. All calculations presented in the dashboard derive strictly from verifiable, deterministic arithmetic operations.
        </div>
      </div>

      {/* Statistical Methodology & Metric Definitions */}
      <div className="glass-panel" style={{ padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: 14 }}>
          Statistical Methodology & Metric Definitions
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#22d3ee', marginBottom: 4 }}>
              1. Pearson Product-Moment Correlation (r)
            </h4>
            <p style={{ fontSize: '0.8125rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              Measures linear dependence between two continuous variables on a scale from -1.0 to +1.0:
              <br />
              <code style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: 4, display: 'inline-block', margin: '4px 0' }}>
                r = Σ((X - x̄)(Y - ȳ)) / [ √Σ(X - x̄)² * √Σ(Y - ȳ)² ]
              </code>
              <br />
              <strong>Assumption & Limitation:</strong> Assumes bivariate normality and linearity. Does not capture non-linear quadratic or threshold relationships without transformation.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#a78bfa', marginBottom: 4 }}>
              2. Spearman Rank Correlation (ρ)
            </h4>
            <p style={{ fontSize: '0.8125rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              Non-parametric monotonic association based on ranked values. Useful for checking robustness against monotonic non-linear distortions or skewed distributions (e.g. caffeine consumption).
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fbbf24', marginBottom: 4 }}>
              3. Sleep Debt Tiers (Author Binned)
            </h4>
            <ul style={{ paddingLeft: 20, fontSize: '0.8125rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              <li><strong>Optimal Recovery:</strong> Mean sleep ~8.35 hrs; minimal phone use (mean 33.5m); negligible next-day fatigue (~1.08).</li>
              <li><strong>Mild Deficit:</strong> Mean sleep ~7.23 hrs; moderate phone use (mean 45.5m); mild tiredness (~1.83).</li>
              <li><strong>Moderate Debt:</strong> Mean sleep ~5.55 hrs; substantial bedtime phone use (mean 64.1m); noticeable fatigue (~4.68).</li>
              <li><strong>Severe Sleep Debt:</strong> Mean sleep ~3.76 hrs; heavy bedtime phone use (mean 123.6m); severe exhaustion (~9.58).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Educational & Academic Disclaimer */}
      <div className="glass-panel" style={{ padding: 24, marginBottom: 32, background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <AlertTriangle size={18} /> Educational Demonstration Disclaimer
        </h3>
        <p style={{ fontSize: '0.8125rem', color: '#e2e8f0', lineHeight: 1.6 }}>
          This software application was constructed strictly for an exploratory college data analysis case study demonstration. It is designed to illustrate statistical visualization techniques, responsive dashboard architecture, and bivariate exploratory analysis. It is <strong>NOT a medical diagnostic device, clinical tool, or clinical prescription</strong> for sleep disorders. Individuals suffering from chronic insomnia or sleep apnea should consult certified sleep medicine physicians.
        </p>
      </div>
    </div>
  );
};
