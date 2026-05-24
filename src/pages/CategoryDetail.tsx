import { Link, useParams } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { ALL_COMPANIES } from '../data/aiSoftwareCompanies';
import { CompanyCard } from '../components/CompanyCard';
import { ComparisonTable } from '../components/ComparisonTable';
import type { AiSoftwareCategory } from '../types/company';

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>();
  const meta = CATEGORIES.find((c) => c.id === id);
  if (!meta) {
    return (
      <div className="card p-6">
        找不到分類。<Link to="/categories" className="text-brand-700 underline">返回分類列表</Link>
      </div>
    );
  }
  const companies = ALL_COMPANIES.filter((c) =>
    c.category.includes(meta.id as AiSoftwareCategory),
  );

  return (
    <div className="space-y-6">
      <div>
        <Link to="/categories" className="text-sm text-brand-700 hover:underline">← 返回分類</Link>
        <h1 className="section-title mt-2">
          {meta.titleZh} <span className="text-base text-slate-500 dark:text-slate-400 font-normal">{meta.titleEn}</span>
        </h1>
        <p className="section-subtitle">{meta.summary}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Block title="說明">{meta.description}</Block>
        <Block title="變現模式">
          <ul className="list-disc pl-5 space-y-1">
            {meta.monetization.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </Block>
        <Block title="主要風險">
          <ul className="list-disc pl-5 space-y-1">
            {meta.risks.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </Block>
        <Block title="所在堆疊層">{meta.stackLayer}</Block>
      </div>

      <section>
        <h2 className="section-title">收錄公司（{companies.length}）</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {companies.map((c) => <CompanyCard key={c.id} company={c} />)}
        </div>
      </section>

      <ComparisonTable companies={companies} title="比較表" />
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <h3 className="font-bold text-base">{title}</h3>
      <div className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{children}</div>
    </div>
  );
}
