import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-montserrat';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './apolloClient';
import { StateProvider } from './context/state';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router>
      <StateProvider>
        <App />
      </StateProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
