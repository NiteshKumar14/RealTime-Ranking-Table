import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import logo from './images/logo.jpg'

import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import LeaderBoard  from './components/leaderboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <nav className="navbar sticky-top bg-light navbar-default center">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <div className='image_container'>
      <img src={logo} alt=""  className="d-inline-block align-text-top"/>
      </div>
     
      CodeAuction  LeaderBoard
    </a>
  </div>
</nav>
      <LeaderBoard>
   
   </LeaderBoard>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
