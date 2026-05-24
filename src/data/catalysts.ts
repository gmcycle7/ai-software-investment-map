import type { ConfidenceLevel } from '../types/company';

// 催化事件 / 瓶頸 → 公司級受惠與受壓對照
// 對照 STACK_LAYERS 的「壓力傳導」是層級的，此處進一步落到「個別公司」。

export interface CompanyImpact {
  companyId: string; // 對應 ALL_COMPANIES.id
  reason: string;
}

export interface Catalyst {
  id: string;
  title: string;
  category: 'cost' | 'tech' | 'business-model' | 'regulation' | 'security' | 'demand' | 'competition';
  summary: string;
  signalsToWatch: string[]; // 觀察什麼數據 / 訊號可確認此事件正在發生
  winners: CompanyImpact[];
  losers: CompanyImpact[];
  uncertain: CompanyImpact[]; // 影響方向不明 / 需資料驗證
  confidenceLevel: ConfidenceLevel; // 我們對「該事件會發生」的信心
  timeframe: 'short' | 'medium' | 'long'; // 3-12m / 1-3y / 3-10y
}

export const CATALYST_CATEGORIES: { id: Catalyst['category']; label: string }[] = [
  { id: 'cost', label: '成本與毛利' },
  { id: 'tech', label: '技術突破' },
  { id: 'business-model', label: '商業模式' },
  { id: 'regulation', label: '法規與治理' },
  { id: 'security', label: '資安事件' },
  { id: 'demand', label: '需求結構' },
  { id: 'competition', label: '競爭格局' },
];

export const TIMEFRAME_LABEL: Record<Catalyst['timeframe'], string> = {
  short: '短期（3~12 月）',
  medium: '中期（1~3 年）',
  long: '長期（3~10 年）',
};

