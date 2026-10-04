import React from "react";
import client1 from "../../assets/home/client/client-1.png";
import client2 from "../../assets/home/client/client-2.png";
import client3 from "../../assets/home/client/client-3.png";
import client4 from "../../assets/home/client/client-4.png";
import client5 from "../../assets/home/client/client-5.png";
import client6 from "../../assets/home/client/client-6.png";
import client7 from "../../assets/home/client/client-7.png";
import client8 from "../../assets/home/client/client-8.png";

const clients = [client1, client2, client3, client4, client5, client6, client7, client8];

const Clients = () => {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-2 mb-8">
        <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Our Network</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Featured Partners & Organizers
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
        {clients.map((logo, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center hover:shadow-md transition-shadow grayscale hover:grayscale-0"
          >
            <img src={logo} alt={`Partner ${index + 1}`} className="h-10 object-contain max-w-[120px]" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
