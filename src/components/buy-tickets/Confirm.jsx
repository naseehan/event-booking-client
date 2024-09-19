import React, { useEffect, useState } from "react";
import ticket from "../../assets/home/ticket.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Confirm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false)

  const selectSeat = (e) => {
    e.preventDefault();
    setActive(!active)
    console.log("dkjdf");
  }
const hfj = (e) => {
console.log("dsfd");
}
  // useEffect(() => {
  //   const fetchTokenAndValidate = async () => {
  //     const token = localStorage.getItem("userstokentoken");

  //     if (token) {
  //       try {
  //         // Send a request to the backend to validates the token
  //         const response = await axios.post(
  //           "http://localhost:3001/validateToken",
  //           {},
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         if (response.status === 200) {
  //           // Token is valid, navigate to the dashboard
  //           navigate("/confirm");
  //         } else {
  //           // Handle unexpected response status codes
  //           console.log("Unexpected response status:", response.status);
  //         }
  //       } catch (error) {
  //         // Handle errors in a more specific way
  //         if (axios.isCancel(error)) {
  //           // Request was canceled
  //           console.error("Request was canceled:", error);
  //         } else if (error.response) {
  //           // Server responded with an error status code
  //           if (error.response.status === 401) {
  //             // Unauthorized, token is invalid
  //             console.error("Token is invalid");
  //           } else {
  //             console.error("Server error:", error.response.data);
  //           }
  //         } else if (error.request) {
  //           // Request was made but no response was received
  //           console.error("No response received:", error.request);
  //         } else {
  //           // Something else went wrong
  //           console.error("Unknown error occurred:", error);
  //         }
  //       } finally {
  //         setLoading(false); // Set loading to false when the request is completed
  //       }
  //     }
  //   };

  //   fetchTokenAndValidate();
  // }, []);


  // if (loading) {
  //   navigate("/login")// Render a loading indicator while waiting for the response
  // }

  return (
    <div className="confirm-container" style={active ?{ opacity: 1}:  null}>
<div className={`overlay ${active ? "active-window" : ""}`}></div>
{active ? (
<div className="seat-selection">
  <p>How many seats?</p>
  <div className="seat-count">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
    </ul>
  </div>
  <button>Select Seats</button>
</div>
) : null}

      <div className="confirm-ticket">
        <img src={ticket} alt="" loading="lazy"/>
        <div className="card-body">
          <h5>Ticket</h5>
          <p>$18.00</p>
          <button onClick={selectSeat}>Select Seat</button>
          <button onClick={hfj}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
