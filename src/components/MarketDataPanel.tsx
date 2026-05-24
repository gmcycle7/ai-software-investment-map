import { useEffect, useState } from 'react';
import { marketDataService, type MarketDataSnapshot } from '../services/marketData';

interface Props {
  ticker: string;
}

export function MarketDataPanel({ ticker }: Props) {
  const [snapshot, setSnapshot] = useState<MarketDataSnapshot | null>(null);

  useEffect(() => {
    let cancelled = false;
    marketDataService.fetch(ticker).then((s) => {
      if (!cancelled) setSnapshot(s);
    });
    return () => {
      cancelled = true;
    };
  }, [ticker]);

  if (!snapshot) {
    return (
      <div className="card p-5">
        <div className="text-sm text-slate-500 dark:text-slate-400">載入市場資料中…</div>
      </div>
    );
  }

  const isPlaceholder = snapshot.sourceLabel === 'placeholder';
  const cells: { label: string; value: string }[] = [
    { label: '市值 (Market Cap)', value: snapshot.marketCap },
    { label: 'P/E (TTM)', value: snapshot.peRatio },
    { label: 'Forward P/E', value: snapshot.forwardPe },
    { label: 'EV / Sales', value: snapshot.evToSales },
    { label: 'FCF Yield', value: snapshot.freeCashFlowYield },
    { label: 'YTD Return', value: snapshot.ytdReturn },
    { label: '1Y Return', value: snapshot.oneYearReturn },
  ];

  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold">市場資料快照</h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          來源：{snapshot.sourceLabel} · {snapshot.fetchedAt}
        </span>
      </div>
      {isPlaceholder && (
        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1.5">
          本網站尚未串接即時行情 API。所有市場資料欄位皆為 placeholder；接入方式請見 <code className="text-amber-900 dark:text-amber-200">src/services/marketData.ts</code>。
        </p>
      )}
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
        {cells.map((c) => (
          <div key={c.label} className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-2">
            <div className="text-xs text-slate-500 dark:text-slate-400">{c.label}</div>
            <div className={`text-sm font-semibold mt-0.5 ${isPlaceholder ? 'text-slate-400 dark:text-slate-500 italic' : 'text-slate-900 dark:text-slate-100'}`}>
              {c.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
