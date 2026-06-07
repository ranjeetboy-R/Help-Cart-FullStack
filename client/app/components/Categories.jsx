"use client";

import { categories } from "@/public/assests";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Categories() {
    return (
        <section
            id="categories"
            className="py-28 relative overflow-hidden"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-80 bg-green-500/10 blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-16">
                    <span className="text-green-500 font-semibold">
                        POPULAR CATEGORIES
                    </span>

                    <h2 className="text-4xl md:text-5xl font-black mt-4">
                        Find The Right Professional
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto mt-5">
                        इलेक्ट्रिशियन, शिक्षक, प्लंबर, मैकेनिक और अन्य कई क्षेत्रों के अनुभवी एवं सत्यापित सेवा प्रदाताओं को एक ही स्थान पर खोजें।
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">

                    {categories.slice(0, 10).map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.08,
                                }}

                                className="group hover:translate-x-2 transition-all rounded-3xl border border-white/30 flex items-center gap-5 bg-slate-700/20 p-6 backdrop-blur-xl"
                            >
                                <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition">
                                    <Icon
                                        size={28}
                                        className="text-green-500 group-hover:text-black"
                                    />
                                </div>

                                <Link href="/auth/signup" className="flex flex-col gap-2">
                                    <h3 className="text-xl font-bold">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {item.services}
                                    </p>
                                </Link>
                            </motion.div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}