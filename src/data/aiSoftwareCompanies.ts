import type { Company } from '../types/company';
import { PLATFORM_GIANTS } from './companies/platformGiants';
import { MODEL_PROVIDERS } from './companies/modelProviders';
import { ENTERPRISE_SAAS } from './companies/enterpriseSaas';
import { DATA_PLATFORM_AND_AGENTS } from './companies/dataPlatform';
import { DEV_TOOLS_AND_SECURITY } from './companies/devToolsAndSecurity';
import { ADS_AND_VERTICAL } from './companies/adsAndVertical';
import { EDA_AND_INDUSTRIAL } from './companies/edaAndIndustrial';
import { TAIWAN_COMPANIES } from './companies/taiwan';

// 全站唯一公司資料來源
// 注意：所有 KPI 分數皆為「產業邏輯評分，尚未串接即時財務資料」
export const ALL_COMPANIES: Company[] = [
  ...PLATFORM_GIANTS,
  ...MODEL_PROVIDERS,
  ...ENTERPRISE_SAAS,
  ...DATA_PLATFORM_AND_AGENTS,
  ...DEV_TOOLS_AND_SECURITY,
  ...ADS_AND_VERTICAL,
  ...EDA_AND_INDUSTRIAL,
  ...TAIWAN_COMPANIES,
];

export const COMPANY_BY_ID: Record<string, Company> = Object.fromEntries(
  ALL_COMPANIES.map((c) => [c.id, c]),
);
