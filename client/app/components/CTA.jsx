"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section id="cta" className="py-28 px-4">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="relative overflow-hidden rounded-[40px] border border-green-500/20 bg-gradient-to-r from-green-600 to-emerald-500 p-10 md:p-16"
        >

          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-black/20 blur-3xl" />

          <div className="relative z-10">

            <h2 className="text-4xl md:text-6xl font-black text-black max-w-4xl">
              Ready To Find The Right Professional?
            </h2>

            <p className="text-black/80 text-lg mt-6 max-w-2xl">
              Thousands of users aur providers already HelpCart par
              connect ho rahe hain. Aaj hi join kariye aur apni
              services ya required expert ko discover kariye.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                href="/providers"
                className="px-8 py-4 rounded-2xl bg-black text-white font-semibold hover:scale-105 transition"
              >
                Find Providers
              </Link>

              <Link
                href="/signup"
                className="px-8 py-4 rounded-2xl border border-black/20 text-black font-semibold flex items-center gap-2 hover:bg-black hover:text-white transition"
              >
                Become Provider
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}