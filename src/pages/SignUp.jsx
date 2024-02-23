import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import "../stylePages/signup/App.css"

const SignUp = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(false)
  const [passError, setPassError] = useState(false);
  const [passInput, setPassInput] = useState("");
  const navigate = useNavigate()

  const handleEmail = (e) => {

    // setEmail(e.target.value)


      const email = e.target.value;
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        setError(true) 
      }else{
        setEmail(e.target.value)
        setError(false)
    }
  }
  
    const handlePassword = (e) => {
      // setPassword(e.target.value)
     const password = e.target.value;
     
     if(password.length < 5){
      setPassError(true)
      setPassInput("Password must be between 5 and 15 characters")
     }else if(!/[A-Z]/.test(password)){
      setPassError(true)
      setPassInput("Please add a capital letter")
     }else if(!/[0-9]/.test(password)){
      setPassError(true)
      setPassInput("Please add a number")
     }else{
      setPassword(e.target.value)
      setPassError(false)
     }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
   const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`,{email, password} )
    setPassword("")
    setEmail("")
    if(response.status === 201 ){
      setSuccess("User created successfully")
    }
    // setTimeout(() =>{
    //   setSuccess(null)
    // }, 2000)
   
    navigate("/login")
    } catch (error) {
        console.error('error saving user', error);
    }
  };

  return (
    <div className="sign-up">
      
        <MDBContainer className="p-3 my-5 d-flex flex-column">
        <form  onSubmit={handleSubmit}>
      {success!== null ?  <p className="text-white-50 mb-3" style={{ color: 'green' }}>{success}</p> : null}

          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
            // value={email}
            required
            onChange={handleEmail}
            maxLength={25}
          />

              {error ? (<p className="error-message">Please Enter a Valid Email</p>) : null}


          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            // value={password}
            type="password"
            onChange={handlePassword}
            required
            maxLength={15}
          />
        {passError ? (<p className="pass-input">{passInput}</p>) : null}
          {/* <div className="d-flex justify-content-between mx-3 mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
            <a href="!#">Forgot password?</a>
          </div> */}

          <MDBBtn className={`mb-4 ${error || passError ? 'button-error' : ''}`} type="submit" disabled={error || passError}>
            Sign in
          </MDBBtn>

          <div className="text-center">
            <Link to="/login">
            <p>
              Already have an account? <a href="#!">Login</a>
            </p>
            </Link>
            {/* <p>or sign up with:</p> */}

            {/* <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div> */}
          </div>
          </form>
        </MDBContainer>
    
    </div>
  );
};

export default SignUp;
