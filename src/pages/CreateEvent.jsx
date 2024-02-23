import React, { useState } from "react";
import "../stylePages/createEvent/App.css";
import axios from "axios";
import Success from "../components/Success";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] =  useState("");
  const [success, setSuccess] = useState(false);

  const [dateError, setDateError] = useState(false)


  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePlace = (e) => {
    setPlace(e.target.value);
  };
  const handlePrice = (e) => {
    // const price = e.target.value;
    // if(price.length > 5 ) {
    //   setPrice(price.slice(0, 5));
    // }else{
      setPrice(e.target.value);
    // }
  };
  const handleDate = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    // if the user selected date is in the future
    if(selectedDate<currentDate){
        setDateError(true);
    }else{
      setDate(e.target.value);
      setDateError(false)
    }
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const handleVenue = (e) => {
    setVenue(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/createEvent`, {
        name,
        place,
        price,
        date,
        description,
        venue,
        time,
        category,
        createdBy: userId, // Include userId in the request body
      });

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }
      setName("");
      setPlace("");
      setPrice("");
      setDate("");
      setTime("");
      setVenue("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div className="create-container">
      <div className="page-overlay"></div>
      <div className="create-event-heading">
        <h3>Create Event</h3>
      </div>

      {/* for success message after submitting */}
      {success && ( 
         <Success /> 
        )}  
       {/* // <div className="success-message">
        //   <p>Event created successfully</p>
        // </div>  */}
      

      <div className="active-task-details">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            maxLength={15}
            name="name"
            id="name"
            value={name}
            onChange={handleName}
            required
          />

          
          <label htmlFor="category">Event Category</label>
          <select name="category" id="category" value={category} required onChange={handleCategory}>
            <option value="">Select Category</option>
            <option value="Arts & Theatre">Arts & Theatre</option>
            <option value="Concerts">Concerts</option>
            <option value="Family">Family</option>
            <option value="Festivals">Festivals</option>
            <option value="Conference">Conference</option>
          </select>

          <label htmlFor="place">Event Place</label>
          <input
            type="text"
            maxLength={20}
            name="place"
            id="place"
            value={place}
            onChange={handlePlace}
            required
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={handleDate}
            required
          />
{dateError ? (<p className="date-error">Please select a valid future date</p>) : null}
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={handlePrice}
            maxLength={5}
            required
          />

          <label htmlFor="time">Time</label>
          <input
            type="time"
            name="time"
            id="time"
            value={time}
            onChange={handleTime}
            required
          />

          <label htmlFor="venue">Venue</label>
          <input
            type="string"
            name="venue"
            id="venue"
            value={venue}
            onChange={handleVenue}
            maxLength={20}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleDescription}
            required
            id="description"
            cols="30"
            rows="10"
          ></textarea>

          <button type="submit" className={dateError ? "not-allowed": ''} disabled={dateError}>Submit</button>
        </form>
      </div>
    </div>
  
    </>
  );
};

export default CreateEvent;