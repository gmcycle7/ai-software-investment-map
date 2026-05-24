import { Link } from 'react-router-dom';
import { STACK_LAYERS, PRESSURE_EVENTS } from '../data/stack';
import { ALL_COMPANIES } from '../data/aiSoftwareCompanies';
import { CATEGORIES } from '../data/categories';
import type { AiSoftwareCategory } from '../types/company';

export default function Stack() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="section-title">AI 軟體堆疊（Stack）</h1>
        <p className="section-subtitle">
          7 層垂直分工 + 各層收錄公司 + 壓力傳導圖。理解 AI 軟體投資的關鍵是看清「每一層的競爭結構」與「層與層之間如何互相施壓」。
        </p>
      </header>

      <section className="space-y-3">
        {STACK_LAYERS.map((layer, idx) => {
          const companies = ALL_COMPANIES.filter((c) =>
            c.category.some((cat) => (layer.mappedCategories as string[]).includes(cat)),
          ).slice(0, 12);
          return (
            <div key={layer.id} className="card overflow-hidden">
              <div className={`${layer.color} text-white p-4 flex items-start gap-4`}>
                <div className="w-12 h-12 rounded-lg bg-white/20 grid place-items-center font-extrabold text-lg flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <div className="font-bold text-lg">{layer.title}</div>
                  <div className="text-xs opacity-80">{layer.titleEn}</div>
                  <div className="text-sm mt-1 opacity-95">{layer.shortDesc}</div>
                </div>
              </div>
              <div className="p-4 grid lg:grid-cols-3 gap-4 text-sm">
                <Field label="說明">{layer.longDesc}</Field>
                <Field label="變現方式">{layer.monetization}</Field>
                <Field label="代表公司 / 產品">
                  {layer.examples.join('、')}
                </Field>
                <Field label="↓ 上層帶來的壓力">{layer.pressureFromAbove}</Field>
                <Field label="↑ 下層帶來的壓力">{layer.pressureFromBelow}</Field>
                <Field label="對應分類">
                  {layer.mappedCategories.length === 0 ? (
                    <span className="text-slate-500 dark:text-slate-400">本層為「企業資料層」，無對應收錄分類</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {layer.mappedCategories.map((cid) => {
                        const c = CATEGORIES.find((cc) => cc.id === cid as AiSoftwareCategory);
                        if (!c) return null;
                        return (
                          <Link
                            key={cid}
                            to={`/categories/${cid}`}
                            className="chip bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {c.titleZh}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </Field>
              </div>
              {companies.length > 0 && (
                <div className="px-4 pb-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">收錄於本層的公司（最多顯示 12 家）</div>
                  <div className="flex flex-wrap gap-1.5">
                    {companies.map((c) => (
                      <Link
                        key={c.id}
                        to={`/companies/${c.id}`}
                        className="chip bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-slate-800 dark:text-brand-300"
                      >
                        {c.nameZh ?? c.name} <span className="opacity-60">{c.ticker}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <section>
        <h2 className="section-title">壓力傳導：典型催化事件</h2>
        <p className="section-subtitle">每個事件對堆疊不同層的影響不同。投資要從事件出發、回推哪一層受惠 / 受害。</p>
        <div className="mt-4 grid lg:grid-cols-2 gap-3">
          {PRESSURE_EVENTS.map((ev) => (
            <article key={ev.id} className="card p-5">
              <h3 className="font-bold text-base">{ev.title}</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-1.5">{ev.desc}</p>
              {ev.winners.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">受惠</div>
                  <ul className="text-sm space-y-1">
                    {ev.winners.map((w, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="chip bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 self-start">{w.layer}</span>
                        <span className="text-slate-700 dark:text-slate-300">{w.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {ev.losers.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs font-semibold text-rose-700 dark:text-rose-400 mb-1">受壓 / 受害</div>
                  <ul className="text-sm space-y-1">
                    {ev.losers.map((l, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="chip bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200 self-start">{l.layer}</span>
                        <span className="text-slate-700 dark:text-slate-300">{l.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</div>
      <div className="text-slate-800 dark:text-slate-200">{children}</div>
    </div>
  );
}
