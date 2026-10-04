import React, { useContext, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import { UserContext } from "../../context/userContext";

const Confirm2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventData = location.state;
  const { addToCart } = useCart();
  const { user } = useContext(UserContext);
  const [adding, setAdding] = useState(false);

  if (!eventData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-sm space-y-4">
          <i className="fa-solid fa-calendar-xmark text-3xl text-slate-400"></i>
          <h2 className="text-xl font-bold text-slate-800">No Event Selected</h2>
          <p className="text-xs text-slate-500">Please choose an event from our listings to view ticket details.</p>
          <Link
            to="/events"
            className="block w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  const { name, category, place, price, date, time, venue, description } = eventData;

  const handleBookTicket = async () => {
    if (!user || !user.token) {
      navigate("/login");
      return;
    }

    setAdding(true);
    const res = await addToCart({
      name,
      place,
      price,
      time,
      venue,
      eventId: eventData._id,
    });

    setAdding(false);
    if (res.success) {
      navigate("/cart2");
    } else {
      alert(res.error || "Failed to add ticket to cart");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <i className="fa-solid fa-arrow-left"></i> Back to All Events
        </Link>

        {/* Hero Banner Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-6 relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {category || "Featured Event"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {name}
            </h1>
            {description && (
              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Details & Booking Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
              <i className="fa-solid fa-calendar-day"></i>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date & Time</span>
              <h3 className="text-base font-bold text-slate-800 mt-0.5">{date}</h3>
              <p className="text-xs text-slate-500">{time}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</span>
              <h3 className="text-base font-bold text-slate-800 mt-0.5">{venue}</h3>
              <p className="text-xs text-slate-500">{place}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
              <i className="fa-solid fa-ticket"></i>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Standard Pass</span>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">₹{price}</h3>
              <p className="text-xs text-slate-500">Per attendee</p>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-slate-900 text-base">Ready to reserve your spot?</h4>
            <p className="text-xs text-slate-500">Instant confirmation with Stripe secure payment.</p>
          </div>

          <button
            onClick={handleBookTicket}
            disabled={adding}
            className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {adding ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i>
                <span>Adding to Cart...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-cart-plus"></i>
                <span>Reserve Ticket & Checkout</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm2;
