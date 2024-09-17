import React, { useState } from 'react';
import { MDBInput, MDBCheckbox, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import "../stylePages/contact/App.css"
// import "../stylePages/contact/bootstrap.min.css"
// import "../stylePages/contact/animate.css"
// import "../stylePages/contact/bootstrap"
// import Swal from 'sweetalert2'
// // import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

import ScrollButton from '../components/ScrollButton';
import FAQ from '../components/FAQ';
export default function Contact() {

const [name , setName] = useState("")
const [error, setError] = useState(false)

const [email , setEmail] = useState("")
const [emailError, setEmailError] = useState(false)

const handleName = (e) => {
  const name = e.target.value;
  if(!/^[a-z ,.'-]+$/i.test(name)){
    setError(true)
  }else{
    setName(e.target.value);
    setError(false)
  }
}

const handleEmail = (e) => {
  const email = e.target.value;
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    setEmailError(true)
  }else{
    setEmail(e.target.value);
    setEmailError(false)
  }
}

const handleSubmit = (e) => {
  alert("Successfully sent message")
//    { Swal.fire({
//   position: "top-end",
//   icon: "success",
//   title: "Your work has been saved",
//   showConfirmButton: false,
//   timer: 1500
// })} 
}

  return (
    <div className="container">
    <div className="contact-container container">
    <form id='form' className='text-center mt-5' style={{ width: '100%', maxWidth: '300px' }} onSubmit={handleSubmit}>
      <h2>Contact us</h2>

      <MDBInput label='Name' v-model='name' wrapperClass='mb-4' onChange={handleName} maxLength={15} required/>
      <p className={error ? 'error' : 'not-error'}>Please enter a valid name</p>

      <MDBInput type='email' label='Email address' v-model='email' wrapperClass='mb-4' onChange={handleEmail} maxLength={25} required/>
      <p className={emailError ? 'error' : 'not-error'}>Please enter a valid email</p>

      <MDBInput label='Subject' v-model='subject' type='text' wrapperClass='mb-4' maxLength={20} required/>

      <MDBTextArea wrapperClass='mb-4' label='Message'  required/>

      <MDBBtn type='submit' color='primary' block className={`my-4 ${error || emailError ? 'button-disable' : ''}`} disabled={error || emailError}>
        Send
      </MDBBtn>
    </form>
    <ScrollButton />
     </div>

   

    
    <FAQ />
    </div>
  );
}