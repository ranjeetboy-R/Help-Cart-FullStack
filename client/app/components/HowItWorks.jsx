"use client";

import { motion } from "framer-motion";
import {
  Search,
  Phone,
  CheckCircle,
  UserPlus,
} from "lucide-react";

const userSteps = [
  {
    icon: Search,
    title: "Search Providers",
    desc: "Nearby providers ko category ke according find kariye.",
  },
  {
    icon: CheckCircle,
    title: "View Profile",
    desc: "Experience, rating aur details dekhiye.",
  },
  {
    icon: Phone,
    title: "Contact Directly",
    desc: "Call ya WhatsApp karke connect kariye.",
  },
];

const providerSteps = [
  {
    icon: UserPlus,
    title: "Register Yourself",
    desc: "Apna professional profile create kariye.",
  },
  {
    icon: CheckCircle,
    title: "Get Visibility",
    desc: "Thousands of users ke saamne profile show hogi.",
  },
  {
    icon: Phone,
    title: "Receive Customers",
    desc: "Direct customer inquiries aur leads paiye.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28 bg-gradient-to-b from-black to-zinc-950"
    >
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-20">
          <span className="text-green-500 font-semibold">
            SIMPLE PROCESS
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-4">
            How HelpCart Works
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Users aur providers dono ke liye simple aur fast process.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* USERS */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-3xl font-bold mb-8">
              For Users
            </h3>

            <div className="space-y-6">

              {userSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-5"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-green-500 flex items-center justify-center shrink-0">
                      <Icon className="text-black" />
                    </div>

                    <div>
                      <h4 className="font-bold text-lg">
                        {step.title}
                      </h4>

                      <p className="text-gray-400 mt-2">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

            </div>
          </div>

          {/* PROVIDERS */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-3xl font-bold mb-8">
              For Providers
            </h3>

            <div className="space-y-6">

              {providerSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-5"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-green-500 flex items-center justify-center shrink-0">
                      <Icon className="text-black" />
                    </div>

                    <div>
                      <h4 className="font-bold text-lg">
                        {step.title}
                      </h4>

                      <p className="text-gray-400 mt-2">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}