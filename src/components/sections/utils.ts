import type { MarketSentiment } from "@/lib/types";

export function formatCurrency(value?: number) {
  if (value === undefined) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

export function formatPercent(value?: number) {
  if (value === undefined) return "—";
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function assetSentimentColor(sentiment: MarketSentiment) {
  switch (sentiment) {
    case "bullish":
      return "text-emerald-300";
    case "bearish":
      return "text-rose-300";
    case "neutral":
    default:
      return "text-slate-300";
  }
}
