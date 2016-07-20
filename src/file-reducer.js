const Redux = require('redux');
const Immutable = require('immutable');

const actions = require('./actions/actionTypes');
//
// File state reducer.
//
const initialFileState = Immutable.Map({
  directory: "",
  contents: {
    files: [],
    dirs: []
  },
  loaded: false,
  expanded: false
});

module.exports.fileReducer = (state = initialFileState, action) => {
  switch(action.type) {

    default:
      return state;
  };
};
