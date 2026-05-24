# 資料 Schema 說明

`src/types/company.ts` 定義所有公司資料結構。

## Company

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| id | string | 全站唯一 ID（kebab-case 或 ticker 小寫） |
| name | string | 英文 / 國際名 |
| nameZh | string? | 中文名（可選） |
| ticker | string | 股票代號；私有公司為 `PRIVATE` |
| market | `'US' \| 'Taiwan' \| 'Private' \| 'Europe' \| 'Japan' \| 'Other'` | 市場 |
| category | `AiSoftwareCategory[]` | 一家公司可同時屬於多個分類 |
| aiSoftwareType | string[] | 自由文字標籤，便於閱讀 |
| coreProducts | string[] | 主要產品 |
| aiProducts | string[] | AI 相關產品 |
| whatTheyDo | string | 公司主業（中文敘述） |
| whyAiRelevant | string | 為何與 AI 軟體投資相關 |
| monetizationModel | string[] | 變現方式（含中英混用名詞） |
| aiRevenueExposure | `'High' \| 'Medium' \| 'Low' \| 'Needs Verification'` | AI 營收曝險主觀分級 |
| competitiveAdvantage | string | 競爭優勢 |
| competitors | string[] | 主要競爭者 |
| mainRisks | string[] | 主要風險（條列） |
| aiMoat | string | AI 護城河 |
| customerType | string[] | 客戶類型（企業 / 中小企業 / 政府 / 消費者 / 開發者 等） |
| businessModel | `'Subscription' \| 'Usage-based' \| 'Advertising' \| 'License' \| 'Hybrid' \| 'Needs Verification'` | 商業模式 |
| sourceUrls | string[] | 資料來源 URL（IR 或官方頁面） |
| confidenceLevel | `'High' \| 'Medium' \| 'Low'` | 資料整體可信度 |
| lastUpdated | string (YYYY-MM-DD) | 最後更新日 |
| investmentType | `CompanyInvestmentType[]` | 公司投資型態（依護城河來源） |
| taiwanLabel | `TaiwanExposureLabel?` | 台股公司專用四級標籤 |
| investmentKpi | `InvestmentKpi` | KPI 子分數 + 主分數 + 元資料 |

## AiSoftwareCategory（11 大分類）

`foundation-model | cloud-ai-platform | enterprise-saas | data-platform | ai-agent | ai-coding | cybersecurity | ai-search-ads | vertical-saas | eda-semiconductor | industrial-ai`

## CompanyInvestmentType（依護城河來源）

`platform | model-provider | data-moat | workflow-lockin | ai-upsell-saas | ai-native-challenger | disruption-risk`

## TaiwanExposureLabel（嚴格四級）

`direct-ai-software | indirect-ai-software | system-integration | needs-verification`

## InvestmentKpi

主分數（由公式自動計算）：

- shortTermScore（3~12 月）
- threeYearScore（三年成長）
- fiveYearScore（五年護城河）
- tenYearScore（十年結構性價值）
- realAiRevenueConfidenceScore（真實 AI 營收可信度）
- aiDisruptionRiskScore（顛覆風險，越高越糟）

子分數共 40+ 個（見 `src/types/company.ts`），加上：

- kpiCommentary（評語）
- kpiConfidenceLevel（KPI 可信度）
- kpiLastUpdated（KPI 更新日）
- kpiSourceUrls（KPI 來源）

## 加入新公司的最小步驟

1. 在 `src/data/companies/` 下相應檔案新增 `Company` 物件
2. 使用 `defaultKpi({ ... overrides })` 避免逐欄填寫
3. 確保 `sourceUrls`、`confidenceLevel`、`lastUpdated`、`investmentType` 都有寫入
4. 跑 `npm run typecheck`
