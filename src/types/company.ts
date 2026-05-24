// 公司資料 schema：用於 AI 軟體產業投資地圖
// 重要：所有 KPI 分數皆為「產業邏輯評分」，未串接即時財務資料
// 任何不確定的欄位請標示為「需要資料驗證」並降低 confidenceLevel

export type Market = 'US' | 'Taiwan' | 'Private' | 'Europe' | 'Japan' | 'Other';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export type AiRevenueExposure = 'High' | 'Medium' | 'Low' | 'Needs Verification';

export type BusinessModel =
  | 'Subscription'
  | 'Usage-based'
  | 'Advertising'
  | 'License'
  | 'Hybrid'
  | 'Needs Verification';

// AI 軟體投資分類（依據工作流程位置）
export type AiSoftwareCategory =
  | 'foundation-model'
  | 'cloud-ai-platform'
  | 'enterprise-saas'
  | 'data-platform'
  | 'ai-agent'
  | 'ai-coding'
  | 'cybersecurity'
  | 'ai-search-ads'
  | 'vertical-saas'
  | 'eda-semiconductor'
  | 'industrial-ai';

// AI 軟體投資型態（依據競爭護城河來源）
export type CompanyInvestmentType =
  | 'platform' // 平台型 AI 軟體公司
  | 'model-provider' // 模型供應商
  | 'data-moat' // 資料護城河型
  | 'workflow-lockin' // 工作流程鎖定型
  | 'ai-upsell-saas' // AI 加值型 SaaS
  | 'ai-native-challenger' // AI 原生挑戰者
  | 'disruption-risk'; // 被 AI 顛覆風險型

// 台灣供應鏈標籤
export type TaiwanExposureLabel =
  | 'direct-ai-software'
  | 'indirect-ai-software'
  | 'system-integration'
  | 'needs-verification';

export interface InvestmentKpi {
  // ---- 主要分數 ----
  shortTermScore: number; // 短期催化分數 3~12 個月
  threeYearScore: number; // 三年成長分數
  fiveYearScore: number; // 五年護城河分數
  tenYearScore: number; // 十年結構性價值分數
  realAiRevenueConfidenceScore: number; // AI 真實營收可信度
  aiDisruptionRiskScore: number; // AI 顛覆風險（分數越高代表風險越高）

  // ---- 短期催化子分數 ----
  aiProductLaunchMomentum: number;
  revenueAcceleration: number;
  earningsRevisionMomentum: number;
  enterpriseAdoptionSignal: number;
  marketNarrativeStrength: number;
  valuationReratingPotential: number;
  nearTermCompetitionRiskInverse: number; // 越高代表「短期競爭風險低」

  // ---- 三年成長子分數 ----
  aiRevenueExposureScore: number;
  productAttachRate: number;
  usageBasedRevenuePotential: number;
  enterpriseAdoption: number;
  pricingPower: number;
  grossMarginSustainability: number;
  salesExecution: number;

  // ---- 五年護城河子分數 ----
  dataMoat: number;
  workflowLockIn: number;
  ecosystemIntegration: number;
  switchingCost: number;
  modelInfrastructureAdvantage: number;
  developerEcosystem: number;
  brandTrust: number;

  // ---- 十年結構性價值子分數 ----
  platformPotential: number;
  tamExpansion: number;
  aiNativeArchitecture: number;
  modelCommoditizationResilience: number;
  distributionAdvantage: number;
  rdCapability: number;
  balanceSheetResilience: number;

  // ---- AI 真實營收可信度子分數 ----
  disclosedAiRevenue: number;
  paidAiProductAdoption: number;
  customerCaseEvidence: number;
  usageGrowthEvidence: number;
  pricingEvidence: number;
  retentionEvidence: number;
  sourceConfidence: number;

  // ---- AI 顛覆風險子分數（越高 = 顛覆風險越高）----
  productSubstitutionRisk: number;
  aiNativeCompetitorRisk: number;
  marginCompressionRisk: number;
  seatPricingDisruptionRisk: number;
  openSourceCompetitionRisk: number;
  churnRisk: number;

  // ---- 元資料 ----
  kpiCommentary: string;
  kpiConfidenceLevel: ConfidenceLevel;
  kpiLastUpdated: string;
  kpiSourceUrls: string[];
}

export interface Company {
  id: string;
  name: string;
  nameZh?: string;
  ticker: string;
  market: Market;
  category: AiSoftwareCategory[];
  aiSoftwareType: string[];
  coreProducts: string[];
  aiProducts: string[];
  whatTheyDo: string;
  whyAiRelevant: string;
  monetizationModel: string[];
  aiRevenueExposure: AiRevenueExposure;
  competitiveAdvantage: string;
  competitors: string[];
  mainRisks: string[];
  aiMoat: string;
  customerType: string[];
  businessModel: BusinessModel;
  sourceUrls: string[];
  confidenceLevel: ConfidenceLevel;
  lastUpdated: string;
  investmentType: CompanyInvestmentType[];
  taiwanLabel?: TaiwanExposureLabel; // 台股公司專用
  analystView?: string; // 主觀分析觀點（與事實型欄位視覺隔離，琥珀色邊框呈現）
  tags?: string[]; // 跨類別搜尋用的自由標籤（例：copilot、agent、open-source、govt、smb）
  technicalKeywords?: string[]; // 技術相關關鍵字（例：MCP、LoRA、TPU、Vector Search、Bedrock）
  investmentKpi: InvestmentKpi;
}
