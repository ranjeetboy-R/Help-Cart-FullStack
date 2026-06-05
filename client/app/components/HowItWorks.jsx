"use client";

import { motion } from "framer-motion";
import {
  Search,
  Phone,
  CheckCircle,
  UserPlus,
  Bookmark,
  BarChart3,
} from "lucide-react";

const userSteps = [
  {
    icon: Search,
    title: "Search Providers",
    desc: "अपनी आवश्यकता और श्रेणी के अनुसार उपयुक्त सेवा प्रदाताओं को खोजें।",
  },
  {
    icon: CheckCircle,
    title: "View Profile",
    desc: "अनुभव, रेटिंग और अन्य महत्वपूर्ण जानकारी देखकर सही व्यक्ति चुनें।",
  },
  {
    icon: Phone,
    title: "Contact Directly",
    desc: "कॉल या व्हाट्सऐप के माध्यम से सीधे संपर्क कर काम की शुरुआत करें।",
  },
  {
    icon: Bookmark,
    title: "Save Experts",
    desc: "पसंदीदा विशेषज्ञों को सेव करें ताकि जरूरत पड़ने पर उन्हें दोबारा आसानी से खोज सकें।",
  }
];

const providerSteps = [
  {
    icon: UserPlus,
    title: "Register Yourself",
    desc: "अपनी प्रोफाइल बनाएं और अपनी सेवाओं की जानकारी जोड़ें।",
  },
  {
    icon: CheckCircle,
    title: "Get Visibility",
    desc: "हजारों संभावित ग्राहकों के सामने अपनी प्रोफाइल दिखाएं।",
  },
  {
    icon: BarChart3,
    title: "Analyze Customers",
    desc: "प्रोफाइल विज़िट, रुचि और ग्राहक गतिविधियों को समझकर अपनी पहुँच बढ़ाएं।",
  },
  {
    icon: Phone,
    title: "Receive Customers",
    desc: "इच्छुक ग्राहकों से सीधे संपर्क प्राप्त करें और नए काम के अवसर पाएं।",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28 bg-linear-to-b from-black to-zinc-950"
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
            ग्राहकों और सेवा प्रदाताओं को जोड़ने की आसान, तेज़ और भरोसेमंद प्रक्रिया।
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
              For Experts
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