# AI 軟體產業投資地圖：美股與台股

一個 **教育性研究專案**，協助使用者辨識「真實 AI 軟體贏家」與「僅有 AI 敘事」的公司。

> 本網站不提供任何投資建議。所有 KPI 分數皆為「產業邏輯評分，尚未串接即時財務資料」。

## 功能

- **11 大 AI 軟體分類**（基礎模型 / 雲端 AI / 企業 SaaS / 資料平台 / Agent / Coding / 資安 / 搜尋與廣告 / 垂直 SaaS / EDA / 工業 AI）
- **公司資料庫**：50+ 家美股、台股、未上市與歐股公司，每家附 `confidenceLevel` 與 `sourceUrls`
- **六大投資 KPI**（短期 / 三年 / 五年 / 十年 / 真實 AI 營收可信度 / AI 顛覆風險）
- **互動視覺化**：雷達圖、護城河 vs 成長散布圖、AI 真實營收 vs 敘事散布圖、顛覆風險熱力圖
- **多維度篩選器**：市場、分類、商業模式、AI 營收曝險、公司型態、KPI 門檻
- **台灣供應鏈視角**：嚴格四級標籤（直接 / 間接 / 系統整合 / 需驗證）
- **完整評分方法 + 投資邏輯說明頁**

## 技術棧

- Vite + React 18 + TypeScript
- Tailwind CSS
- React Router (Hash routing，方便部署到任意靜態 host)
- Recharts

## 開發

```bash
npm install
npm run dev      # http://localhost:5173
npm run typecheck
npm run build    # 產出靜態檔到 dist/
npm run preview  # 預覽 production build
```

## 專案結構

```
src/
  types/company.ts                 # Company + InvestmentKpi 型別
  data/
    categories.ts                  # 11 大分類 + 7 種投資型態
    kpiHelper.ts                   # KPI 預設值 + 公式（自動計算主分數）
    aiSoftwareCompanies.ts         # 公司資料統一出口
    companies/                     # 依大分類拆檔的公司原始資料
      platformGiants.ts
      modelProviders.ts
      enterpriseSaas.ts
      dataPlatform.ts
      devToolsAndSecurity.ts
      adsAndVertical.ts
      edaAndIndustrial.ts
      taiwan.ts
  components/                      # 共用 UI（Layout / Navbar / Filter / 圖表）
  pages/                           # 路由頁面
```

## 反幻覺原則

- **不杜撰** 營收 / 客戶名 / 市占 / 估值 / AI 營收佔比
- 無法驗證的欄位一律標註 `需要資料驗證`
- 每家公司都附 `sourceUrls` 與 `lastUpdated`
- 每組 KPI 都附 `kpiConfidenceLevel` 與 `kpiSourceUrls`
- 所有 KPI 為產業邏輯評分，與當下市場價格 / 即時財務資料無關

## 文件

- [docs/DATA_SCHEMA.md](docs/DATA_SCHEMA.md) — 公司資料 schema
- [docs/SOURCE_UPDATE_GUIDE.md](docs/SOURCE_UPDATE_GUIDE.md) — 資料更新流程
- [docs/KPI_FORMULA.md](docs/KPI_FORMULA.md) — KPI 公式定義
- [docs/FUTURE_IMPROVEMENTS.md](docs/FUTURE_IMPROVEMENTS.md) — Roadmap

## 仍需驗證的事項（重點）

請以「需要資料驗證」的態度看待以下類別：

- 所有未上市公司（OpenAI、Anthropic、xAI、Mistral、Cohere、Databricks、Cursor、Replit、JetBrains）— 私有公司不直接投資；揭露有限
- 所有台股公司的「AI 軟體真實營收佔比」
- `aiRevenueExposure` 為 `Needs Verification` 的公司
- `confidenceLevel` 為 `Low` 的公司

## License

本專案僅供個人研究與教育用途。
