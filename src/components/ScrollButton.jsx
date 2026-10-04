import React, { useEffect, useState } from "react";

const ScrollButton = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!scroll) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 focus:outline-none"
      title="Scroll to top"
      aria-label="Scroll to top"
    >
      <i className="fa-solid fa-arrow-up text-sm"></i>
    </button>
  );
};

export default ScrollButton;
