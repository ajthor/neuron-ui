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
      if (!_.find(obj, {path: payload})) {
        obj.push({
          path: payload,
          active: false,
          contents: ''
        });
      }
    });
  },

  CLOSE_FILE: (state, payload) => {
    return utils.updateObject(state, 'openFiles', obj => {
      const index = _.findIndex(obj, {path: payload});
      obj.splice(index, 1);
    });
  },

  LOAD_FILE_CONTENTS: (state, payload) => {
    return utils.updateObject(state, 'openFiles', obj => {
      const file = _.find(obj, {path: payload.path});
      file.contents = payload.contents;
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
  },

  SET_NEXT_ACTIVE: (state, payload) => {
    return utils.updateObject(state, 'openFiles', obj => {
      const length = obj.length - 1;
      obj.forEach((file, index) => {
        if (file.path === payload) {
          file.active = false;

          if (length !== 0) {
            if (index === length) {
              obj[index - 1].active = true;
            } else {
              obj[index + 1].active = true;
            }
          }

          return false;
        }
      });
    });
  }
};

const fileReducer = (state = initialState, action) => {
  const fn = fileActions[action.type];
  return (fn ? fn(state, action.payload) : state);
};

module.exports = fileReducer;
