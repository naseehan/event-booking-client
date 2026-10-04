import React from "react";
import { Link } from "react-router-dom";
import ticket from "../../assets/home/ticket.jpg";

const Confirm = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-lg text-center space-y-6">
        <div className="overflow-hidden rounded-2xl">
          <img src={ticket} alt="Ticket Preview" className="w-full h-48 object-cover" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Digital Pass</span>
          <h2 className="text-2xl font-black text-slate-900">General Event Access</h2>
          <p className="text-sm text-slate-500">
            Select an event from our catalog to book official tickets and reserve your seats.
          </p>
        </div>
        <Link
          to="/events"
          className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-200"
        >
          Browse All Events
        </Link>
      </div>
    </div>
  );
};

export default Confirm;
