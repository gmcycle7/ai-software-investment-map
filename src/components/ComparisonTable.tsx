import { Link } from 'react-router-dom';
import type { Company } from '../types/company';

interface Props {
  companies: Company[];
  title?: string;
}

export function ComparisonTable({ companies, title }: Props) {
  return (
    <div className="card overflow-hidden">
      {title && (
        <div className="p-4 border-b border-slate-200 font-bold text-base">{title}</div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs">
            <tr>
              <th className="text-left p-3">公司</th>
              <th className="text-left p-3">市場</th>
              <th className="text-right p-3">短期</th>
              <th className="text-right p-3">三年</th>
              <th className="text-right p-3">五年</th>
              <th className="text-right p-3">十年</th>
              <th className="text-right p-3">真實 AI 營收</th>
              <th className="text-right p-3">顛覆風險</th>
              <th className="text-left p-3">可信度</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="p-3">
                  <Link to={`/companies/${c.id}`} className="text-brand-700 font-medium hover:underline">
                    {c.nameZh ?? c.name}
                  </Link>
                  <div className="text-xs text-slate-500">{c.ticker}</div>
                </td>
                <td className="p-3 text-xs text-slate-600">{c.market}</td>
                <td className="p-3 text-right">{c.investmentKpi.shortTermScore.toFixed(1)}</td>
                <td className="p-3 text-right">{c.investmentKpi.threeYearScore.toFixed(1)}</td>
                <td className="p-3 text-right">{c.investmentKpi.fiveYearScore.toFixed(1)}</td>
                <td className="p-3 text-right">{c.investmentKpi.tenYearScore.toFixed(1)}</td>
                <td className="p-3 text-right">{c.investmentKpi.realAiRevenueConfidenceScore.toFixed(1)}</td>
                <td className="p-3 text-right text-rose-600">
                  {c.investmentKpi.aiDisruptionRiskScore.toFixed(1)}
                </td>
                <td className="p-3 text-xs">{c.confidenceLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
