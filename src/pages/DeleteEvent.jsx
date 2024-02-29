import React, { useEffect, useState } from "react";
import "../stylePages/deleteEvent/App.css";
import axios from "axios";

const DeleteEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getEachEvent`, {
          headers: {
            userId: userId,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [events]);

  const handleClick = async (id) => {
    const confirmed = window.confirm(
      "are you sure you want to delete this event?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/events/${id}`, {
          data: {
            id: id,
          },
        });
        setEvents((prevEvents) => prevEvents.filter((data) => data.id !== id));
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    } else {
    }
  };

  return (

    <div className='delete-container container'>
      {events.map((data) => (
        <div class="custom-dialog">
          <div class="custom-dialog-inner">
            {/* <i
              class="fa-solid fa-trash fa-xl"
              // style="color: #ffffff; margin-top: 26px;"
              style={{color: "#ffff",marginTop: "26px"}}
            ></i> */}
             <lord-icon
        src="https://cdn.lordicon.com/skkahier.json"
        trigger="loop"
        delay="2000"
        colors="primary:#ffffff"
        style={{
          placeSelf: 'center',
          }}
        >
    </lord-icon>
            <h2>{data.name}</h2>
            <p>{data.place}</p>
            <span>{data.price} ₹</span>
          </div>
          <div class="custom-buttons">
            <button class="delete" onClick={ () => {handleClick(data._id)}}>Delete Event</button>
          </div>
        </div>
      ))}
     </div>
  );
};

export default DeleteEvent;
