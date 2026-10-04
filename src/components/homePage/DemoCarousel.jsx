import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import img from "../../assets/home/event1.jpg";
import { eventApi } from "../../api/event.api";

const DemoCarousel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadFeaturedEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventApi.getEvents({ limit: 6 });
      setEvents(data.events || []);
    } catch (err) {
      console.warn("Featured events error:", err.message);
      setError("Unable to load featured events right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedEvents();
  }, []);

  const handleEventClick = (eventData) => {
    navigate("/confirm2", { state: eventData });
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider">Top Highlights</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Featured Experiences
          </h2>
        </div>
        <Link
          to="/events"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <span>View All Events</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm animate-pulse space-y-3">
              <div className="h-44 bg-slate-200 rounded-xl"></div>
              <div className="h-5 bg-slate-200 rounded w-2/3"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-3">
          <p className="text-amber-800 text-sm">{error}</p>
          <button
            onClick={loadFeaturedEvents}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold"
          >
            Retry Loading
          </button>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-10 bg-slate-100 rounded-2xl border border-slate-200 text-slate-500 text-sm">
          No featured events available right now. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((item) => (
            <div
              key={item._id}
              onClick={() => handleEventClick(item)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.image || img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  {item.category || "Event"}
                </div>
                <div className="absolute bottom-3 right-3 bg-emerald-600 text-white text-sm font-black px-3 py-1 rounded-lg shadow-md">
                  ₹{item.price}
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{item.place || "City"}</span>
                  <span className="text-slate-300">•</span>
                  <span>{item.date || "Date TBA"}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {item.description || `Join us at ${item.venue} for an unforgettable event.`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DemoCarousel;
