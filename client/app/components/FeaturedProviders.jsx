"use client";

import axios from "axios";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FeaturedProviders() {
  const [experts, setExperts] = useState([]);

  const getAllProvider = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/get-allProvidersForLandingPage`);

      if (data?.success) {
        setExperts(data.providers);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProvider();
  }, [])

  const randomExperts = [...experts].sort(() => Math.random() - 0.5);  

  return (
    <section id="professionals" className="py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">

          <span className="text-green-500 font-semibold">
            FEATURED PROVIDERS
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-4">
            Top Rated Professionals
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            ऐसे सेवा प्रदाता जिन्हें लोगों ने पसंद किया है और जिनके काम पर भरोसा किया जाता है।
          </p>

        </div>

        {/* Infinite Slider */}

        <div className="relative">

          <motion.div
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex -space-x-7"
          >
            {[...randomExperts].slice(0, 10).map(
              (provider, index) => (
                <div
                  key={index}
                  className="w-[320px] shrink-0 rounded-3xl border border-white/30 bg-slate-700/20 h-fit scale-85 hover:bg-slate-700/40 backdrop-blur-xl p-5"
                >
                  {/* Avatar */}

                  <div className="flex items-center gap-4">

                    <div className="relative h-13 w-13 rounded-full bg-linear-to-r from-green-500 to-emerald-400 flex items-center justify-center text-black font-bold text-3xl capitalize">
                      {
                        provider.profilePic ?
                        <Image src={provider.profilePic} sizes="52px" 
                        alt="H" fill priority className="rounded-full w-auto h-auto" />
                        : 
                        provider.full_name[0]
                      }
                    </div>

                    <div>
                      <h3 className="font-bold capitalize text-lg">
                        {provider.full_name}
                      </h3>

                      <div className="flex items-center gap-1 text-green-500 text-sm">
                        <BadgeCheck size={14} />
                        Verified
                      </div>
                    </div>

                  </div>

                  {/* Profession */}

                  <div className="mt-6">
                    <ul className="text-green-500 font-semibold">
                      {provider.profession?.map((item, index) => (
                        <li className="capitalize text-sm flex items-center gap-2" key={index}>
                          <p className="text-white">{index + 1}.</p>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Location */}

                  <div className="mt-3 capitalize flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    {provider.village}, Bihar Muz.
                  </div>

                  {/* CTA */}

                  {
                    provider.phone &&
                    <a href={`tel:+91${provider.phone}`} className="w-full mt-6 bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 transition">
                      <Phone size={16} />
                      Contact
                    </a>
                  }
                </div>
              )
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}