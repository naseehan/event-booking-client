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

  const [totalEvents, setTotalEvents] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 6;

  useEffect(() => {
    const fetchEvents = async () => {
      const offset = (currentPage -1) * perPage
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/getEvent`,{
            params:{
              limit: perPage,
              skip: offset
            }
          }
        );
        setEvents(response.data.getEvents);
        // setTotalEvents(response.data.length);
        // console.log(response.data.length);
        setTotalEvents(response.data.allEvents);
        
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, [currentPage]);

  const totalPage = Math.ceil(totalEvents / perPage)
  const pageNumber = Array.from({ length: totalPage}, (_, i) => i + 1)

  const handlePrevious = () => {
    if(currentPage >1){
      setCurrentPage(currentPage -1)
    }
  }

  const handleNext = () => {
    if(currentPage < totalPage){
      setCurrentPage(currentPage +1)
    }
  }

const handlePageNumberClick = (pageNumber) => {
  setCurrentPage(pageNumber)
}

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
        // <div>
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
        // {/* </div> */}
      )}

<div className="pagination">
        <button
          className="paginationButton"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          ⬅️
        </button>
        {pageNumber.map((pageNum) => (
          <button
            className={`paginationButton ${
              currentPage === pageNum ? "active " : ""
            }`}
            key={pageNum}
            onClick={() => handlePageNumberClick(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        <button
          className="paginationButton"
          onClick={handleNext}
          disabled={currentPage === totalPage}
        >
          ➡️
        </button>
      </div>


      <ScrollButton />
    </div>
  );
};

export default Events;
