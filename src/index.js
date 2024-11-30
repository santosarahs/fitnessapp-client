import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'notyf/notyf.min.css';
import App from './App';

const API_URL = 'https://fitnessapp-api-ln8u.onrender.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App apiUrl={API_URL} />
  </React.StrictMode>
);



