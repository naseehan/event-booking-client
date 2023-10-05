import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BuyTickets from './pages/BuyTickets';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { UserContextProvider } from './context/userContext';

function App() {
  return (
    
    <div className="App">
      <UserContextProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/buy-ticket' element={ <BuyTickets />} />
        <Route path='/signup' element={ <SignUp />} />
        <Route path='/login' element={ <Login />} />
      </Routes>
      </UserContextProvider>
    </div>
  
  );
}

export default App;
