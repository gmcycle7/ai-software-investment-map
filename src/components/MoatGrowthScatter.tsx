import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Company } from '../types/company';

interface Props {
  companies: Company[];
  xKey: 'threeYearScore' | 'realAiRevenueConfidenceScore' | 'aiDisruptionRiskScore';
  yKey: 'fiveYearScore' | 'tenYearScore' | 'shortTermScore';
  xLabel: string;
  yLabel: string;
}

const colorByMarket: Record<string, string> = {
  US: '#1a5bdb',
  Taiwan: '#10b981',
  Private: '#64748b',
  Europe: '#8b5cf6',
  Japan: '#ec4899',
  Other: '#94a3b8',
};

interface Point {
  id: string;
  name: string;
  ticker: string;
  market: string;
  x: number;
  y: number;
}

export function MoatGrowthScatter({ companies, xKey, yKey, xLabel, yLabel }: Props) {
  const [hover, setHover] = useState<Point | null>(null);

  const points: Point[] = useMemo(
    () =>
      companies.map((c) => ({
        id: c.id,
        name: c.nameZh ?? c.name,
        ticker: c.ticker,
        market: c.market,
        x: c.investmentKpi[xKey],
        y: c.investmentKpi[yKey],
      })),
    [companies, xKey, yKey],
  );

  // ViewBox dimensions
  const W = 480;
  const H = 320;
  const padL = 50;
  const padB = 36;
  const padT = 12;
  const padR = 12;

  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const toX = (v: number) => padL + (v / 100) * plotW;
  const toY = (v: number) => padT + plotH - (v / 100) * plotH;

  const gridSteps = [0, 25, 50, 75, 100];
  const marketColors = Object.entries(colorByMarket);

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-96" role="img" aria-label={`${xLabel} vs ${yLabel}`}>
        {/* Grid lines */}
        {gridSteps.map((g) => (
          <g key={`gx-${g}`}>
            <line
              x1={toX(g)}
              y1={padT}
              x2={toX(g)}
              y2={padT + plotH}
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth={1}
              strokeDasharray={g === 0 || g === 100 ? undefined : '3 3'}
            />
            <text
              x={toX(g)}
              y={padT + plotH + 14}
              textAnchor="middle"
              fontSize={10}
              className="fill-slate-500 dark:fill-slate-400"
            >
              {g}
            </text>
          </g>
        ))}
        {gridSteps.map((g) => (
          <g key={`gy-${g}`}>
            <line
              x1={padL}
              y1={toY(g)}
              x2={padL + plotW}
              y2={toY(g)}
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth={1}
              strokeDasharray={g === 0 || g === 100 ? undefined : '3 3'}
            />
            <text
              x={padL - 6}
              y={toY(g) + 3}
              textAnchor="end"
              fontSize={10}
              className="fill-slate-500 dark:fill-slate-400"
            >
              {g}
            </text>
          </g>
        ))}

        {/* Axis labels */}
        <text
          x={padL + plotW / 2}
          y={H - 4}
          textAnchor="middle"
          fontSize={11}
          className="fill-slate-700 dark:fill-slate-300"
        >
          {xLabel}
        </text>
        <text
          x={12}
          y={padT + plotH / 2}
          textAnchor="middle"
          fontSize={11}
          transform={`rotate(-90 12 ${padT + plotH / 2})`}
          className="fill-slate-700 dark:fill-slate-300"
        >
          {yLabel}
        </text>

        {/* Points */}
        {points.map((p) => (
          <circle
            key={p.id}
            cx={toX(p.x)}
            cy={toY(p.y)}
            r={hover?.id === p.id ? 7 : 5}
            fill={colorByMarket[p.market] || '#64748b'}
            fillOpacity={0.75}
            stroke="white"
            strokeWidth={1}
            className="cursor-pointer transition-all"
            onMouseEnter={() => setHover(p)}
            onMouseLeave={() => setHover(null)}
          >
            <title>
              {p.name} ({p.ticker}) — {xLabel}:{p.x.toFixed(1)} {yLabel}:{p.y.toFixed(1)}
            </title>
          </circle>
        ))}
      </svg>

      {/* Tooltip with link (HTML overlay) */}
      {hover && (
        <Link
          to={`/companies/${hover.id}`}
          className="absolute top-2 right-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow px-3 py-2 text-xs hover:shadow-md"
        >
          <div className="font-semibold text-slate-900 dark:text-slate-100">
            {hover.name} <span className="text-slate-500 dark:text-slate-400 font-normal">{hover.ticker}</span>
          </div>
          <div className="text-slate-600 dark:text-slate-400 mt-0.5">
            {xLabel}: <strong>{hover.x.toFixed(1)}</strong> · {yLabel}: <strong>{hover.y.toFixed(1)}</strong>
          </div>
          <div className="text-brand-700 dark:text-brand-300 mt-1">→ 公司頁</div>
        </Link>
      )}

      {/* Legend */}
      <div className="mt-2 flex flex-wrap gap-3 justify-center text-xs">
        {marketColors.map(([m, c]) => (
          <span key={m} className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
            {marketLabel(m)}
          </span>
        ))}
      </div>
    </div>
  );
}

function marketLabel(m: string): string {
  const map: Record<string, string> = {
    US: '美股',
    Taiwan: '台股',
    Private: '未上市',
    Europe: '歐股',
    Japan: '日股',
    Other: '其他',
  };
  return map[m] || m;
}
