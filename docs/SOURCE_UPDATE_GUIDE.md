# 資料更新指南

本網站為純靜態資料。任何更新都應遵循以下流程，並嚴守反幻覺原則。

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
