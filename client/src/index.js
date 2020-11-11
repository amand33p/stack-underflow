import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-montserrat';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
