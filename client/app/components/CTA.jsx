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
          className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-linear-to-r from-green-600 to-emerald-500 p-5 md:p-16"
        >

          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-black/20 blur-3xl" />

          <div className="relative z-10">

            <h2 className="text-4xl md:text-6xl font-black text-black max-w-4xl">
              Ready To Find The Right Professional?
            </h2>

            <p className="text-black/80 text-lg mt-3 max-w-2xl">
              हजारों यूज़र्स और सेवा प्रदाता पहले से ही HelpCart पर जुड़े हुए हैं।
              आज ही जुड़ें और अपनी ज़रूरत के अनुसार सही एक्सपर्ट खोजें या अपनी सेवाओं को अधिक लोगों तक पहुँचाएँ।
            </p>

            <div className="flex flex-wrap gap-4 md:mt-10 mt-7">

              <Link
                href="/auth/login"
                className="px-5 md:px-8 py-4 rounded-2xl bg-black text-white font-semibold hover:scale-105 transition"
              >
                Find Providers
              </Link>

              <Link
                href="/auth/signup"
                className="px-5 md:px-8 py-4 rounded-2xl border border-black/20 text-black font-semibold flex items-center gap-2 hover:bg-black hover:text-white transition"
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