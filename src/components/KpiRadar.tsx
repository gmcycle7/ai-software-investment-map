import type { Company } from '../types/company';

interface Props {
  company: Company;
  compare?: Company;
}

const AXES = [
  { key: 'shortTermScore' as const, label: '短期催化' },
  { key: 'threeYearScore' as const, label: '三年成長' },
  { key: 'fiveYearScore' as const, label: '五年護城河' },
  { key: 'tenYearScore' as const, label: '十年結構價值' },
  { key: 'realAiRevenueConfidenceScore' as const, label: '真實 AI 營收' },
  { key: 'antiDisruption' as const, label: '抗顛覆 (100-顛覆)' },
] as const;

function getValue(c: Company, k: (typeof AXES)[number]['key']): number {
  if (k === 'antiDisruption') return 100 - c.investmentKpi.aiDisruptionRiskScore;
  return c.investmentKpi[k];
}

export function KpiRadar({ company, compare }: Props) {
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;
  const n = AXES.length;

  // Pre-compute axis end points and label positions
  const axes = AXES.map((a, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return {
      ...a,
      angle,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      labelX: cx + Math.cos(angle) * (radius + 24),
      labelY: cy + Math.sin(angle) * (radius + 24),
    };
  });

  const ringSteps = [20, 40, 60, 80, 100];

  const polyPoints = (c: Company) =>
    axes
      .map((a, i) => {
        const v = getValue(c, AXES[i].key);
        const r = (radius * v) / 100;
        const x = cx + Math.cos(a.angle) * r;
        const y = cy + Math.sin(a.angle) * r;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto max-h-80 mx-auto"
        role="img"
        aria-label={`${company.name} KPI radar`}
      >
        {/* Concentric rings */}
        {ringSteps.map((step) => {
          const r = (radius * step) / 100;
          const pts = axes
            .map((a) => {
              const x = cx + Math.cos(a.angle) * r;
              const y = cy + Math.sin(a.angle) * r;
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(' ');
          return (
            <polygon
              key={step}
              points={pts}
              fill="none"
              className="stroke-slate-200 dark:stroke-slate-700"
              strokeWidth={1}
            />
          );
        })}

        {/* Axes */}
        {axes.map((a) => (
          <line
            key={a.label}
            x1={cx}
            y1={cy}
            x2={a.x}
            y2={a.y}
            className="stroke-slate-200 dark:stroke-slate-700"
            strokeWidth={1}
          />
        ))}

        {/* Compare polygon (drawn first, behind) */}
        {compare && (
          <polygon
            points={polyPoints(compare)}
            fill="rgba(245, 158, 11, 0.25)"
            stroke="#f59e0b"
            strokeWidth={1.5}
          />
        )}

        {/* Primary polygon */}
        <polygon
          points={polyPoints(company)}
          fill="rgba(26, 91, 219, 0.35)"
          stroke="#1a5bdb"
          strokeWidth={1.5}
        />

        {/* Axis labels */}
        {axes.map((a) => {
          const textAnchor =
            Math.abs(Math.cos(a.angle)) < 0.3 ? 'middle' : Math.cos(a.angle) > 0 ? 'start' : 'end';
          return (
            <text
              key={`l-${a.label}`}
              x={a.labelX}
              y={a.labelY}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              fontSize={11}
              className="fill-slate-700 dark:fill-slate-300"
            >
              {a.label}
            </text>
          );
        })}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={2} className="fill-slate-400 dark:fill-slate-500" />
      </svg>

      <div className="mt-2 flex items-center justify-center gap-4 text-xs">
        <LegendDot color="#1a5bdb" label={company.nameZh ?? company.name} />
        {compare && <LegendDot color="#f59e0b" label={compare.nameZh ?? compare.name} />}
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-slate-700 dark:text-slate-300">{label}</span>
    </span>
  );
}
