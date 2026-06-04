// app/page.jsx

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import HowItWorks from "./components/HowItWorks";
import WhyHelpCart from "./components/WhyHelpCart";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import CTA from "./components/CTA";
import FeaturedProviders from "./components/FeaturedProviders";

export default function Home() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProviders />
      <Stats />
      <HowItWorks />
      <WhyHelpCart />
      <CTA />
      <Footer />
    </main>
  );
}