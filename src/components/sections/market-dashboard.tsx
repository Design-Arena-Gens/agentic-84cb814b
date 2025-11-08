"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Brain, GaugeCircle, LineChart, ShieldHalf, Sparkles } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { assetSentimentColor, formatCurrency, formatPercent } from "@/components/sections/utils";
import type {
  AssetSnapshot,
  BacktestResult,
  MacroInsight,
  RiskInsight,
  SentimentSignal,
  StrategySimulationRequest
} from "@/lib/types";
import { Button } from "@/components/ui/button";

interface OverviewPayload {
  assets: AssetSnapshot[];
  macro: MacroInsight[];
  sentiment: SentimentSignal[];
  risk: RiskInsight[];
  backtest: BacktestResult;
}

async function fetchOverview(): Promise<OverviewPayload> {
  const res = await fetch("/api/overview");
  if (!res.ok) {
    throw new Error("Failed to load overview");
  }

  return res.json();
}

async function simulateStrategy(payload: StrategySimulationRequest) {
  const res = await fetch("/api/simulate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Failed to simulate strategy");
  }

  return res.json();
}

const strategyDefaults: StrategySimulationRequest = {
  baseAsset: "NVDA",
  budget: 250000,
  riskAppetite: "balanced",
  holdingPeriod: 180,
  leverage: 2,
  stopLoss: 12,
  takeProfit: 28,
  frequency: "weekly"
};

