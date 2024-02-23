import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'mdbreact/dist/css/mdb.css';
// import 'popper.js';
import ReactDOM from 'react-dom/client';
import './index.css';

// import 'mdbreact/dist/css/mdb.min.css';

import 'mdbreact/dist/css/style.css'; 
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}>
  //   <App />
  //   </Provider>
    <BrowserRouter >
    <App />
    </BrowserRouter>
);

