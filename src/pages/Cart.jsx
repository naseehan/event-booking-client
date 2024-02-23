import React, { useEffect, useState } from "react";
import "../stylePages/cart/App.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, category, place, price, date, time, venue, description } = location.state;
  const [count, setCount] = useState(1);

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
  const handleClick = async (e) => {
    e.preventDefault();

    try{
      const userId = localStorage.getItem("userId");
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/cart`,{
      name,
      place,
      price: price * count,
      time,
      createdBy: userId,
      venue,
     })
     navigate("/cart2");
    } catch (error){
      console.error(error);
    }

  };

 

  return (
    <div className="confirm-div">
      <div className="confirm-overlay"></div>
      <div className="event-heading">
        <h4>Complete Your Purchase</h4>
      </div>
      <div className="ticket-booking-1">
        

        <div className="cart-info">
          <div className="cart-name">
            <h5>{name}</h5>
            <div className="cart-details">
              <i class="fa-solid fa-location-dot"></i>
              <span>{venue}</span>
              <i class="fa-solid fa-calendar-days"></i>
              <span>{date}</span>
              <i class="fa-solid fa-clock"></i>
              <span>{time}</span>
            </div>
          </div>

          <div className="cart-event-count">
            <button
              onClick={() =>
                setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1))
              }
            >
              -
            </button>

            <input
              type="number"
              name="count"
              id="count"
              readOnly
              placeholder={count}
            />
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>
              +
            </button>
          </div>
        </div>
        <div className="cart-price">
          <p>Subtotal </p>
          <p> ₹{price * count}</p>
        </div>

        <div className="place-order-btn">
          <button class="btn" onClick={(e)=>{handleClick( e,name,category,place,price,date,time,venue,description)}}> Place Order </button>
        </div>
      </div>


    </div>
  );
};

export default Cart;
