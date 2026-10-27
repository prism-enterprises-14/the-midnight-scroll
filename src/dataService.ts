import Papa from 'papaparse';
import type { SleepRecord, FilterState, NumericSummary, CategoryMetric, CorrelationResult, DataQualityReport } from './types';

export const INITIAL_FILTERS: FilterState = {
  gender: 'all',
  occupation_type: 'all',
  chronotype: 'all',
  primary_bedtime_app: 'all',
  blue_light_filter_active: 'all',
  sleep_debt_category: 'all',
  phone_usage_tier: 'all',
  searchQuery: ''
};

export const DATASET_PROVENANCE = {
  title: 'Sleep Debt & Screen Time: Late Night Phone Habits',
  author: 'Samar Talwar',
  sourceUrl: 'https://www.kaggle.com/datasets/samartalwar/sleep-debt-and-screen-time-late-night-phone-habits',
  kaggleLicense: 'Community / Open Source (Kaggle Verified Dataset)',
  csvFilename: 'bedtime_screentime_sleep_debt.csv',
  verifiedRows: 8500,
  verifiedCols: 18,
  collectionContext: 'Self-reported observational digital wellness & sleep survey',
  targetDomain: 'Exploratory Lifestyle & Sleep Health EDA'
};

export const DATA_DICTIONARY = [
  { name: 'user_id', type: 'string', unit: 'ID code', description: 'Unique respondent anonymized identifier (USR-00001 to USR-08500)', missing: 0 },
  { name: 'age', type: 'integer', unit: 'years', description: 'Age of participant (range 18–65)', missing: 0 },
  { name: 'gender', type: 'categorical', unit: 'Female, Male, Non-Binary', description: 'Self-identified gender of participant', missing: 0 },
  { name: 'occupation_type', type: 'categorical', unit: '5 types', description: 'Work environment: Corporate 9-to-5, Remote Tech, Student, Healthcare / Shift Worker, Freelance / Creative', missing: 0 },
  { name: 'chronotype', type: 'categorical', unit: '3 classes', description: 'Circadian phase preference: Morning Lark, Intermediate, Night Owl', missing: 0 },
  { name: 'bedtime_phone_minutes', type: 'integer', unit: 'minutes', description: 'Minutes spent actively using smartphone in bed prior to attempting sleep', missing: 0 },
  { name: 'primary_bedtime_app', type: 'categorical', unit: '6 app classes', description: 'Dominant app category: TikTok / Reels, YouTube, Instagram / Reddit, Streaming, Messaging, News', missing: 0 },
  { name: 'screen_brightness_pct', type: 'integer', unit: 'percentage (%)', description: 'Average display brightness level setting (10% to 100%)', missing: 0 },
  { name: 'blue_light_filter_active', type: 'binary', unit: '0 = Off, 1 = On', description: 'Whether Night Shift / Night Light / Blue-light software filter was engaged', missing: 0 },
  { name: 'caffeine_post_5pm_mg', type: 'integer', unit: 'milligrams (mg)', description: 'Estimated caffeine consumed after 5:00 PM (e.g. espresso, tea, energy drinks)', missing: 0 },
  { name: 'physical_activity_min', type: 'integer', unit: 'minutes/day', description: 'Daily moderate-to-vigorous physical exercise duration', missing: 0 },
  { name: 'sleep_latency_min', type: 'numeric', unit: 'minutes', description: 'Time taken to transition from full wakefulness to sleep onset (measured or self-reported)', missing: 0 },
  { name: 'total_sleep_hours', type: 'numeric', unit: 'hours', description: 'Total nocturnal sleep duration obtained', missing: 0 },
  { name: 'deep_sleep_pct', type: 'numeric', unit: 'percentage (%)', description: 'Estimated proportion of sleep spent in slow-wave / deep NREM sleep', missing: 0 },
  { name: 'rem_sleep_pct', type: 'numeric', unit: 'percentage (%)', description: 'Estimated proportion of sleep spent in Rapid Eye Movement (REM) sleep', missing: 0 },
  { name: 'morning_alarm_snoozes', type: 'integer', unit: 'count', description: 'Number of times morning alarm was snoozed before rising', missing: 0 },
  { name: 'next_day_fatigue_score', type: 'numeric', unit: 'scale 1.0–10.0', description: 'Subjective self-assessed fatigue & daytime tiredness score (10 = severe exhaustion)', missing: 0 },
  { name: 'sleep_debt_category', type: 'categorical', unit: '4 categories', description: 'Categorized deficit tier: Optimal Recovery, Mild Deficit, Moderate Debt, Severe Sleep Debt', missing: 0 }
];

