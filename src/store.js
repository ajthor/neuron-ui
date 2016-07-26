'use strict';

const Redux = require('redux');

const FileReducer = require('./file-reducer');

//
// Redux Store
//
const store = Redux.createStore(Redux.combineReducers({
  FileReducer
}));

module.exports = store;
