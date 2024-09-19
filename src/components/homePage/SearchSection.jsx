import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState()
  const [searchResults, setSearchResults] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [overlay, setOverlay] = useState(false);

  const value = useSelector((state) => {
    return state;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/searchedEvents`, {
        params: {
          category: category, // Pass category as a query parameter
        },
      });
      setFetchedEvents(response.data);
      setSearchResults(!searchResults);
      setOverlay(true);
      setLoading(false)
    } catch (error) {
      setLoading(true)
      console.error("Error fetching events:", error);
    }
  };

  const navigate = useNavigate();

  const handleClick = (e, data) => {
    e.preventDefault();
    navigate("/confirm2", {
      state: {
        name: data.name,
        category: data.category,
        place: data.place,
        price: data.price,
        date: data.date,
        description: data.description,
        time: data.time,
        venue: data.venue,
      },
    });

    // window.location.href="/buy-ticket"
  };

  return (
    <div className="search-section">
      <div
        className={`search-overlay ${overlay ? "search-overlay-active" : ""}`}
        onClick={() => {
          setOverlay(false);
          setSearchResults(false);
        }}
      ></div>
      <form action="" onSubmit={handleSubmit}>
        <div className="category form-common">
          <label htmlFor="category">WHAT</label>
          <select
            name="category"
            id="category"
            required
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">Select Category</option>
            <option value="Arts & Theatre">Arts & Theatre</option>
            <option value="Concerts">Concerts</option>
            <option value="Family">Family</option>
            <option value="Festivals">Festivals</option>
            <option value="Conference">Conference</option>
          </select>
        </div>

        <div className="location form-common">
          <label htmlFor="location">WHERE</label>
          <select name="location" id="location">
            <option value="">Select Location</option>
            <option value="Kochi">Kochi</option>
            <option value="TVM">TVM</option>
            <option value="Varkala">Varkala</option>
            <option value="Kozhikode">Kozhikode</option>
            <option value="Banglore">Banglore</option>
          </select>
        </div>

        <div className="date form-common">
          <label htmlFor="date">WHEN</label>
          <input type="date" name="date" id="date" />
        </div>

        <div className="submit">
          <button className="button-28" role="button">
            Search Events
          </button>
        </div>
      </form>
      
      {loading ? <p>Loading...</p> : (
        <>
        {searchResults && (
          
          
            <div className="search-results">
              {fetchedEvents.length == 0 && "No events found"}
              {fetchedEvents.map((data) => (
                  <ul onClick={(e) => handleClick(e, data)}>
                    <li>
                      <p>Name : {data.name}</p>
                    </li>
                    <li>
                      <p>Place:{data.place} </p>
                    </li>
                    <li>
                      <p>Price:{data.price} </p>
                    </li>
                  </ul>
              ))}
            </div>
       
      )}
      </>
    )}
    </div>
  );
};

export default SearchSection;
