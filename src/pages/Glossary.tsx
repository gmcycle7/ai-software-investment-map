import { useMemo, useState } from 'react';
import { GLOSSARY, GLOSSARY_CATEGORIES, type GlossaryCategory } from '../data/glossary';

export default function Glossary() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<GlossaryCategory | 'ALL'>('ALL');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY.filter((t) => {
      if (activeCat !== 'ALL' && t.category !== activeCat) return false;
      if (!q) return true;
      const haystack = `${t.term} ${t.termEn ?? ''} ${t.definition} ${t.whyItMattersForInvestor ?? ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeCat]);

  const byCat: Record<string, typeof GLOSSARY> = {};
  for (const t of filtered) {
    (byCat[t.category] ??= []).push(t);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="section-title">AI 軟體名詞解釋</h1>
        <p className="section-subtitle">
          {GLOSSARY.length} 個術語：模型、訓練、推論、RAG、Agent、商業模式、風險、投資概念。中英對照、附投資人觀點。
        </p>
      </header>

      <div className="card p-4">
        <input
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm dark:bg-slate-900 dark:border-slate-700"
          placeholder="搜尋術語、定義、英文名…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="mt-3 flex flex-wrap gap-1.5">
          <CatChip active={activeCat === 'ALL'} onClick={() => setActiveCat('ALL')}>
            全部（{GLOSSARY.length}）
          </CatChip>
          {GLOSSARY_CATEGORIES.map((c) => {
            const count = GLOSSARY.filter((t) => t.category === c.id).length;
            return (
              <CatChip key={c.id} active={activeCat === c.id} onClick={() => setActiveCat(c.id)}>
                {c.label}（{count}）
              </CatChip>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="card p-8 text-center text-slate-500 dark:text-slate-400">沒有符合的術語。</div>
      )}

      {GLOSSARY_CATEGORIES.map((c) => {
        const items = byCat[c.id];
        if (!items || items.length === 0) return null;
        return (
          <section key={c.id} id={`cat-${c.id}`}>
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold">{c.label}</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">{c.desc}</span>
            </div>
            <div className="mt-3 grid lg:grid-cols-2 gap-3">
              {items.map((t) => (
                <article key={t.id} id={t.id} className="card p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold">{t.term}</h3>
                    {t.termEn && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">{t.termEn}</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                    {t.definition}
                  </p>
                  {t.whyItMattersForInvestor && (
                    <div className="mt-3 rounded-lg border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 text-xs text-slate-700 dark:text-slate-200">
                      <span className="font-semibold text-amber-700 dark:text-amber-300">投資意義</span>
                      <p className="mt-0.5">{t.whyItMattersForInvestor}</p>
                    </div>
                  )}
                  {t.related && t.related.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1 text-xs">
                      <span className="text-slate-500 dark:text-slate-400">相關：</span>
                      {t.related.map((rid) => {
                        const r = GLOSSARY.find((g) => g.id === rid);
                        if (!r) return null;
                        return (
                          <a key={rid} href={`#${rid}`} className="text-brand-700 hover:underline dark:text-brand-300">
                            {r.term.split('（')[0]}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function CatChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`chip ${active ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}
    >
      {children}
    </button>
  );
}
