export default function Methodology() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="section-title">評分方法（KPI 公式與資料原則）</h1>
        <p className="section-subtitle">
          六大主要分數，每個都使用透明公式由子分數加權產生。本網站尚未串接即時財務資料，所有分數為「產業邏輯評分」。
        </p>
      </header>

      <Formula
        title="A. 短期催化分數（3~12 個月）"
        purpose="評估近期股價催化。"
        formula={`shortTermScore =
  0.20 * aiProductLaunchMomentum +
  0.20 * revenueAcceleration +
  0.15 * earningsRevisionMomentum +
  0.15 * enterpriseAdoptionSignal +
  0.15 * marketNarrativeStrength +
  0.10 * valuationReratingPotential +
  0.05 * nearTermCompetitionRiskInverse`}
      />
      <Formula
        title="B. 三年成長分數"
        purpose="評估能否把 AI 採用轉化為實質營收成長。"
        formula={`threeYearScore =
  0.25 * aiRevenueExposureScore +
  0.20 * productAttachRate +
  0.15 * usageBasedRevenuePotential +
  0.15 * enterpriseAdoption +
  0.15 * pricingPower +
  0.10 * salesExecution`}
      />
      <Formula
        title="C. 五年護城河分數"
        purpose="評估持久的 AI 軟體護城河。"
        formula={`fiveYearScore =
  0.25 * dataMoat +
  0.20 * workflowLockIn +
  0.15 * ecosystemIntegration +
  0.15 * switchingCost +
  0.10 * modelInfrastructureAdvantage +
  0.10 * developerEcosystem +
  0.05 * brandTrust`}
      />
      <Formula
        title="D. 十年結構性價值分數"
        purpose="評估能否成為長期 AI 軟體平台。"
        formula={`tenYearScore =
  0.20 * platformPotential +
  0.20 * tamExpansion +
  0.15 * aiNativeArchitecture +
  0.15 * modelCommoditizationResilience +
  0.15 * distributionAdvantage +
  0.10 * rdCapability +
  0.05 * balanceSheetResilience`}
      />
      <Formula
        title="E. 真實 AI 營收可信度分數"
        purpose="區分真實 AI 營收與 AI 敘事。"
        formula={`realAiRevenueConfidenceScore =
  0.25 * disclosedAiRevenue +
  0.20 * paidAiProductAdoption +
  0.15 * customerCaseEvidence +
  0.15 * usageGrowthEvidence +
  0.10 * pricingEvidence +
  0.10 * retentionEvidence +
  0.05 * sourceConfidence`}
      />
      <Formula
        title="F. AI 顛覆風險分數"
        purpose="評估 AI 是否反過來顛覆該公司。分數越高代表風險越高。"
        formula={`aiDisruptionRiskScore =
  0.20 * productSubstitutionRisk +
  0.20 * aiNativeCompetitorRisk +
  0.15 * marginCompressionRisk +
  0.15 * seatPricingDisruptionRisk +
  0.15 * openSourceCompetitionRisk +
  0.15 * churnRisk`}
      />

      <section className="card p-5">
        <h2 className="text-lg font-bold">子分數的給分原則</h2>
        <ul className="mt-3 list-disc pl-5 text-sm space-y-1.5 text-slate-700">
          <li>0~100 之間的相對分數，依產業邏輯排序，不代表絕對值</li>
          <li>顛覆風險分數越高 = 風險越大；其他主要分數越高越好</li>
          <li>無法驗證的指標，給予偏保守的分數，並降低 kpiConfidenceLevel</li>
          <li>「敘事熱度（marketNarrativeStrength）」不等於真實 AI 營收</li>
          <li>避免將同一證據重複計入多個子分數</li>
        </ul>
      </section>

      <section className="card p-5">
        <h2 className="text-lg font-bold">資料更新政策</h2>
        <ul className="mt-3 list-disc pl-5 text-sm space-y-1.5 text-slate-700">
          <li>所有公司皆有 <code>sourceUrls</code> 與 <code>lastUpdated</code> 欄位</li>
          <li>有重大新聞 / 季報 / AI 產品更新時，需重新檢視 KPI</li>
          <li>不杜撰營收、客戶名、市占、估值</li>
          <li>有疑問的數據一律標註「需要資料驗證」</li>
        </ul>
      </section>

      <section className="card p-5">
        <h2 className="text-lg font-bold">本網站尚未做的事（Roadmap）</h2>
        <ul className="mt-3 list-disc pl-5 text-sm space-y-1.5 text-slate-700">
          <li>串接即時財務資料（API、季報、Earnings Call 重點）</li>
          <li>每家公司的 AI 營收佔比量化追蹤</li>
          <li>機構持股 / 估值倍數模組</li>
          <li>新聞流與 KPI 自動更新</li>
          <li>更多 Taiwan / Europe / Japan AI 軟體公司</li>
          <li>讓使用者自訂權重的 KPI 模擬器</li>
        </ul>
      </section>
    </div>
  );
}

function Formula({ title, purpose, formula }: { title: string; purpose: string; formula: string }) {
  return (
    <section className="card p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-slate-700 mt-1">{purpose}</p>
      <pre className="mt-3 bg-slate-50 rounded-lg p-3 text-xs overflow-x-auto leading-relaxed text-slate-700">
{formula}
      </pre>
      <p className="text-xs text-slate-500 mt-2">
        此 KPI 為產業邏輯評分，尚未串接即時財務資料。
      </p>
    </section>
  );
}
