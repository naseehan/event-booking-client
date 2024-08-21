import React, { useEffect, useState } from "react";
import "../stylePages/events/App.css";
import axios from "axios";
import ScrollButton from "../components/ScrollButton";
import styled from "styled-components";

const Expired = styled.div`
  position: absolute;
  right: 0px;
  z-index: 10;
  background-color: red;
  color: #fff;
  padding: 12px;
  border-radius: 5px;
`;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/getEvent`
        );
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };

  // sorting by price
  const sortedEvents = [...events].sort((a, b) => {
    if (sortValue === "sortByPrice") {
      return a.price - b.price;
    }
    return 0;
  });

  const today = new Date();

  return (
    <div className="for-sort">
      <div className="sort">
        <select name="sort" id="sortId" onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="sortByPrice">Sort by price</option>
        </select>
      </div>
      {loading ? (
        <div className="loader-animation"></div>
      ) : (
        <div className="event-container">
          {sortedEvents.map((data, index) => {
            const eventDateStr = `${data.date} ${today.getFullYear()}`;
            const eventDate = new Date(eventDateStr);

            return (
              <>
                <div
                  key={data.id}
                  className="all-events"
                  data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                >
                  {eventDate < today && (
                    <Expired className="expired">Expired</Expired>
                  )}
                  {console.log(data.date)}
                  <div className="event-details">
                    <div className="first-child">
                      <i className="fa-solid fa-calendar-days"></i>
                      <div>
                        <h5>DATE:</h5>
                        <p>{data.date}</p>
                      </div>
                    </div>
                    <div className="first-child">
                      <i className="fa-solid fa-clock"></i>
                      <div>
                        <h5>TIME:</h5>
                        <p>{data.time}</p>
                      </div>
                    </div>
                    <div className="first-child">
                      <i className="fa-solid fa-location-dot"></i>
                      <div>
                        <h5>PLACE:</h5>
                        <p>{data.place}</p>
                      </div>
                    </div>
                  </div>
                  <div className="event-names">
                    <i className="fa-solid fa-circle-exclamation fa-2xl"></i>
                    <h1>{data.name}</h1>
                    <p>{data.category}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
      <ScrollButton />
    </div>
  );
};

export default Events;
