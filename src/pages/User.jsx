import React, { useState } from "react";
import "../stylePages/userPage/App.css";
import { useNavigate } from "react-router-dom";
import ScrollButton from "../components/ScrollButton";
// import { useSelector } from 'react-redux';

const User = () => {
  // const adminEmail = useSelector((state) => state.adminEmail);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [adminEmail, setAdminEmail] = useState(email);
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "80px" }}
                    loading="lazy"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-12 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{adminEmail}</p>
                      </div>
                    </div>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">

                      {/* create event button */}
                      <div className="col-6 mb-3">
                        <button
                          className="create"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("create");
                          }}
                        >
                          Create Event
                        </button>
                      </div>

                      {/* view event button */}
                      {/* <div className="col-6 mb-3">
                        <button
                          className="delete"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("delete");
                          }}
                        >
                          View Event
                        </button>
                      </div> */}

                        {/* delete event button */}
                      <div className="col-6 mb-3">
                        <button
                          className="delete"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("delete");
                          }}
                        >
                          Delete Event
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollButton />
    </section>
  );
};

export default User;
