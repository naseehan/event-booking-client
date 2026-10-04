import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
          <i className="fa-solid fa-xmark"></i>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Order Incomplete
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Payment Cancelled
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Your transaction was not completed and your card was not charged. You can return to your cart whenever you are ready.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <Link
            to="/cart2"
            className="block w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all shadow-emerald-200"
          >
            Return to Cart
          </Link>
          <Link
            to="/events"
            className="block w-full py-2.5 px-4 text-slate-600 hover:text-slate-800 text-xs font-semibold"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
