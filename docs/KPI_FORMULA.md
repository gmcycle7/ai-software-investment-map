# KPI 公式定義

實作位置：`src/data/kpiHelper.ts`。所有主分數皆由子分數加權平均得出。

## 短期催化分數（3~12 月）

```
shortTermScore =
  0.20 * aiProductLaunchMomentum +
  0.20 * revenueAcceleration +
  0.15 * earningsRevisionMomentum +
  0.15 * enterpriseAdoptionSignal +
  0.15 * marketNarrativeStrength +
  0.10 * valuationReratingPotential +
  0.05 * nearTermCompetitionRiskInverse
```

`nearTermCompetitionRiskInverse` 為「短期競爭風險的逆向值」（越高表示風險越低）。

## 三年成長分數

```
threeYearScore =
  0.25 * aiRevenueExposureScore +
  0.20 * productAttachRate +
  0.15 * usageBasedRevenuePotential +
  0.15 * enterpriseAdoption +
  0.15 * pricingPower +
  0.10 * salesExecution
```

## 五年護城河分數

```
fiveYearScore =
  0.25 * dataMoat +
  0.20 * workflowLockIn +
  0.15 * ecosystemIntegration +
  0.15 * switchingCost +
  0.10 * modelInfrastructureAdvantage +
  0.10 * developerEcosystem +
  0.05 * brandTrust
```

## 十年結構性價值分數

```
tenYearScore =
  0.20 * platformPotential +
  0.20 * tamExpansion +
  0.15 * aiNativeArchitecture +
  0.15 * modelCommoditizationResilience +
  0.15 * distributionAdvantage +
  0.10 * rdCapability +
  0.05 * balanceSheetResilience
```

## 真實 AI 營收可信度分數

```
realAiRevenueConfidenceScore =
  0.25 * disclosedAiRevenue +
  0.20 * paidAiProductAdoption +
  0.15 * customerCaseEvidence +
  0.15 * usageGrowthEvidence +
  0.10 * pricingEvidence +
  0.10 * retentionEvidence +
  0.05 * sourceConfidence
```

## AI 顛覆風險分數（越高 = 風險越高）

```
aiDisruptionRiskScore =
  0.20 * productSubstitutionRisk +
  0.20 * aiNativeCompetitorRisk +
  0.15 * marginCompressionRisk +
  0.15 * seatPricingDisruptionRisk +
  0.15 * openSourceCompetitionRisk +
  0.15 * churnRisk
```

## 子分數定義（簡述）

| 子分數 | 高分代表 |
| --- | --- |
| aiProductLaunchMomentum | 近期 AI 產品發布密度與品質 |
| revenueAcceleration | 營收年增率 / 季增率近期加速 |
| earningsRevisionMomentum | 賣方 EPS / 營收上修動能 |
| enterpriseAdoptionSignal | 大企業導入訊號（簽約、Bootcamp、客戶 logo） |
| marketNarrativeStrength | 市場敘事熱度（不代表真實營收） |
| valuationReratingPotential | 評價可以向上重評的空間（越便宜越高） |
| aiRevenueExposureScore | AI 收入佔總營收的潛在比重 |
| productAttachRate | AI 加值模組的加購率 |
| usageBasedRevenuePotential | 用量計費模式的擴張空間 |
| enterpriseAdoption | 企業滲透率 |
| pricingPower | 提價能力 |
| salesExecution | 業務組織能力 |
| dataMoat | 專有資料 / 客戶資料的累積 |
| workflowLockIn | 客戶離不開的程度 |
| ecosystemIntegration | 與其他系統 / SaaS 的整合廣度 |
| switchingCost | 客戶更換成本 |
| modelInfrastructureAdvantage | 模型 / 算力 / 推論成本優勢 |
| developerEcosystem | 開發者數量與品牌 |
| brandTrust | 品牌信任 |
| platformPotential | 是否能成為下世代平台 |
| tamExpansion | TAM 是否會自然擴張 |
| aiNativeArchitecture | 是否為 AI-native 架構 |
| modelCommoditizationResilience | 對「模型商品化」的抗性 |
| distributionAdvantage | 通路分發優勢 |
| rdCapability | 研發能力 |
| balanceSheetResilience | 資產負債韌性 |
| disclosedAiRevenue | 是否有明確揭露 AI ARR / 營收 |
| paidAiProductAdoption | 真實付費客戶採用率 |
| customerCaseEvidence | 公開客戶案例的數量與品質 |
| usageGrowthEvidence | 用量（Token、API call、AI seat）成長 |
| pricingEvidence | 真實付費價格的證據 |
| retentionEvidence | 留存與續約證據 |
| sourceConfidence | 資料來源的可信度 |
| productSubstitutionRisk | 產品是否可能被 AI 直接取代 |
| aiNativeCompetitorRisk | 來自 AI 原生對手的競爭 |
| marginCompressionRisk | 推論成本壓縮毛利 |
| seatPricingDisruptionRisk | 席次定價被 Agent 取代的風險 |
| openSourceCompetitionRisk | 來自開源模型 / 工具的競爭 |
| churnRisk | 客戶流失風險 |

## 注意

- 分數為「相對」評分（0~100），非絕對值
- 未經驗證的指標一律給保守分數
- 同一證據不重複計入多個子分數
