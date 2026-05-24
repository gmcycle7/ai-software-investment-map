import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CATALYSTS,
  CATALYST_CATEGORIES,
  TIMEFRAME_LABEL,
  type Catalyst,
} from '../data/catalysts';
import { COMPANY_BY_ID } from '../data/aiSoftwareCompanies';
import { ConfidenceBadge } from '../components/Badges';

type CatFilter = Catalyst['category'] | 'ALL';
type TFFilter = Catalyst['timeframe'] | 'ALL';

export default function Catalysts() {
  const [cat, setCat] = useState<CatFilter>('ALL');
  const [tf, setTf] = useState<TFFilter>('ALL');

  const filtered = useMemo(() => {
    return CATALYSTS.filter((c) => {
      if (cat !== 'ALL' && c.category !== cat) return false;
      if (tf !== 'ALL' && c.timeframe !== tf) return false;
      return true;
    });
  }, [cat, tf]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="section-title">AI 軟體催化事件對照</h1>
        <p className="section-subtitle">
          {CATALYSTS.length} 個典型催化 / 瓶頸事件，每個對照公司級的受惠 / 受壓清單，並附觀察訊號與信心等級。
        </p>
      </header>

      <div className="card p-4 space-y-3">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1.5">分類</div>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip active={cat === 'ALL'} onClick={() => setCat('ALL')}>全部</FilterChip>
            {CATALYST_CATEGORIES.map((c) => (
              <FilterChip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
                {c.label}
              </FilterChip>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1.5">時間軸</div>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip active={tf === 'ALL'} onClick={() => setTf('ALL')}>全部</FilterChip>
            <FilterChip active={tf === 'short'} onClick={() => setTf('short')}>{TIMEFRAME_LABEL.short}</FilterChip>
            <FilterChip active={tf === 'medium'} onClick={() => setTf('medium')}>{TIMEFRAME_LABEL.medium}</FilterChip>
            <FilterChip active={tf === 'long'} onClick={() => setTf('long')}>{TIMEFRAME_LABEL.long}</FilterChip>
          </div>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="card p-8 text-center text-slate-500 dark:text-slate-400">沒有符合的事件。</div>
      )}

      <div className="space-y-4">
        {filtered.map((ev) => (
          <article key={ev.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold text-lg">{ev.title}</h2>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <span className="chip bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {CATALYST_CATEGORIES.find((c) => c.id === ev.category)?.label}
                  </span>
                  <span className="chip bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-brand-300">
                    {TIMEFRAME_LABEL[ev.timeframe]}
                  </span>
                  <ConfidenceBadge level={ev.confidenceLevel} />
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-3">{ev.summary}</p>

            <div className="mt-3 rounded-lg border border-slate-200 dark:border-slate-700 p-3 bg-slate-50/60 dark:bg-slate-900/40">
              <div className="text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-300">觀察訊號</div>
              <ul className="text-xs text-slate-700 dark:text-slate-300 list-disc pl-4 space-y-0.5">
                {ev.signalsToWatch.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <ImpactList
              title="受惠"
              accent="emerald"
              items={ev.winners}
            />
            <ImpactList title="受壓 / 受害" accent="rose" items={ev.losers} />
            {ev.uncertain.length > 0 && (
              <ImpactList title="影響方向不明 / 需驗證" accent="slate" items={ev.uncertain} />
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`chip ${active ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}
    >
      {children}
    </button>
  );
}

function ImpactList({
  title,
  accent,
  items,
}: {
  title: string;
  accent: 'emerald' | 'rose' | 'slate';
  items: { companyId: string; reason: string }[];
}) {
  if (items.length === 0) return null;
  const accentMap = {
    emerald: 'text-emerald-700 dark:text-emerald-400',
    rose: 'text-rose-700 dark:text-rose-400',
    slate: 'text-slate-600 dark:text-slate-300',
  };
  const chipMap = {
    emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200',
    rose: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200',
    slate: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  };
  return (
    <div className="mt-3">
      <div className={`text-xs font-semibold mb-1.5 ${accentMap[accent]}`}>{title}（{items.length}）</div>
      <ul className="space-y-1.5">
        {items.map((it, i) => {
          const c = COMPANY_BY_ID[it.companyId];
          return (
            <li key={i} className="flex items-start gap-2 text-sm">
              {c ? (
                <Link to={`/companies/${c.id}`} className={`chip flex-shrink-0 ${chipMap[accent]} hover:opacity-80`}>
                  {c.nameZh ?? c.name}
                  <span className="opacity-70 ml-1">{c.ticker}</span>
                </Link>
              ) : (
                <span className={`chip ${chipMap[accent]}`}>{it.companyId}</span>
              )}
              <span className="text-slate-700 dark:text-slate-300">{it.reason}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
