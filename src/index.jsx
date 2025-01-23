import { App } from './containers';
import './index.css';
import store from './redux';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
