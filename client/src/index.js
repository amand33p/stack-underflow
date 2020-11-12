import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-montserrat';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './apolloClient';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
