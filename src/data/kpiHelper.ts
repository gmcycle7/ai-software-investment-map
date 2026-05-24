import type { InvestmentKpi, ConfidenceLevel } from '../types/company';

// 預設 KPI：所有分數為 50（中性）。建立公司資料時 override 需要強調的欄位即可。
// 重要：所有分數皆為「產業邏輯評分」，未串接即時財務資料。
export const defaultKpi = (overrides: Partial<InvestmentKpi> & {
  kpiCommentary?: string;
  kpiConfidenceLevel?: ConfidenceLevel;
  kpiLastUpdated?: string;
  kpiSourceUrls?: string[];
} = {}): InvestmentKpi => {
  const base: InvestmentKpi = {
    shortTermScore: 0,
    threeYearScore: 0,
    fiveYearScore: 0,
    tenYearScore: 0,
    realAiRevenueConfidenceScore: 0,
    aiDisruptionRiskScore: 0,

    aiProductLaunchMomentum: 50,
    revenueAcceleration: 50,
    earningsRevisionMomentum: 50,
    enterpriseAdoptionSignal: 50,
    marketNarrativeStrength: 50,
    valuationReratingPotential: 50,
    nearTermCompetitionRiskInverse: 50,

    aiRevenueExposureScore: 50,
    productAttachRate: 50,
    usageBasedRevenuePotential: 50,
    enterpriseAdoption: 50,
    pricingPower: 50,
    grossMarginSustainability: 50,
    salesExecution: 50,

    dataMoat: 50,
    workflowLockIn: 50,
    ecosystemIntegration: 50,
    switchingCost: 50,
    modelInfrastructureAdvantage: 50,
    developerEcosystem: 50,
    brandTrust: 50,

    platformPotential: 50,
    tamExpansion: 50,
    aiNativeArchitecture: 50,
    modelCommoditizationResilience: 50,
    distributionAdvantage: 50,
    rdCapability: 50,
    balanceSheetResilience: 50,

    disclosedAiRevenue: 50,
    paidAiProductAdoption: 50,
    customerCaseEvidence: 50,
    usageGrowthEvidence: 50,
    pricingEvidence: 50,
    retentionEvidence: 50,
    sourceConfidence: 50,

    productSubstitutionRisk: 30,
    aiNativeCompetitorRisk: 30,
    marginCompressionRisk: 30,
    seatPricingDisruptionRisk: 30,
    openSourceCompetitionRisk: 30,
    churnRisk: 30,

    kpiCommentary: '',
    kpiConfidenceLevel: 'Medium',
    kpiLastUpdated: '2026-05-24',
    kpiSourceUrls: [],
  };

  const merged: InvestmentKpi = { ...base, ...overrides };

  merged.shortTermScore = round(
    0.2 * merged.aiProductLaunchMomentum +
      0.2 * merged.revenueAcceleration +
      0.15 * merged.earningsRevisionMomentum +
      0.15 * merged.enterpriseAdoptionSignal +
      0.15 * merged.marketNarrativeStrength +
      0.1 * merged.valuationReratingPotential +
      0.05 * merged.nearTermCompetitionRiskInverse,
  );

  merged.threeYearScore = round(
    0.25 * merged.aiRevenueExposureScore +
      0.2 * merged.productAttachRate +
      0.15 * merged.usageBasedRevenuePotential +
      0.15 * merged.enterpriseAdoption +
      0.15 * merged.pricingPower +
      0.1 * merged.salesExecution,
  );

  merged.fiveYearScore = round(
    0.25 * merged.dataMoat +
      0.2 * merged.workflowLockIn +
      0.15 * merged.ecosystemIntegration +
      0.15 * merged.switchingCost +
      0.1 * merged.modelInfrastructureAdvantage +
      0.1 * merged.developerEcosystem +
      0.05 * merged.brandTrust,
  );

  merged.tenYearScore = round(
    0.2 * merged.platformPotential +
      0.2 * merged.tamExpansion +
      0.15 * merged.aiNativeArchitecture +
      0.15 * merged.modelCommoditizationResilience +
      0.15 * merged.distributionAdvantage +
      0.1 * merged.rdCapability +
      0.05 * merged.balanceSheetResilience,
  );

  merged.realAiRevenueConfidenceScore = round(
    0.25 * merged.disclosedAiRevenue +
      0.2 * merged.paidAiProductAdoption +
      0.15 * merged.customerCaseEvidence +
      0.15 * merged.usageGrowthEvidence +
      0.1 * merged.pricingEvidence +
      0.1 * merged.retentionEvidence +
      0.05 * merged.sourceConfidence,
  );

  merged.aiDisruptionRiskScore = round(
    0.2 * merged.productSubstitutionRisk +
      0.2 * merged.aiNativeCompetitorRisk +
      0.15 * merged.marginCompressionRisk +
      0.15 * merged.seatPricingDisruptionRisk +
      0.15 * merged.openSourceCompetitionRisk +
      0.15 * merged.churnRisk,
  );

  return merged;
};

function round(n: number): number {
  return Math.round(n * 10) / 10;
}