export async function fetchDataset(): Promise<{ records: SleepRecord[]; quality: DataQualityReport }> {
  const response = await fetch('/bedtime_screentime_sleep_debt.csv');
  if (!response.ok) {
    throw new Error(`Failed to load CSV: ${response.status} ${response.statusText}`);
  }
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<any>(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data;
        const validRecords: SleepRecord[] = [];
        let missingCount = 0;
        const idSet = new Set<string>();
        let dupCount = 0;

        for (let i = 0; i < rawData.length; i++) {
          const r = rawData[i];
          if (!r.user_id) continue;

          if (idSet.has(r.user_id)) {
            dupCount++;
          }
          idSet.add(r.user_id);

          // Check for any missing values across required attributes
          if (
            r.age === null || r.age === undefined ||
            r.total_sleep_hours === null || r.total_sleep_hours === undefined ||
            r.bedtime_phone_minutes === null || r.bedtime_phone_minutes === undefined
          ) {
            missingCount++;
            continue;
          }

          validRecords.push({
            user_id: String(r.user_id),
            age: Number(r.age),
            gender: String(r.gender || 'Unknown'),
            occupation_type: String(r.occupation_type || 'Unknown'),
            chronotype: String(r.chronotype || 'Unknown'),
            bedtime_phone_minutes: Number(r.bedtime_phone_minutes),
            primary_bedtime_app: String(r.primary_bedtime_app || 'Unknown'),
            screen_brightness_pct: Number(r.screen_brightness_pct),
            blue_light_filter_active: Number(r.blue_light_filter_active),
            caffeine_post_5pm_mg: Number(r.caffeine_post_5pm_mg),
            physical_activity_min: Number(r.physical_activity_min),
            sleep_latency_min: Number(r.sleep_latency_min),
            total_sleep_hours: Number(r.total_sleep_hours),
            deep_sleep_pct: Number(r.deep_sleep_pct),
            rem_sleep_pct: Number(r.rem_sleep_pct),
            morning_alarm_snoozes: Number(r.morning_alarm_snoozes),
            next_day_fatigue_score: Number(r.next_day_fatigue_score),
            sleep_debt_category: String(r.sleep_debt_category || 'Unknown')
          });
        }

        const quality: DataQualityReport = {
          totalRows: rawData.length,
          validRows: validRecords.length,
          columnCount: results.meta.fields?.length || 18,
          missingValuesCount: missingCount,
          duplicatesCount: dupCount,
          columnsList: results.meta.fields || DATA_DICTIONARY.map(d => d.name),
          fileSizeFormatted: `${(csvText.length / 1024).toFixed(1)} KB`
        };

        resolve({ records: validRecords, quality });
      },
      error: (err: any) => reject(err)
    });
  });
}

export function applyFilters(records: SleepRecord[], filters: FilterState): SleepRecord[] {
  return records.filter(r => {
    if (filters.gender !== 'all' && r.gender !== filters.gender) return false;
    if (filters.occupation_type !== 'all' && r.occupation_type !== filters.occupation_type) return false;
    if (filters.chronotype !== 'all' && r.chronotype !== filters.chronotype) return false;
    if (filters.primary_bedtime_app !== 'all' && r.primary_bedtime_app !== filters.primary_bedtime_app) return false;
    if (filters.sleep_debt_category !== 'all' && r.sleep_debt_category !== filters.sleep_debt_category) return false;

    if (filters.blue_light_filter_active !== 'all') {
      const target = Number(filters.blue_light_filter_active);
      if (r.blue_light_filter_active !== target) return false;
    }

    if (filters.phone_usage_tier !== 'all') {
      const mins = r.bedtime_phone_minutes;
      if (filters.phone_usage_tier === '0-30' && (mins < 0 || mins > 30)) return false;
      if (filters.phone_usage_tier === '31-60' && (mins <= 30 || mins > 60)) return false;
      if (filters.phone_usage_tier === '61-120' && (mins <= 60 || mins > 120)) return false;
      if (filters.phone_usage_tier === '121+' && mins <= 120) return false;
    }

    if (filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.toLowerCase();
      const matchId = r.user_id.toLowerCase().includes(q);
      const matchOcc = r.occupation_type.toLowerCase().includes(q);
      const matchApp = r.primary_bedtime_app.toLowerCase().includes(q);
      if (!matchId && !matchOcc && !matchApp) return false;
    }

    return true;
  });
}

