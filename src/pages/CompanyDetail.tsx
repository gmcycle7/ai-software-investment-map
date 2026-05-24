import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ALL_COMPANIES, COMPANY_BY_ID } from '../data/aiSoftwareCompanies';
import { CATEGORIES, INVESTMENT_TYPES } from '../data/categories';
import { ConfidenceBadge, ExposureBadge, MarketBadge, TaiwanLabelBadge } from '../components/Badges';
import { KpiRadar } from '../components/KpiRadar';
import { MarketDataPanel } from '../components/MarketDataPanel';
import { INVESTOR_ANGLE } from '../data/investorAngles';

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const company = id ? COMPANY_BY_ID[id] : undefined;
  const [compareId, setCompareId] = useState<string>('');
  const compare = compareId ? COMPANY_BY_ID[compareId] : undefined;

  if (!company) {
    return (
      <div className="card p-6">
        找不到公司。<Link to="/companies" className="text-brand-700 underline">返回公司列表</Link>
      </div>
    );
  }

  const k = company.investmentKpi;
  const types = company.investmentType
    .map((t) => INVESTMENT_TYPES.find((x) => x.id === t)?.titleZh)
    .filter(Boolean) as string[];

  return (
    <div className="space-y-6">
      <Link to="/companies" className="text-sm text-brand-700 hover:underline">← 返回公司列表</Link>

      <header className="card p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-extrabold">
                {company.nameZh ?? company.name}
              </h1>
              <span className="text-base text-slate-500 font-medium">{company.name}</span>
            </div>
            <div className="text-sm text-slate-500 mt-1">{company.ticker}</div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <MarketBadge market={company.market} />
              <ExposureBadge value={company.aiRevenueExposure} />
              <ConfidenceBadge level={company.confidenceLevel} />
              {company.taiwanLabel && <TaiwanLabelBadge value={company.taiwanLabel} />}
              {types.map((t) => (
                <span key={t} className="chip bg-brand-50 text-brand-700">{t}</span>
              ))}
            </div>
          </div>
          <div className="text-xs text-slate-500 text-right">
            更新：{company.lastUpdated}
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
          <Field label="公司主業">{company.whatTheyDo}</Field>
          <Field label="為何與 AI 相關">{company.whyAiRelevant}</Field>
          <Field label="主要產品">{company.coreProducts.join('、')}</Field>
          <Field label="AI 產品">{company.aiProducts.join('、')}</Field>
          <Field label="變現方式">{company.monetizationModel.join('、')}</Field>
          <Field label="商業模式">{company.businessModel}</Field>
          <Field label="競爭優勢">{company.competitiveAdvantage}</Field>
          <Field label="AI 護城河">{company.aiMoat}</Field>
          <Field label="客戶類型">{company.customerType.join('、')}</Field>
          <Field label="主要競爭者">{company.competitors.join('、')}</Field>
          <Field label="主要風險">
            <ul className="list-disc pl-5 space-y-0.5">
              {company.mainRisks.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </Field>
          <Field label="分類">
            {company.category
              .map((c) => CATEGORIES.find((cc) => cc.id === c)?.titleZh)
              .filter(Boolean)
              .join('、')}
          </Field>
        </div>
        {(company.tags?.length || company.technicalKeywords?.length) && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1.5">
            {company.tags?.map((t) => (
              <span key={`tag-${t}`} className="chip bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                #{t}
              </span>
            ))}
            {company.technicalKeywords?.map((t) => (
              <span key={`tk-${t}`} className="chip bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      <MarketDataPanel ticker={company.ticker} />

      {INVESTOR_ANGLE[company.id] && (
        <section className="rounded-2xl border-l-4 border-sky-400 bg-sky-50/70 dark:bg-sky-900/15 p-5">
          <div className="flex items-center gap-2 mb-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-700 dark:text-sky-300">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 2" />
            </svg>
            <h3 className="font-bold text-sky-900 dark:text-sky-200">給軟體分析師 / PM 的觀察點</h3>
          </div>
          <p className="text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
            {INVESTOR_ANGLE[company.id]}
          </p>
        </section>
      )}

      {company.analystView && (
        <section className="rounded-2xl border-l-4 border-amber-400 bg-amber-50/70 dark:bg-amber-900/15 p-5">
          <div className="flex items-center gap-2 mb-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700 dark:text-amber-300">
              <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.7.7 1 1.4 1 2.3v1h6v-1c0-.9.3-1.6 1-2.3A7 7 0 0 0 12 2z" />
            </svg>
            <h3 className="font-bold text-amber-900 dark:text-amber-200">分析師觀點（主觀）</h3>
          </div>
          <p className="text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
            {company.analystView}
          </p>
          <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-2">
            ※ 本段為主觀詮釋，與其他事實型欄位視覺區隔。不構成投資建議。
          </p>
        </section>
      )}

      <section className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold">投資 KPI 雷達圖</h2>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500">比較另一家：</label>
            <select
              className="input-base !py-1"
              value={compareId}
              onChange={(e) => setCompareId(e.target.value)}
            >
              <option value="">（無）</option>
              {ALL_COMPANIES.filter((c) => c.id !== company.id).map((c) => (
                <option key={c.id} value={c.id}>{c.nameZh ?? c.name} ({c.ticker})</option>
              ))}
            </select>
          </div>
        </div>
        <KpiRadar company={company} compare={compare} />
        <p className="text-xs text-slate-500 mt-2">
          所有 KPI 分數為「產業邏輯評分」，尚未串接即時財務資料。
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-3">
        <ScoreCard title="短期催化（3~12 月）" score={k.shortTermScore} desc="AI 產品節奏、營收加速、財報修正、企業導入、敘事熱度、估值重評、近期競爭壓力" />
        <ScoreCard title="三年成長分數" score={k.threeYearScore} desc="AI 營收曝險、加購率、用量計費潛力、企業導入、定價權、銷售執行" />
        <ScoreCard title="五年護城河分數" score={k.fiveYearScore} desc="資料 × 工作流程鎖定 × 生態 × 切換成本 × 模型 / 基建優勢 × 開發者生態 × 品牌" />
        <ScoreCard title="十年結構價值分數" score={k.tenYearScore} desc="平台潛力、TAM、AI 原生架構、抗模型商品化、通路、研發、資產負債" />
        <ScoreCard title="真實 AI 營收可信度" score={k.realAiRevenueConfidenceScore} desc="揭露 AI 營收、付費 AI 採用、客戶案例、用量、定價、留存、來源信心" />
        <ScoreCard title="AI 顛覆風險" score={k.aiDisruptionRiskScore} accent="rose" desc="分數越高代表顛覆風險越高：可替代性、AI 原生競爭、毛利壓縮、席次定價脆弱、開源、流失" />
      </section>

      <section className="card p-5">
        <h2 className="text-lg font-bold">KPI 評論與資料來源</h2>
        <p className="text-sm text-slate-700 mt-2">{k.kpiCommentary || '（無）'}</p>
        <div className="mt-2 text-xs text-slate-500">KPI 可信度：{k.kpiConfidenceLevel} · 更新：{k.kpiLastUpdated}</div>
        <div className="mt-3 text-xs">
          <div className="font-semibold mb-1">資料來源</div>
          <ul className="list-disc pl-5 text-slate-600 space-y-0.5">
            {company.sourceUrls.map((u) => (
              <li key={u}>
                <a href={u} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">
                  {u}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</div>
      <div className="text-slate-800 dark:text-slate-200">{children}</div>
    </div>
  );
}

function ScoreCard({ title, score, desc, accent = 'brand' }: { title: string; score: number; desc: string; accent?: 'brand' | 'rose' }) {
  const color = accent === 'rose' ? 'text-rose-600 dark:text-rose-400' : 'text-brand-700 dark:text-brand-300';
  return (
    <div className="card p-5">
      <div className="text-sm text-slate-500 dark:text-slate-400">{title}</div>
      <div className={`text-4xl font-extrabold mt-1 ${color}`}>{score.toFixed(1)}</div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{desc}</p>
    </div>
  );
}
