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
    desc: "सत्यापित और भरोसेमंद सेवा प्रदाताओं की जानकारी देखें।",
  },
  {
    title: "Easy Discovery",
    icon: Search,
    desc: "अपनी जरूरत के अनुसार सही व्यक्ति को जल्दी खोजें।",
  },
  {
    title: "Local Reach",
    icon: MapPinned,
    desc: "अपने क्षेत्र के सेवा प्रदाताओं तक आसानी से पहुँचें।",
  },
  {
    title: "Direct Contact",
    icon: Phone,
    desc: "सेवा प्रदाता से सीधे संपर्क करें, किसी बिचौलिए की जरूरत नहीं।",
  },
  {
    title: "Growing Community",
    icon: Users,
    desc: "हजारों लोग और सेवा प्रदाता पहले से जुड़े हुए हैं।",
  },
  {
    title: "Smart Platform",
    icon: Sparkles,
    desc: "सरल, तेज़ और सुविधाजनक प्लेटफ़ॉर्म का उपयोग करें।",
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
            भरोसेमंद लोगों को खोजें, सीधे संपर्क करें और अपनी जरूरत की सेवा बिना किसी झंझट के प्राप्त करें।
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">

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

                className="rounded-3xl hover:translate-x-2 transition-all border border-white/30 bg-slate-700/20 flex gap-5 backdrop-blur-xl p-5"
              >
                <div className="h-12 w-12 rounded-2xl bg-green-500 flex items-center justify-center">
                  <Icon className="text-black" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}