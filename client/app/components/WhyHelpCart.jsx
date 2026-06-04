"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Search,
  Users,
  Phone,
  Sparkles,
  MapPinned,
} from "lucide-react";

const features = [
  {
    title: "Verified Profiles",
    icon: ShieldCheck,
    desc: "Trustworthy providers with complete profiles.",
  },
  {
    title: "Easy Discovery",
    icon: Search,
    desc: "Find professionals quickly using categories.",
  },
  {
    title: "Local Reach",
    icon: MapPinned,
    desc: "Discover nearby service providers easily.",
  },
  {
    title: "Direct Contact",
    icon: Phone,
    desc: "No middleman. Direct communication.",
  },
  {
    title: "Growing Community",
    icon: Users,
    desc: "Thousands of providers and customers.",
  },
  {
    title: "Smart Platform",
    icon: Sparkles,
    desc: "Fast, modern and user-friendly experience.",
  },
];

export default function WhyHelpCart() {
  return (
    <section className="py-28 relative">

      <div className="absolute right-0 top-0 h-80 w-80 bg-green-500/10 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-16">

          <span className="text-green-500 font-semibold">
            WHY CHOOSE US
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-4">
            Why People Love HelpCart
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Trusted providers, seamless experience aur fast
            connections ke saath service discovery ko simple banaya gaya hai.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
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
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  scale: 1.03,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7"
              >
                <div className="h-16 w-16 rounded-2xl bg-green-500 flex items-center justify-center">
                  <Icon className="text-black" />
                </div>

                <h3 className="text-xl font-bold mt-6">
                  {item.title}
                </h3>

                <p className="text-gray-400 mt-4 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}