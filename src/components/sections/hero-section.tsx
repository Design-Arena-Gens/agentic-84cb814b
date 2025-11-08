"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="absolute -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center gap-12 px-6 py-16 text-center md:px-10">
        <motion.div
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-medium text-white/80 shadow-glow-brand"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Sparkles size={16} />
          Sentient Markets v2 • Agentic AI Trading Copilot
        </motion.div>
        <motion.h1
          className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Autonomously monitor markets, simulate trades, and deploy risk-aware strategies in seconds.
        </motion.h1>
        <motion.p
          className="mx-auto max-w-3xl text-lg text-white/70 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Fuse live market data, multi-source sentiment, and backtesting automation. Sentient Markets
          orchestrates research, evaluates risk, and creates execution-ready playbooks that keep you ahead of every shifting regime.
        </motion.p>
        <motion.div
          className="flex flex-col items-center justify-center gap-4 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link href="#dashboard" className="w-full md:w-auto">
            <Button className="w-full md:w-auto" size="lg">
              Launch Intelligence Console
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="#features" className="w-full md:w-auto">
            <Button variant="secondary" className="w-full md:w-auto" size="lg">
              Explore Capabilities
            </Button>
          </Link>
        </motion.div>
        <motion.div
          className="mx-auto mt-16 grid w-full max-w-4xl grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left md:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {[
            { label: "Signals Ingested / day", value: "128k+" },
            { label: "Backtest speedup", value: "42x" },
            { label: "Adaptive risk wins", value: "93%" },
            { label: "Automation coverage", value: "24/6" }
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="text-2xl font-semibold text-white">{item.value}</span>
              <span className="text-sm text-white/60">{item.label}</span>
            </div>
          ))}
        </motion.div>
        <motion.div
          className="mx-auto flex w-full max-w-4xl items-center justify-center gap-3 rounded-2xl border border-white/5 bg-black/30 px-6 py-3 text-sm text-white/60 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Rocket size={16} className="text-brand-400" />
          Trusted by emerging funds, prop desks, and quant traders in 32 countries.
        </motion.div>
      </div>
    </section>
  );
}
