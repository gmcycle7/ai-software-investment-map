# 資料更新指南

本網站為純靜態資料。任何更新都應遵循以下流程，並嚴守反幻覺原則。

## 來源優先序（4 級）

任何寫入網站的資料，請依以下優先序選擇來源。寧可標 `Needs Verification`，也不要引用 Level 4 的來源。

| 等級 | 範例 | 適合欄位 | 注意事項 |
| --- | --- | --- | --- |
| **L1（最佳）** | 公司年報 / 10-K / 20-F、投資人簡報、季報新聞稿、Earnings Call transcript | 所有事實欄位（`whatTheyDo`、`monetizationModel`、`coreProducts`、`aiProducts`、`aiRevenueExposure`、KPI 中的 `disclosedAiRevenue`） | 必須附原始 PDF / IR 頁面 URL 至 `sourceUrls` |
| **L2（高）** | 公司官方產品頁、官方 newsroom / blog、官方技術白皮書、CEO 發表會錄音 | 產品線、技術描述、合作公告、發布節奏 | URL 必須是 `*.company.com` 或 `*.investor.company.com` 等官方域名 |
| **L3（中）** | 主流半導體 / 軟體分析媒體（SemiAnalysis、IEEE Spectrum、The Information、Stratechery、Substack 知名作者）、賣方研究報告（公開節錄）、Gartner / IDC / Forrester 公開報告 | 趨勢比較、產業背景、競爭格局 | 引用時請註明媒體名與發布日；不要當作事實欄位來源 |
| **L4（不採用）** | 未具名「業內人士」聲明、含目標價的個股推薦文章、Twitter / Reddit / 論壇 rumor、未經查證的譯稿、AI 生成摘要 | — | 一律剔除。需要更新時請回頭找 L1～L3 的原始來源 |

### 何時降一級

- 公司在 IR 簡報用「100+」、「數十家」這類模糊用語 → 降到 L2 等級對待，並在 `kpiCommentary` 中標註不精確
- L3 媒體報導的數字「轉述」公司內部 → 不要當作 L1；要找到原始公司來源
- 任何 L4 內容若實在重要 → 寫入時加 `需要資料驗證` 標籤，並把 `confidenceLevel` 降到 `Low`

## 更新觸發點

- 公司公布季報 / Earnings call
- 重大 AI 產品發布 / 客戶案例
- 重大併購 / 重組（例：Synopsys + Ansys）
- 重大法規事件（例：反托拉斯判決、出口管制）
- 模型 / API 重大改版

## 更新流程

1. **逐筆驗證**：
   - 至公司 IR 網站、官方 newsroom 確認來源
   - 不引用未經本人查閱的「報導之引述」
2. **更新欄位**：
   - 編輯 `src/data/companies/<檔名>.ts` 中對應的 `Company` 物件
   - 若是 KPI 調整，盡量只改子分數，主分數會自動由公式重算
3. **更新元資料**：
   - 把 `lastUpdated`、`kpiLastUpdated` 改成今天日期
   - 若信心下降，下調 `confidenceLevel` 或 `kpiConfidenceLevel`
   - 補上新的 `sourceUrls` / `kpiSourceUrls`
4. **不確定就標需驗證**：
   - 把 `aiRevenueExposure` 或 `businessModel` 改成 `Needs Verification`
   - 在 `kpiCommentary` 寫明需確認的點
5. **執行檢查**：
   - `npm run typecheck`
   - `npm run build`
6. **不要做的事**：
   - 不要根據新聞 headline 改 KPI；以原始來源為準
   - 不要為了讓 KPI 變漂亮而調整分數
   - 不要新增「不可驗證」的客戶名 / 營收佔比

## 加入新公司

範例（最簡 KPI override）：

```ts
{
  id: 'newco',
  name: 'NewCo',
  ticker: 'NEW',
  market: 'US',
  category: ['enterprise-saas'],
  // ... 其他欄位
  investmentKpi: defaultKpi({
    aiProductLaunchMomentum: 70,
    aiRevenueExposureScore: 50,
    kpiCommentary: '...',
    kpiConfidenceLevel: 'Medium',
    kpiSourceUrls: ['https://newco.com/ir'],
  }),
}
```

把它 push 到對應分檔，再 import 至 `aiSoftwareCompanies.ts`。
