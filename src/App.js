import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
// import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import BuyTickets from "./pages/BuyTickets";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
// import { UserContextProvider } from './context/userContext';
import Confirm from "./components/buy-tickets/Confirm";
import User from "./pages/User";
import CreateEvent from "./pages/CreateEvent";
import DeleteEvent from "./pages/DeleteEvent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Confirm2 from "./components/buy-tickets/Confirm2";
import { Provider } from "react-redux";
import store from "./redux/store";
import Events from "./pages/Events";
import Cart2 from "./pages/Cart2";
import Successful from "./pages/Successful";
import Cancel from "./pages/Cancel";

function App() {
  const [adminEmail, setAdminEmail] = useState("");
 
  return (
    <Provider store={store}>
      <div className="App">
        {/* <UserContextProvider> */}
        <Navbar />
        {/* <Router> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy-ticket" element={<BuyTickets />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={<Login setAdminEmail={setAdminEmail} />}
          />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/user" element={<User email={adminEmail} />} />
          <Route path="/user/create" element={<CreateEvent />} />
          <Route path="/user/delete" element={<DeleteEvent />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirm2" element={<Confirm2 />} />
          <Route path="/events" element={<Events />} />
          <Route path="/cart2" element={<Cart2 />} />
          <Route path="/success" element={<Successful />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
       

        {/* </Router> */}
        {/* </UserContextProvider> */}
      </div>
      <Footer />
    </Provider>
  );
}

export default App;
