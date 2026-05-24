import { Link } from 'react-router-dom';
import { AIStackDiagram } from '../components/AIStackDiagram';
import { CATEGORIES } from '../data/categories';
import { ALL_COMPANIES } from '../data/aiSoftwareCompanies';

export default function Home() {
  const total = ALL_COMPANIES.length;
  const us = ALL_COMPANIES.filter((c) => c.market === 'US').length;
  const tw = ALL_COMPANIES.filter((c) => c.market === 'Taiwan').length;
  const priv = ALL_COMPANIES.filter((c) => c.market === 'Private').length;

  return (
    <div className="space-y-10">
      <section className="text-center md:text-left">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
          教育性研究專案 · 不構成投資建議
        </div>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">
          AI 軟體產業投資地圖
          <span className="block text-brand-700">美股與台股</span>
        </h1>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-400">
          幫助你分辨「真實 AI 軟體贏家」與「只有 AI 敘事」的公司。
          所有公司皆以結構化分類、KPI 評分、護城河分析、與顛覆風險呈現，並逐筆標註資料可信度。
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/companies" className="btn-primary">瀏覽公司列表</Link>
          <Link to="/kpi" className="btn-ghost">KPI 儀表板</Link>
          <Link to="/investment-logic" className="btn-ghost">投資邏輯</Link>
          <Link to="/methodology" className="btn-ghost">評分方法</Link>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
          <Stat n={total} label="收錄公司" />
          <Stat n={us} label="美股" />
          <Stat n={tw} label="台股" />
          <Stat n={priv} label="未上市" />
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <Card title="什麼是 AI 軟體？">
          <p>
            AI 軟體是「將模型能力嵌入軟體與工作流程」中變現的層次。它不是 GPU、不是伺服器、不是電力。
            AI 軟體公司的關鍵變現方式包括：訂閱（Subscription）、用量計費（Usage-based）、
            模型 API、企業合約、廣告與內容變現等。
          </p>
          <p className="mt-3">
            雖然 AI 硬體公司目前需求最強、訂單可見度最高，但長期軟體層才是 AI 紅利的最終承接者；
            然而軟體層的變現速度比硬體層慢，並充滿「敘事 vs 真實」的辨識挑戰。
          </p>
        </Card>
        <Card title="AI 軟體與 AI 硬體的差別">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>硬體：能見度高、循環性強，靠 GPU / HBM / 網通 / 散熱 / 電力等出貨節奏推動</li>
            <li>軟體：毛利潛在更高、但 ROI 與滲透率需要時間驗證</li>
            <li>軟體贏家靠：通路 × 工作流程鎖定 × 資料 × AI 能力 × 定價權</li>
            <li>軟體輸家通常源於：模型商品化、開源競爭、AI 原生顛覆、ROI 不明</li>
          </ul>
        </Card>
        <Card title="AI 軟體公司怎麼變現？">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Copilot / AI 模組以加購方式提升每席次 ARR</li>
            <li>API 用量計費（Token / Inference call）</li>
            <li>Agent 用量 / outcome-based pricing</li>
            <li>Data + AI 平台用量計費（in-warehouse inference）</li>
            <li>廣告 ROI 提升驅動廣告平台變現</li>
            <li>專業服務 / 顧問 / 系統整合</li>
          </ul>
        </Card>
        <Card title="真實 AI 營收 vs AI 敘事">
          <p>
            一家公司即使股價上漲，也不代表 AI 真實貢獻營收。我們以
            「真實 AI 營收可信度分數」加上 <strong>需要資料驗證</strong> 等標籤，
            幫助讀者區分以下兩種狀況：
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5">
            <li>有揭露 AI 產品 ARR、客戶案例、用量資料 → 高可信度</li>
            <li>僅有 AI 敘事、無付費滲透證據 → 低可信度（需驗證）</li>
          </ul>
        </Card>
      </section>

      <AIStackDiagram />

      <section>
        <h2 className="section-title">11 大 AI 軟體分類</h2>
        <p className="section-subtitle">每個分類對應不同的價值層、競爭結構與顛覆風險。</p>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to={`/categories/${c.id}`}
              className="card p-4 hover:shadow-md transition"
            >
              <div className="text-xs text-slate-500 dark:text-slate-400">分類 {c.letter}</div>
              <div className="font-bold text-base mt-0.5">{c.titleZh}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{c.titleEn}</div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">{c.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="card p-3">
      <div className="text-2xl font-extrabold text-brand-700">{n}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{children}</div>
    </div>
  );
}
