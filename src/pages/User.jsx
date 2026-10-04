import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const User = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  if (!user || !user.token) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-sm space-y-4">
          <i className="fa-solid fa-lock text-3xl text-emerald-600"></i>
          <h2 className="text-xl font-bold text-slate-800">Authentication Required</h2>
          <p className="text-xs text-slate-500">Please sign in to view your account dashboard.</p>
          <Link
            to="/login"
            className="block w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl font-extrabold shadow-inner">
            {user.email ? user.email.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="text-center sm:text-left flex-1 space-y-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Account Profile</span>
            <h2 className="text-2xl font-black text-slate-900">{user.email}</h2>
            <p className="text-xs text-slate-400">User ID: {user.userId || "Active Session"}</p>
          </div>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to log out?")) {
                logout();
                navigate("/login");
              }
            }}
            className="px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Dashboard Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                <i className="fa-solid fa-plus"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Publish an Event</h3>
              <p className="text-xs text-slate-500">
                Organize and sell tickets for your concert, festival, or sports gathering.
              </p>
            </div>
            <Link
              to="/user/create"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              <span>Create Event</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-lg">
                <i className="fa-solid fa-list-check"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Manage Published Events</h3>
              <p className="text-xs text-slate-500">
                View, update, or remove events you have created on the platform.
              </p>
            </div>
            <Link
              to="/user/delete"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-semibold transition-colors"
            >
              <span>Manage Events</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
