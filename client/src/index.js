import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-montserrat';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './apolloClient';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
