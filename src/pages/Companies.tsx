import { useMemo, useState } from 'react';
import { ALL_COMPANIES } from '../data/aiSoftwareCompanies';
import { CompanyCard } from '../components/CompanyCard';
import { DEFAULT_FILTER, FilterPanel, type FilterState } from '../components/FilterPanel';

export default function Companies() {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  const filtered = useMemo(() => {
    return ALL_COMPANIES.filter((c) => {
      if (filter.market !== 'ALL' && c.market !== filter.market) return false;
      if (filter.category !== 'ALL' && !c.category.includes(filter.category)) return false;
      if (filter.businessModel !== 'ALL' && c.businessModel !== filter.businessModel) return false;
      if (filter.aiExposure !== 'ALL' && c.aiRevenueExposure !== filter.aiExposure) return false;
      if (filter.investmentType !== 'ALL' && !c.investmentType.includes(filter.investmentType)) return false;
      if (c.investmentKpi.threeYearScore < filter.minThreeYear) return false;
      if (c.investmentKpi.aiDisruptionRiskScore > filter.maxDisruption) return false;
      if (c.investmentKpi.realAiRevenueConfidenceScore < filter.minRealAiRevenue) return false;
      const q = filter.query.trim().toLowerCase();
      if (q) {
        const haystack = [
          c.name,
          c.nameZh,
          c.ticker,
          c.whatTheyDo,
          c.whyAiRelevant,
          c.competitiveAdvantage,
          c.aiMoat,
          ...(c.coreProducts ?? []),
          ...(c.aiProducts ?? []),
          ...(c.aiSoftwareType ?? []),
          ...(c.monetizationModel ?? []),
          ...(c.competitors ?? []),
          ...(c.customerType ?? []),
          ...(c.tags ?? []),
          ...(c.technicalKeywords ?? []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [filter]);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="section-title">公司列表</h1>
          <p className="section-subtitle">使用左方篩選器探索 {ALL_COMPANIES.length} 家 AI 軟體相關公司。</p>
        </div>
        <div className="text-sm text-slate-500">符合條件：{filtered.length}</div>
      </div>

      <FilterPanel value={filter} onChange={setFilter} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((c) => (
          <CompanyCard key={c.id} company={c} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="card p-8 text-center text-slate-500">沒有符合條件的公司，請放寬篩選。</div>
      )}
    </div>
  );
}
