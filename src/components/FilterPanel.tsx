import type {
  AiRevenueExposure,
  AiSoftwareCategory,
  BusinessModel,
  CompanyInvestmentType,
  Market,
} from '../types/company';
import { CATEGORIES, INVESTMENT_TYPES } from '../data/categories';

export interface FilterState {
  market: Market | 'ALL';
  category: AiSoftwareCategory | 'ALL';
  businessModel: BusinessModel | 'ALL';
  aiExposure: AiRevenueExposure | 'ALL';
  investmentType: CompanyInvestmentType | 'ALL';
  minThreeYear: number;
  maxDisruption: number;
  minRealAiRevenue: number;
  query: string;
}

export const DEFAULT_FILTER: FilterState = {
  market: 'ALL',
  category: 'ALL',
  businessModel: 'ALL',
  aiExposure: 'ALL',
  investmentType: 'ALL',
  minThreeYear: 0,
  maxDisruption: 100,
  minRealAiRevenue: 0,
  query: '',
};

interface Props {
  value: FilterState;
  onChange: (v: FilterState) => void;
}

const businessModels: (BusinessModel | 'ALL')[] = [
  'ALL',
  'Subscription',
  'Usage-based',
  'Advertising',
  'License',
  'Hybrid',
  'Needs Verification',
];
const exposures: (AiRevenueExposure | 'ALL')[] = ['ALL', 'High', 'Medium', 'Low', 'Needs Verification'];
const markets: (Market | 'ALL')[] = ['ALL', 'US', 'Taiwan', 'Private', 'Europe', 'Japan', 'Other'];

const bmLabel: Record<string, string> = {
  ALL: '全部',
  Subscription: '訂閱制',
  'Usage-based': '用量計費',
  Advertising: '廣告',
  License: '授權',
  Hybrid: '混合',
  'Needs Verification': '需驗證',
};
const exposureLabel: Record<string, string> = {
  ALL: '全部',
  High: '高',
  Medium: '中',
  Low: '低',
  'Needs Verification': '需驗證',
};
const marketLabel: Record<string, string> = {
  ALL: '全部',
  US: '美股',
  Taiwan: '台股',
  Private: '未上市',
  Europe: '歐股',
  Japan: '日股',
  Other: '其他',
};

export function FilterPanel({ value, onChange }: Props) {
  const set = <K extends keyof FilterState>(k: K, v: FilterState[K]) =>
    onChange({ ...value, [k]: v });

  return (
    <div className="card p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div>
          <label className="text-xs text-slate-500 dark:text-slate-400">
            關鍵字 <span className="opacity-70">（公司名 / Ticker / 產品 / 競爭者 / 標籤）</span>
          </label>
          <input
            className="w-full mt-1 input-base"
            placeholder="例：Copilot、向量、MCP、Agent…"
            value={value.query}
            onChange={(e) => set('query', e.target.value)}
          />
        </div>
        <Select label="市場" value={value.market} onChange={(v) => set('market', v as Market | 'ALL')}>
          {markets.map((m) => (
            <option key={m} value={m}>
              {marketLabel[m]}
            </option>
          ))}
        </Select>
        <Select
          label="產業分類"
          value={value.category}
          onChange={(v) => set('category', v as AiSoftwareCategory | 'ALL')}
        >
          <option value="ALL">全部</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.titleZh}
            </option>
          ))}
        </Select>
        <Select
          label="商業模式"
          value={value.businessModel}
          onChange={(v) => set('businessModel', v as BusinessModel | 'ALL')}
        >
          {businessModels.map((m) => (
            <option key={m} value={m}>
              {bmLabel[m]}
            </option>
          ))}
        </Select>
        <Select
          label="AI 營收曝險"
          value={value.aiExposure}
          onChange={(v) => set('aiExposure', v as AiRevenueExposure | 'ALL')}
        >
          {exposures.map((m) => (
            <option key={m} value={m}>
              {exposureLabel[m]}
            </option>
          ))}
        </Select>
        <Select
          label="公司型態"
          value={value.investmentType}
          onChange={(v) => set('investmentType', v as CompanyInvestmentType | 'ALL')}
        >
          <option value="ALL">全部</option>
          {INVESTMENT_TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.titleZh}
            </option>
          ))}
        </Select>
        <Range
          label={`三年成長分數 ≥ ${value.minThreeYear}`}
          value={value.minThreeYear}
          onChange={(v) => set('minThreeYear', v)}
        />
        <Range
          label={`顛覆風險 ≤ ${value.maxDisruption}`}
          value={value.maxDisruption}
          onChange={(v) => set('maxDisruption', v)}
        />
        <Range
          label={`真實 AI 營收可信度 ≥ ${value.minRealAiRevenue}`}
          value={value.minRealAiRevenue}
          onChange={(v) => set('minRealAiRevenue', v)}
        />
        <div className="flex items-end">
          <button className="btn-ghost w-full" onClick={() => onChange(DEFAULT_FILTER)}>
            重設篩選
          </button>
        </div>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs text-slate-500 dark:text-slate-400">{label}</label>
      <select
        className="w-full mt-1 input-base"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </div>
  );
}

function Range({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="text-xs text-slate-500 dark:text-slate-400">{label}</label>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-2"
      />
    </div>
  );
}
