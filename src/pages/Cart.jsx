import React, { useEffect, useState } from "react";
import "../stylePages/cart/App.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [noPage, setNoPage] = useState(false)
  const [token, setToken] = useState();

  useEffect(() =>{
    const storedToken = localStorage.getItem("userstokentoken")
    setToken(storedToken)
  }, []);


// useEffect(() => {
//   if (location.state === null) {
//     setNoPage(true);
//   } else {
//     setNoPage(false);
//   }
// }, [location.state]);

// Check if location.state exists before accessing its properties
// if (noPage || !location.state) {
//   return <div>Please login first</div>;
// }


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
if(token){
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
  }else{
    navigate("/login");
  }
  };

 

  return (
    <div className="confirm-div">
      {noPage ? <div>Please login first</div>:(
        <>
      <div className="confirm-overlay"></div>
      <div className="event-heading">
        <h4>Complete Your Purchase</h4>
      </div>
      <div className="ticket-booking-1">
        

        <div className="cart-info">
          <div className="cart-name">
            <h5>{name}</h5>
            <div className="cart-details">
              <i className="fa-solid fa-location-dot"></i>
              <span>{venue}</span>
              <i className="fa-solid fa-calendar-days"></i>
              <span>{date}</span>
              <i className="fa-solid fa-clock"></i>
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
          <button className="btn" onClick={(e)=>{handleClick( e,name,category,place,price,date,time,venue,description)}}> Place Order </button>
        </div>
      </div>
      </>
)}
    </div>
  );
};

export default Cart;
