export interface SleepRecord {
  user_id: string;
  age: number;
  gender: string;
  occupation_type: string;
  chronotype: string;
  bedtime_phone_minutes: number;
  primary_bedtime_app: string;
  screen_brightness_pct: number;
  blue_light_filter_active: number;
  caffeine_post_5pm_mg: number;
  physical_activity_min: number;
  sleep_latency_min: number;
  total_sleep_hours: number;
  deep_sleep_pct: number;
  rem_sleep_pct: number;
  morning_alarm_snoozes: number;
  next_day_fatigue_score: number;
  sleep_debt_category: string;
}

export type TabId = 'overview' | 'explore' | 'findings' | 'methodology' | 'dataset';

export interface FilterState {
  gender: string;
  occupation_type: string;
  chronotype: string;
  primary_bedtime_app: string;
  blue_light_filter_active: string; // 'all', '1', '0'
  sleep_debt_category: string;
  phone_usage_tier: string; // 'all', '0-30', '31-60', '61-120', '121+'
  searchQuery: string;
}

export interface NumericSummary {
  min: number;
  max: number;
  mean: number;
  median: number;
  std: number;
  q1: number;
  q3: number;
  iqr: number;
}

export interface CategoryMetric {
  category: string;
  count: number;
  percentage: number;
  avgSleep: number;
  avgPhone: number;
  avgFatigue: number;
  avgLatency: number;
}

export interface CorrelationResult {
  var1: string;
  var2: string;
  r: number;
  spearmanR: number;
  n: number;
  interpretation: string;
}

export interface DataQualityReport {
  totalRows: number;
  validRows: number;
  columnCount: number;
  missingValuesCount: number;
  duplicatesCount: number;
  columnsList: string[];
  fileSizeFormatted: string;
}
