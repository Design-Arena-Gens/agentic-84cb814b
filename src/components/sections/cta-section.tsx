"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MailPlus, Sparkles } from "lucide-react";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-gradient-to-br from-brand-700 via-brand-600/80 to-slate-950 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15),_transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl rounded-3xl border border-white/10 bg-black/30 p-12 shadow-2xl backdrop-blur">
        <motion.div
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white/70"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
        >
          <Sparkles size={16} />
          Deploy your AI trading desk in days, not months.
        </motion.div>
        <motion.h2
          className="mt-6 text-center text-3xl font-semibold text-white md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ready to launch your autonomous market intelligence stack?
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-center text-base text-white/70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Onboard Sentient Markets to instrument idea generation, risk ops, and execution in one cohesive, agent-driven
          console. Enterprise security, white-glove integration, and API access included.
        </motion.p>
        <motion.form
          className="mx-auto mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full md:w-80">
            <MailPlus className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
            <input
              type="email"
              required
              placeholder="Work email"
              className="w-full rounded-2xl border border-white/15 bg-white/10 py-3 pl-11 pr-4 text-sm text-white/90 outline-none focus:border-white/70 focus:ring-2 focus:ring-white/20"
            />
          </div>
          <Button size="lg" className="w-full md:w-auto">
            Request Strategy Lab
            <ArrowRight size={18} />
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
