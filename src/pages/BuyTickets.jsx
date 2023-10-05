import React from 'react'
import "../stylePages/buyTicket/App.css"
import { useLocation } from "react-router-dom";

const BuyTickets = () => {

const location = useLocation()
const event = location.state
// axios.post("/buy-ticket",)



if (!event) {
  return (
    <div className='buy-ticket'>
      <p>Loading...</p>
    </div>
  );
}


  return (
    <div className='buy-ticket'>
        <div className="date-time">
            <h5>28 August</h5>
            <p>12.00 pm</p>
        </div>
        <div className="event-place">
            <h5>Kochi</h5>
        </div>
        <div className="price">
            <h5>{event.price}</h5>
        </div>
        <button type=''>Buy Ticket</button>
    </div>
  )
}

export default BuyTickets
