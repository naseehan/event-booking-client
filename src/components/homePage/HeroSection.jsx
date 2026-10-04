import React from "react";
import { TypeAnimation } from "react-type-animation";
import SearchSection from "./SearchSection";

const HeroSection = () => {
  return (
    <div className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto space-y-6">
      <div className="space-y-3">
        <span className="inline-block py-1 px-3 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-100 text-emerald-800">
          All the fun starts here
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Discover{" "}
          <TypeAnimation
            sequence={[
              "Concerts",
              1500,
              "Sports Events",
              1500,
              "Conferences",
              1500,
              "Workshops",
              1500,
              "Festivals",
              1500,
            ]}
            speed={50}
            repeat={Infinity}
            className="text-emerald-600 inline-block"
          />
          <br className="hidden sm:inline" /> around your city.
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto">
          Reserve official passes to the best experiences, sports matches, and live entertainment.
        </p>
      </div>

      <SearchSection />
    </div>
  );
};

export default HeroSection;