export const CATALYSTS: Catalyst[] = [
  {
    id: 'inference-cost-halved',
    title: '推論成本減半（每 12 個月）',
    category: 'cost',
    summary:
      'MoE 架構、量化、Speculative Decoding、自研 ASIC 等讓每百萬 token 推論成本快速下降。對應用層是利多，對模型供應商是 ASP 壓力。',
    signalsToWatch: [
      'OpenAI / Anthropic 公告新模型同時下調 API 價格',
      '雲端業者揭露 inference per token 內部成本',
      '開源推論引擎（vLLM、SGLang）效能基準刷新',
    ],
    winners: [
      { companyId: 'msft', reason: 'Copilot 加值毛利改善；Azure 推論單位收入下降但用量爆量' },
      { companyId: 'crm', reason: 'Agentforce 用量計費單位成本降，毛利空間擴大' },
      { companyId: 'now', reason: 'Now Assist 加值毛利改善' },
      { companyId: 'pltr', reason: 'AIP 每客戶 LTV 提升' },
      { companyId: 'app', reason: 'AXON 推論成本下降直接灌入毛利' },
      { companyId: 'cursor', reason: '單位 token 成本下降，Pro 訂閱毛利改善（私有公司，影響度不可驗證）' },
    ],
    losers: [
      { companyId: 'openai', reason: 'API ASP 同步下降，須靠用量擴張補位' },
      { companyId: 'anthropic', reason: '同上' },
    ],
    uncertain: [
      { companyId: 'googl', reason: '自家 TPU 成本優勢可保毛利，但搜尋本業毛利受 AI Overviews 壓縮' },
      { companyId: 'amzn', reason: 'Trainium 出貨節奏與 Bedrock ASP 變化方向不明' },
    ],
    confidenceLevel: 'High',
    timeframe: 'medium',
  },
  {
    id: 'open-source-catchup',
    title: '開源模型追上 Frontier',
    category: 'tech',
    summary:
      'Llama / DeepSeek / Mistral / Qwen 在多數企業任務已可替代 Frontier 模型。「自家資料 + 開源模型」變主流組合。',
    signalsToWatch: [
      '開源模型在企業常用 benchmark（MMLU、HumanEval、SWE-bench）與閉源差距 < 5%',
      '主要 SaaS 公司公告「客戶可帶自己的模型」',
      'AWS / Azure 上開源模型推論流量超越閉源',
    ],
    winners: [
      { companyId: 'meta', reason: 'Llama 開源生態壯大，鞏固廣告 ROI + 模型主導性' },
      { companyId: 'databricks', reason: '自架開源模型 + 企業資料是核心商業模式（私有公司）' },
      { companyId: 'snow', reason: 'Cortex 支援開源模型 in-warehouse 推論' },
      { companyId: 'pltr', reason: 'AIP 可彈性選模型，降低對特定模型供應商依賴' },
      { companyId: 'mdb', reason: 'Atlas Vector + 開源模型 = 開發者友善 RAG 堆疊' },
    ],
    losers: [
      { companyId: 'openai', reason: '差異化與議價權削弱' },
      { companyId: 'anthropic', reason: '同上；但 Coding 用例仍領先' },
      { companyId: 'cohere', reason: '企業客戶可能改用開源 + 自架（私有公司）' },
    ],
    uncertain: [
      { companyId: 'orcl', reason: 'OCI 可同時代管多模型，影響中性' },
    ],
    confidenceLevel: 'High',
    timeframe: 'medium',
  },
  {
    id: 'agent-replaces-seats',
    title: 'Agent 取代席次型工作（客服、HR、初階法務 / 會計）',
    category: 'business-model',
    summary:
      '從席次（人）計費轉向 outcome 計費。某些 SaaS 的「seat 數」會收縮；Agent 平台公司則受益。',
    signalsToWatch: [
      'Salesforce / ServiceNow 公告 Agentforce / Now Assist outcome 案例 ARR',
      '客服 SaaS（Zendesk、Intercom 等）seat 數年增率轉負',
      '企業 IT 預算把 AI 列為「取代席次」而非「附加加值」',
    ],
    winners: [
      { companyId: 'crm', reason: 'Agentforce 帶 outcome-based pricing 抓回成長' },
      { companyId: 'now', reason: 'Now Assist 是工作流程 Agent 標竿' },
      { companyId: 'pltr', reason: 'AIP 內建 outcome 衡量' },
      { companyId: 'msft', reason: 'Copilot 與 Agent Studio 雙重定位' },
    ],
    losers: [
      { companyId: 'wday', reason: 'HR 是 seat-based 模型最易被 Agent 取代的場景之一' },
      { companyId: 'hubs', reason: 'SMB CRM 席次彈性大' },
      { companyId: 'zm', reason: '會議 seat 易被 AI Notetaker 取代' },
      { companyId: 'asan', reason: 'Work Management seat 數對 Agent 敏感' },
      { companyId: 'mnday', reason: '同上' },
    ],
    uncertain: [
      { companyId: 'team', reason: 'Jira / Confluence 鎖定強，但 seat 也是主收入' },
    ],
    confidenceLevel: 'Medium',
    timeframe: 'long',
  },
  {
    id: 'enterprise-ai-budget-line',
    title: '企業 AI 預算正式編列（從實驗轉常態）',
    category: 'demand',
    summary:
      'CIO / CFO 把 AI 加值列入年度 IT 預算，採購週期、合約條件正常化。',
    signalsToWatch: [
      'Microsoft / ServiceNow / Salesforce 揭露 Copilot / Agent 加購率',
      'Gartner CIO 調查 AI 預算佔比連續兩季正成長',
      'Big 4 顧問公司 AI 導入案件 backlog 暴增',
    ],
    winners: [
      { companyId: 'msft', reason: 'M365 Copilot 是企業 AI 預算最直接受惠者' },
      { companyId: 'crm', reason: 'Agentforce + Data Cloud 包裹銷售' },
      { companyId: 'now', reason: 'Pro Plus 訂閱 + Now Assist' },
      { companyId: 'pltr', reason: 'AIP Bootcamp 通路轉化率改善' },
      { companyId: 'crwd', reason: '正式預算下 governance / 資安需求加強' },
      { companyId: 'panw', reason: '同上' },
      { companyId: 'snow', reason: 'AI workload 進入 ARR' },
    ],
    losers: [],
    uncertain: [
      { companyId: 'c3ai', reason: '雖屬 AI 應用，但客戶集中、轉化節奏需驗證' },
    ],
    confidenceLevel: 'Medium',
    timeframe: 'medium',
  },
  {
    id: 'mcp-becomes-standard',
    title: 'MCP 成為事實標準',
    category: 'tech',
    summary:
      'Model Context Protocol 被主流 LLM 客戶端採用，企業資料來源以 MCP server 形式暴露。Agent 工具呼叫標準化。',
    signalsToWatch: [
      '主流 SaaS 提供官方 MCP server',
      'OpenAI / Google / Microsoft 採納 MCP（或推自家對等協定）',
      '雲端 marketplace 出現 MCP server 目錄',
    ],
    winners: [
      { companyId: 'anthropic', reason: 'MCP 為 Anthropic 主導，是其生態優勢（私有公司）' },
      { companyId: 'pltr', reason: 'Ontology + MCP 暴露為 Agent 入口' },
      { companyId: 'snow', reason: 'Cortex 可成為企業資料 MCP 主要 server' },
      { companyId: 'databricks', reason: '同上（私有公司）' },
      { companyId: 'cursor', reason: 'Cursor 已內建 MCP 支援，加強差異化（私有公司）' },
    ],
    losers: [],
    uncertain: [
      { companyId: 'openai', reason: 'MCP 由競爭者主導，可能推自家對等標準' },
      { companyId: 'msft', reason: '若採納 MCP 利多 Copilot；若推 Microsoft 標準則生態分裂' },
    ],
    confidenceLevel: 'Medium',
    timeframe: 'medium',
  },
  {
    id: 'prompt-injection-incident',
    title: '上市公司因 Prompt Injection 重大資料外洩',
    category: 'security',
    summary: 'Agent 化加快後，第一次 Top 100 上市公司因 Agent 被注入而導致重大事件。',
    signalsToWatch: [
      'NIST / ENISA 發布 Agent 攻擊事件報告',
      '主流資安公司公告 AI-specific 收入線',
      '企業客戶要求廠商 AI Red Team 報告',
    ],
    winners: [
      { companyId: 'crwd', reason: 'Charlotte AI + Falcon AI Security Posture 直接利多' },
      { companyId: 'panw', reason: 'Cortex XSIAM + Precision AI' },
      { companyId: 'zs', reason: 'AI Data Protection + Shadow AI 偵測' },
      { companyId: 'net', reason: 'AI Gateway 變必備層' },
      { companyId: 's', reason: 'Purple AI 加速採用' },
      { companyId: 'twse-4704', reason: '亞太區資安客戶安全採購' },
    ],
    losers: [
      { companyId: 'crm', reason: 'Agentforce 採用節奏短期受挫' },
      { companyId: 'now', reason: 'Now Assist 採用節奏短期受挫' },
      { companyId: 'path', reason: '自動化平台需強化安全認證' },
    ],
    uncertain: [
      { companyId: 'pltr', reason: 'AIP 本身強調治理，可能受惠（安全形象強化）' },
    ],
    confidenceLevel: 'Medium',
    timeframe: 'short',
  },
  {
    id: 'eu-ai-act-enforcement',
    title: 'EU AI Act 嚴格執法 + 美國各州 AI 法規上路',
    category: 'regulation',
    summary: '受監管產業（醫療、金融、HR、教育）AI 採用節奏被法規重新框定。',
    signalsToWatch: [
      'EU 公告首批 high-risk AI 罰款案例',
      '美國 SEC / FTC 對 AI claims 開罰',
      '主要 SaaS 公司新增「合規模組」收入',
    ],
    winners: [
      { companyId: 'pltr', reason: '政府 / 國防客戶基礎 + 治理能力' },
      { companyId: 'crwd', reason: 'AI governance posture' },
      { companyId: 'panw', reason: '同上' },
      { companyId: 'tri', reason: '法律 AI（CoCounsel）受惠合規需求' },
      { companyId: 'relx', reason: '法律 / 科學資料合規' },
      { companyId: 'veev', reason: 'Life Sciences 合規' },
      { companyId: 'ibm', reason: 'watsonx.governance 主打可治理' },
    ],
    losers: [
      { companyId: 'duol', reason: '教育 AI 採用節奏延後' },
      { companyId: 'docs', reason: '醫療 AI 採用節奏延後' },
    ],
    uncertain: [],
    confidenceLevel: 'Medium',
    timeframe: 'medium',
  },
  {
    id: 'ai-answer-engine-replaces-search',
    title: 'AI Answer Engine 大幅蠶食傳統搜尋',
    category: 'competition',
    summary: 'Perplexity、ChatGPT Search、Google AI Overviews 等改變使用者搜尋與點擊行為。',
    signalsToWatch: [
      'Google AI Overviews 點擊率公開資料',
      'Perplexity ARR / 用戶數成長率',
      '出版商流量分配變化（Reddit、Wikipedia、新聞網站）',
    ],
    winners: [
      { companyId: 'rddt', reason: '對 LLM 是稀有人類語料；資料授權收入' },
      { companyId: 'openai', reason: 'ChatGPT Search 鞏固使用者入口（私有公司）' },
      { companyId: 'anthropic', reason: '同上（私有公司）' },
    ],
    losers: [
      { companyId: 'googl', reason: 'AI Overviews 自我蠶食傳統搜尋廣告變現' },
      { companyId: 'chgg', reason: '答題訂閱受重創（典型顛覆案例）' },
      { companyId: 'duol', reason: '通用 LLM 直接做家教是長期威脅' },
    ],
    uncertain: [
      { companyId: 'meta', reason: '使用者停留在社群可能受影響，但 Llama 取得 AI 入口' },
    ],
    confidenceLevel: 'High',
    timeframe: 'medium',
  },
  {
    id: 'ai-coding-becomes-standard',
    title: 'AI Coding 成為 IDE 標配',
    category: 'demand',
    summary: '90% 以上專業開發者每天使用 AI 編輯器；企業強制部署。',
    signalsToWatch: [
      'GitHub Copilot 訂閱數揭露',
      'Cursor / Anysphere ARR 增速',
      'Stack Overflow 開發者調查 AI 工具使用率',
    ],
    winners: [
      { companyId: 'msft', reason: 'GitHub Copilot 是入口級產品' },
      { companyId: 'gtlb', reason: 'Duo + 自架選項在受監管產業強勢' },
      { companyId: 'cursor', reason: 'AI 原生 IDE 用量飛輪（私有公司）' },
      { companyId: 'anthropic', reason: 'Claude Code 直接受惠（私有公司）' },
      { companyId: 'team', reason: 'Jira / Confluence + Rovo Coding 整合' },
    ],
    losers: [
      { companyId: 'jetbrains', reason: 'AI 原生 IDE 競爭壓力（私有公司）' },
    ],
    uncertain: [
      { companyId: 'replit', reason: '低代碼 / 非工程師 AI Builder 賽道競爭極激（私有公司）' },
    ],
    confidenceLevel: 'High',
    timeframe: 'short',
  },
  {
    id: 'gpu-supply-loosens',
    title: 'GPU / HBM 供應鬆綁、AI 算力降價',
    category: 'cost',
    summary: 'NVIDIA / AMD 出貨節奏正常化、HBM 產能擴張、Hyperscaler 自研晶片量產。',
    signalsToWatch: [
      'AWS Trainium / Google TPU / Microsoft Maia 出貨節奏',
      'HBM3e / HBM4 良率與量產時點',
      '雲端 GPU 現貨價（A100 / H100 / B200）',
    ],
    winners: [
      { companyId: 'msft', reason: 'Azure 推論毛利改善' },
      { companyId: 'amzn', reason: 'AWS Bedrock 同上' },
      { companyId: 'googl', reason: 'TPU 自研 + 雲端推論' },
      { companyId: 'orcl', reason: 'OCI 與 OpenAI 等大客戶履約成本下降' },
      { companyId: 'twse-6669', reason: 'AI 伺服器持續放量' },
      { companyId: 'twse-2382', reason: '同上' },
    ],
    losers: [],
    uncertain: [
      { companyId: 'openai', reason: '算力成本下降利多但 ASP 同向下調，淨影響不確定' },
    ],
    confidenceLevel: 'Medium',
    timeframe: 'medium',
  },
];
