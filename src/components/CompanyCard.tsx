import { Link } from 'react-router-dom';
import type { Company } from '../types/company';
import { CATEGORIES } from '../data/categories';
import { ConfidenceBadge, ExposureBadge, MarketBadge } from './Badges';

export function CompanyCard({ company }: { company: Company }) {
  const catLabels = company.category
    .map((id) => CATEGORIES.find((c) => c.id === id)?.titleZh)
    .filter(Boolean) as string[];

  return (
    <Link
      to={`/companies/${company.id}`}
      className="card p-4 hover:shadow-md transition block"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-bold leading-tight">
            {company.nameZh ?? company.name}
            <span className="ml-2 text-sm text-slate-500 font-medium">{company.name}</span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{company.ticker}</div>
        </div>
        <MarketBadge market={company.market} />
      </div>
      <p className="text-sm text-slate-700 mt-3 line-clamp-2">{company.whatTheyDo}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {catLabels.slice(0, 3).map((c) => (
          <span key={c} className="chip bg-slate-100 text-slate-700">
            {c}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        <ExposureBadge value={company.aiRevenueExposure} />
        <ConfidenceBadge level={company.confidenceLevel} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <Metric label="短期" v={company.investmentKpi.shortTermScore} />
        <Metric label="三年" v={company.investmentKpi.threeYearScore} />
        <Metric label="十年" v={company.investmentKpi.tenYearScore} />
      </div>
    </Link>
  );
}

function Metric({ label, v }: { label: string; v: number }) {
  return (
    <div className="bg-slate-50 rounded-lg p-2">
      <div className="text-slate-500">{label}</div>
      <div className="text-base font-bold text-brand-700">{v.toFixed(1)}</div>
    </div>
  );
}
