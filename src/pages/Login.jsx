import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import "../stylePages/login/App.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const Login = () => {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const navigate = useNavigate()
const [error, setError] = useState("")

const handleSubmit = async(e) => {
  e.preventDefault()
  try {
   await axios.post("http://localhost:3001/login", {email, password})
   navigate("/")
  } catch (error) {
    if(error.response){
      if(error.response.status === 300) {
        setError("Invalid email or Password")
      } else if(error.response.status === 400) {
        setError("User doesnt exist")
      }else {
        setError("An error occured please try again later.");
      } }else {
        // Request was made but no response was received
        setError("An error occurred. Please check your internet connection.");
      }
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }



  return (
    <MDBContainer fluid>
<form action="" onSubmit={handleSubmit}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>
    {error && <p className="text-red-50 mb-3" style={{ color: 'red' }}>{error}</p> }
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg" required onChange={(e) => {setEmail(e.target.value)}}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" required onChange={(e) => {setPassword(e.target.value)}}/>

              <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
              <MDBBtn outline className='mx-2 px-5' color='white' size='lg' type='submit'>
                Login
              </MDBBtn>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div>

              <div>
                <Link to="/signup">
                <p className="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p>
                </Link>
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>
      </form>
    </MDBContainer>
  )
}

export default Login