import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BuyTickets from "./pages/BuyTickets";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { UserContextProvider } from './context/userContext';
import { CartContextProvider } from './context/cartContext';
import Confirm from "./components/buy-tickets/Confirm";
import User from "./pages/User";
import CreateEvent from "./pages/CreateEvent";
import DeleteEvent from "./pages/DeleteEvent";
import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import Confirm2 from "./components/buy-tickets/Confirm2";
import Events from "./pages/Events";
import Cart2 from "./pages/Cart2";
import Successful from "./pages/Successful";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <div className="App flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/buy-ticket" element={<BuyTickets />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/confirm" element={<Confirm />} />
              <Route path="/user" element={<User />} />
              <Route path="/user/create" element={<CreateEvent />} />
              <Route path="/user/delete" element={<DeleteEvent />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart2 />} />
              <Route path="/cart2" element={<Cart2 />} />
              <Route path="/confirm2" element={<Confirm2 />} />
              <Route path="/events" element={<Events />} />
              <Route path="/success" element={<Successful />} />
              <Route path="/cancel" element={<Cancel />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
