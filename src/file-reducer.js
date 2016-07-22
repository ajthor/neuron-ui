const utils = require('./utils');
const {fromJS} = require('immutable');

//
// Model of initial file state.
//
const initialState = {
  openFiles: ['./Vagrantfile'],
  projectDirectories: ['./']
};

//
// File state reducer.
//
const fileActions = {
  LOAD_PROJECT_DIRECTORY: (state, payload) => {
    return utils.updateObject(state, 'projectDirectories', obj => {
      if (!obj.includes(payload)) {
        obj.push(payload);
      }
    });
  },

  OPEN_FILE: (state, payload) => {
    return utils.updateObject(state, 'openFiles', obj => {
      if (!obj.includes(payload)) {
        obj.push(payload);
      }
    });
  }
};

const fileReducer = (state = initialState, action) => {
  const fn = fileActions[action.type];
  return (fn ? fn(state, action.payload) : state);
};

module.exports = fileReducer;
