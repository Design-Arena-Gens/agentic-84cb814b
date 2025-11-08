import { AssetSnapshot, BacktestResult, MacroInsight, RiskInsight, SentimentSignal } from "@/lib/types";

export const assetSnapshots: AssetSnapshot[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 124.37,
    changePercent: 2.16,
    volatility: 0.32,
    sentiment: "bullish",
    volume: 48123932,
    sector: "Semiconductors"
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 212.54,
    changePercent: -0.48,
    volatility: 0.18,
    sentiment: "neutral",
    volume: 56239482,
    sector: "Technology Hardware"
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 198.41,
    changePercent: 3.82,
    volatility: 0.46,
    sentiment: "bullish",
    volume: 72394812,
    sector: "EV & Mobility"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 429.17,
    changePercent: 0.96,
    volatility: 0.21,
    sentiment: "bullish",
    volume: 38912455,
    sector: "Software & Cloud"
  },
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF",
    price: 553.21,
    changePercent: 0.63,
    volatility: 0.12,
    sentiment: "neutral",
    volume: 89123456,
    sector: "Broad Market"
  }
];

export const macroInsights: MacroInsight[] = [
  {
    category: "AI & Cloud",
    narrative: "Mega-cap AI leaders are driving market breadth with sustained CapEx and developer ecosystem scale.",
    impactScore: 8.4,
    confidence: 0.73
  },
  {
    category: "Consumer",
    narrative: "High-end discretionary spending is moderating while services inflation remains sticky, pressuring margins.",
    impactScore: 5.2,
    confidence: 0.61
  },
  {
    category: "Rates & FX",
    narrative: "Yield curve normalization is supporting equities, while USD softness boosts international revenue translation.",
    impactScore: 6.9,
    confidence: 0.68
  }
];

export const sentimentSignals: SentimentSignal[] = [
  {
    label: "Retail Momentum",
    bullish: 62,
    bearish: 21,
    neutral: 17
  },
  {
    label: "Options Positioning",
    bullish: 54,
    bearish: 33,
    neutral: 13
  },
  {
    label: "Social Buzz",
    bullish: 71,
    bearish: 18,
    neutral: 11
  },
  {
    label: "Fund Flow",
    bullish: 48,
    bearish: 27,
    neutral: 25
  }
];

export const riskInsights: RiskInsight[] = [
  {
    dimension: "Market Liquidity",
    score: 78,
    commentary: "Strong order book depth with healthy ETF participation. Flash drawdowns remain low probability."
  },
  {
    dimension: "Macro Shock",
    score: 63,
    commentary: "Rates stability reduces left-tail risk, but geopolitical escalation could inject volatility."
  },
  {
    dimension: "Momentum Regime",
    score: 84,
    commentary: "Short-term momentum remains elevated; mean-reversion triggers likely to cluster around NVDA earnings."
  },
  {
    dimension: "Sentiment Divergence",
    score: 58,
    commentary: "Retail exuberance outpaces institutional allocation, monitor derivative skew for reversal signals."
  }
];

export const backtestResult: BacktestResult = {
  strategyName: "Adaptive Momentum AI Overlay",
  cagr: 24.6,
  sharpe: 1.92,
  maxDrawdown: -9.4,
  winRate: 61.7,
  profitFactor: 1.86,
  trades: 146,
  equityCurve: [
    { date: "2023-01-01", value: 100 },
    { date: "2023-03-01", value: 107 },
    { date: "2023-06-01", value: 118 },
    { date: "2023-09-01", value: 126 },
    { date: "2024-01-01", value: 133 },
    { date: "2024-04-01", value: 143 },
    { date: "2024-07-01", value: 152 }
  ],
  benchmarkCurve: [
    { date: "2023-01-01", value: 100 },
    { date: "2023-03-01", value: 102 },
    { date: "2023-06-01", value: 106 },
    { date: "2023-09-01", value: 109 },
    { date: "2024-01-01", value: 112 },
    { date: "2024-04-01", value: 115 },
    { date: "2024-07-01", value: 118 }
  ]
};
