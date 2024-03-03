import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/home/event1.jpg";
import Events from "./Carousel";
import axios from "axios";

const DemoCarousel = () => {

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1196,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 760,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          initialSlide: 0,
        },
      },
    ],
  };


  const [event, setEvent] = useState([]);
  // cosnt [userId, setUserId] = useState()
  const [noEvent, setNoEvent] = useState(true);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // const userId = localStorage.getItem("userId")
        // setUserId(userId)
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/getEvent`
          // , {`
          //   headers: {
          //     "userId": userId,
          //   },
          // }
        );
        setEvent(response.data);
        setNoEvent(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setNoEvent(true);
      }
    };
    fetchEvents();
  }, []);

 




  const navigate = useNavigate();

  const handleClick = (e, data) => {
    e.preventDefault();
    // console.log(event);
    // setEvent({
    //   name: data.name,
    //   place: data.place,
    //   price: data.price
    // })
    navigate("/confirm2", {
      state: {
        name: data.name,
        category: data.category,
        place: data.place,
        price: data.price,
        date: data.date,
        description: data.description,
        time: data.time,
        venue: data.venue,
      },
    });

    // window.location.href="/buy-ticket"
  };

  return (
    <>
      {noEvent ? (
        <div class="loader1">
          <div class="wrapper">
            <div class="circle"></div>
            <div class="line-1"></div>
            <div class="line-2"></div>
            <div class="line-3"></div>
            <div class="line-4"></div>
          </div>

          <div class="wrapper">
            <div class="circle"></div>
            <div class="line-1"></div>
            <div class="line-2"></div>
            <div class="line-3"></div>
            <div class="line-4"></div>
          </div>

          <div class="wrapper">
            <div class="circle"></div>
            <div class="line-1"></div>
            <div class="line-2"></div>
            <div class="line-3"></div>
            <div class="line-4"></div>
          </div>
        </div>
      ) : (
        <Slider {...settings}>
          {event.map((data, index) => (
            // <Link to="/BuyTickets" state={event}>
              <div
                className="event4 common-event" id="event-for-swipe"
                onClick={(e) => handleClick(e, data)}
              >
                <img src={img} alt="Slide 3" id="image" />
                <div className="text-overlay">
                  <p>{data.price} ₹</p>
                  <h4>{data.place}</h4>
                  <h1>{data.name}</h1>
                </div>
              </div>
            // </Link>
          ))}
        </Slider>
      )}
    </>
  );
};


export default DemoCarousel;
