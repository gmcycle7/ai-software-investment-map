import { ALL_COMPANIES } from '../data/aiSoftwareCompanies';
import { CompanyCard } from '../components/CompanyCard';
import { TaiwanLabelBadge } from '../components/Badges';
import type { TaiwanExposureLabel } from '../types/company';

const sections: { label: TaiwanExposureLabel; title: string; desc: string }[] = [
  {
    label: 'direct-ai-software',
    title: '直接 AI 軟體曝險',
    desc: '本業即 AI 軟體或資安軟體，AI 屬於核心產品或主要加值。',
  },
  {
    label: 'indirect-ai-software',
    title: '間接 AI 軟體曝險',
    desc: '本業為硬體 / 系統，但軟體（韌體 / BMC / 部署 / 管理）對 AI 部署具關鍵性。',
  },
  {
    label: 'system-integration',
    title: '系統整合 / 專案型曝險',
    desc: '透過系統整合 / 專案承接 AI 軟體相關業務，AI 軟體本身規模與毛利透明度較低。',
  },
  {
    label: 'needs-verification',
    title: '需進一步驗證',
    desc: 'AI 軟體相關說法仍以行銷為主，缺乏可驗證的 ARR、客戶或留存資料。',
  },
];

export default function Taiwan() {
  const taiwan = ALL_COMPANIES.filter((c) => c.market === 'Taiwan');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title">台灣 AI 軟體與服務供應鏈</h1>
        <p className="section-subtitle">
          客觀說明：台灣在 AI <strong>硬體</strong>與半導體供應鏈具全球領先地位，但<strong>純 AI 軟體</strong>
          公司規模相對小、揭露透明度較低。本頁採嚴格四級標籤，並標註「需要資料驗證」。
        </p>
      </div>

      <div className="card p-5">
        <h2 className="text-lg font-bold">台灣可能的 AI 軟體相關方向</h2>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300 list-disc pl-5">
          <li>企業 AI 系統整合 / 顧問</li>
          <li>資安軟體（Trend Micro 為代表）</li>
          <li>工業 AI / 智慧工廠 軟體</li>
          <li>邊緣 AI（Face AI、AOI、IoT Edge）</li>
          <li>AI 伺服器管理軟體 / BMC / Firmware</li>
          <li>半導體 EDA / 設計自動化（多由美股 Synopsys / Cadence 主導）</li>
          <li>製造 AI / 缺陷檢測</li>
          <li>AI 醫療軟體（影像、臨床決策）</li>
          <li>AI PC / 邊緣裝置軟體生態</li>
        </ul>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
          注意：若一家公司沒有可驗證的 AI 軟體業務，請不要強行歸類；
          本網站對於 Taiwan 公司一律標示「需進一步驗證」當作預設保守作法。
        </p>
      </div>

      {sections.map((s) => {
        const list = taiwan.filter((c) => c.taiwanLabel === s.label);
        if (list.length === 0) return null;
        return (
          <section key={s.label}>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{s.title}</h2>
              <TaiwanLabelBadge value={s.label} />
            </div>
            <p className="section-subtitle">{s.desc}</p>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {list.map((c) => <CompanyCard key={c.id} company={c} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
