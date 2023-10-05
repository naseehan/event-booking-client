import React from "react";

const SearchSection = () => {
  return (
    <div className="search-section">
      <form action="">
        <div className="category form-common">
          <label htmlFor="category">WHAT</label>
          <select name="category" id="category">
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
          <button>
            <span>PLAY NOW</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchSection;
