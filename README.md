# The Midnight Scroll 🌙
### An Exploratory Data Analysis of Bedtime Smartphone Use and Sleep Debt

[![Vite](https://img.shields.io/badge/Vite-8.3.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/Dataset-Kaggle%20Verified-blue)](https://www.kaggle.com/datasets/samartalwar/sleep-debt-and-screen-time-late-night-phone-habits)

> **College Case Study Research Project**: A comprehensive, evidence-based exploratory data analysis (EDA) investigating the relationship between bedtime smartphone screen time, sleep onset latency, nocturnal sleep debt, and next-day fatigue.

---

## 📖 Project Overview

* **Project Title:** The Midnight Scroll
* **Subtitle:** An Exploratory Data Analysis of Bedtime Smartphone Use and Sleep Debt
* **Dataset:** [Sleep Debt & Screen Time: Late Night Phone Habits](https://www.kaggle.com/datasets/samartalwar/sleep-debt-and-screen-time-late-night-phone-habits)
* **Dataset Author:** Samar Talwar
* **Sample Size:** 8,500 verified respondents ($USR\text{-}00001$ to $USR\text{-}08500$)
* **Data Completeness:** 100% (0 missing values, 0 duplicates, 18 attributes)

### 🎯 Research Question
> *"How are bedtime smartphone use and other lifestyle factors associated with sleep duration, sleep latency, sleep debt, and next-day fatigue?"*

---

## 📊 Key Empirical Findings

All metrics are calculated directly and deterministically from the 8,500 observation dataset:

| Research Variable Pairing | Correlation ($r$) | Statistical Significance | Core Empirical Finding |
| :--- | :---: | :---: | :--- |
| **Bedtime Phone vs. Sleep Latency** | **$+0.8575$** | $p < 0.001$ | Bedtime smartphone usage strongly delays sleep onset. Users with $\le 30$m phone use fall asleep in $24.6$m vs. $74.8$m for $>120$m users. |
| **Total Sleep vs. Next-Day Fatigue** | **$-0.8795$** | $p < 0.001$ | Curtailed sleep duration is the single strongest determinant of daytime exhaustion ($9.58/10$ in Severe Debt vs. $1.08/10$ in Optimal Recovery). |
| **Alarm Snoozes vs. Fatigue Score** | **$+0.8810$** | $p < 0.001$ | Chronic morning snoozing directly tracks nocturnal sleep deficit. |
| **Bedtime Phone vs. Sleep Duration** | **$-0.5544$** | $p < 0.001$ | Direct temporal displacement: each additional 30m of phone use cuts nocturnal sleep duration by $\sim 45$ minutes. |
| **Evening Caffeine vs. Deep Sleep %** | **$-0.3431$** | $p < 0.001$ | Caffeine consumed post-5:00 PM suppresses slow-wave restorative deep sleep ($16.2\%$ vs. $23.4\%$). |
| **Blue-Light Filter vs. Sleep Loss** | **$-0.0274$** | Not Significant | **The Blue-Light Paradox:** Software filters do not mitigate sleep loss ($\Delta = +1.2\text{ min}$, Filter On: 6.28h vs. Filter Off: 6.26h). |

### 💤 Sleep Debt Category Breakdown
* **Optimal Recovery ($16.3\%$):** Mean Sleep $8.35$h | Mean Phone $33.5$m | Fatigue Score $1.08/10$
* **Mild Deficit ($23.6\%$):** Mean Sleep $7.23$h | Mean Phone $45.5$m | Fatigue Score $1.83/10$
* **Moderate Debt ($52.5\%$):** Mean Sleep $5.55$h | Mean Phone $64.1$m | Fatigue Score $4.68/10$
* **Severe Sleep Debt ($7.6\%$):** Mean Sleep $3.76$h | Mean Phone $123.6$m | Fatigue Score $9.58/10$

---

## 💻 Dashboard Sections & Features

1. **Overview Dashboard**
   - KPI metric cards with units, explanations, and dynamic cohort percentages.
   - Sleep duration and bedtime phone binned distribution histograms.
   - Sleep debt category composition chart.
   - Dual-axis bivariate scatter plot.
   - Category-level next-day fatigue divergence analysis.

2. **Explore Data Suite**
   - **Category Grouped Comparisons:** Multi-bar comparisons across Occupation, Chronotype, App, Blue-Light status, and Gender.
   - **Bivariate Correlation Heatmap:** Interactive Pearson $r$ & Spearman $\rho$ grid with interactive statistical inspection.
   - **Custom Scatter Explorer:** Selectable X and Y axes with dynamic linear regression line ($y = mx + b$) and $R^2$ variance explanation.
   - **Parametric & Non-Parametric Summary Table:** Min, Max, Mean, Median, Std Dev, $Q_1$, $Q_3$, and IQR for all 11 continuous attributes.
   - **Empirical Record Inspector:** Searchable, sortable, paginated data table ($10, 15, 25, 50, 100$ rows) with filtered CSV export.

3. **Key Findings Report**
   - Research synthesis report covering the dual-pathway mechanism (latency delay + time displacement).
   - 6 calculated empirical findings with statistical evidence.
   - Transparent disclosure of observational biases, cross-sectional design limits, and convenience sampling.

4. **Methodology**
   - Provenance attribution, Kaggle license information, and zero-null data cleaning audit.
   - Mathematical formulations for Pearson $r$, Spearman $\rho$, and quartile definitions.
   - Academic disclaimer stating the application is for educational research and not a clinical diagnostic device.

5. **Dataset & Data Dictionary**
   - Complete 18-attribute schema catalog detailing data types, units, and descriptions.
   - Direct download link for the full 8,500 record dataset.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** React 19 + TypeScript
* **Bundler & Dev Server:** Vite
* **Visual Styling:** Custom Midnight / Digital-Wellness Design System (Vanilla CSS + responsive layouts + `@media print` clean report stylesheet)
* **Data Processing:** Papa Parse (client-side CSV ingestion & deterministic statistics)
* **Data Visualization:** Recharts (responsive canvas scatter plots, histograms, grouped bar charts)
* **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* npm (v9+)

### Installation & Execution
```bash
# Clone the repository
git clone https://github.com/prism-enterprises-14/the-midnight-scroll.git

# Navigate into the project directory
cd the-midnight-scroll

# Install dependencies
npm install

# Start development server
npm run dev

# Run production build & type check
npm run build

# Preview production build
npm run preview
```

---

## 📄 License & Attribution
* Dataset by **Samar Talwar** via [Kaggle](https://www.kaggle.com/datasets/samartalwar/sleep-debt-and-screen-time-late-night-phone-habits).
* Project created for academic case study evaluation.
