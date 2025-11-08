"use client";

import { motion } from "framer-motion";
import { CandlestickChart, Clock3, DatabaseZap, Globe2, Layers, Wand2 } from "lucide-react";

const stages = [
  {
    title: "Ingest & Normalize",
    description:
      "Streams tick data, derivatives greeks, macro feeds, alt data, and social signals into a semantic data lake with millisecond alignment.",
    icon: DatabaseZap,
    latency: "50ms",
    coverage: "28 data domains"
  },
  {
    title: "Synthesize & Detect",
    description:
      "Transformer stack clusters latent narratives and quantifies confidence. Regime detection flags volatility shifts before they hit your P&L.",
    icon: Wand2,
    latency: "600ms",
    coverage: "Real-time"
  },
  {
    title: "Simulate & Stress",
    description:
      "Hyper-parameter search explores millions of permutations, running Monte Carlo and scenario stress tests with GPU acceleration.",
    icon: CandlestickChart,
    latency: "38s",
    coverage: "3 year history"
  },
  {
    title: "Orchestrate & Execute",
    description:
      "Orchestrator agents push structured trade tickets, update watchlists, and trigger guardrails with OMS/EMS integrations and compliance logging.",
    icon: Globe2,
    latency: "5s",
    coverage: "OMS, EMS, Slack, PagerDuty"
  }
];

export function WorkflowSection() {
  return (
    <section className="relative border-y border-white/5 bg-black/40 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.15),_transparent_50%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl space-y-4">
            <motion.h2
              className="text-3xl font-semibold text-white md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              Agentic workflow designed for professional desks.
            </motion.h2>
            <motion.p
              className="text-base text-white/60 md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Each stage is autonomous but composable. Plug into the full stack or drop in specific copilots to
              accelerate existing research, compliance, or execution workflows.
            </motion.p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
            <Clock3 size={14} />
            Built for T+0 decisions
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.title}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <stage.icon className="h-8 w-8 text-brand-200" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                    <p className="text-xs uppercase tracking-wide text-white/40">
                      Latency {stage.latency} • Coverage {stage.coverage}
                    </p>
                  </div>
                </div>
                <Layers className="h-6 w-6 text-white/10" />
              </div>
              <p className="mt-4 text-sm text-white/60">{stage.description}</p>
              <div className="absolute -right-12 bottom-0 h-32 w-32 rounded-full bg-brand-500/10 blur-3xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
