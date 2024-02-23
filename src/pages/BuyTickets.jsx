import React, { useEffect, useState } from "react";
import "../stylePages/buyTicket/App.css";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const BuyTickets = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const { name, place, price } = location.state;

  const handleBuyTicket = (e) => {
    e.preventDefault();

    setTimeout(() => {
      setLoading(true);
    }, 2000);

    const token = localStorage.getItem("userstokentoken");
// setLoading(false)
    if (token) {
      navigate("/confirm2");
    } else {
      navigate("/login");
    }
  };

  // if (!event) {
  //   return (
  //     <div className='buy-ticket'>
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }
  if (loading) {
    return (
      <div className="buy-ticket">
        <p>Please login to confirm ticket</p>
      </div>
    );
  }

  return (
    <div className="buy-ticket">
      <div className="date-time">
        <h5>28 August</h5>
        <p>12.00 pm</p>
      </div>
      <div className="event-place">
        <h5>{place}</h5>
      </div>
      <div className="price">
        <h5>{price} ₹</h5>
        </div>

      <button onClick={handleBuyTicket}>Buy Ticket</button>
    </div>
  );
};

export default BuyTickets;
