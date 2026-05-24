import { Link } from 'react-router-dom';
import type { Company } from '../types/company';

export function DisruptionHeatmap({ companies }: { companies: Company[] }) {
  const sorted = [...companies].sort(
    (a, b) => b.investmentKpi.aiDisruptionRiskScore - a.investmentKpi.aiDisruptionRiskScore,
  );

  return (
    <div className="card p-5">
      <h3 className="text-lg font-bold">AI 顛覆風險熱力圖</h3>
      <p className="section-subtitle">分數越高 = 顛覆風險越高（紅）。本表為「產業邏輯評分」。</p>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {sorted.slice(0, 32).map((c) => (
          <Link
            key={c.id}
            to={`/companies/${c.id}`}
            className="rounded-lg p-3 text-white text-xs hover:opacity-90"
            style={{ backgroundColor: riskColor(c.investmentKpi.aiDisruptionRiskScore) }}
          >
            <div className="font-bold">{c.nameZh ?? c.name}</div>
            <div className="opacity-80">{c.ticker}</div>
            <div className="mt-1 text-base font-extrabold">
              {c.investmentKpi.aiDisruptionRiskScore.toFixed(1)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function riskColor(score: number) {
  // 0 (綠) → 100 (紅)
  const r = Math.round(255 * (score / 100));
  const g = Math.round(180 * (1 - score / 100));
  const b = 80;
  return `rgb(${r}, ${g}, ${b})`;
}
