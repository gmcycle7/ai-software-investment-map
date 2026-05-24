export default function InvestmentLogic() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="section-title">AI 軟體投資邏輯</h1>
        <p className="section-subtitle">硬體 vs 軟體 / 價值創造方程式 / 風險方程式 / 投資原則</p>
      </header>

      <section className="grid lg:grid-cols-2 gap-4">
        <Card title="AI 硬體投資特色">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>需求短期可見度高（GPU、HBM、Networking、Power、Cooling）</li>
            <li>由 capex 推動，景氣循環敏感</li>
            <li>供應鏈可驗證、出貨節奏清楚</li>
            <li>毛利率波動度高（依產品 mix / 客戶 mix 變化）</li>
            <li>常見贏家：晶片、HBM、CoWoS、AI 伺服器整機、電源 / 散熱</li>
          </ul>
        </Card>
        <Card title="AI 軟體投資特色">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>變現速度可能較慢（採用 / ROI 需要時間）</li>
            <li>毛利率潛在較高，但會被推論成本壓縮</li>
            <li>真實 AI 營收揭露不易，需要小心區分敘事</li>
            <li>產品市場契合（PMF）與工作流程整合是關鍵</li>
            <li>通路（Distribution）與資料（Data Moat）比模型能力更耐久</li>
            <li>AI 同時是機會也是顛覆風險</li>
          </ul>
        </Card>
      </section>

      <Card title="AI 軟體價值創造方程式" big>
        <div className="text-lg md:text-xl font-bold text-brand-700 break-words">
          AI 軟體價值 = Distribution × Workflow Lock-in × Data Moat × AI Capability × Pricing Power
        </div>
        <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-1.5">
          <li><strong>Distribution（通路）：</strong>已經接觸客戶的能力。決定 AI 加值能不能被「立刻變現」</li>
          <li><strong>Workflow Lock-in（工作流程鎖定）：</strong>客戶離不開的程度</li>
          <li><strong>Data Moat（資料護城河）：</strong>專有資料、客戶資料、互動資料的累積</li>
          <li><strong>AI Capability（AI 能力）：</strong>模型能力、Agent 能力、產品設計能力</li>
          <li><strong>Pricing Power（定價權）：</strong>能否以加值換取漲價</li>
        </ul>
      </Card>

      <Card title="AI 軟體風險方程式" big>
        <div className="text-lg md:text-xl font-bold text-rose-600 break-words">
          AI 軟體風險 = 模型商品化 + 開源競爭 + AI 原生顛覆 + ROI 不明 + 資安 / 合規
        </div>
        <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-1.5">
          <li><strong>模型商品化：</strong>模型能力差距縮小，靠模型獨占的差異化會消失</li>
          <li><strong>開源競爭：</strong>Llama / Mistral / DeepSeek 等開源模型壓縮收費空間</li>
          <li><strong>AI 原生顛覆：</strong>新創（Cursor / Perplexity / Harvey 等）以 AI-native 架構挑戰既有 SaaS</li>
          <li><strong>ROI 不明：</strong>企業即使試用，也難以證明節省成本或提升營收</li>
          <li><strong>資安 / 合規：</strong>Prompt Injection、資料外洩、法規限制</li>
        </ul>
      </Card>

      <Card title="實務投資原則">
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>「AI 故事」≠「AI 營收」。先確認真實付費滲透。</li>
          <li>判斷席次定價是否被 Agent 取代（HR / CRM / 客服 / Coding 都受影響）。</li>
          <li>模型本身不是長期護城河。資料與通路才是。</li>
          <li>AI 加值不一定能轉成漲價，可能只是「不漲價但保留客戶」。</li>
          <li>留意 Agent 出錯成本（accuracy × downside）。</li>
          <li>毛利結構：推論成本是長期毛利的關鍵變數。</li>
          <li>對被 AI 顛覆風險高的公司，估值便宜不代表安全。</li>
        </ol>
      </Card>

      <Card title="反幻覺原則">
        <ul className="list-disc pl-5 space-y-1.5 text-sm">
          <li>本網站不杜撰營收 / 客戶 / 市占 / 估值 / AI 營收佔比</li>
          <li>不確定的欄位一律標註「需要資料驗證」</li>
          <li>每家公司都附 sourceUrls，便於延伸閱讀</li>
          <li>每組 KPI 都有 kpiConfidenceLevel</li>
          <li>未串接即時財務資料前，所有 KPI 為「產業邏輯評分」</li>
        </ul>
      </Card>
    </div>
  );
}

function Card({ title, children, big = false }: { title: string; children: React.ReactNode; big?: boolean }) {
  return (
    <div className={`card ${big ? 'p-6' : 'p-5'}`}>
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-3 text-sm text-slate-700 leading-relaxed">{children}</div>
    </div>
  );
}
