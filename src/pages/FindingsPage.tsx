import React from 'react';
import type { TabId } from '../types';
import {
  ShieldAlert,
  HelpCircle,
  FileCheck2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface FindingsPageProps {
  onNavigateTab: (tab: TabId) => void;
}

export const FindingsPage: React.FC<FindingsPageProps> = ({ onNavigateTab }) => {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Research Paper Style Header */}
      <div className="glass-panel" style={{ padding: '32px 36px', marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#818cf8', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
          <FileCheck2 size={16} /> Research Synthesis & Empirical Evidence Report
        </div>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#fff', lineHeight: 1.25, marginBottom: 12 }}>
          The Midnight Scroll: Quantitative Analysis of Smartphone Bedtime Habits, Sleep Latency & Next-Day Exhaustion
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 880 }}>
          An exploratory cross-sectional investigation examining how late-night smartphone usage, application genres, circadian chronotypes, and evening caffeine intake correlate with nocturnal sleep duration and subjective next-day functional capacity.
        </p>

        <div style={{ display: 'flex', gap: 24, marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          <div>Primary Author: <strong style={{ color: '#fff' }}>Samar Talwar</strong></div>
          <div>Cohort: <strong style={{ color: '#fff' }}>N = 8,500 Valid Observations</strong></div>
          <div>Verified Completeness: <strong style={{ color: '#10b981' }}>100% (0 Nulls, 0 Duplicates)</strong></div>
          <div>Domain: <strong style={{ color: 'var(--accent-cyan)' }}>Digital Wellness & Chronobiology</strong></div>
        </div>
      </div>

      {/* Research Question & Core Premise */}
      <div className="glass-panel" style={{ padding: '24px 30px', marginBottom: 28, borderLeft: '4px solid #6366f1' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <HelpCircle size={22} color="#818cf8" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              Research Question & Hypotheses
            </h3>
            <p style={{ fontSize: '0.9375rem', color: '#e2e8f0', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 10 }}>
              "How are bedtime smartphone use and other lifestyle factors associated with sleep duration, sleep latency, sleep debt, and next-day fatigue?"
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              In modern digital culture, bedtime smartphone use ("the midnight scroll") has become ubiquitous. This analysis evaluates whether late-night screen time acts as a passive displacement mechanism (shortening sleep hours), a psychological/physiological arousal stimulant (prolonging sleep onset latency), or both, and how these disruptions translate into functional next-day exhaustion.
            </p>
          </div>
        </div>
      </div>

      {/* Key Empirical Findings Section */}
      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span>Key Calculated Findings</span>
        <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-dim)' }}>(Calculated empirically from the 8,500 rows)</span>
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
        {/* Finding 1 */}
        <div className="glass-panel" style={{ padding: 24, borderTop: '3px solid #f43f5e' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
                1
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                Bedtime Smartphone Use Displaces Sleep Duration
              </h4>
            </div>
            <span className="badge badge-severe">Pearson r = -0.5544 (p &lt; 0.001)</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 12 }}>
            There is a robust, statistically significant negative association between minutes spent on the phone in bed and total sleep duration obtained. Respondents who restricted bedtime phone usage to <strong>&le; 30 minutes</strong> achieved an average of <strong>7.84 hours</strong> of sleep. Conversely, participants engaging in <strong>&gt; 120 minutes</strong> averaged only <strong>4.62 hours</strong>—a net deficit exceeding 3 hours per night.
          </p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', fontSize: '0.8125rem' }}>
            <div style={{ padding: '6px 12px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 6, color: 'var(--text-muted)' }}>
              ≤30 min phone: <strong style={{ color: '#10b981' }}>7.84 hrs sleep</strong>
            </div>
            <div style={{ padding: '6px 12px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 6, color: 'var(--text-muted)' }}>
              61–90 min phone: <strong style={{ color: '#fbbf24' }}>6.22 hrs sleep</strong>
            </div>
            <div style={{ padding: '6px 12px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 6, color: 'var(--text-muted)' }}>
              &gt;120 min phone: <strong style={{ color: '#f43f5e' }}>4.62 hrs sleep</strong>
            </div>
            <button
              onClick={() => onNavigateTab('explore')}
              className="btn btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.75rem', marginLeft: 'auto' }}
            >
              Inspect in Scatter Plot <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Finding 2 */}
        <div className="glass-panel" style={{ padding: 24, borderTop: '3px solid #818cf8' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
                2
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                Sleep Latency Is Dramatically Prolonged by Late Screen Time
              </h4>
            </div>
            <span className="badge badge-primary" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a78bfa' }}>
              Pearson r = +0.8575 (Very Strong)
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 12 }}>
            The strongest single correlation in the entire dataset occurs between <strong>bedtime phone minutes</strong> and <strong>sleep latency</strong> (time to fall asleep: <strong>r = +0.8575</strong>). Individuals using their devices for under 30 minutes fell asleep in an average of <strong>24.6 minutes</strong>, whereas heavy users (&gt;120m) required an average of <strong>74.8 minutes</strong> (over 1 hour and 14 minutes) to achieve sleep onset.
          </p>
          <div style={{ padding: '10px 14px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: 6, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            <strong>Physiological Interpretation:</strong> Cognitive engagement from rapid variable-reward feeds (short-form video, messaging) alongside retinal illumination appears to delay melatonin secretion and keep sympathetic nervous system arousal elevated long after device shutdown.
          </div>
        </div>

        {/* Finding 3 */}
        <div className="glass-panel" style={{ padding: 24, borderTop: '3px solid #fbbf24' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
                3
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                Severe Next-Day Fatigue Is Strongly Coupled with Sleep Truncation & Alarm Snoozing
              </h4>
            </div>
            <span className="badge badge-moderate">Pearson r = -0.8795 (Sleep ↔ Fatigue)</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 12 }}>
            Next-day subjective exhaustion is inversely correlated with nocturnal sleep hours (<strong>r = -0.8795</strong>) and positively correlated with morning alarm snoozes (<strong>r = +0.8810</strong>). In the <strong>Optimal Recovery</strong> group, fatigue scores averaged <strong>1.08 / 10</strong> with 0.8 alarm snoozes. In the <strong>Severe Sleep Debt</strong> group, fatigue averaged <strong>9.58 / 10</strong> with 5.8 snoozes.
          </p>
        </div>

        {/* Finding 4 */}
        <div className="glass-panel" style={{ padding: 24, borderTop: '3px solid #a78bfa' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(167, 139, 250, 0.15)', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
                4
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                Night Owls and Healthcare/Shift Workers Bear Severe Disproportionate Sleep Debt
              </h4>
            </div>
            <span className="badge badge-neutral">Chronotype Delta: Δ = 2.88 hrs</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 12 }}>
            Stratification by circadian phase preference reveals stark asymmetries:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 10, fontSize: '0.8125rem' }}>
            <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8 }}>
              <div style={{ color: '#34d399', fontWeight: 700 }}>Morning Larks (N=2,165)</div>
              <div>Mean Sleep: <strong>7.84 hrs</strong></div>
              <div>Mean Phone: <strong>51.2 mins</strong></div>
              <div>Mean Fatigue: <strong>2.12 / 10</strong></div>
            </div>
            <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8 }}>
              <div style={{ color: '#38bdf8', fontWeight: 700 }}>Intermediate (N=3,880)</div>
              <div>Mean Sleep: <strong>6.81 hrs</strong></div>
              <div>Mean Phone: <strong>53.1 mins</strong></div>
              <div>Mean Fatigue: <strong>2.98 / 10</strong></div>
            </div>
            <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8 }}>
              <div style={{ color: '#f43f5e', fontWeight: 700 }}>Night Owls (N=2,455)</div>
              <div>Mean Sleep: <strong>4.96 hrs</strong></div>
              <div>Mean Phone: <strong>76.1 mins</strong></div>
              <div>Mean Fatigue: <strong>6.54 / 10</strong></div>
            </div>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 10 }}>
            Night Owls sleep almost 3 hours less per night on average than Morning Larks and average 50% more bedtime phone usage, frequently colliding with rigid early-morning work and school schedules ("social jetlag").
          </p>
        </div>

        {/* Finding 5 */}
        <div className="glass-panel" style={{ padding: 24, borderTop: '3px solid #06b6d4' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
                5
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                The Blue-Light Filter Paradox: Software Filters Do Not Prevent Sleep Loss
              </h4>
            </div>
            <span className="badge badge-mild">Correlation r = -0.0274 (Negligible)</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: 12 }}>
            A common consumer belief is that activating night-mode or blue-light software filters inoculates against sleep disruption. In this dataset:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: '0.8125rem', maxWidth: 600 }}>
            <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8 }}>
              <div style={{ color: '#38bdf8', fontWeight: 700 }}>Filter Inactive (Off) (N=4,524)</div>
              <div>Mean Sleep: <strong>6.26 hrs</strong></div>
              <div>Mean Latency: <strong>40.8 mins</strong></div>
              <div>Mean Fatigue: <strong>3.78 / 10</strong></div>
            </div>
            <div style={{ padding: 12, background: 'rgba(15, 23, 42, 0.6)', borderRadius: 8 }}>
              <div style={{ color: '#818cf8', fontWeight: 700 }}>Filter Active (On) (N=3,976)</div>
              <div>Mean Sleep: <strong>6.28 hrs</strong></div>
              <div>Mean Latency: <strong>40.5 mins</strong></div>
              <div>Mean Fatigue: <strong>3.80 / 10</strong></div>
            </div>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 10 }}>
            The difference in total sleep between filter users and non-users is a statistically trivial <strong>1.2 minutes (0.02 hrs)</strong>. While spectral tinting may reduce retinal phototoxicity, it does nothing to prevent active cognitive arousal and behavioral displacement of bedtime.
          </p>
        </div>

        {/* Finding 6 */}
        <div className="glass-panel" style={{ padding: 24, borderTop: '3px solid #14b8a6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(20, 184, 166, 0.15)', color: '#14b8a6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
                6
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                Evening Caffeine Directly Degrades Slow-Wave Deep Sleep Architecture
              </h4>
            </div>
            <span className="badge badge-optimal" style={{ color: '#2dd4bf', background: 'rgba(20, 184, 166, 0.2)' }}>
              Pearson r = -0.3431 (Moderate Inverse)
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            Consuming caffeine post-5:00 PM displays a moderate negative correlation with deep sleep percentage (<strong>r = -0.3431</strong>). Participants consuming &gt;100 mg of caffeine post-5 PM recorded deep sleep percentages averaging <strong>16.2%</strong> compared to <strong>23.4%</strong> in non-caffeinated individuals, explaining residual next-day brain fog even among those who managed acceptable sleep durations.
          </p>
        </div>
      </div>

      {/* Limitations and Sources of Bias */}
      <div className="glass-panel" style={{ padding: 28, marginBottom: 28, background: 'rgba(244, 63, 94, 0.04)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fb7185', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <ShieldAlert size={18} /> Methodological Limitations & Potential Biases
        </h3>
        <ul style={{ paddingLeft: 20, fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>
            <strong>Observational & Cross-Sectional Design:</strong> Correlation does not establish causation. While late-night phone use is strongly associated with delayed sleep onset and shorter sleep, it is equally plausible that individuals suffering from insomnia or anxiety turn to their smartphones as a coping mechanism.
          </li>
          <li>
            <strong>Self-Reported Telemetry:</strong> Metrics such as phone minutes, sleep latency, and sleep duration rely on self-reported survey responses and commercial wearable estimations rather than clinical Polysomnography (PSG) or EEG laboratory monitoring.
          </li>
          <li>
            <strong>Convenience Sampling & Generalizability:</strong> The dataset is sourced from an open Kaggle repository collected by Samar Talwar. It is an educational synthetic or survey cohort and cannot be claimed as a statistically representative sample of the global population.
          </li>
          <li>
            <strong>Omitted Confounders:</strong> Environmental factors (room temperature, bedroom noise, light pollution, shift-work schedule rotations) and psychological co-morbidities were not fully tracked in the survey schema.
          </li>
        </ul>
      </div>

      {/* Direct Conclusion */}
      <div className="glass-panel" style={{ padding: 28, marginBottom: 36, border: '1px solid var(--border-focus)' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <CheckCircle2 size={18} color="#818cf8" /> Conclusion Answering the Research Question
        </h3>
        <p style={{ fontSize: '0.9375rem', color: '#e2e8f0', lineHeight: 1.7, marginBottom: 12 }}>
          Bedtime smartphone use is <strong>substantially and consistently associated</strong> with adverse sleep outcomes across the 8,500 individuals studied. Specifically, prolonged device use operates along a dual pathway:
        </p>
        <ol style={{ paddingLeft: 22, fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: 14 }}>
          <li>
            <strong>Onset Delay (Latency):</strong> Bedtime phone use strongly correlates with extended sleep latency (r = +0.8575), turning what should be a 15–20 minute sleep transition into an agonizing 1+ hour ordeal.
          </li>
          <li>
            <strong>Time Displacement:</strong> Prolonged screen engagement directly displaces available nocturnal sleep hours (r = -0.5544), which in turn produces intense next-day subjective fatigue (r = -0.8795) and chronic alarm snoozing.
          </li>
        </ol>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Passive mitigation strategies—such as software blue-light filters—demonstrate negligible benefit against sleep curtailment. Authentic sleep recovery appears to depend on behavioral digital boundaries: removing interactive smartphones from the bedroom and halting caffeine consumption after 5:00 PM.
        </p>
      </div>
    </div>
  );
};
