import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eventApi } from "../../api/event.api";

const SearchSection = () => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchError(null);

    try {
      const data = await eventApi.searchEvents({
        category: category,
        query: location,
      });

      setFetchedEvents(data);
      setSearchResults(true);
      setOverlay(true);
    } catch (error) {
      console.error("Error searching events:", error);
      setSearchError(error.message || "Failed to search events");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e, data) => {
    e.preventDefault();
    setOverlay(false);
    setSearchResults(false);
    navigate("/confirm2", { state: data });
  };

  return (
    <div className="relative max-w-4xl mx-auto my-8 px-4">
      {overlay && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => {
            setOverlay(false);
            setSearchResults(false);
          }}
        ></div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-30"
      >
        <div className="space-y-1">
          <label htmlFor="category" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            Category
          </label>
          <select
            name="category"
            id="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
          >
            <option value="">Select Category</option>
            <option value="Arts & Theatre">Arts & Theatre</option>
            <option value="Concerts">Concerts</option>
            <option value="Family">Family</option>
            <option value="Festivals">Festivals</option>
            <option value="Conference">Conference</option>
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="location" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            City / Location
          </label>
          <select
            name="location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm rounded-lg border border-slate-200 px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
          >
            <option value="">Any Location</option>
            <option value="Kochi">Kochi</option>
            <option value="TVM">TVM</option>
            <option value="Varkala">Varkala</option>
            <option value="Kozhikode">Kozhikode</option>
            <option value="Banglore">Banglore</option>
            <option value="Thirur">Thirur</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>Find Events</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Search Results Popover */}
      {searchResults && (
        <div className="absolute left-4 right-4 top-full mt-3 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-50 max-h-96 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="font-bold text-slate-800 text-sm">
              Search Results ({fetchedEvents.length})
            </h4>
            <button
              onClick={() => {
                setSearchResults(false);
                setOverlay(false);
              }}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              Close
            </button>
          </div>

          {searchError && (
            <p className="text-sm text-rose-600 py-2">{searchError}</p>
          )}

          {fetchedEvents.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-sm">
              No matching events found. Try adjusting your search criteria.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {fetchedEvents.map((item) => (
                <div
                  key={item._id}
                  onClick={(e) => handleClick(e, item)}
                  className="py-3 px-2 flex items-center justify-between hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div>
                    <h5 className="font-semibold text-slate-900 text-sm">{item.name}</h5>
                    <p className="text-xs text-slate-500">
                      {item.place} • {item.venue}
                    </p>
                  </div>
                  <span className="font-bold text-emerald-600 text-sm">₹{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSection;
