'use strict';

import _ from 'lodash';
import utils from './utils';

//
// Model of initial file state.
//
const initialState = {
  openFiles: [
    {
      path: '/Users/adam/Google Drive/projects/neuron-ui/examples/example.nw',
      active: true,
      encoding: 'utf8',
      key: _.uniqueId()
    }
  ],
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
          encoding: 'utf8',
          key: _.uniqueId()
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
  },

  CHANGE_ENCODING: (state, payload) => {
    return utils.updateObject(state, 'openFiles', obj => {
      obj.forEach(file => {
        if (file.path === payload.path) {
          file.encoding = payload.encoding;
          return false;
        }
      });
    });
  }
};

const FileReducer = (state = initialState, action) => {
  const fn = fileActions[action.type];
  return (fn ? fn(state, action.payload) : state);
};

// FIXME: For some reason, this cannot be changed to an 'export' statement.
// Figure out why.
module.exports = FileReducer;
