"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Leah Smith",
    title: "Chief Investment Officer, Arcadia Digital Assets",
    quote:
      "Sentient Markets feels like an elite quant pod strapped to my desk. It uncovers catalysts our analysts miss and hands me deployable trades with compliance sign-off.",
    gain: "+312 bps alpha",
    period: " trailing 90d"
  },
  {
    name: "Mateo García",
    title: "Managing Partner, Velocity Prop",
    quote:
      "The agentic workflow is the first platform that blends narrative, risk, and execution with complete transparency. Drawdowns compressed 40% after onboarding.",
    gain: "-40% drawdown",
    period: " vs prev FY"
  },
  {
    name: "Priya Patel",
    title: "Head of Research, Horizon Macro",
    quote:
      "Their multi-modal ingestion gives us a single source of truth for macro. The AI commentary is like having a senior strategist on-call 24/6.",
    gain: "5x faster",
    period: " research turnarounds"
  }
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <motion.h2
              className="text-3xl font-semibold text-white md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
            >
              Trusted by modern hedge funds, digital asset desks, and elite prop shops.
            </motion.h2>
            <motion.p
              className="text-base text-white/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Teams across 32 markets rely on Sentient Markets for idea generation, risk oversight, and lightning-fast
              execution readiness.
            </motion.p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
            <Star size={14} className="text-brand-200" />
            4.9 / 5 user satisfaction
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <Quote className="h-8 w-8 text-brand-200" />
              <p className="mt-4 text-sm leading-relaxed text-white/70">{testimonial.quote}</p>
              <div className="mt-6 space-y-1">
                <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="text-xs text-white/40">{testimonial.title}</p>
              </div>
              <div className="mt-6 inline-flex items-baseline gap-1 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs text-brand-100">
                {testimonial.gain}
                <span className="text-white/40">{testimonial.period}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
