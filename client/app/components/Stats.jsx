"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "40+",
    label: "Categories",
  },
  {
    number: "24/7",
    label: "Availability",
  },
];

export default function Stats() {
  return (
    <section className="py-20 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 px-5">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
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
              className="text-center bg-slate-700/20 rounded-3xl p-8 border border-white/30 hover:border-green-500/30 transition"
            >
              <h3 className="text-4xl font-black text-green-500">
                {item.number}
              </h3>

              <p className="mt-3 text-gray-400">
                {item.label}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}