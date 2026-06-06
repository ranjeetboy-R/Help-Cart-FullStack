import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">

      <div className="max-w-7xl mx-auto px-4 py-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-2">

              <div className="h-10 w-10 rounded-xl bg-linear-to-r from-green-500 to-emerald-400 flex items-center justify-center font-black text-black">
                H
              </div>

              <span className="text-2xl font-black">
                Help<span className="text-green-500">Cart</span>
              </span>

            </div>

            <p className="text-gray-400 mt-6 leading-relaxed">
              HelpCart भरोसेमंद सेवा प्रदाताओं और ग्राहकों को एक साथ जोड़ता है, जिससे सही सेवा तक पहुँचना आसान और तेज़ बनता है।
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-bold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="flex flex-col gap-2 text-gray-400">

              <a href="#">Home</a>
              <a href="#providers">Providers</a>
              <a href="#categories">Categories</a>
              <a href="#about">About Us</a>

            </ul>

          </div>

          {/* Categories */}

          <div>

            <h3 className="font-bold text-lg mb-5">
              Popular Categories
            </h3>

            <div className="flex flex-col gap-2 text-gray-400">

              <span>Electrician</span>
              <span>Teacher</span>
              <span>Plumber</span>
              <span>Mechanic</span>
              <span>Computer Expert</span>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-bold text-lg mb-5">
              Connect With Us
            </h3>

            <div className="flex gap-4">

              <a
                href="#"
                className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-black transition"
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="#"
                className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-black transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-black transition"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="#"
                className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-black transition"
              >
                <FaLinkedin size={18} />
              </a>

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 HelpCart. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}