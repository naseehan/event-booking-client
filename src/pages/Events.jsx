import React, { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { eventApi } from "../api/event.api";
import { useCart } from "../context/cartContext";
import { UserContext } from "../context/userContext";
import ScrollButton from "../components/ScrollButton";

const CATEGORIES = ["All", "Music", "Festivals", "Sports", "Conference", "Theater", "Workshop"];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortValue, setSortValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [totalEvents, setTotalEvents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const { addToCart } = useCart();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [actionMessage, setActionMessage] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    const offset = (currentPage - 1) * perPage;

    try {
      const data = await eventApi.getEvents({
        limit: perPage,
        skip: offset,
        sortBy: sortValue,
        category: selectedCategory === "All" ? "" : selectedCategory,
      });

      setEvents(data.events || []);
      setTotalEvents(data.totalEvents || 0);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message || "Unable to load events. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, perPage, sortValue, selectedCategory]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const totalPages = Math.max(1, Math.ceil(totalEvents / perPage));

  const handleBookNow = (eventItem) => {
    navigate("/confirm2", { state: eventItem });
  };

  const handleAddToCart = async (eventItem) => {
    if (!user || !user.token) {
      navigate("/login");
      return;
    }

    const res = await addToCart({
      name: eventItem.name,
      place: eventItem.place,
      price: eventItem.price,
      time: eventItem.time,
      venue: eventItem.venue,
      eventId: eventItem._id,
    });

    if (res.success) {
      setActionMessage(`Added "${eventItem.name}" to your cart!`);
      setTimeout(() => setActionMessage(null), 3000);
    } else {
      alert(res.error || "Failed to add to cart");
    }
  };

  const filteredEvents = events.filter((ev) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      (ev.name && ev.name.toLowerCase().includes(term)) ||
      (ev.place && ev.place.toLowerCase().includes(term)) ||
      (ev.venue && ev.venue.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore Upcoming Events</h1>
            <p className="mt-1 text-sm text-slate-500">
              Discover concerts, conferences, and sports matches happening near you.
            </p>
          </div>

          {/* Quick Action Toast */}
          {actionMessage && (
            <div className="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md animate-bounce">
              <i className="fa-solid fa-check mr-2"></i> {actionMessage}
            </div>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search by name, place, venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <label htmlFor="sortBy" className="text-xs font-medium text-slate-500 whitespace-nowrap">
              Sort:
            </label>
            <select
              id="sortBy"
              value={sortValue}
              onChange={(e) => {
                setSortValue(e.target.value);
                setCurrentPage(1);
              }}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Content View: Loading, Error, Empty, or Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="space-y-2 pt-2">
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </div>
                <div className="pt-4 flex justify-between items-center">
                  <div className="h-6 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-9 bg-slate-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center space-y-4">
            <div className="inline-flex p-3 rounded-full bg-rose-100 text-rose-600">
              <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-rose-900">Failed to Load Events</h3>
            <p className="text-sm text-rose-700 max-w-md mx-auto">{error}</p>
            <button
              onClick={fetchEvents}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <i className="fa-solid fa-rotate-right"></i> Try Again
            </button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-slate-100 text-slate-400">
              <i className="fa-solid fa-calendar-xmark text-3xl"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Events Found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              We couldn't find any events matching your selected category or search filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchTerm("");
                setSortValue("");
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  {/* Category Pill and Place */}
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md">
                      {item.category || "General"}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <i className="fa-solid fa-location-dot text-emerald-600"></i>
                      {item.place}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {item.name}
                  </h3>

                  {/* Metadata */}
                  <div className="space-y-2 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-calendar text-slate-400 w-4"></i>
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-clock text-slate-400 w-4"></i>
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-building text-slate-400 w-4"></i>
                      <span className="truncate">{item.venue}</span>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 pt-1 border-t border-slate-100">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Footer / Actions */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Price</span>
                    <span className="text-lg font-black text-slate-900">
                      ₹{item.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      title="Add to Cart"
                      className="p-2.5 rounded-lg border border-slate-200 hover:border-emerald-500 text-slate-600 hover:text-emerald-600 bg-white transition-colors"
                    >
                      <i className="fa-solid fa-cart-plus"></i>
                    </button>
                    <button
                      onClick={() => handleBookNow(item)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm shadow-emerald-200"
                    >
                      Book Ticket
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <span className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-800">{(currentPage - 1) * perPage + 1}</span> to{" "}
              <span className="font-semibold text-slate-800">
                {Math.min(currentPage * perPage, totalEvents)}
              </span>{" "}
              of <span className="font-semibold text-slate-800">{totalEvents}</span> events
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
                    currentPage === num
                      ? "bg-emerald-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        <ScrollButton />
      </div>
    </div>
  );
};

export default Events;
