const _ = require('lodash');
const utils = require('./utils');
const {fromJS} = require('immutable');

//
// Model of initial file state.
//
const initialState = {
  openFiles: [],
  filetree: {
    projectDirectories: [
      {
        base: './',
        path: './',
        items: {
          directories: [
            {
              base: 'somedir',
              path: './somedir',
              items: {
                files: [
                  {
                    base: 'somefile2.js',
                    path: './somefile2.js',
                    loaded: false,
                    contents: '',
                    open: false
                  }
                ]
              },
              loaded: false,
              expanded: false
            }
          ],
          files: [
            {
              base: 'somefile.js',
              path: './somefile.js',
              loaded: false,
              contents: '',
              open: false
            }
          ]
        },
        loaded: false,
        expanded: false
      }
    ]
  }
};

//
// File state reducer.
//
const fileActions = {
  LOAD_DIRECTORY: (state, payload) => {
    return utils.updateObject(state, payload, obj => {
      obj.loaded = true;
    });
  },

  TOGGLE_EXPAND: (state, payload) => {
    return utils.updateObject(state, payload, obj => {
      obj.expanded = !obj.expanded;
    });
  }
};

const fileReducer = (state = initialState, action) => {
  const fn = fileActions[action.type];
  return (fn ? fn(state, action.payload) : state);
};

module.exports = fileReducer;
