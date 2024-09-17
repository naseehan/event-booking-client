import React, { useState } from "react";
import "../../stylePages/buyTicket/App.css";
import { useLocation, useNavigate } from "react-router-dom";
import Swiper from "../Swiper";

const Confirm2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, category, place, price, date, time, venue, description } =
    location.state;

  // if(time<12){
  //   setAm("AM")
  // }else{
  //   setAm("PM")
  // }

  const dateString = date;

  // Convert the string to a Date object
  const newDate = new Date(dateString);

  // Options for formatting the date
  const options = {
    day: "numeric",
    month: "long",
  };

  // Format the date
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    newDate
  );

  // when user clicks buy
  const handleClick = (
    e,
    name,
    category,
    place,
    price,
    date,
    time,
    venue,
    description
  ) => {
    e.preventDefault();
    navigate("/cart", {
      state: {
        name: name,
        category: category,
        place: place,
        price: price,
        date: date,
        description: description,
        time: time,
        venue: venue,
      },
    });
  };

  const amPm = time < 12 ? "AM" : "PM";

  return (
    <div className="container confirm-swiper">
      <div className="confirm-div">
        <div className="confirm-overlay"></div>
        <div className="event-heading">
          <h1>{name}</h1>
        </div>
        <div className="ticket-booking">
          <div className="booking-date common-booking">
            <i className="fa-solid fa-calendar-days"></i>
            <h1>{formattedDate}</h1>
            <span className="span">
              {time} {amPm}{" "}
            </span>
          </div>
          <div className="booking-place common-booking">
            <i className="fa-solid fa-location-dot"></i>
            <h1>{venue}</h1>
            <span className="span">{place}</span>
          </div>
          <div className="booking-price common-booking">
            <i class="fa-solid fa-indian-rupee-sign"></i>
            <h1>{price} ₹</h1>
            <button>
              <span
                onClick={(e) =>
                  handleClick(
                    e,
                    name,
                    category,
                    place,
                    price,
                    date,
                    time,
                    venue,
                    description
                  )
                }
              >
                Buy
              </span>
            </button>
          </div>
        </div>
      </div>

      <h1 className="other-events">Other Events You May Like</h1>

      <Swiper />
    </div>
  );
};

export default Confirm2;
