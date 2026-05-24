// 每家公司一條「給軟體分析師 / PM 的觀察點」
// 規則：1 句話、可量化、最好是一個「下季要追蹤的數據或事件」
// 與 analystView（較長、偏觀點）區隔；這裡偏行動。

export const INVESTOR_ANGLE: Record<string, string> = {
  // ===== 平台巨頭 =====
  msft: '每季財報追：M365 Copilot 加購席次數揭露、Azure AI 服務增速、與 OpenAI 合作條款的任何措辭變化。',
  googl: '每季追：Search 廣告 RPM（每千次搜尋廣告收入）、Gemini API token 用量公告、雲端業務 AI workload 比重。',
  amzn: '追：AWS 增速與營業利潤率（AI workload 是否拉動成長）、Trainium / Inferentia 出貨節奏、Bedrock 第三方模型權重變化。',
  meta: '追：每季 Reality Labs 虧損、廣告 ROI 改善（Advantage+）的客戶採用率、Llama 開源節奏與市場接受度。',
  orcl: '追：RPO（剩餘合約義務）成長率、OpenAI / Meta / xAI 等大客戶的履約進度、OCI 增速。',
  ibm: '追：watsonx 收入線、Red Hat 增速、Software 業務有機成長率。',

  // ===== 模型供應商 =====
  openai: '追：每年收入指引 vs 實際、ChatGPT 訂閱數、API ASP 變化、與 Microsoft 合作條款的任何措辭變化。',
  anthropic: '追：Claude Code 用量飛輪、AWS Bedrock 上 Claude 流量、Computer Use 商用案例數。',
  xai: '追：Colossus 算力擴張節奏、Grok API 開放程度、X 平台整合的真實付費滲透率。',
  mistral: '追：歐洲企業客戶數、與 Microsoft Azure 等合作的真實 ARR 揭露。',
  cohere: '追：Embed / Rerank 在企業 RAG 中的滲透、與 Oracle / NVIDIA 合作的真實 ARR。',

  // ===== 企業 SaaS =====
  crm: '追：Agentforce 每季簽約數、Data Cloud 採用率、Service Cloud 席次數年增率。',
  now: '追：Now Assist 加購率、Pro Plus 滲透率、cRPO（短期 RPO）連續成長。',
  adbe: '追：Acrobat AI Assistant 訂閱數、Creative Cloud NRR、Firefly 商用 Token 用量。',
  team: '追：Cloud ARR 增速、Rovo Agents 加購率、Premium 客戶比重。',
  wday: '追：HR Agent 系列採用率、subscription backlog 成長率、財務模組客戶數。',
  intu: '追：QuickBooks 高端 (Advanced) 滲透率、TurboTax Live 採用率、Intuit Assist 公告任何 ARR 數字。',
  hubs: '追：Hub 加購率（從 1 個 Hub 變多 Hub 的比例）、Breeze AI 採用、淨增客戶數。',
  zm: '追：Contact Center 訂閱客戶數、Workplace 訂閱 ARR、AI Companion 是否轉為付費模組。',

  // ===== 資料平台 / Agent =====
  snow: '追：每季 Cortex 用量公告、product RPO 成長率、AI workload 佔總消耗比例。',
  databricks: '追：IPO 動態、宣告 ARR 數字、Mosaic AI 商業化進度。',
  mdb: '追：Atlas 收入佔比、Vector Search 用量、淨增客戶數連續恢復。',
  estc: '追：Elastic Cloud 收入增速、ESRE / AI Assistant 公告任何 ARR 拆分。',
  cflt: '追：Confluent Cloud 收入增速、Tableflow 採用、即時 AI workload 用例公告。',
  net: '追：Workers AI / AI Gateway / Vectorize 任何 ARR 數字、Pool of Funds 大客戶簽約。',
  pltr: '追：商業（非政府）營收增速、Bootcamp 轉化率、AIP 客戶留存。',
  path: '追：ARR 成長率重回 20%+、Autopilot Agent 商用案例、Microsoft Power Automate 競爭壓力。',
  appn: '追：Cloud subscription 增速、Process AI 真實 ARR、現金消耗節奏。',
  mnday: '追：每客戶 ARR 增速、monday AI 加購率、企業客戶數連續成長。',
  asan: '追：AI Studio 真實付費滲透、淨增客戶數恢復、現金流轉正時點。',

  // ===== AI Coding / Cybersecurity =====
  gtlb: '追：Duo Pro / Duo Enterprise 滲透率、政府 / 受監管產業客戶數、與 GitHub 的競爭直接對比。',
  jetbrains: '私有公司；追：對 AI 原生 IDE（Cursor / Windsurf）的回應節奏。',
  replit: '私有公司；追：Agent 付費客戶數、企業端商用案例。',
  cursor: '私有公司；追：訂閱 ARR、與 GitHub Copilot / Claude Code 的功能差距。',
  crwd: '追：Charlotte AI 加購率、Falcon 模組數中位數、識別事件後快速反彈表現。',
  panw: '追：Cortex XSIAM ARR、Platformization 客戶數、Next-Gen Security ARR 佔比。',
  ftnt: '追：訂閱收入增速、SASE 訂閱增速、FortiAI 是否獨立揭露。',
  zs: '追：DBNRR、Risk360 / AI for Data Protection 採用、Emerging products 收入。',
  s: '追：Purple AI 採用、ARR 成長率與 CrowdStrike 差距、每客戶 ARR 成長。',
  okta: '追：客戶數成長、Identity Security Posture 採用、Microsoft Entra 競爭壓力。',

  // ===== AI 搜尋 / 廣告 / 垂直 SaaS =====
  pins: '追：每使用者廣告 RPM、Performance+ 廣告主採用、購物意圖貨幣化進度。',
  rddt: '追：每使用者廣告 ARPU、資料授權收入成長、Google 搜尋導流變化。',
  ttd: '追：總 spend 成長、Kokai 採用率、與 Amazon DSP 競爭壓力。',
  app: '追：軟體平台收入成長、AXON 在電商 / FinTech 等非遊戲領域的滲透、毛利結構變化。',
  veev: '追：CRM 客戶遷移節奏、Veeva AI 公告任何 ARR 數字、Pharma 採購季節性。',
  docs: '追：醫師會員活躍度、Pharma 廣告支出回升、DocsGPT 採用節奏。',
  duol: '追：付費訂閱數、Max 升級率、AI Tutor 月活留存。',
  tri: '追：CoCounsel 客戶數、Legal Professional 訂閱增速、Westlaw NRR。',
  relx: '追：Risk & Business 增速、Lexis+ AI 採用、Scientific & Technical 留存。',
  chgg: '追：付費用戶數每季流失、AI 加值留存、現金流穩定性。本網站列入主要為教材用例。',
  c3ai: '追：實際 ARR 成長率、Baker Hughes 合約續約、訂閱 vs 用量計費佔比。',

  // ===== EDA / 工業 =====
  snps: '追：Q4 / Q1 IP 與 EDA 業務成長率、半導體大客戶 capex 動態、中國市場政策變化。',
  cdns: '追：訂單 backlog、System Design and Analysis 業務增速、AI 晶片設計需求。',
  anss: '追：與 Synopsys 合併進度、模擬軟體訂閱增速。',
  keys: '追：測試業務景氣、AI 晶片驗證需求、訂閱業務佔比。',
  siemens: '追：Digital Industries 訂單、Siemens EDA 業務揭露（在 Siemens Healthineers 拆分後）。',
  rok: '追：Logix 控制器訂單、訂閱業務增速、製造業景氣領先指標。',
  ptc: '追：ARR 增速、IoT / AR 業務、Creo / Windchill 客戶數。',
  adsk: '追：訂閱定價爭議下的 NRR、Construction 業務增速、生成式設計採用。',
  dsy: '追：Industrial Innovation 增速、Medidata 增速、3DEXPERIENCE Cloud 採用。',
  ter: '追：半導體測試訂單、Universal Robots 增速、AI 晶片驗證營收。',

  // ===== Taiwan =====
  'twse-4704': '追：Vision One 訂閱收入、日本 / 亞太區增速、AI 模組加購率。',
  'twse-5203': '追：FaceMe 是否獨立揭露營收、PowerDirector 訂閱增速；本網站對 AI 真實收入仍標需驗證。',
  'twse-6669': '追：AI 伺服器出貨節奏、毛利率變化、大客戶集中度。屬硬體公司，AI 軟體曝險為間接。',
  'twse-2382': '追：AI 伺服器組裝出貨節奏、毛利率變化。屬硬體，列入為對照參考。',
  'twse-2412': '追：hicloud 增速、政府專案得標數；AI 收入需驗證。',
  'twse-6214': '追：年度 Microsoft / AWS / GCP 代理收入結構、AI 顧問專案數。',
  'twse-6166': '追：Edge AI / 機器人專案出貨、毛利結構；本質仍偏硬體。',

  // ===== 新增美股 / 私有 =====
  ddog: '追：LLM Observability 公告任何 ARR 拆分、AI workload 在總用量中的權重、Bits AI 採用率。',
  klvyo: '追：客戶數成長、上 SMB-Mid 客戶比例、Klaviyo AI 加購率。',
  twlo: '追：Communications 業務毛利率、Segment ARR 成長、客戶併購節奏。',
  tost: '追：location 增速、訂閱毛利率、Sous Chef AI 公告任何 ARR。',
  box: '追：Box AI 加購率、企業大客戶數、Microsoft 365 同類功能競爭。',
  bill: '追：Divvy 整合進度、客戶數成長、BILL AI 真實付費滲透。',
  fivn: '追：Enterprise 簽約、AI Agent ARR 拆分（若有揭露）、毛利結構變化。',
  pd: '追：ARR 成長率、Advance 採用率、Datadog / Splunk 內建告警的競爭。',
  iot: '追：每客戶 ARR 成長、新興 vertical（建築、公部門）滲透、毛利率變化。',
  glean: '私有公司；追：宣告 ARR 數字、Microsoft Copilot 競爭、企業連接器數量。',
  harvey: '私有公司；追：律所客戶數、產品線擴張（Vault、Workflows 採用）、與 Thomson Reuters CoCounsel 競爭。',
  sierra: '私有公司；追：客戶案例公開數量、outcome-based 計費爭議處理、與 Salesforce Agentforce 競爭。',
  perplexity: '私有公司；追：訂閱數成長、廣告變現嘗試的揭露、出版商授權糾紛動態。',
  writer: '私有公司；追：企業客戶數、Palmyra 模型評估表現、與 Microsoft / Anthropic 競爭。',
};
