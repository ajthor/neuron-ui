'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import io from 'socket.io-client';
// Deal with loading modules for react.
import store from './store';

import {Provider} from 'react-redux';
import Workspace from './workspace.jsx';

const socket = io('http://localhost:4195');

socket.on('connect', () => {
  socket.emit('message', 'CONNECTED. BEEP BOOP.');
});

ReactDOM.render(
  <Provider store={store}>
    <Workspace />
  </Provider>,
  document.body
);
