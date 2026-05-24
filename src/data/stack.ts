import type { AiSoftwareCategory } from '../types/company';

// AI 軟體堆疊：7 層 + 各層映射到本站的 AiSoftwareCategory
export interface StackLayer {
  id: string;
  title: string;
  titleEn: string;
  shortDesc: string;
  longDesc: string;
  examples: string[];
  monetization: string;
  pressureFromAbove: string; // 上層變動如何影響本層
  pressureFromBelow: string; // 下層變動如何影響本層
  mappedCategories: AiSoftwareCategory[];
  color: string; // Tailwind bg- 樣式
}

export const STACK_LAYERS: StackLayer[] = [
  {
    id: 'app',
    title: 'AI Application（應用層）',
    titleEn: 'AI Application',
    shortDesc: '使用者直接操作的應用：Copilot、Chat、垂直應用',
    longDesc: '直接呈現給最終使用者的 AI 應用，可能是內嵌在既有軟體（Copilot），也可能是 AI 原生產品。',
    examples: ['Microsoft 365 Copilot', 'Salesforce Agentforce', 'ChatGPT', 'Cursor', 'Adobe Firefly'],
    monetization: '席次訂閱、AI 加值、用量計費、廣告',
    pressureFromAbove: '使用者期望提升、ROI 證明壓力加大',
    pressureFromBelow: '模型 / 推論成本下降 → 毛利改善；模型商品化 → 差異化壓力',
    mappedCategories: ['enterprise-saas', 'ai-coding', 'ai-search-ads', 'vertical-saas', 'eda-semiconductor', 'industrial-ai'],
    color: 'bg-brand-600',
  },
  {
    id: 'agent',
    title: 'AI Agent / Workflow Automation',
    titleEn: 'AI Agent / Workflow',
    shortDesc: 'Agentic AI、跨系統流程自動化',
    longDesc: '可規劃、呼叫工具、跨多步完成任務的 LLM 系統。從 Chatbot 升級到 Agent 是當前 AI 軟體最大的故事。',
    examples: ['ServiceNow AI Agents', 'Salesforce Agentforce', 'Palantir AIP', 'UiPath Autopilot'],
    monetization: '用量計費、outcome-based pricing',
    pressureFromAbove: '企業要求可量化 ROI、Agent 出錯成本高',
    pressureFromBelow: '模型 Tool Use / Function Calling 能力提升 → Agent 可靠度上升',
    mappedCategories: ['ai-agent'],
    color: 'bg-brand-500',
  },
  {
    id: 'model',
    title: 'Model API / Foundation Model',
    titleEn: 'Model API / Foundation Model',
    shortDesc: 'LLM、多模態模型、推論 API',
    longDesc: '提供基礎模型本體或讓開發者透過 API 使用模型能力。位於堆疊的「智慧層」。',
    examples: ['OpenAI GPT', 'Anthropic Claude', 'Google Gemini', 'Meta Llama（開源）', 'Mistral'],
    monetization: 'API 用量計費、訂閱、企業合約',
    pressureFromAbove: '應用層希望模型更便宜、更可靠；長 Context 與 Agent 工具呼叫需求',
    pressureFromBelow: 'GPU / TPU 算力成本、推論引擎效率（vLLM、TensorRT）',
    mappedCategories: ['foundation-model'],
    color: 'bg-indigo-500',
  },
  {
    id: 'rag',
    title: 'RAG / Vector Database / Data Platform',
    titleEn: 'RAG / Vector / Data Platform',
    shortDesc: '企業資料、檢索、向量資料庫、資料治理',
    longDesc: '把企業專有資料連接到 LLM 的關鍵層。AI 模型若沒有企業資料即無價值；本層是「資料護城河」最深的位置。',
    examples: ['Snowflake Cortex', 'Databricks Mosaic AI', 'MongoDB Atlas Vector', 'Elastic ESRE', 'Pinecone'],
    monetization: '用量計費、訂閱、企業合約',
    pressureFromAbove: 'Agent / RAG 用例對檢索品質要求提高；長 Context 模型降低 RAG 必要性',
    pressureFromBelow: '雲端業者把向量搜尋內建為服務（AWS、Azure、GCP）',
    mappedCategories: ['data-platform'],
    color: 'bg-violet-500',
  },
  {
    id: 'mlops',
    title: 'MLOps / Observability / Security',
    titleEn: 'MLOps / Observability / Security',
    shortDesc: '模型運維、Pipeline、AI 觀測與資安',
    longDesc: 'AI 應用上線後的監控、版本管理、Prompt Injection 防禦、合規。Agent 化讓本層需求上升。',
    examples: ['Datadog LLM Observability', 'CrowdStrike Charlotte AI', 'Palo Alto Cortex XSIAM', 'Cloudflare AI Gateway'],
    monetization: '訂閱、用量計費',
    pressureFromAbove: 'Shadow AI、Prompt Injection 等新攻擊面；EU AI Act 等法規',
    pressureFromBelow: '雲端原生資安服務擠壓',
    mappedCategories: ['cybersecurity'],
    color: 'bg-sky-600',
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure / GPU Compute',
    titleEn: 'Cloud Infrastructure / GPU Compute',
    shortDesc: '雲端 / GPU 算力 / Inference 平台',
    longDesc: '超大規模雲端 + 自研 / 採購 AI 晶片。AI 軟體變現的算力承載層；Capex 暴增的主因。',
    examples: ['Microsoft Azure', 'AWS Bedrock', 'Google Vertex AI', 'Oracle OCI', 'CoreWeave、Lambda（neo-cloud）'],
    monetization: '雲端用量計費、企業合約',
    pressureFromAbove: 'AI 推論需求暴增、模型供應商議價權',
    pressureFromBelow: 'NVIDIA / AMD / 自研晶片供給與價格、HBM、電力與散熱',
    mappedCategories: ['cloud-ai-platform'],
    color: 'bg-emerald-600',
  },
  {
    id: 'data',
    title: 'Enterprise Data / Customer Workflow',
    titleEn: 'Enterprise Data / Customer Workflow',
    shortDesc: '企業最底層的資料 + 工作流程',
    longDesc:
      '所有 AI 軟體價值的最終承接層。誰擁有客戶的工作流程資料，誰就在 AI 時代最有議價權。',
    examples: ['ERP 系統（SAP / Oracle / Workday）', '客戶資料（Salesforce、HubSpot）', '產業資料（Veeva、TR）'],
    monetization: '不直接變現；透過其上各層轉換為價值',
    pressureFromAbove: 'AI Agent 直接對接、繞過介面層',
    pressureFromBelow: '—',
    mappedCategories: [],
    color: 'bg-slate-700',
  },
];

