// AI 軟體投資相關術語表（中英對照）
// 編寫原則：定義用「投資人 / 軟體工程出身的讀者」能理解的方式說明
// 不杜撰技術細節；不確定處以「主流用法為...」等保守措辭

export type GlossaryCategory =
  | 'model-basics'
  | 'training'
  | 'inference'
  | 'rag-agent'
  | 'app-and-biz'
  | 'risk-governance'
  | 'investment';

export interface GlossaryTerm {
  id: string;
  term: string; // 主要顯示名（中英混排）
  termEn?: string; // 純英文（如有）
  category: GlossaryCategory;
  definition: string;
  whyItMattersForInvestor?: string; // 投資角度的意義（可選）
  related?: string[]; // 相關術語 id
}

export const GLOSSARY_CATEGORIES: { id: GlossaryCategory; label: string; desc: string }[] = [
  { id: 'model-basics', label: '模型與基礎概念', desc: 'LLM / 多模態 / Token / Embedding 等模型本體相關' },
  { id: 'training', label: '訓練與調適', desc: '預訓練、微調、RLHF、LoRA、Distillation 等' },
  { id: 'inference', label: '推論與部署', desc: 'Inference、Latency、KV Cache、MoE、Speculative Decoding' },
  { id: 'rag-agent', label: 'RAG 與 Agent', desc: '向量資料庫、Tool Use、MCP、Multi-Agent' },
  { id: 'app-and-biz', label: '應用與商業模式', desc: 'Copilot、SaaS、訂閱、用量計費、ARR、NRR' },
  { id: 'risk-governance', label: '風險與治理', desc: 'Hallucination、Prompt Injection、Shadow AI、合規' },
  { id: 'investment', label: '投資概念', desc: 'AI 敘事 vs 真實營收、護城河、商品化、Stack 分層' },
];

