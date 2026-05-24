import { useMemo, useState } from 'react';
import { ALL_COMPANIES } from '../data/aiSoftwareCompanies';
import { ComparisonTable } from '../components/ComparisonTable';
import { MoatGrowthScatter } from '../components/MoatGrowthScatter';
import { DisruptionHeatmap } from '../components/DisruptionHeatmap';

type ScoreKey =
  | 'shortTermScore'
  | 'threeYearScore'
  | 'fiveYearScore'
  | 'tenYearScore'
  | 'realAiRevenueConfidenceScore'
  | 'aiDisruptionRiskScore';

const tabs: { key: ScoreKey; label: string; desc: string; accent?: 'rose' }[] = [
  { key: 'shortTermScore', label: '短期催化（3~12 月）', desc: 'AI 產品節奏、財報修正、敘事熱度等' },
  { key: 'threeYearScore', label: '三年成長', desc: 'AI 加購率、用量計費、定價權' },
  { key: 'fiveYearScore', label: '五年護城河', desc: '資料、工作流程鎖定、生態、切換成本' },
  { key: 'tenYearScore', label: '十年結構價值', desc: '平台潛力、TAM、AI 原生架構、抗商品化' },
  { key: 'realAiRevenueConfidenceScore', label: '真實 AI 營收可信度', desc: '依揭露、付費滲透、客戶案例等' },
  { key: 'aiDisruptionRiskScore', label: 'AI 顛覆風險', desc: '分數越高代表顛覆風險越高', accent: 'rose' },
];

export default function KpiDashboard() {
  const [active, setActive] = useState<ScoreKey>('threeYearScore');

  const sorted = useMemo(() => {
    return [...ALL_COMPANIES].sort((a, b) => b.investmentKpi[active] - a.investmentKpi[active]);
  }, [active]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">AI 軟體投資 KPI 儀表板</h1>
        <p className="section-subtitle">所有分數皆為「產業邏輯評分」，尚未串接即時財務資料。</p>
      </div>

      <div className="card p-1 flex flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${
              active === t.key
                ? t.accent === 'rose'
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200'
                  : 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="card p-5">
        <h2 className="text-lg font-bold">
          {tabs.find((t) => t.key === active)?.label} - 排行
        </h2>
        <p className="section-subtitle">{tabs.find((t) => t.key === active)?.desc}</p>
        <div className="mt-4 space-y-2">
          {sorted.slice(0, 20).map((c, i) => {
            const v = c.investmentKpi[active];
            const accentBg = active === 'aiDisruptionRiskScore' ? 'bg-rose-500' : 'bg-brand-600';
            return (
              <div key={c.id} className="flex items-center gap-3">
                <div className="w-6 text-xs text-slate-500 dark:text-slate-400 text-right">{i + 1}</div>
                <div className="w-44 text-sm font-medium truncate">
                  {c.nameZh ?? c.name} <span className="text-xs text-slate-500 dark:text-slate-400">{c.ticker}</span>
                </div>
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className={`h-2 ${accentBg}`} style={{ width: `${v}%` }} />
                </div>
                <div className="w-12 text-right text-sm font-bold">{v.toFixed(1)}</div>
              </div>
            );
          })}
        </div>
      </div>

      <section className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h2 className="text-lg font-bold">護城河 vs 成長散布圖</h2>
          <p className="section-subtitle">X：三年成長分數 / Y：五年護城河分數</p>
          <MoatGrowthScatter
            companies={ALL_COMPANIES}
            xKey="threeYearScore"
            yKey="fiveYearScore"
            xLabel="三年成長"
            yLabel="五年護城河"
          />
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-bold">真實 AI 營收 vs 敘事熱度</h2>
          <p className="section-subtitle">
            X：真實 AI 營收可信度分數 / Y：短期催化分數（含敘事熱度元素）
          </p>
          <MoatGrowthScatter
            companies={ALL_COMPANIES}
            xKey="realAiRevenueConfidenceScore"
            yKey="shortTermScore"
            xLabel="真實 AI 營收可信度"
            yLabel="短期催化（含敘事）"
          />
          <p className="text-xs text-slate-500 mt-2">
            位於左上的公司：敘事強但真實 AI 營收證據弱（高敘事風險）。
          </p>
        </div>
      </section>

      <DisruptionHeatmap companies={ALL_COMPANIES} />

      <ComparisonTable companies={sorted} title="完整比較表" />
    </div>
  );
}
