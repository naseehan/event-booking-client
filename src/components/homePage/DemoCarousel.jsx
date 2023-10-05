import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import Events from "./Carousel";


const DemoCarousel = () => {


  const [event, setEvent] = useState({
    name: "",
    place: "",
    price: ""
  })


  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

const navigate = useNavigate()



const handleClick = (e, data) => {
  e.preventDefault()
setEvent({
  name: data.name,
  place: data.place,
  price: data.price
})

// navigate("/buy-ticket")
window.location.href="/buy-ticket"
}
console.log(event);

  return (
    <Slider {...settings}>
      {Events.map((data, index) =>  (
       <Link to="/BuyTickets" state={event}>
          <div className="event4 common-event" onClick={(e) => handleClick(e, data)}>
            <img src={data.img} alt="Slide 3" id="image"/>
            <div className="text-overlay">
              <p>{data.price}</p>
              <h4>{data.place}</h4>
              <h1>{data.name}</h1>
            </div>
          </div>
           </Link>
      ))}
    </Slider>
  );
};

export default DemoCarousel;
