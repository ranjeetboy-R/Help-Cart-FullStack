"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/20 blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-500/20 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 w-full">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-6">
              <ShieldCheck size={16} />
              Trusted Service Provider Platform
            </div>

            <h1 className="text-5xl md:text-left text-center md:text-7xl font-black leading-tight">
              Find Trusted
              <span className="block text-green-500">
                Service Providers
              </span>
              Near You
            </h1>

            <p className="mt-8 text-lg md:text-left text-center text-gray-400 leading-relaxed max-w-xl">
              Electrician, Teacher, Plumber, Mechanic,
              Technician ya kisi bhi service professional ko
              aasani se dhundhiye. HelpCart verified providers
              aur customers ko ek trusted platform par connect karta hai.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-10">
              <Link href="/auth/login" className="px-7 py-4 rounded-2xl bg-green-500 text-black font-bold flex items-center gap-2 hover:bg-green-400 transition">
                Find Providers
                <ArrowRight size={18} />
              </Link>

              <Link href="/auth/signup" className="px-7 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition">
                Become a Provider
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-400">
              <div>✓ Verified Profiles</div>
              <div>✓ Fast Search</div>
              <div>✓ Direct Contact</div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            className="relative"
          >

            <div className="relative h-[550px]">

              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute top-0 left-0 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 w-72"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-green-500"></div>

                  <div>
                    <h3 className="font-bold">Rahul Kumar</h3>
                    <p className="text-green-400 text-sm">
                      Electrician
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-gray-400 text-sm">
                  ⭐ 4.9 Rating
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="absolute top-44 right-0 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 w-72"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-green-500"></div>

                  <div>
                    <h3 className="font-bold">Anjali Singh</h3>
                    <p className="text-green-400 text-sm">
                      Teacher
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-gray-400 text-sm">
                  500+ Students Helped
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute bottom-10 left-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 w-72"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-green-500"></div>

                  <div>
                    <h3 className="font-bold">Mohit Sharma</h3>
                    <p className="text-green-400 text-sm">
                      AC Technician
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-gray-400 text-sm">
                  Available Now
                </div>
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-60 w-60 rounded-full border border-green-500/20" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="h-20 w-20 text-green-500" />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}