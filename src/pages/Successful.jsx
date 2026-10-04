import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

const Successful = () => {
  const { clearCart } = useCart();
  const clearedRef = useRef(false);

  useEffect(() => {
    if (!clearedRef.current) {
      clearedRef.current = true;
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto shadow-inner animate-bounce">
          <i className="fa-solid fa-check"></i>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Payment Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Booking Successful!
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Thank you for your purchase. We have received your booking and your tickets are confirmed.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <Link
            to="/events"
            className="block w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all shadow-emerald-200"
          >
            Explore More Events
          </Link>
          <Link
            to="/"
            className="block w-full py-2.5 px-4 text-slate-600 hover:text-slate-800 text-xs font-semibold"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Successful;