export function MarketDashboard() {
  const [params, setParams] = useState(strategyDefaults);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulation, setSimulation] = useState<Awaited<ReturnType<typeof simulateStrategy>> | null>(null);

  const overviewQuery = useQuery({
    queryKey: ["overview"],
    queryFn: fetchOverview,
    refetchInterval: 45_000
  });

  const sentimentSummary = useMemo(() => {
    if (!overviewQuery.data) return null;
    const aggregates = overviewQuery.data.sentiment.reduce(
      (acc, curr) => {
        acc.bullish += curr.bullish;
        acc.bearish += curr.bearish;
        acc.neutral += curr.neutral;
        return acc;
      },
      { bullish: 0, bearish: 0, neutral: 0 }
    );

    const total = aggregates.bullish + aggregates.bearish + aggregates.neutral;
    return {
      mood: aggregates.bullish > aggregates.bearish ? "Bullish bias" : "Cautious stance",
      bullish: Math.round((aggregates.bullish / total) * 100),
      bearish: Math.round((aggregates.bearish / total) * 100),
      neutral: Math.round((aggregates.neutral / total) * 100)
    };
  }, [overviewQuery.data]);

  const handleSimulate = async () => {
    try {
      setIsSimulating(true);
      const next = await simulateStrategy(params);
      setSimulation(next);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <section id="dashboard" className="relative mx-auto max-w-6xl px-6 py-20 md:px-10">
      <header className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Intelligence Console</h2>
          <p className="mt-2 max-w-2xl text-base text-white/60">
            Multi-layer agent monitors live markets, synthesizes narrative, and surfaces risk-aware strategies.
            Configure parameters, run backtests, and deploy execution playbooks within one cohesive workspace.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-brand-500/40 bg-brand-500/10 px-3 py-2 text-sm text-brand-200">
          <Sparkles size={16} />
          AI copilots elevated 210bps alpha last quarter.
        </div>
      </header>

      {overviewQuery.isLoading ? (
        <div className="grid h-64 place-items-center rounded-3xl border border-white/5 bg-white/5">
          <div className="flex flex-col items-center gap-3 text-white/60">
            <motion.div
              className="h-12 w-12 rounded-full border-2 border-white/10 border-t-white/60"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            Initializing predictive fabric...
          </div>
        </div>
      ) : overviewQuery.isError ? (
        <div className="grid h-64 place-items-center rounded-3xl border border-danger/40 bg-danger/10">
          <div className="flex flex-col items-center gap-2 text-danger">
            <ShieldHalf size={18} />
            Intelligence stream unavailable. Retry shortly.
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-5">
            <motion.div
              className="glass col-span-3 rounded-3xl p-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-white/50">Strategic Backtest</p>
                  <h3 className="text-2xl font-semibold text-white">
                    {overviewQuery.data?.backtest.strategyName ?? "AI Strategy"}
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/60">
                  <LineChart size={14} />
                  Live tuned
                </div>
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <Metric label="CAGR" value={formatPercent(overviewQuery.data?.backtest.cagr)} accent="text-brand-300" />
                  <Metric label="Sharpe Ratio" value={overviewQuery.data?.backtest.sharpe.toFixed(2)} />
                  <Metric
                    label="Win Rate"
                    value={formatPercent(overviewQuery.data?.backtest.winRate)}
                    accent="text-brand-200"
                  />
                </div>
                <div className="space-y-4">
                  <Metric
                    label="Max Drawdown"
                    value={formatPercent(overviewQuery.data?.backtest.maxDrawdown)}
                    accent="text-danger"
                  />
                  <Metric label="Profit Factor" value={overviewQuery.data?.backtest.profitFactor.toFixed(2)} />
                  <Metric label="Trades Analyzed" value={overviewQuery.data?.backtest.trades.toString()} />
                </div>
              </div>
              <div className="mt-6 h-56 rounded-2xl border border-white/5 bg-black/40 p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={overviewQuery.data?.backtest.equityCurve}>
                    <defs>
                      <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#3B82F6" stopOpacity={0.95} />
                        <stop offset="90%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.35)" />
                    <YAxis stroke="rgba(255,255,255,0.35)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0B1220",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "12px",
                        color: "#fff"
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#60A5FA" fill="url(#colorEquity)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div
              className="glass col-span-2 flex flex-col rounded-3xl p-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Brain size={16} />
                Macro Narrative Engine
              </div>
              <div className="mt-6 space-y-5">
                {overviewQuery.data?.macro.map((item) => (
                  <article key={item.category} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-white/80">{item.category}</span>
                      <span className="text-brand-200">{(item.impactScore / 10).toFixed(2)}σ impact</span>
                    </div>
                    <p className="mt-2 text-sm text-white/60">{item.narrative}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-white/40">
                      <ShieldHalf size={14} />
                      Confidence {Math.round(item.confidence * 100)}%
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <motion.div
              className="glass col-span-2 rounded-3xl p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Signal Surface</h3>
                <span className="text-xs uppercase tracking-wide text-white/40">AI sentiment fusion</span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {overviewQuery.data?.assets.map((asset) => (
                  <div key={asset.symbol} className="rounded-2xl border border-white/5 bg-black/40 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-wide text-white/40">{asset.symbol}</p>
                        <p className="text-lg font-medium text-white">{asset.name}</p>
                      </div>
                      <span className={assetSentimentColor(asset.sentiment)}>{asset.sentiment.toUpperCase()}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-white/60">
                      <span>{formatCurrency(asset.price)}</span>
                      <span className={asset.changePercent >= 0 ? "text-brand-200" : "text-danger"}>
                        {asset.changePercent >= 0 ? "+" : ""}
                        {asset.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-white/40">
                      <span>Volatility {Math.round(asset.volatility * 100)}%</span>
                      <span>{asset.sector}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="glass flex flex-col gap-4 rounded-3xl p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Risk Radar</h3>
                <GaugeCircle size={18} className="text-brand-300" />
              </div>
              {overviewQuery.data?.risk.map((risk) => (
                <div key={risk.dimension} className="rounded-2xl border border-white/5 bg-black/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/80">{risk.dimension}</span>
                    <span className="text-brand-200">{risk.score}/100</span>
                  </div>
                  <p className="mt-2 text-xs text-white/50">{risk.commentary}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300"
                      style={{ width: `${risk.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <motion.div
              className="glass rounded-3xl p-6 md:col-span-2"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Sentiment Pulse</h3>
                <span className="text-xs uppercase tracking-wide text-white/40">Synced hourly</span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {overviewQuery.data?.sentiment.map((signal) => (
                  <article key={signal.label} className="rounded-2xl border border-white/5 bg-black/40 p-4">
                    <h4 className="text-sm font-medium text-white/80">{signal.label}</h4>
                    <div className="mt-3 space-y-2 text-xs text-white/60">
                      <SentimentStrength label="Bullish" value={signal.bullish} tone="from-green-400 to-emerald-500" />
                      <SentimentStrength label="Neutral" value={signal.neutral} tone="from-slate-400 to-slate-300" />
                      <SentimentStrength label="Bearish" value={signal.bearish} tone="from-rose-400 to-red-500" />
                    </div>
                  </article>
                ))}
              </div>
              {sentimentSummary && (
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-brand-500/40 bg-brand-500/10 p-4">
                  <div>
                    <p className="text-sm text-brand-200">{sentimentSummary.mood}</p>
                    <p className="text-xs text-white/50">
                      Bullish {sentimentSummary.bullish}% • Neutral {sentimentSummary.neutral}% • Bearish{" "}
                      {sentimentSummary.bearish}%
                    </p>
                  </div>
                  <ArrowUpRight size={18} className="text-brand-200" />
                </div>
              )}
            </motion.div>

            <motion.div
              className="glass flex flex-col rounded-3xl p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Strategy Synthesizer</h3>
                <span className="text-xs uppercase tracking-wide text-white/40">Agentic outputs</span>
              </div>
              <StrategyControls params={params} onChange={setParams} />
              <Button className="mt-4" onClick={handleSimulate} disabled={isSimulating}>
                {isSimulating ? "Calibrating..." : "Generate Playbook"}
              </Button>
              {simulation && (
                <div className="mt-6 space-y-4 rounded-2xl border border-white/5 bg-black/40 p-4 text-sm text-white/60">
                  <p className="text-white/80">{simulation.summary}</p>
                  <div className="grid gap-3 text-xs text-white/60">
                    <Metric label="Expected Return" value={formatPercent(simulation.metrics.expectedAnnualReturn * 100)} />
                    <Metric label="Volatility" value={formatPercent(simulation.metrics.expectedVolatility * 100)} />
                    <Metric label="VaR 95%" value={formatPercent(simulation.metrics.var95 * 100)} />
                    <Metric label="CVaR 95%" value={formatPercent(simulation.metrics.cvar95 * 100)} />
                    <Metric label="Hit Rate" value={formatPercent(simulation.metrics.hitRate * 100)} />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-white/40">Allocations</h4>
                    {simulation.allocations.map((allocation: (typeof simulation.allocations)[number]) => (
                      <div key={allocation.symbol} className="flex items-center justify-between text-xs">
                        <span className="font-medium text-white/80">{allocation.symbol}</span>
                        <span className="text-brand-200">{Math.round(allocation.allocation * 100)}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 text-xs">
                    <h4 className="font-semibold uppercase tracking-wide text-white/40">Playbook</h4>
                    <ul className="space-y-2 text-white/70">
                      {simulation.playbook.map((step: string, index: number) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-brand-300">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}

function Metric({ label, value, accent }: { label: string; value?: string; accent?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wide text-white/40">{label}</span>
      <span className={`text-lg font-semibold text-white ${accent ? accent : ""}`}>{value ?? "—"}</span>
    </div>
  );
}

function SentimentStrength({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full bg-gradient-to-r ${tone}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

interface StrategyControlsProps {
  params: StrategySimulationRequest;
  onChange: (params: StrategySimulationRequest) => void;
}

const riskLabels = {
  conservative: "Conservative",
  balanced: "Balanced",
  aggressive: "Aggressive"
} as const;

function StrategyControls({ params, onChange }: StrategyControlsProps) {
  return (
    <div className="mt-4 grid gap-4 text-xs text-white/70">
      <label className="flex flex-col gap-2">
        <span>Base Asset</span>
        <input
          value={params.baseAsset}
          onChange={(event) => onChange({ ...params, baseAsset: event.target.value.toUpperCase() })}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          placeholder="Ticker"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span>Budget (${params.budget.toLocaleString()})</span>
        <input
          type="range"
          min={50000}
          max={500000}
          step={10000}
          value={params.budget}
          onChange={(event) => onChange({ ...params, budget: Number(event.target.value) })}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span>Risk Appetite — {riskLabels[params.riskAppetite]}</span>
        <select
          value={params.riskAppetite}
          onChange={(event) =>
            onChange({ ...params, riskAppetite: event.target.value as StrategySimulationRequest["riskAppetite"] })
          }
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        >
          <option value="conservative">Conservative</option>
          <option value="balanced">Balanced</option>
          <option value="aggressive">Aggressive</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span>Holding Period ({params.holdingPeriod} days)</span>
        <input
          type="range"
          min={30}
          max={720}
          step={30}
          value={params.holdingPeriod}
          onChange={(event) => onChange({ ...params, holdingPeriod: Number(event.target.value) })}
        />
      </label>
      <label className="flex items-center justify-between">
        <span>Leverage {params.leverage.toFixed(1)}x</span>
        <input
          type="range"
          min={1}
          max={5}
          step={0.5}
          value={params.leverage}
          onChange={(event) => onChange({ ...params, leverage: Number(event.target.value) })}
        />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span>Stop Loss {params.stopLoss}%</span>
          <input
            type="range"
            min={2}
            max={30}
            step={1}
            value={params.stopLoss}
            onChange={(event) => onChange({ ...params, stopLoss: Number(event.target.value) })}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span>Take Profit {params.takeProfit}%</span>
          <input
            type="range"
            min={4}
            max={60}
            step={1}
            value={params.takeProfit}
            onChange={(event) => onChange({ ...params, takeProfit: Number(event.target.value) })}
          />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span>Execution Frequency</span>
        <select
          value={params.frequency}
          onChange={(event) =>
            onChange({ ...params, frequency: event.target.value as StrategySimulationRequest["frequency"] })
          }
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>
    </div>
  );
}