// 壓力傳導事件：典型催化事件 → 哪幾層受惠 / 受害
export interface PressureEvent {
  id: string;
  title: string;
  desc: string;
  winners: { layer: string; reason: string }[];
  losers: { layer: string; reason: string }[];
}

export const PRESSURE_EVENTS: PressureEvent[] = [
  {
    id: 'inference-cost-halved',
    title: '推論成本減半',
    desc: '透過 MoE、量化、Speculative Decoding、自研 ASIC 等技術，每百萬 token 推論成本快速下降。',
    winners: [
      { layer: 'AI Application', reason: '毛利結構大幅改善；新用例變得經濟可行' },
      { layer: 'AI Agent', reason: '多步 Agent 可大量呼叫模型而不爆預算' },
    ],
    losers: [
      { layer: 'Model API', reason: 'ASP 同步下降，需要靠用量擴張補位' },
      { layer: 'Cloud', reason: '單 token 收入下降；需新 workload 補位' },
    ],
  },
  {
    id: 'open-source-catchup',
    title: '開源模型追上 Frontier',
    desc: 'Llama / DeepSeek / Mistral / Qwen 等開源模型在多數企業場景已可替代 Frontier 模型。',
    winners: [
      { layer: 'AI Application', reason: '可選自架 + 開源組合，降低 lock-in' },
      { layer: 'RAG / Data Platform', reason: '「自家資料 + 開源模型」變成主流組合' },
    ],
    losers: [
      { layer: 'Model API', reason: '閉源 API 議價權削弱、毛利壓縮' },
    ],
  },
  {
    id: 'agent-replaces-seats',
    title: 'Agent 開始取代席次型工作',
    desc: '客服、IT 工單、初階法務 / 會計工作被 Agent 接手，企業席次需求下降。',
    winners: [
      { layer: 'AI Agent', reason: 'outcome-based pricing 普及；TAM 從席次擴大到「工作量」' },
      { layer: 'RAG / Data Platform', reason: 'Agent 需要更密集的企業資料連結' },
    ],
    losers: [
      { layer: 'AI Application', reason: '席次型 SaaS（HR、CRM、客服）席次數壓力上升' },
    ],
  },
  {
    id: 'enterprise-ai-budget-line',
    title: '企業 IT 預算正式編列 AI 模組',
    desc: '從「實驗預算」變成「常態 AI 預算」，IT 採購流程接受 AI 加值 ARR。',
    winners: [
      { layer: 'AI Application', reason: 'Copilot / AI Suite 加購率上升、ARR 加速' },
      { layer: 'AI Agent', reason: '正式採購流程比實驗階段更穩定' },
      { layer: 'MLOps / Security', reason: '正式預算需要治理與資安' },
    ],
    losers: [],
  },
  {
    id: 'mcp-becomes-standard',
    title: 'MCP 成為事實標準',
    desc: 'Model Context Protocol 被主流 LLM 客戶端採用，企業資料源以 MCP server 形式暴露。',
    winners: [
      { layer: 'RAG / Data Platform', reason: '誰先把產業資料 MCP 化，誰拿到 Agent 時代的 API 入口' },
      { layer: 'AI Agent', reason: '工具呼叫標準化，Agent 開發者體驗大幅提升' },
    ],
    losers: [
      { layer: 'AI Application', reason: '若 Agent 改透過 MCP 直接調用資料，傳統 UI 重要性下降' },
    ],
  },
  {
    id: 'prompt-injection-major-incident',
    title: '重大 Prompt Injection 資安事件',
    desc: '上市公司因 Agent 被注入指令導致重大資料外洩或損失。',
    winners: [
      { layer: 'MLOps / Security', reason: '資安 AI（CrowdStrike、Palo Alto、Cloudflare）受惠' },
    ],
    losers: [
      { layer: 'AI Agent', reason: '採用速度短期受挫；客戶要求更多治理控管' },
      { layer: 'AI Application', reason: '需投入更多治理 / 稽核成本' },
    ],
  },
  {
    id: 'eu-ai-act-enforcement',
    title: 'EU AI Act / 各國 AI 法規開始嚴格執法',
    desc: '歐盟與其他司法管轄區開始對 high-risk AI 應用實質執法。',
    winners: [
      { layer: 'MLOps / Security', reason: 'Governance / 稽核工具需求暴增' },
      { layer: 'RAG / Data Platform', reason: '可解釋、可審計的資料管線受惠' },
    ],
    losers: [
      { layer: 'AI Application', reason: '受監管產業（醫療、金融、HR）採用速度延後' },
    ],
  },
];
