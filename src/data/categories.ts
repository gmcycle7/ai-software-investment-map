import type { AiSoftwareCategory, CompanyInvestmentType } from '../types/company';

export interface CategoryMeta {
  id: AiSoftwareCategory;
  letter: string;
  titleZh: string;
  titleEn: string;
  summary: string;
  description: string;
  monetization: string[];
  risks: string[];
  stackLayer: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'foundation-model',
    letter: 'A',
    titleZh: '基礎模型與模型 API',
    titleEn: 'Foundation Model / Model API',
    summary: '提供 LLM、多模態模型本體或推論 API 的公司，是 AI 軟體堆疊的最底層智慧層。',
    description:
      'LLM (Large Language Model)、多模態模型 (multimodal)、推論 API (inference API)、模型代管 (model hosting)。提供基礎模型本體或讓開發者透過 API 使用模型能力。',
    monetization: ['API 用量計費 (Usage-based)', '訂閱制 (Subscription)', '企業合約授權'],
    risks: ['訓練成本高昂', '推論毛利受 GPU 成本壓力', '模型商品化 (commoditization)', '開源模型競爭 (Llama / Mistral / DeepSeek)'],
    stackLayer: 'Model API / Foundation Model',
  },
  {
    id: 'cloud-ai-platform',
    letter: 'B',
    titleZh: '雲端 AI 平台',
    titleEn: 'Cloud AI Platform',
    summary: '提供 AI 算力、模型服務、資料服務的超大規模雲端業者，吃下 AI 基礎建設層的價值。',
    description:
      '雲端業者銷售 AI 算力、模型代管、資料服務。代表性產品包含 Azure AI、AWS Bedrock、Google Vertex AI。',
    monetization: ['雲端用量計費', '企業合約', 'AI 服務加值'],
    risks: ['資本支出強度高 (capex intensity)', 'GPU 供給瓶頸', '價格戰', '與模型供應商的議價權'],
    stackLayer: 'Cloud Infrastructure / GPU Compute',
  },
  {
    id: 'enterprise-saas',
    letter: 'C',
    titleZh: '企業 AI 軟體與 SaaS',
    titleEn: 'Enterprise AI Software / SaaS',
    summary: '將 AI 嵌入既有企業工作流程，以 Copilot 形式做為訂閱加值或新模組變現。',
    description:
      '將 AI 加入企業既有工作流程，Copilot 化產品。涵蓋 CRM、ERP、HR、辦公生產力與協作平台。',
    monetization: ['席次訂閱 (Seat-based subscription)', 'AI 加值模組 (usage-based AI add-on)', '混合計費'],
    risks: ['AI 加購率不確定', '客戶 ROI 證據不足', 'AI 原生挑戰者搶單', '席次定價模式可能被 Agent 取代'],
    stackLayer: 'AI Application',
  },
  {
    id: 'data-platform',
    letter: 'D',
    titleZh: '資料平台、RAG 與向量資料庫',
    titleEn: 'Data Platform / RAG / Vector Database',
    summary: 'AI 模型若沒有企業資料即無價值，這層是 RAG 與向量資料庫的主戰場。',
    description:
      'AI 軟體需要高品質的企業資料才能落地。RAG (Retrieval-Augmented Generation) 將 LLM 與企業知識庫連結。包含向量資料庫 (Vector DB) 與資料湖倉 (Data Lakehouse)。資料治理 (Data Governance) 與觀測性 (Observability) 也屬此層。',
    monetization: ['用量計費', '訂閱', '企業授權'],
    risks: ['雲端業者自帶資料服務的競爭', '向量資料庫開源化', '資料品質與安全', 'AI 推論成本被資料 I/O 拉高'],
    stackLayer: 'RAG / Vector Database / Data Platform',
  },
  {
    id: 'ai-agent',
    letter: 'E',
    titleZh: 'AI Agent 與流程自動化',
    titleEn: 'AI Agent / Workflow Automation',
    summary: 'Agentic AI、工作流程自動化是 2025–2030 最大的軟體故事，但 ROI 證據仍在累積。',
    description:
      'Agentic AI（代理型 AI）、工作流程自動化、任務自動化。聊天機器人僅回答問題；Agent 可跨系統採取行動。',
    monetization: ['用量計費', '訂閱', '依完成任務 (outcome-based)'],
    risks: ['可靠性 (Agent 出錯成本高)', '資安 (Prompt Injection)', 'ROI 證據不足', '與既有系統整合困難'],
    stackLayer: 'AI Agent / Workflow Automation',
  },
  {
    id: 'ai-coding',
    letter: 'F',
    titleZh: 'AI Coding 與開發者工具',
    titleEn: 'AI Coding / Developer Tools',
    summary: 'AI 程式生成、IDE 整合、Agentic 開發流程，是目前最早出現用量飛輪的 AI 軟體賽道。',
    description:
      'AI 程式碼生成、IDE 整合、Agentic Coding 工作流。涵蓋從 Copilot 到 Cursor / Anthropic Claude Code 等 Agent 化的開發工具。',
    monetization: ['訂閱', '企業席次', '用量計費'],
    risks: ['工具切換成本低', '模型差異化縮小', '免費 / 開源替代品多 (Continue、Aider)'],
    stackLayer: 'AI Application',
  },
  {
    id: 'cybersecurity',
    letter: 'G',
    titleZh: 'AI 資安',
    titleEn: 'Cybersecurity AI',
    summary: 'AI 同時是防守工具與攻擊面：威脅偵測、SOC 自動化、模型安全。',
    description:
      'AI 用於威脅偵測 (Threat Detection)、SOC 自動化、Endpoint Security、模型風險、Prompt Injection、資料外洩 (data leakage)。AI 也擴大攻擊面 (attack surface)。',
    monetization: ['訂閱', '模組加購', '事件回應服務'],
    risks: ['AI 原生資安新創競爭', '客戶整併 (consolidation)', '模型安全議題快速演進'],
    stackLayer: 'MLOps / Observability / Security',
  },
  {
    id: 'ai-search-ads',
    letter: 'H',
    titleZh: 'AI 搜尋、廣告與推薦系統',
    titleEn: 'AI Search / Advertising / Recommendation',
    summary: 'AI 改善搜尋、廣告投放、推薦排序；但 AI 回答型引擎本身就是顛覆現有搜尋的力量。',
    description:
      'AI 強化搜尋 (Search)、廣告投放 (Ad targeting)、內容排序 (Ranking)、推薦系統 (Recommendation)。',
    monetization: ['廣告', '訂閱', '電商抽成'],
    risks: ['被 AI Answer Engine 顛覆 (Perplexity、ChatGPT Search)', '使用者導流改變', '隱私法規'],
    stackLayer: 'AI Application',
  },
  {
    id: 'vertical-saas',
    letter: 'I',
    titleZh: '垂直產業 AI SaaS',
    titleEn: 'Vertical AI SaaS',
    summary: '金融、醫療、法律、教育、設計、客服等垂直應用，領域深但 TAM 較小。',
    description:
      'AI 應用在金融、醫療、法律、教育、設計、客服。領域專業化高、但每個垂直市場規模 (TAM) 較小。',
    monetization: ['訂閱', '專業授權', '依案件計費'],
    risks: ['領域法規 (regulation)', '答案準確度 (accuracy)', '責任歸屬 (liability)', '採用速度慢'],
    stackLayer: 'AI Application',
  },
  {
    id: 'eda-semiconductor',
    letter: 'J',
    titleZh: 'EDA 與半導體設計 AI',
    titleEn: 'EDA / Semiconductor Design AI',
    summary: 'AI 用於晶片設計、驗證、佈局、模擬與 IP 再利用，是台灣半導體工程師最熟悉的 AI 軟體賽道。',
    description:
      'AI 用於晶片設計 (chip design)、驗證 (verification)、佈局 (layout)、模擬 (simulation)、IP 再利用。隨著 AI 硬體複雜度上升，EDA 工具的價值也上升。',
    monetization: ['授權', '訂閱', '專業服務'],
    risks: ['客戶集中 (前 5 大客戶佔比高)', '雲端 EDA 商業模式轉換期', '中國市場政策限制'],
    stackLayer: 'AI Application',
  },
  {
    id: 'industrial-ai',
    letter: 'K',
    titleZh: '工業 AI 與機器人軟體',
    titleEn: 'Industrial AI / Robotics Software',
    summary: '工廠自動化、機器人、數位孿生、預測性維護，銷售週期長但黏性高。',
    description:
      'AI 用於工廠自動化、機器人、數位孿生 (digital twin)、預測性維護 (predictive maintenance)。軟硬體整合度高。',
    monetization: ['授權', '訂閱', '專案制 / 系統整合'],
    risks: ['銷售週期長', '客戶資本支出循環敏感', '整合成本高'],
    stackLayer: 'Enterprise Data / Customer Workflow',
  },
];

