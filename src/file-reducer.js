const _ = require('lodash');
const utils = require('./utils');
// const {List} = require('immutable');

//
// Model of initial file state.
//
const initialState = {
  openFiles: [],
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
      if (!_.find(obj, ['path', payload])) {
        obj.push({
          path: payload,
          active: false
        });
      }
    });
  },

  SET_ACTIVE: (state, payload) => {
    return utils.updateObject(state, 'openFiles', obj => {
      obj.forEach(file => {
        if (file.path === payload) {
          file.active = true;
          return false;
        }
        file.active = false;
      });
    });
  }
};

const fileReducer = (state = initialState, action) => {
  const fn = fileActions[action.type];
  return (fn ? fn(state, action.payload) : state);
};

module.exports = fileReducer;
