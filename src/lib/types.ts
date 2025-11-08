export type MarketSentiment = "bullish" | "bearish" | "neutral";

export interface AssetSnapshot {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volatility: number;
  sentiment: MarketSentiment;
  volume: number;
  sector: string;
}

export interface MacroInsight {
  category: string;
  narrative: string;
  impactScore: number;
  confidence: number;
}

export interface StrategyParameter {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  suffix?: string;
  helper: string;
}

export interface BacktestResult {
  strategyName: string;
  cagr: number;
  sharpe: number;
  maxDrawdown: number;
  winRate: number;
  profitFactor: number;
  trades: number;
  equityCurve: Array<{ date: string; value: number }>;
  benchmarkCurve: Array<{ date: string; value: number }>;
}

export interface RiskInsight {
  dimension: string;
  score: number;
  commentary: string;
}

export interface SentimentSignal {
  label: string;
  bullish: number;
  bearish: number;
  neutral: number;
}

export interface StrategySimulationRequest {
  baseAsset: string;
  budget: number;
  riskAppetite: "conservative" | "balanced" | "aggressive";
  holdingPeriod: number;
  leverage: number;
  stopLoss: number;
  takeProfit: number;
  frequency: "daily" | "weekly" | "monthly";
}

export interface StrategySimulationResponse {
  summary: string;
  metrics: {
    expectedAnnualReturn: number;
    expectedVolatility: number;
    var95: number;
    cvar95: number;
    hitRate: number;
  };
  allocations: Array<{ symbol: string; allocation: number; rationale: string }>;
  playbook: string[];
}