export function computeNumericSummary(values: number[]): NumericSummary {
  if (values.length === 0) {
    return { min: 0, max: 0, mean: 0, median: 0, std: 0, q1: 0, q3: 0, iqr: 0 };
  }
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const min = sorted[0];
  const max = sorted[n - 1];
  const sum = sorted.reduce((a, b) => a + b, 0);
  const mean = sum / n;
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];

  const q1Index = Math.floor(n * 0.25);
  const q3Index = Math.floor(n * 0.75);
  const q1 = sorted[q1Index];
  const q3 = sorted[q3Index];
  const iqr = q3 - q1;

  const variance = n > 1 ? sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n - 1) : 0;
  const std = Math.sqrt(variance);

  return {
    min: +min.toFixed(2),
    max: +max.toFixed(2),
    mean: +mean.toFixed(2),
    median: +median.toFixed(2),
    std: +std.toFixed(2),
    q1: +q1.toFixed(2),
    q3: +q3.toFixed(2),
    iqr: +iqr.toFixed(2)
  };
}

export function computePearson(x: number[], y: number[]): number {
  const n = Math.min(x.length, y.length);
  if (n <= 1) return 0;
  const meanX = x.slice(0, n).reduce((a, b) => a + b, 0) / n;
  const meanY = y.slice(0, n).reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }

  const denominator = Math.sqrt(denX) * Math.sqrt(denY);
  if (denominator === 0) return 0;
  return +(num / denominator).toFixed(4);
}

// Spearman rank correlation
export function computeSpearman(x: number[], y: number[]): number {
  const n = Math.min(x.length, y.length);
  if (n <= 1) return 0;

  function rank(arr: number[]): number[] {
    const sorted = arr.map((val, idx) => ({ val, idx })).sort((a, b) => a.val - b.val);
    const ranks = new Array(arr.length);
    for (let i = 0; i < sorted.length; i++) {
      ranks[sorted[i].idx] = i + 1;
    }
    return ranks;
  }

  const rankX = rank(x.slice(0, n));
  const rankY = rank(y.slice(0, n));
  return computePearson(rankX, rankY);
}

export function getCorrelationInterpretation(r: number): string {
  const abs = Math.abs(r);
  const dir = r >= 0 ? 'positive' : 'inverse';
  if (abs >= 0.8) return `Very strong ${dir} association`;
  if (abs >= 0.6) return `Strong ${dir} association`;
  if (abs >= 0.4) return `Moderate ${dir} association`;
  if (abs >= 0.2) return `Weak ${dir} association`;
  return 'Negligible or absent linear association';
}

export function computeCorrelationMatrix(records: SleepRecord[], variables: (keyof SleepRecord)[]): CorrelationResult[] {
  const results: CorrelationResult[] = [];

  for (let i = 0; i < variables.length; i++) {
    for (let j = i + 1; j < variables.length; j++) {
      const v1 = variables[i];
      const v2 = variables[j];
      const arr1 = records.map(r => Number(r[v1])).filter(v => !isNaN(v));
      const arr2 = records.map(r => Number(r[v2])).filter(v => !isNaN(v));
      const r = computePearson(arr1, arr2);
      const spearmanR = computeSpearman(arr1, arr2);
      results.push({
        var1: String(v1),
        var2: String(v2),
        r,
        spearmanR,
        n: Math.min(arr1.length, arr2.length),
        interpretation: getCorrelationInterpretation(r)
      });
    }
  }

  return results;
}

