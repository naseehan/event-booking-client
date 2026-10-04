import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../context/cartContext";
import { cartApi } from "../api/cart.api";

export default function Cart2() {
  const { cartItems, loading, removeFromCart, clearCart, totalAmount } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Remove "${name}" from your cart?`)) {
      await removeFromCart(id);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setCheckingOut(true);
    setCheckoutError(null);

    try {
      const stripeKey = process.env.REACT_APP_STRIPE_KEY;
      const stripe = await loadStripe(stripeKey);

      const session = await cartApi.createCheckout(cartItems);

      if (session && session.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          setCheckoutError(result.error.message);
        }
      } else {
        throw new Error("Unable to create checkout session. Please try again.");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      setCheckoutError(err.message || "Checkout session failed. Please retry.");
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <i className="fa-solid fa-spinner animate-spin text-emerald-600 text-3xl"></i>
          <p className="text-sm font-medium text-slate-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Your Booking Cart</h1>
            <p className="text-xs text-slate-500 mt-1">Review your tickets before proceeding to payment.</p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear your entire cart?")) {
                  clearCart();
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {checkoutError && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-sm text-rose-700 flex items-center gap-3">
            <i className="fa-solid fa-circle-exclamation text-rose-500 text-lg"></i>
            <span>{checkoutError}</span>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-slate-100 text-slate-400">
              <i className="fa-solid fa-basket-shopping text-3xl"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800">Your Cart is Empty</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              You haven't added any tickets yet. Explore our events and reserve your spot!
            </p>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              <i className="fa-solid fa-ticket"></i>
              <span>Browse Events</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">{item.name}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      {item.venue && <span>{item.venue}</span>}
                      {item.place && (
                        <>
                          <span>•</span>
                          <span>{item.place}</span>
                        </>
                      )}
                      {item.time && (
                        <>
                          <span>•</span>
                          <span>{item.time}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-slate-900 text-lg">₹{item.price}</span>
                    <button
                      onClick={() => handleDelete(item._id, item.name)}
                      className="text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove item"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Checkout */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 h-fit">
              <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Tickets ({cartItems.length})</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking Fee</span>
                  <span className="text-emerald-600 font-semibold">FREE</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between font-extrabold text-slate-900 text-base">
                  <span>Total Amount</span>
                  <span className="text-emerald-700">₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {checkingOut ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                    <span>Connecting to Stripe...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-lock"></i>
                    <span>Proceed to Stripe Checkout</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5">
                <i className="fa-solid fa-shield-halved text-emerald-600"></i>
                <span>256-bit SSL encrypted checkout</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}