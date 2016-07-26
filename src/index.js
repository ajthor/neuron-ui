'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const io = require('socket.io-client');
// Deal with loading modules for react.
const store = require('./store');

const {Provider} = require('react-redux');
const Workspace = require('./workspace.jsx');

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
