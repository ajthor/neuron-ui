'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Redux = require('redux');
const {Provider} = require('react-redux');

const io = require('socket.io-client');
// Deal with loading modules for react.
const Workspace = require('../src/workspace.jsx');

const socket = io('http://localhost:4195');

socket.on('connect', () => {
  socket.emit('message', 'CONNECTED. BEEP BOOP.');
});

//
// Redux Reducers
//
const fileReducer = require('../src/file-reducer');
//
// Redux Store
//
const store = Redux.createStore(Redux.combineReducers({
  fileReducer
}));

ReactDOM.render(
  <Provider store={store}>
    <Workspace socket={socket} />
  </Provider>,
  document.body
);