export const GLOSSARY: GlossaryTerm[] = [
  // ===== 模型與基礎概念 =====
  {
    id: 'llm',
    term: 'LLM（大型語言模型）',
    termEn: 'Large Language Model',
    category: 'model-basics',
    definition:
      '以大量文字資料訓練的深度學習模型，可生成、摘要、翻譯、推理。代表如 GPT、Claude、Gemini、Llama。參數規模通常數十億到上兆。',
    whyItMattersForInvestor:
      'LLM 是當代 AI 軟體價值鏈的核心，影響從模型供應商到企業應用層的整個堆疊。',
    related: ['foundation-model', 'slm', 'multimodal', 'context-window'],
  },
  {
    id: 'foundation-model',
    term: 'Foundation Model（基礎模型）',
    category: 'model-basics',
    definition:
      '可被下游不同任務微調或直接呼叫的「通用底層模型」。語言、影像、影片、音訊皆可作為 Foundation Model。',
    whyItMattersForInvestor:
      '誰能訓練最強的 Foundation Model 是 AI 軟體投資的最大命題之一。',
    related: ['llm', 'multimodal'],
  },
  {
    id: 'multimodal',
    term: 'Multimodal Model（多模態模型）',
    category: 'model-basics',
    definition:
      '能同時處理多種輸入 / 輸出形式（文字、影像、音訊、影片）的模型。例：GPT-4V、Gemini、Claude Vision。',
    related: ['llm', 'foundation-model'],
  },
  {
    id: 'slm',
    term: 'SLM（小型語言模型）',
    termEn: 'Small Language Model',
    category: 'model-basics',
    definition:
      '參數規模相對較小、可在端側 / 邊緣裝置部署的模型。例：Phi、Gemma 等。',
    whyItMattersForInvestor:
      'SLM 是 AI PC、Edge AI 與隱私敏感場景的核心；對 Apple、高通等端側生態相關。',
    related: ['llm', 'edge-ai'],
  },
  {
    id: 'transformer',
    term: 'Transformer',
    category: 'model-basics',
    definition:
      '當代主流模型架構，2017 年 Google 論文 "Attention Is All You Need" 提出。靠 self-attention 並行處理序列資料。',
    related: ['attention', 'llm'],
  },
  {
    id: 'attention',
    term: 'Attention / Self-Attention',
    category: 'model-basics',
    definition:
      'Transformer 的核心機制：每個 token 都和序列中其他 token 計算關聯度，藉此理解上下文。',
    related: ['transformer', 'context-window'],
  },
  {
    id: 'context-window',
    term: 'Context Window（脈絡視窗）',
    category: 'model-basics',
    definition:
      '模型一次能處理的 token 數量上限。常見有 8K / 32K / 128K / 1M。視窗越大，能讀越長文件，但成本也越高。',
    whyItMattersForInvestor:
      '長 Context 是 Claude、Gemini 的差異化賣點之一，會影響 RAG 與企業文件處理場景的成本結構。',
    related: ['tokens', 'kv-cache', 'rag'],
  },
  {
    id: 'tokens',
    term: 'Token / Tokenization',
    category: 'model-basics',
    definition:
      'Token 是模型處理文字的最小單位（接近一個音節或半個英文單字）。Token 數量是計費與 Context 視窗的主要單位。',
    whyItMattersForInvestor:
      'Token 是 AI 軟體最主要的 usage metric；模型供應商 ARR 拆解時都看 Token 用量。',
    related: ['context-window', 'usage-based-pricing'],
  },
  {
    id: 'embeddings',
    term: 'Embeddings（嵌入向量）',
    category: 'model-basics',
    definition:
      '把文字 / 影像 / 音訊轉成高維數字向量。語意相近的內容向量距離也相近，是 RAG 與向量搜尋的基礎。',
    related: ['vector-db', 'rag'],
  },
  {
    id: 'vector-db',
    term: 'Vector Database（向量資料庫）',
    category: 'model-basics',
    definition:
      '專門儲存與搜尋向量的資料庫。例：Pinecone、Weaviate、Chroma、Qdrant；Postgres + pgvector、MongoDB Atlas Vector Search 亦可使用。',
    whyItMattersForInvestor:
      '為 RAG 必備層，但商品化壓力高，許多被資料庫巨頭（Mongo、Snowflake、Databricks）內建吃下。',
    related: ['rag', 'embeddings'],
  },
  {
    id: 'frontier-model',
    term: 'Frontier Model（前沿模型）',
    category: 'model-basics',
    definition:
      '指當下最先進、規模最大的模型。多由 OpenAI / Anthropic / Google / xAI / Meta 推出，訓練成本可達數億美元以上。',
    related: ['llm', 'foundation-model'],
  },
  {
    id: 'moe',
    term: 'MoE（Mixture of Experts）',
    category: 'model-basics',
    definition:
      '一種模型架構：總參數量大，但每次推論只活化部分「專家」子網絡，藉此降低推論成本。例：Mixtral、DeepSeek-V3。',
    whyItMattersForInvestor:
      'MoE 是降低推論單位成本的主要技術之一，會影響模型供應商的毛利結構。',
    related: ['inference-cost'],
  },

  // ===== 訓練與調適 =====
  {
    id: 'pretraining',
    term: 'Pre-training（預訓練）',
    category: 'training',
    definition:
      '以大量無標註資料（通常為網路文本）訓練基礎模型的階段，是訓練成本最大的部分（單次數千萬到數億美元）。',
    related: ['fine-tuning', 'foundation-model'],
  },
  {
    id: 'fine-tuning',
    term: 'Fine-tuning / SFT（微調）',
    termEn: 'Supervised Fine-Tuning',
    category: 'training',
    definition:
      '在預訓練模型上以較小的標註資料集做特定任務 / 風格的調整。常見方法：full fine-tune、LoRA、QLoRA。',
    related: ['lora', 'rlhf'],
  },
  {
    id: 'rlhf',
    term: 'RLHF（人類回饋強化學習）',
    termEn: 'Reinforcement Learning from Human Feedback',
    category: 'training',
    definition:
      '以人類標註的偏好資料訓練 reward model，再用強化學習調整 LLM 的行為（更有用、更安全）。ChatGPT 的關鍵技術之一。',
    related: ['dpo', 'fine-tuning'],
  },
  {
    id: 'dpo',
    term: 'DPO（直接偏好優化）',
    termEn: 'Direct Preference Optimization',
    category: 'training',
    definition:
      '比 RLHF 簡化的偏好對齊方法，跳過 reward model 直接最佳化。訓練更穩定、成本更低。',
    related: ['rlhf'],
  },
  {
    id: 'lora',
    term: 'LoRA / QLoRA',
    termEn: 'Low-Rank Adaptation',
    category: 'training',
    definition:
      '一種 parameter-efficient 微調技術：凍結原模型，只訓練小型 adapter 矩陣。QLoRA 進一步加入 4-bit 量化，極大幅降低 VRAM 需求。',
    related: ['fine-tuning', 'quantization'],
  },
  {
    id: 'distillation',
    term: 'Distillation（知識蒸餾）',
    category: 'training',
    definition:
      '用大模型（teacher）的輸出訓練小模型（student），讓小模型逼近大模型表現但成本更低。',
    whyItMattersForInvestor:
      '是把 Frontier 能力下放到 SLM 與邊緣裝置的主要技術，影響推論毛利。',
    related: ['slm', 'inference-cost'],
  },
  {
    id: 'quantization',
    term: 'Quantization（量化）',
    category: 'training',
    definition:
      '將模型權重從 FP16 / BF16 壓縮成 INT8、INT4 等較低精度格式，以降低 VRAM 與推論成本。可能略損精度。',
    related: ['lora', 'inference-cost'],
  },

  // ===== 推論與部署 =====
  {
    id: 'inference',
    term: 'Inference（推論）',
    category: 'inference',
    definition:
      '把訓練好的模型拿來生成 / 預測的階段。在 AI 軟體商用化中，inference 佔總算力支出多數比例。',
    related: ['inference-cost', 'tokens'],
  },
  {
    id: 'inference-cost',
    term: 'Inference Cost（推論成本）',
    category: 'inference',
    definition:
      '每生成 1M tokens 的成本。受模型大小、硬體（GPU / TPU / ASIC）、batching、quantization 影響。',
    whyItMattersForInvestor:
      '長期決定 AI 軟體毛利。推論成本下降會擴大應用層機會，但也壓縮模型供應商毛利。',
    related: ['inference', 'tokens', 'moe'],
  },
  {
    id: 'latency',
    term: 'Latency / TTFT / TPS',
    category: 'inference',
    definition:
      'Latency：使用者送出請求到第一個 token 出現的時間（TTFT = Time To First Token）。TPS：每秒生成 tokens 數。Agent 與即時應用對此敏感。',
    related: ['inference', 'speculative-decoding'],
  },
  {
    id: 'kv-cache',
    term: 'KV Cache',
    category: 'inference',
    definition:
      'Transformer 推論時把之前的 key/value 暫存以加速續寫。Context 越長，KV Cache 需要的 VRAM 越大，是推論瓶頸之一。',
    related: ['context-window', 'inference-cost'],
  },
  {
    id: 'speculative-decoding',
    term: 'Speculative Decoding（推測解碼）',
    category: 'inference',
    definition:
      '用一個小模型預先猜下一個 token，再讓大模型驗證，可顯著加速生成。Anthropic、Google 等均已採用。',
    related: ['inference-cost', 'latency'],
  },
  {
    id: 'batching',
    term: 'Continuous Batching（連續批次）',
    category: 'inference',
    definition:
      '推論引擎把多個使用者請求合併處理以提高 GPU 利用率。vLLM、TensorRT-LLM 等推論引擎為此而生。',
    related: ['inference-cost'],
  },
  {
    id: 'edge-ai',
    term: 'Edge AI（端側 AI）',
    category: 'inference',
    definition:
      '在使用者裝置或邊緣節點（手機、PC、攝影機）直接推論。優點：低延遲、隱私、無雲端費用。受 SLM 與專用加速晶片支撐。',
    whyItMattersForInvestor:
      'AI PC（Copilot+ PC）、Apple Intelligence 都屬此類；對端側 OEM 與 SLM 生態相關。',
    related: ['slm'],
  },

  // ===== RAG 與 Agent =====
  {
    id: 'rag',
    term: 'RAG（檢索增強生成）',
    termEn: 'Retrieval-Augmented Generation',
    category: 'rag-agent',
    definition:
      '在 LLM 生成前先從外部知識庫檢索相關資料，把檢索結果連同問題一併送進模型。是企業導入 LLM 最常見的架構。',
    whyItMattersForInvestor:
      '企業資料 + LLM 的結合是「資料護城河」型公司的核心商業模式，例 Palantir AIP、Snowflake Cortex。',
    related: ['vector-db', 'embeddings', 'reranking', 'hybrid-search'],
  },
  {
    id: 'hybrid-search',
    term: 'Hybrid Search（混合搜尋）',
    category: 'rag-agent',
    definition:
      '結合關鍵字搜尋（BM25）與向量搜尋的混合策略，常見能比單一向量搜尋有更好的召回率。',
    related: ['rag', 'reranking'],
  },
  {
    id: 'reranking',
    term: 'Reranking（重排序）',
    category: 'rag-agent',
    definition:
      'RAG 流程中，把第一輪檢索回來的候選文件再用一個專門的 reranker 模型重新排序，提升 top-k 結果品質。',
    related: ['rag'],
  },
  {
    id: 'agent',
    term: 'Agent / Agentic AI',
    category: 'rag-agent',
    definition:
      '具備規劃、工具呼叫、自我修正能力的 LLM 系統。可跨多步驟、跨系統完成任務，不只是回答問題。',
    whyItMattersForInvestor:
      'Agent 是 2025–2030 最大的 AI 軟體故事；可能取代「席次定價」型 SaaS 的人均工作模型。',
    related: ['tool-use', 'mcp', 'multi-agent'],
  },
  {
    id: 'tool-use',
    term: 'Tool Use / Function Calling',
    category: 'rag-agent',
    definition:
      'LLM 呼叫外部 API、函式、資料庫的能力。是 Agent 的基礎元件。',
    related: ['agent', 'mcp'],
  },
  {
    id: 'mcp',
    term: 'MCP（Model Context Protocol）',
    category: 'rag-agent',
    definition:
      'Anthropic 主導的開放協定，讓 LLM 客戶端（如 Claude、Cursor）以標準方式連接外部資料源與工具。',
    whyItMattersForInvestor:
      'MCP 若成為事實標準，會影響「資料連接」這層的競爭結構，類似 API 之於行動 App。',
    related: ['agent', 'tool-use'],
  },
  {
    id: 'multi-agent',
    term: 'Multi-Agent（多代理）',
    category: 'rag-agent',
    definition:
      '由多個 Agent 分工協作的系統（例如：planner agent + executor agent + reviewer agent）。',
    related: ['agent'],
  },
  {
    id: 'computer-use',
    term: 'Computer Use / Browser Use',
    category: 'rag-agent',
    definition:
      'Agent 直接操作螢幕、鍵盤、瀏覽器來完成任務的能力。例：Anthropic Computer Use、OpenAI Operator。',
    related: ['agent'],
  },

  // ===== 應用與商業模式 =====
  {
    id: 'copilot',
    term: 'Copilot',
    category: 'app-and-biz',
    definition:
      '附加在既有工作環境（Office、IDE、CRM）內的 AI 助手。以「人類在駕駛、AI 在副駕」為設計哲學。',
    whyItMattersForInvestor:
      '是當前最主流的 AI 加值模式；Microsoft 365 Copilot、GitHub Copilot、Salesforce Einstein 都屬此類。',
    related: ['agent', 'seat-based-pricing'],
  },
  {
    id: 'chatbot-vs-agent',
    term: 'Chatbot vs Agent',
    category: 'app-and-biz',
    definition:
      'Chatbot 只「回答」；Agent 可「行動」。投資意義上差別很大——Agent 創造可衡量的工作成果，較容易 outcome-based 收費。',
    related: ['agent', 'copilot'],
  },
  {
    id: 'saas',
    term: 'SaaS（軟體即服務）',
    termEn: 'Software as a Service',
    category: 'app-and-biz',
    definition:
      '雲端訂閱式軟體。AI 軟體投資多數標的屬此類；近年訂閱制是否被 Agent 用量取代是熱門議題。',
    related: ['seat-based-pricing', 'usage-based-pricing'],
  },
  {
    id: 'vertical-saas',
    term: 'Vertical SaaS（垂直 SaaS）',
    category: 'app-and-biz',
    definition:
      '專門服務單一產業（醫療、法律、建築、生技）的 SaaS。受惠於專業資料與工作流程鎖定，但 TAM 較窄。',
    related: ['saas', 'workflow-lockin'],
  },
  {
    id: 'seat-based-pricing',
    term: 'Seat-based Pricing（席次計費）',
    category: 'app-and-biz',
    definition:
      '依「使用者人數」收費的訂閱模式。傳統 SaaS 主流。若 Agent 取代部分人力，席次數會收縮，是顛覆風險。',
    whyItMattersForInvestor:
      '本網站 KPI 中的 `seatPricingDisruptionRisk` 就是衡量這項風險。',
    related: ['saas', 'usage-based-pricing'],
  },
  {
    id: 'usage-based-pricing',
    term: 'Usage-based Pricing（用量計費）',
    category: 'app-and-biz',
    definition:
      '依 token、API call、儲存量、推論次數計費。Snowflake、AWS、模型 API 皆採用。Agent 普及會使更多 SaaS 走向 usage-based。',
    related: ['seat-based-pricing', 'tokens'],
  },
  {
    id: 'outcome-based-pricing',
    term: 'Outcome-based Pricing（成果計費）',
    category: 'app-and-biz',
    definition:
      '依「達成的業務成果」收費（例：客服 Agent 每解決一張工單 X 元）。Salesforce Agentforce 朝此方向走。',
    related: ['agent', 'usage-based-pricing'],
  },
  {
    id: 'arr',
    term: 'ARR（年化經常性收入）',
    termEn: 'Annual Recurring Revenue',
    category: 'app-and-biz',
    definition:
      'SaaS 訂閱模型的核心指標：以當期月費 × 12 推算。是 AI ARR vs 總 ARR 的拆解是觀察 AI 真實營收的核心方式。',
    related: ['nrr', 'real-ai-revenue'],
  },
  {
    id: 'nrr',
    term: 'NRR（淨收入留存率）',
    termEn: 'Net Revenue Retention',
    category: 'app-and-biz',
    definition:
      '同一批客戶今年支出 / 去年支出。> 120% 為頂尖 SaaS 表現。AI 加值能否提升 NRR 是觀察 ROI 的關鍵之一。',
    related: ['arr', 'attach-rate'],
  },
  {
    id: 'attach-rate',
    term: 'Attach Rate（加購率）',
    category: 'app-and-biz',
    definition:
      '主訂閱客戶中加購 AI 模組的比例。如 Microsoft 365 Copilot 加購率、ServiceNow Pro Plus 加購率。',
    related: ['arr', 'nrr'],
  },
  {
    id: 'rpo',
    term: 'RPO（剩餘合約義務）',
    termEn: 'Remaining Performance Obligations',
    category: 'app-and-biz',
    definition:
      '已簽合約但尚未認列的營收。Oracle 因 OpenAI 等 AI 客戶大單而 RPO 暴增，是 AI 軟體看點之一。',
    related: ['arr'],
  },
  {
    id: 'api',
    term: 'API（應用程式介面）',
    termEn: 'Application Programming Interface',
    category: 'app-and-biz',
    definition:
      '模型供應商讓客戶以程式呼叫模型的入口。OpenAI / Anthropic / Google 都以 API 為主要 B2B 變現方式。',
    related: ['tokens', 'usage-based-pricing'],
  },
  {
    id: 'ai-gateway',
    term: 'AI Gateway',
    category: 'app-and-biz',
    definition:
      '統一管理多個 LLM API 的中介層：路由、Rate Limit、log、成本控管、PII 過濾。例：Cloudflare AI Gateway、Portkey。',
    related: ['api'],
  },
  {
    id: 'mlops',
    term: 'MLOps',
    category: 'app-and-biz',
    definition:
      '機器學習版本的 DevOps：模型實驗、版本、部署、監控。LLM 時代延伸出 LLMOps。',
    related: ['observability'],
  },
  {
    id: 'observability',
    term: 'AI Observability',
    category: 'app-and-biz',
    definition:
      '追蹤 LLM 應用的回應品質、Latency、成本、Hallucination 率的工具層。例：LangSmith、Arize、Datadog LLM Observability。',
    related: ['mlops', 'hallucination'],
  },

  // ===== 風險與治理 =====
  {
    id: 'hallucination',
    term: 'Hallucination（幻覺）',
    category: 'risk-governance',
    definition:
      'LLM 自信地產出錯誤資訊（事實錯誤、虛構引用、捏造函式名）的現象。在高責任場景（醫療、法律、財務）是主要風險。',
    whyItMattersForInvestor:
      '對垂直 SaaS（法律、醫療）採用速度有重大影響；本站對該類公司給較保守的 attach rate。',
    related: ['rag', 'observability'],
  },
  {
    id: 'prompt-injection',
    term: 'Prompt Injection',
    category: 'risk-governance',
    definition:
      '攻擊者把惡意指令藏在使用者輸入或外部文件，誘騙 LLM 偏離原本指令。是 Agent 時代資安最大風險之一。',
    whyItMattersForInvestor:
      '直接利好資安 AI 公司（CRWD、PANW、ZS 等）。',
    related: ['jailbreak', 'shadow-ai'],
  },
  {
    id: 'jailbreak',
    term: 'Jailbreak',
    category: 'risk-governance',
    definition:
      '繞過模型安全規範使其輸出原本被禁止內容的技術。',
    related: ['prompt-injection'],
  },
  {
    id: 'shadow-ai',
    term: 'Shadow AI',
    category: 'risk-governance',
    definition:
      '員工自行使用未受公司控管的 AI 工具（如個人版 ChatGPT），可能造成資料外洩。資安公司視此為新攻擊面。',
    related: ['prompt-injection'],
  },
  {
    id: 'ai-governance',
    term: 'AI Governance',
    category: 'risk-governance',
    definition:
      '企業治理 AI 的政策、紀錄、稽核機制。例：誰可以用、用哪個模型、訓練資料是否合規。EU AI Act 加速此需求。',
    related: ['compliance'],
  },
  {
    id: 'compliance',
    term: 'Compliance / GDPR / SOC2',
    category: 'risk-governance',
    definition:
      '資料合規規範：GDPR（歐盟個資）、HIPAA（美國醫療）、SOC2（雲服務安全）。AI 加上這些限制會墊高成本。',
    related: ['ai-governance'],
  },
  {
    id: 'data-leakage',
    term: 'Data Leakage（資料外洩）',
    category: 'risk-governance',
    definition:
      'LLM 在輸出中無意洩漏訓練資料或客戶機密。常見場景：未隔離租戶、未加密的 RAG 索引。',
    related: ['prompt-injection', 'shadow-ai'],
  },
  {
    id: 'model-drift',
    term: 'Model Drift（模型漂移）',
    category: 'risk-governance',
    definition:
      '模型表現隨時間下降（資料分布變化、訓練 / 生產差異）。需要持續觀測與重訓練。',
    related: ['observability', 'mlops'],
  },

  // ===== 投資概念 =====
  {
    id: 'real-ai-revenue',
    term: '真實 AI 營收 vs AI 敘事',
    category: 'investment',
    definition:
      '「真實 AI 營收」指有揭露 ARR、付費客戶、用量證據的 AI 業務收入。「AI 敘事」指股價反映 AI 但缺乏可驗證的營收佔比。',
    whyItMattersForInvestor:
      '本網站的 `realAiRevenueConfidenceScore` 即為衡量此差距；高敘事 / 低真實收入 = 高評價風險。',
    related: ['arr', 'attach-rate'],
  },
  {
    id: 'workflow-lockin',
    term: 'Workflow Lock-in（工作流程鎖定）',
    category: 'investment',
    definition:
      '客戶把該軟體深度嵌入日常工作流程，更換成本極高。ServiceNow、Workday、Salesforce 屬此類。',
    whyItMattersForInvestor:
      'Workflow Lock-in 是 AI 軟體最強的護城河之一，比模型能力更耐久。',
    related: ['data-moat', 'switching-cost'],
  },
  {
    id: 'data-moat',
    term: 'Data Moat（資料護城河）',
    category: 'investment',
    definition:
      '基於專有資料（客戶資料、互動資料、領域資料）建立的競爭優勢。LLM 時代「自家資料 + 開源模型」可能比「通用 LLM」更有價值。',
    related: ['workflow-lockin', 'real-ai-revenue'],
  },
  {
    id: 'switching-cost',
    term: 'Switching Cost（切換成本）',
    category: 'investment',
    definition:
      '客戶從一個軟體換到另一個的成本（資料搬遷、流程重整、員工再訓練、合規重認證）。',
    related: ['workflow-lockin'],
  },
  {
    id: 'model-commoditization',
    term: 'Model Commoditization（模型商品化）',
    category: 'investment',
    definition:
      '模型能力差距縮小，價格戰開打，模型本身難以差異化。開源（Llama / DeepSeek）是主要推力。',
    whyItMattersForInvestor:
      '對模型供應商是長期毛利壓力；對應用層 / 資料層公司則是利多（成本下降）。',
    related: ['inference-cost', 'open-source-model'],
  },
  {
    id: 'open-source-model',
    term: 'Open-source Model（開源模型）',
    category: 'investment',
    definition:
      '權重公開、可自架的模型。Llama（Meta）、Mistral、DeepSeek、Qwen（阿里）為代表。對閉源 API 形成價格與部署彈性壓力。',
    related: ['model-commoditization'],
  },
  {
    id: 'stack-layer',
    term: 'Stack Layer（堆疊分層）',
    category: 'investment',
    definition:
      'AI 軟體價值鏈分層：應用 → Agent → 模型 API → 資料 / RAG → MLOps → 雲端算力 → 企業資料。每層的競爭結構與毛利不同。',
    related: ['workflow-lockin'],
  },
  {
    id: 'ai-native',
    term: 'AI-native（AI 原生）',
    category: 'investment',
    definition:
      '從第一天就圍繞 AI 設計的產品 / 公司（例：Cursor、Perplexity、Harvey）。相對於「既有 SaaS 加 AI 模組」。',
    related: ['model-commoditization'],
  },
  {
    id: 'tam',
    term: 'TAM（潛在市場規模）',
    termEn: 'Total Addressable Market',
    category: 'investment',
    definition:
      '商業策略中估算的可服務市場上限。AI 可能擴大既有軟體的 TAM（吃掉服務支出），也可能壓縮 TAM（取代席次）。',
    related: ['saas', 'agent'],
  },
  {
    id: 'capex-vs-opex',
    term: 'Capex vs Opex（資本支出 vs 營運支出）',
    category: 'investment',
    definition:
      'AI 硬體投資是 Capex；AI 軟體訂閱是 Opex。雲端業者 Capex 暴增是當前 AI 投資循環的主因。',
    related: ['inference-cost'],
  },
];
