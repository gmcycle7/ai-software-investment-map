import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
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

export function MoatGrowthScatter({ companies, xKey, yKey, xLabel, yLabel }: Props) {
  const data = companies.map((c) => ({
    name: c.nameZh ?? c.name,
    ticker: c.ticker,
    market: c.market,
    x: c.investmentKpi[xKey],
    y: c.investmentKpi[yKey],
  }));

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            name={xLabel}
            domain={[0, 100]}
            label={{ value: xLabel, position: 'insideBottom', offset: -10, fontSize: 12 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yLabel}
            domain={[0, 100]}
            label={{ value: yLabel, angle: -90, position: 'insideLeft', offset: 10, fontSize: 12 }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-white p-2 border border-slate-200 rounded-lg shadow text-xs">
                  <div className="font-semibold">{d.name} ({d.ticker})</div>
                  <div>{xLabel}: {d.x}</div>
                  <div>{yLabel}: {d.y}</div>
                </div>
              );
            }}
          />
          <Scatter data={data}>
            {data.map((d, i) => (
              <Cell key={i} fill={colorByMarket[d.market] || '#64748b'} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
