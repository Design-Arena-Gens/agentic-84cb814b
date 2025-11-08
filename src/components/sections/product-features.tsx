"use client";

import { motion } from "framer-motion";
import { BarChart3, Bot, BrainCircuit, Layers3, Shield, Table2, Workflow } from "lucide-react";

const featureCards = [
  {
    title: "Multi-Modal Signal Ingestion",
    description:
      "Agentic pipelines aggregate market microstructure, derivatives flow, social sentiment, macro releases, and alternative datasets to feed unified alpha signals.",
    icon: Layers3
  },
  {
    title: "Narrative-Aware Intelligence",
    description:
      "Real-time LLM layer transforms numerics into contextual storylines with confidence scoring, highlighting catalysts and regime shifts you can act on instantly.",
    icon: BrainCircuit
  },
  {
    title: "Explainable Strategy Engine",
    description:
      "Every strategy card includes rationale, dependencies, and sensitivity analysis. Drill into risk buckets to understand the why before you deploy.",
    icon: Shield
  },
  {
    title: "Adaptive Backtesting Fabric",
    description:
      "Run millions of parameter permutations with GPU-accelerated backtests, Monte Carlo stress testing, and benchmark alignment—all in under 60 seconds.",
    icon: BarChart3
  },
  {
    title: "Agent-to-Agent Collaboration",
    description:
      "Specialized copilots coordinate research, execution, and compliance workflows. Configure autonomous routines across 24/6 market coverage.",
    icon: Bot
  },
  {
    title: "Execution-Ready Playbooks",
    description:
      "Structured trade tickets export to OMS/EMS. Built-in guardrails track stop levels, hedges, and real-time risk budgets for complete oversight.",
    icon: Workflow
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative border-y border-white/5 bg-slate-950/80 py-20">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-600/10 to-transparent" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 md:px-10">
        <div className="max-w-3xl">
          <motion.h2
            className="text-3xl font-semibold text-white md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            The only AI trading copilot engineered to think like a team of quants, analysts, and risk officers.
          </motion.h2>
          <motion.p
            className="mt-3 text-base text-white/60 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Sentient Markets orchestrates autonomous agents that collaborate to extract alpha, validate scenarios, and
            keep risk in check. Each module is composable, API-accessible, and ready for institutional workflows.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featureCards.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-transparent p-6 transition duration-300 hocus:border-brand-500/60 hocus:shadow-glow-brand"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <feature.icon className="h-8 w-8 text-brand-200 transition duration-300 group-hocus:text-brand-100" />
              <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{feature.description}</p>
              <Table2 className="absolute -right-12 bottom-0 h-24 w-24 text-white/5 transition duration-300 group-hocus:text-brand-500/20" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
