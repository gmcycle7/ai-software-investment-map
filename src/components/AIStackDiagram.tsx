const layers = [
  { title: 'AI Application', desc: '使用者直接接觸的應用：Copilot、Chat、ChatBot、垂直應用', color: 'bg-brand-600' },
  { title: 'AI Agent / Workflow Automation', desc: 'Agentic AI、跨系統流程自動化', color: 'bg-brand-500' },
  { title: 'Model API / Foundation Model', desc: 'LLM、多模態模型、推論 API', color: 'bg-indigo-500' },
  { title: 'RAG / Vector Database / Data Platform', desc: '企業資料、檢索、向量資料庫、資料治理', color: 'bg-violet-500' },
  { title: 'MLOps / Observability / Security', desc: '模型運維、Pipeline、AI 觀測與資安', color: 'bg-sky-600' },
  { title: 'Cloud Infrastructure / GPU Compute', desc: '雲端 / GPU 算力 / Inference 設備', color: 'bg-emerald-600' },
  { title: 'Enterprise Data / Customer Workflow', desc: '企業最底層的資料 + 工作流程，是價值最深層', color: 'bg-slate-700' },
];

export function AIStackDiagram() {
  return (
    <div className="card p-5">
      <h3 className="text-lg font-bold">AI 軟體堆疊（Stack）</h3>
      <p className="section-subtitle">從應用面往下到企業資料層。投資邏輯需理解每一層的競爭結構。</p>
      <div className="mt-4 grid gap-3">
        {layers.map((l, i) => (
          <div
            key={l.title}
            className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 flex items-start gap-3 bg-white dark:bg-slate-900"
          >
            <div className={`w-10 h-10 rounded-lg ${l.color} text-white grid place-items-center font-bold`}>
              {i + 1}
            </div>
            <div>
              <div className="font-semibold">{l.title}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{l.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
