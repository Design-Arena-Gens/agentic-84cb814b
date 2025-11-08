import { StrategySimulationRequest, StrategySimulationResponse } from "@/lib/types";

const leverageMultiplier = {
  conservative: 0.9,
  balanced: 1.1,
  aggressive: 1.35
};

const baselineReturn = {
  conservative: 0.09,
  balanced: 0.14,
  aggressive: 0.22
};

const baselineVolatility = {
  conservative: 0.12,
  balanced: 0.18,
  aggressive: 0.28
};

export function simulateStrategy(request: StrategySimulationRequest): StrategySimulationResponse {
  const riskFactor = leverageMultiplier[request.riskAppetite];
  const capitalDeployment = Math.min(request.budget * riskFactor, request.budget * 1.6);

  const expectedAnnualReturn =
    baselineReturn[request.riskAppetite] * riskFactor * (request.leverage / 2 + 0.75);

  const expectedVolatility =
    baselineVolatility[request.riskAppetite] * Math.max(0.6, request.leverage / 2);

  const stopLossImpact = (100 - request.stopLoss) / 100;
  const takeProfitImpact = request.takeProfit / 100;
  const horizonImpact = Math.max(0.85, Math.min(1.15, request.holdingPeriod / 180));

  const var95 = -expectedVolatility * riskFactor * 1.65 * stopLossImpact * request.leverage;
  const cvar95 = var95 * 1.25;
  const hitRate = 0.55 + takeProfitImpact * 0.1 - (request.stopLoss / 100) * 0.08;

  const summary =
    `Deploying $${capitalDeployment.toLocaleString()} into ${request.baseAsset} with a ` +
    `${request.riskAppetite} risk envelope. Adaptive regime detection toggles between ` +
    `${request.frequency} execution and volatility scaling to maintain downside risk below ` +
    `${Math.abs(var95 * 100).toFixed(1)}% at 95% confidence.`;

  const allocations = [
    {
      symbol: request.baseAsset,
      allocation: 0.62,
      rationale: "Core allocation centered on liquid underlying with AI-enhanced momentum filters."
    },
    {
      symbol: "XLK",
      allocation: 0.18,
      rationale: "Sector ETF to diversify single-name risk while preserving tech beta exposure."
    },
    {
      symbol: "NVDA",
      allocation: 0.12,
      rationale: "High-conviction satellite play driven by GPU demand and earnings velocity."
    },
    {
      symbol: "CASH",
      allocation: 0.08,
      rationale: "Dry powder buffer to reload after pullbacks and dampen volatility clusters."
    }
  ];

  const playbook = [
    "Monitor implied volatility percentile; scale leverage down when IV rank exceeds 78.",
    `Auto-adjust stop-loss to ${request.stopLoss}% trailing once trade moves 1.5R in favor.`,
    "Rotate 20% of exposure into defensive basket when macro shock index > 65.",
    "Trigger covered call overlay when sentiment momentum crosses 70 to monetize upside skew."
  ];

  return {
    summary,
    metrics: {
      expectedAnnualReturn: expectedAnnualReturn * horizonImpact,
      expectedVolatility: expectedVolatility,
      var95,
      cvar95,
      hitRate
    },
    allocations,
    playbook
  };
}
