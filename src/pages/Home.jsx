import React from "react";
import HeroSection from "../components/homePage/HeroSection";
import DemoCarousel from "../components/homePage/DemoCarousel";
import Clients from "../components/homePage/Clients";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import ScrollButton from "../components/ScrollButton";

const Home = () => {
  return (
    <div className="space-y-12 pb-16">
      <HeroSection />
      <DemoCarousel />
      <Features />
      <Clients />
      <FAQ />
      <ScrollButton />
    </div>
  );
};

export default Home;
