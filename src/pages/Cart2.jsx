import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart2() {

const [cart, setCart] = useState([]);


useEffect(() => {
  const fetchEvents = async () => {
    try {
      const userId = localStorage.getItem("userId")
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getCart`,{
          headers: {
            "userId": userId,
          },
        });
        setCart(response.data);
        console.log(response.data);
    } catch (error) {
       console.error("Error fetching cart:", error);
    }
  };
  fetchEvents();
}, [])

const handleClick = async(id) => {
  const confirmed = window.confirm("are you sure want to delete this item");

  if(confirmed){
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteCart/${id}`, {
        data: {
          id: id,
        },
      })
      setCart((prevEvents) => {
        prevEvents.filter((data) => data.id !== id)
      })
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }else{

  }
}

return (
<section className="h-100 mt-5" style={{ backgroundColor: "#eee" }}>
  <MDBContainer className="py-5 h-100" style={{ fontFamily: "Rubik, sans-serif"}}>
    <MDBRow className="justify-content-center align-items-center h-100">
      <MDBCol md="10">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
            Shopping Cart
          </MDBTypography>
          {/* <div>
            <p className="mb-0">
              <span className="text-muted">Sort by:</span>
              <a href="#!" className="text-body">
                price <i className="fas fa-angle-down mt-1"></i>
              </a>
            </p>
          </div> */}
        </div>

{cart.map((data, index) => (
        <MDBCard className="rounded-3 mb-4">
          <MDBCardBody className="p-4">
            <MDBRow className="justify-content-between align-items-center">
              
              <MDBCol md="3" lg="3" xl="3">
                <p className="lead fw-normal mb-2">{data.name}</p>
                <p>
                  <span className="text-muted">{data.venue} </span>
                  <span className="text-muted">{data.place} </span>
                </p>
              </MDBCol>
              
             
              <MDBCol md="3" lg="2" xl="2" className="">
                <MDBTypography tag="h5" className="mb-0">
                  ₹{data.price}
                </MDBTypography>
              </MDBCol>
              <MDBCol md="1" lg="1" xl="1" className="text-end" onClick={() => {handleClick(data._id)}}>
                <a href="" className="text-danger" >
                  <MDBIcon fas icon="trash text-danger" size="lg" />
                </a>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
))}
        <MDBCard>
          <MDBCardBody>
            <MDBBtn className="ms-3" color="warning" block size="lg">
              Confirm
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>
);
}