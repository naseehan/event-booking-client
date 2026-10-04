import React, { useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const BuyTickets = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const eventState = location.state;
  const { user } = useContext(UserContext);

  if (!eventState) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-sm space-y-4">
          <i className="fa-solid fa-ticket text-3xl text-slate-400"></i>
          <h2 className="text-xl font-bold text-slate-800">No Ticket Selected</h2>
          <p className="text-xs text-slate-500">Please choose an event to purchase tickets.</p>
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

  const { place = "Venue TBA", price = 0 } = eventState;

  const handleBuyTicket = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (user && user.token) {
        navigate("/confirm2", { state: eventState });
      } else {
        navigate("/login");
      }
    }, 600);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 text-center">Ticket Reservation</h2>
        <div className="space-y-3 border-y border-slate-100 py-4 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Location:</span>
            <span className="font-bold text-slate-900">{place}</span>
          </div>
          <div className="flex justify-between">
            <span>Price:</span>
            <span className="font-extrabold text-emerald-600 text-base">₹{price}</span>
          </div>
        </div>

        <button
          onClick={handleBuyTicket}
          disabled={loading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner animate-spin"></i>
              <span>Processing...</span>
            </>
          ) : (
            <span>Continue to Confirmation</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BuyTickets;
