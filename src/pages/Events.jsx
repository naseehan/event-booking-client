import React, { useEffect, useState } from "react";
import "../stylePages/events/App.css";
import axios from "axios";
import ScrollButton from "../components/ScrollButton";

const Events = () => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // const userId = localStorage.getItem("userId")
        // setUserId(userId)
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/getEvent`
          // , {
          //   headers: {
          //     "userId": userId,
          //   },
          // }
        );
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      {loading ? (
        <div class="loader">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      ) : (
        <container className="event-container">
          {event.map((data, index) => (
            <div className="all-events">
              <div className="event-details">
                <div className="first-child">
                  <i className="fa-solid fa-calendar-days "></i>
                  <div>
                    <h5>DATE:</h5>
                    <p>{data.date}</p>
                  </div>
                </div>
                <div className="first-child">
                  <i className="fa-solid fa-clock "></i>
                  <div>
                    <h5>TIME:</h5>
                    <p>{data.time}</p>
                  </div>
                </div>
                <div className="first-child">
                  <i className="fa-solid fa-location-dot "></i>
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



          ))}
        </container>
       )} 
        <ScrollButton />
    </div>
   
  );
};

export default Events;
