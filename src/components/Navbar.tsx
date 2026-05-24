import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { to: '/', label: '首頁' },
  { to: '/stack', label: 'AI 軟體堆疊' },
  { to: '/categories', label: '產業分類' },
  { to: '/companies', label: '公司列表' },
  { to: '/kpi', label: 'KPI 儀表板' },
  { to: '/catalysts', label: '催化事件' },
  { to: '/taiwan', label: '台灣供應鏈' },
  { to: '/investment-logic', label: '投資邏輯' },
  { to: '/methodology', label: '評分方法' },
  { to: '/glossary', label: '名詞解釋' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 bg-white/85 dark:bg-slate-950/85 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 text-white grid place-items-center font-black">
            AI
          </div>
          <div className="leading-tight">
            <div className="text-sm md:text-base font-bold">AI 軟體產業投資地圖</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">美股與台股｜教育性研究</div>
          </div>
        </Link>
        <nav className="hidden xl:flex items-center gap-0.5 flex-wrap">
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.to === '/'}
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="xl:hidden btn-ghost !px-3"
            onClick={() => setOpen((o) => !o)}
            aria-label="toggle menu"
          >
            ☰
          </button>
        </div>
      </div>
      {open && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-2 gap-1">
            {navItems.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200'
                      : 'text-slate-700 dark:text-slate-300'
                  }`
                }
              >
                {it.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
