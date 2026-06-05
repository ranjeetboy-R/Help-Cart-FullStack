"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "#categories" },
    { name: "Professionals", href: "#professionals" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "CTA", href: "#cta" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6">

          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-linear-to-r from-green-500 to-emerald-400 flex items-center justify-center font-bold text-black">
              H
            </div>
            <span className="text-xl font-bold">
              Help<span className="text-green-500">Cart</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-gray-300 hover:text-green-400 transition"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-5 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
            >
              Login
            </Link>

            <Link
              href="/auth/signup"
              className="px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-black font-semibold transition"
            >
              Sign Up
            </Link>
          </div>

          <button
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl p-5 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((item) => (
                <a key={item.name} onClick={()=> setOpen(false)} href={item.href}>
                  {item.name}
                </a>
              ))}

              <Link href="/auth/login" className="border border-green-800 hover:border-green-600 transition-all flex justify-center p-2 rounded-xl">Login</Link>

              <Link
                href="/auth/signup"
                className="bg-green-500 text-center text-black py-2 rounded-xl font-semibold"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}