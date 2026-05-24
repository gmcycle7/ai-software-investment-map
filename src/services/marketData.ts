// 市場資料抽象層
//
// 設計理念：本網站「不杜撰」任何即時財務數字。
// 未來如要接 Yahoo Finance / TWSE / Bloomberg / IEX 等資料源，
// 只需要實作新的 MarketDataFetcher，UI 層完全不用改動。
//
// 預設為 PlaceholderFetcher：所有欄位都回傳「需即時 API」字串。

export interface MarketDataSnapshot {
  ticker: string;
  marketCap: string;
  peRatio: string;
  forwardPe: string;
  evToSales: string;
  freeCashFlowYield: string;
  ytdReturn: string;
  oneYearReturn: string;
  sourceLabel: string; // 例：「placeholder」、「Yahoo Finance」、「TWSE MOPS」
  fetchedAt: string;
}

export interface MarketDataFetcher {
  fetch(ticker: string): Promise<MarketDataSnapshot>;
}

const PLACEHOLDER = '需即時 API';

export class PlaceholderFetcher implements MarketDataFetcher {
  async fetch(ticker: string): Promise<MarketDataSnapshot> {
    return {
      ticker,
      marketCap: PLACEHOLDER,
      peRatio: PLACEHOLDER,
      forwardPe: PLACEHOLDER,
      evToSales: PLACEHOLDER,
      freeCashFlowYield: PLACEHOLDER,
      ytdReturn: PLACEHOLDER,
      oneYearReturn: PLACEHOLDER,
      sourceLabel: 'placeholder',
      fetchedAt: new Date().toISOString().slice(0, 10),
    };
  }
}

// ---- 預設匯出實例 ----
// 要切換實作時，這裡換成新的 fetcher 即可（例如 new YahooFinanceFetcher(apiKey)）
export const marketDataService: MarketDataFetcher = new PlaceholderFetcher();

// ---- 範例：未來實作 Yahoo Finance 的骨架（程式碼註解，不會執行）----
// import type { MarketDataFetcher, MarketDataSnapshot } from './marketData';
//
// export class YahooFinanceFetcher implements MarketDataFetcher {
//   constructor(private apiKey: string) {}
//   async fetch(ticker: string): Promise<MarketDataSnapshot> {
//     const res = await fetch(`https://yfapi.net/v6/finance/quote?symbols=${ticker}`, {
//       headers: { 'X-API-KEY': this.apiKey },
//     });
//     const json = await res.json();
//     // …map response to MarketDataSnapshot
//     return { ...mapped, sourceLabel: 'Yahoo Finance', fetchedAt: today() };
//   }
// }
