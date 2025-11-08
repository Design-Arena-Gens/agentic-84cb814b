import { NextResponse } from "next/server";
import { assetSnapshots, backtestResult, macroInsights, riskInsights, sentimentSignals } from "@/lib/data/mockData";

export async function GET() {
  return NextResponse.json({
    assets: assetSnapshots,
    macro: macroInsights,
    sentiment: sentimentSignals,
    risk: riskInsights,
    backtest: backtestResult
  });
}
