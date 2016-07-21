const Redux = require('redux');

//
// Redux Reducers
//
const fileReducer = require('./file-reducer');

//
// Redux Store
//
const store = Redux.createStore(Redux.combineReducers({
  fileReducer
}));

module.exports = store;
