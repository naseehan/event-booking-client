import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { eventApi } from "../api/event.api";

const DeleteEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMyEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventApi.getMyEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching user events:", err);
      setError(err.message || "Failed to load your events.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      await eventApi.deleteEvent(id);
      setEvents((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete event");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Manage Your Events</h1>
            <p className="text-xs text-slate-500 mt-1">Delete or retire events that you created.</p>
          </div>
          <Link
            to="/user"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <i className="fa-solid fa-spinner animate-spin text-emerald-600 text-3xl"></i>
            <p className="text-sm text-slate-500 mt-2">Loading your events...</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center space-y-3">
            <p className="text-rose-700 text-sm">{error}</p>
            <button
              onClick={fetchMyEvents}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold"
            >
              Retry
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-slate-100 text-slate-400">
              <i className="fa-solid fa-folder-open text-3xl"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Events Found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              You haven't created any events yet. Publish an event to manage it here.
            </p>
            <Link
              to="/user/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold"
            >
              <i className="fa-solid fa-plus"></i> Create an Event
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((item) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded">
                      {item.category || "General"}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap gap-2">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.venue}, {item.place}</span>
                    <span>•</span>
                    <span className="font-bold text-emerald-600">₹{item.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item._id, item.name)}
                  disabled={deletingId === item._id}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                >
                  {deletingId === item._id ? (
                    <>
                      <i className="fa-solid fa-spinner animate-spin"></i>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-trash-can"></i>
                      <span>Delete Event</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteEvent;
