import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    ,
  );
