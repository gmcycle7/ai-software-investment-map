import { Link } from 'react-router-dom';
import { CATEGORIES, INVESTMENT_TYPES } from '../data/categories';
import { ALL_COMPANIES } from '../data/aiSoftwareCompanies';

export default function Categories() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title">AI 軟體 11 大分類</h1>
        <p className="section-subtitle">依工作流程位置（從應用到資料）分類，每類別都有自己的競爭結構與顛覆風險。</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {CATEGORIES.map((c) => {
          const count = ALL_COMPANIES.filter((x) => x.category.includes(c.id)).length;
          return (
            <Link key={c.id} to={`/categories/${c.id}`} className="card p-5 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">分類 {c.letter} · 堆疊層：{c.stackLayer}</div>
                  <h3 className="text-lg font-bold mt-0.5">{c.titleZh}</h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{c.titleEn}</div>
                </div>
                <div className="text-right text-xs text-slate-500 dark:text-slate-400">
                  <div className="text-2xl font-extrabold text-brand-700">{count}</div>
                  收錄家數
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-3">{c.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.monetization.slice(0, 3).map((m) => (
                  <span key={m} className="chip bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">{m}</span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      <section>
        <h2 className="section-title">公司投資型態（依護城河來源）</h2>
        <p className="section-subtitle">同一家公司可同時屬於多種型態。</p>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {INVESTMENT_TYPES.map((t) => (
            <div key={t.id} className="card p-4">
              <h3 className="font-bold text-base">{t.titleZh}</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{t.definition}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">範例：{t.examples}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
