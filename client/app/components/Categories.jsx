"use client";

import { motion } from "framer-motion";
import {
    Wrench,
    GraduationCap,
    Hammer,
    Laptop,
    Car,
    Paintbrush,
    Zap,
    Shield,
    Brain,
} from "lucide-react";

const categories = [
    {
        title: "Electrician",
        icon: Zap,
        desc: "Home & Office Electrical Services",
    },
    {
        title: "Teacher",
        icon: GraduationCap,
        desc: "Online & Offline Learning",
    },
    {
        title: "Carpenter",
        icon: Hammer,
        desc: "Furniture & Wood Work",
    },
    {
        title: "Computer Expert",
        icon: Laptop,
        desc: "Software & Hardware Support",
    },
    {
        title: "Mechanic",
        icon: Car,
        desc: "Vehicle Repair & Maintenance",
    },
    {
        title: "Painter",
        icon: Paintbrush,
        desc: "House & Commercial Painting",
    },
    {
        title: "Plumber",
        icon: Wrench,
        desc: "Water & Pipe Solutions",
    },
    {
        title: "Security",
        icon: Shield,
        desc: "Safety & Surveillance Services",
    },
    {
        title: "IT Sector",
        icon: Brain,
        desc: "Web & AI Automotion Services",
    },
];

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
                        Har category ke verified providers ek hi platform par.
                        Jo service chahiye, usko aasani se discover kariye.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {categories.map((item, index) => {
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
                                whileHover={{
                                    y: -10,
                                }}
                                className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                            >
                                <div className="h-16 w-16 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition">

                                    <Icon
                                        size={28}
                                        className="text-green-500 group-hover:text-black"
                                    />
                                </div>

                                <h3 className="mt-6 text-xl font-bold">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-gray-400 text-sm">
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