export interface InvestmentTypeMeta {
  id: CompanyInvestmentType;
  titleZh: string;
  definition: string;
  examples: string;
}

export const INVESTMENT_TYPES: InvestmentTypeMeta[] = [
  {
    id: 'platform',
    titleZh: '平台型 AI 軟體公司',
    definition: '具強大通路、生態系與平台控制力。AI 是平台的延伸功能。',
    examples: 'Microsoft、Alphabet、Amazon、Salesforce、ServiceNow',
  },
  {
    id: 'model-provider',
    titleZh: '模型供應商',
    definition: '提供基礎模型或模型 API。模型本身就是核心產品。',
    examples: 'OpenAI、Anthropic、Google、Meta、Mistral',
  },
  {
    id: 'data-moat',
    titleZh: '資料護城河型',
    definition: '價值來自企業資料、資料平台、工作流程資料或專有資料集。',
    examples: 'Palantir、Snowflake、Databricks',
  },
  {
    id: 'workflow-lockin',
    titleZh: '工作流程鎖定型',
    definition: '深度嵌入企業工作流程，更換成本極高。',
    examples: 'ServiceNow、Adobe、Workday、Intuit、Atlassian',
  },
  {
    id: 'ai-upsell-saas',
    titleZh: 'AI 加值型 SaaS',
    definition: '既有 SaaS 公司以 AI 模組做為加購 (upsell)，AI 為訂閱毛利加分。',
    examples: 'Salesforce、Adobe、HubSpot、Zoom',
  },
  {
    id: 'ai-native-challenger',
    titleZh: 'AI 原生挑戰者',
    definition: 'AI-native 新創，可能顛覆既有業者；多為未上市。',
    examples: 'Cursor / Anysphere、Perplexity、Harvey、Glean、Character AI',
  },
  {
    id: 'disruption-risk',
    titleZh: '被 AI 顛覆風險型',
    definition: '原始產品可能被 AI 取代或商品化，需謹慎標示與驗證。',
    examples: 'Chegg、傳統內容 / 答題服務、部分席次型 SaaS',
  },
];
