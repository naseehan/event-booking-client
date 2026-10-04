import React from "react";

const stats = [
  { label: "Tickets Sold", value: "10,000+", icon: "fa-ticket" },
  { label: "Events Hosted", value: "9,900+", icon: "fa-calendar-days" },
  { label: "Satisfaction Rate", value: "99.4%", icon: "fa-award" },
  { label: "Partner Venues", value: "50+", icon: "fa-map-location-dot" },
];

const Features = () => {
  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl text-white">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">
            Platform Numbers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Trusted by Thousands of Attendees
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl text-center space-y-3 hover:border-emerald-500/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