export function computeCategoryBreakdown(records: SleepRecord[], groupByKey: keyof SleepRecord): CategoryMetric[] {
  const map = new Map<string, SleepRecord[]>();

  records.forEach(r => {
    const key = String(r[groupByKey]);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(r);
  });

  const total = records.length;
  const metrics: CategoryMetric[] = [];

  map.forEach((groupRecords, category) => {
    const count = groupRecords.length;
    const avgSleep = groupRecords.reduce((acc, r) => acc + r.total_sleep_hours, 0) / count;
    const avgPhone = groupRecords.reduce((acc, r) => acc + r.bedtime_phone_minutes, 0) / count;
    const avgFatigue = groupRecords.reduce((acc, r) => acc + r.next_day_fatigue_score, 0) / count;
    const avgLatency = groupRecords.reduce((acc, r) => acc + r.sleep_latency_min, 0) / count;

    metrics.push({
      category,
      count,
      percentage: total > 0 ? +((count / total) * 100).toFixed(1) : 0,
      avgSleep: +avgSleep.toFixed(2),
      avgPhone: +avgPhone.toFixed(1),
      avgFatigue: +avgFatigue.toFixed(2),
      avgLatency: +avgLatency.toFixed(1)
    });
  });

  return metrics.sort((a, b) => b.count - a.count);
}

export function computeSleepDurationBins(records: SleepRecord[]) {
  const bins = [
    { label: '<4.0h', min: 0, max: 4.0, count: 0 },
    { label: '4.0–4.9h', min: 4.0, max: 5.0, count: 0 },
    { label: '5.0–5.9h', min: 5.0, max: 6.0, count: 0 },
    { label: '6.0–6.9h', min: 6.0, max: 7.0, count: 0 },
    { label: '7.0–7.9h', min: 7.0, max: 8.0, count: 0 },
    { label: '8.0–8.9h', min: 8.0, max: 9.0, count: 0 },
    { label: '9.0h+', min: 9.0, max: 24.0, count: 0 }
  ];

  records.forEach(r => {
    const s = r.total_sleep_hours;
    for (const b of bins) {
      if (s >= b.min && (s < b.max || (b.label === '9.0h+' && s >= 9.0))) {
        b.count++;
        break;
      }
    }
  });

  return bins.map(b => ({
    range: b.label,
    count: b.count,
    pct: records.length > 0 ? +((b.count / records.length) * 100).toFixed(1) : 0
  }));
}

export function computePhoneMinutesBins(records: SleepRecord[]) {
  const bins = [
    { range: '0–30 min', min: 0, max: 30.01, count: 0, avgSleep: 0, sleepSum: 0, avgFatigue: 0, fatigueSum: 0 },
    { range: '31–60 min', min: 30.01, max: 60.01, count: 0, avgSleep: 0, sleepSum: 0, avgFatigue: 0, fatigueSum: 0 },
    { range: '61–90 min', min: 60.01, max: 90.01, count: 0, avgSleep: 0, sleepSum: 0, avgFatigue: 0, fatigueSum: 0 },
    { range: '91–120 min', min: 90.01, max: 120.01, count: 0, avgSleep: 0, sleepSum: 0, avgFatigue: 0, fatigueSum: 0 },
    { range: '121–150 min', min: 120.01, max: 150.01, count: 0, avgSleep: 0, sleepSum: 0, avgFatigue: 0, fatigueSum: 0 },
    { range: '151–180 min', min: 150.01, max: 180.01, count: 0, avgSleep: 0, sleepSum: 0, avgFatigue: 0, fatigueSum: 0 }
  ];

  records.forEach(r => {
    const p = r.bedtime_phone_minutes;
    for (const b of bins) {
      if (p >= b.min && p < b.max) {
        b.count++;
        b.sleepSum += r.total_sleep_hours;
        b.fatigueSum += r.next_day_fatigue_score;
        break;
      }
    }
  });

  return bins.map(b => ({
    range: b.range,
    count: b.count,
    pct: records.length > 0 ? +((b.count / records.length) * 100).toFixed(1) : 0,
    avgSleep: b.count > 0 ? +(b.sleepSum / b.count).toFixed(2) : 0,
    avgFatigue: b.count > 0 ? +(b.fatigueSum / b.count).toFixed(2) : 0
  }));
}

export function exportFilteredToCSV(records: SleepRecord[], filename = 'midnight_scroll_filtered_data.csv') {
  const csv = Papa.unparse(records);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
