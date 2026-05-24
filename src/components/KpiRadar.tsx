import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import type { Company } from '../types/company';

export function KpiRadar({ company, compare }: { company: Company; compare?: Company }) {
  const data = [
    { key: '短期催化', a: company.investmentKpi.shortTermScore, b: compare?.investmentKpi.shortTermScore },
    { key: '三年成長', a: company.investmentKpi.threeYearScore, b: compare?.investmentKpi.threeYearScore },
    { key: '五年護城河', a: company.investmentKpi.fiveYearScore, b: compare?.investmentKpi.fiveYearScore },
    { key: '十年結構價值', a: company.investmentKpi.tenYearScore, b: compare?.investmentKpi.tenYearScore },
    { key: '真實 AI 營收可信度', a: company.investmentKpi.realAiRevenueConfidenceScore, b: compare?.investmentKpi.realAiRevenueConfidenceScore },
    { key: '抗顛覆 (100-顛覆)', a: 100 - company.investmentKpi.aiDisruptionRiskScore, b: compare ? 100 - compare.investmentKpi.aiDisruptionRiskScore : undefined },
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="key" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Radar name={company.nameZh ?? company.name} dataKey="a" stroke="#1a5bdb" fill="#1a5bdb" fillOpacity={0.35} />
          {compare && (
            <Radar name={compare.nameZh ?? compare.name} dataKey="b" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
          )}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
