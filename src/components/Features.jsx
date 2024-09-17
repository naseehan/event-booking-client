import React from "react";
import "../stylePages/features/App.css";

const Features = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="bg-light p-5 rounded">
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="counter bg-white rounded p-5">
                <i
                  className="fas fa-ticket fa-rotate-by"
                  style={{ "--fa-rotate-angle": "150deg" }}
                ></i>
                <h4>TICKETS SOLD</h4>
                <h1>10000+</h1>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="counter bg-white rounded p-5">
                <i className="fa-solid fa-calendar-days"></i>{" "}
                <h4>EVENTS CREATED</h4>
                <h1>9999+</h1>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="counter bg-white rounded p-5">
                <i className="fa fa-users text-secondary"></i>
                <h4>QUALITY OF SERVICE </h4>
                <h1>99%</h1>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className="counter bg-white rounded p-5">
                <i className="fa fa-users text-secondary"></i>
                <h4>TICKET TYPES</h4>
                <h1>11+</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
