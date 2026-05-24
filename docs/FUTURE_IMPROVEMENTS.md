# Future Improvements (Roadmap)

## 資料 / 內容

- [ ] 串接即時財務資料（如：每季 AI 業務 ARR 揭露追蹤）
- [ ] 自動整理 Earnings Call AI 提及次數 / 內容
- [ ] 引入機構持股、估值倍數（EV/Sales、P/E）模組
- [ ] 加入更多 Taiwan / Europe / Japan AI 軟體公司
- [ ] 加入 Korea / China A-share AI 軟體公司（搭配可投資性註記）
- [ ] 每家公司加入「最近一次催化事件」時間線

## 評分 / 模型

- [ ] 提供使用者自訂權重（Custom Weight Simulator）
- [ ] 加入「敘事 vs 真實 AI 營收」的單獨分頁
- [ ] 加入「Agent vs 席次定價」風險專頁
- [ ] KPI 變動歷史紀錄（每季 snapshot）
- [ ] 比較模式：3 家以上公司並列雷達圖

## UI / 視覺

- [ ] 黑暗模式 (Dark mode)
- [ ] 分類路線圖（Stack diagram → 點擊跳轉）
- [ ] PDF / CSV 匯出（個別公司分析報告）
- [ ] 公司關聯網路圖（競爭者、客戶、合作夥伴）

## 工程

- [ ] 加入 Vitest 單元測試（特別是 `defaultKpi` 公式）
- [ ] 加入 ESLint + Prettier
- [ ] CI（GitHub Actions）：typecheck + build
- [ ] i18n（中文 / 英文切換）

## 反幻覺強化

- [ ] 每個 KPI 子分數可附「證據連結」
- [ ] 「需要資料驗證」的欄位集中清單頁
- [ ] 對所有 `confidenceLevel === 'Low'` 的公司明確顯示警示
