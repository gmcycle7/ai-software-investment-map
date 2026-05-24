import type {
  AiRevenueExposure,
  ConfidenceLevel,
  Market,
  TaiwanExposureLabel,
} from '../types/company';

export function MarketBadge({ market }: { market: Market }) {
  const map: Record<Market, { label: string; cls: string }> = {
    US: { label: '美股', cls: 'bg-blue-100 text-blue-800' },
    Taiwan: { label: '台股', cls: 'bg-emerald-100 text-emerald-800' },
    Private: { label: '未上市', cls: 'bg-slate-200 text-slate-700' },
    Europe: { label: '歐股', cls: 'bg-violet-100 text-violet-800' },
    Japan: { label: '日股', cls: 'bg-pink-100 text-pink-800' },
    Other: { label: '其他', cls: 'bg-slate-100 text-slate-700' },
  };
  const m = map[market];
  return <span className={`chip ${m.cls}`}>{m.label}</span>;
}

export function ExposureBadge({ value }: { value: AiRevenueExposure }) {
  const map: Record<AiRevenueExposure, { label: string; cls: string }> = {
    High: { label: 'AI 營收曝險：高', cls: 'bg-emerald-100 text-emerald-800' },
    Medium: { label: 'AI 營收曝險：中', cls: 'bg-amber-100 text-amber-800' },
    Low: { label: 'AI 營收曝險：低', cls: 'bg-rose-100 text-rose-700' },
    'Needs Verification': { label: 'AI 營收曝險：需驗證', cls: 'bg-slate-200 text-slate-700' },
  };
  const m = map[value];
  return <span className={`chip ${m.cls}`}>{m.label}</span>;
}

export function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  const map: Record<ConfidenceLevel, { label: string; cls: string }> = {
    High: { label: '可信度：高', cls: 'bg-green-100 text-green-800' },
    Medium: { label: '可信度：中', cls: 'bg-yellow-100 text-yellow-800' },
    Low: { label: '可信度：低', cls: 'bg-rose-100 text-rose-700' },
  };
  const m = map[level];
  return <span className={`chip ${m.cls}`}>{m.label}</span>;
}

export function TaiwanLabelBadge({ value }: { value: TaiwanExposureLabel }) {
  const map: Record<TaiwanExposureLabel, { label: string; cls: string }> = {
    'direct-ai-software': { label: '直接 AI 軟體曝險', cls: 'bg-emerald-100 text-emerald-800' },
    'indirect-ai-software': { label: '間接 AI 軟體曝險', cls: 'bg-amber-100 text-amber-800' },
    'system-integration': { label: '系統整合 / 專案型', cls: 'bg-sky-100 text-sky-800' },
    'needs-verification': { label: '需進一步驗證', cls: 'bg-slate-200 text-slate-700' },
  };
  const m = map[value];
  return <span className={`chip ${m.cls}`}>{m.label}</span>;
}
