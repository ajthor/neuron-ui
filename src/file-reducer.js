// const _ = require('lodash');
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
              items: {},
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
    // // Get filetree.
    // let filetree = state.get('filetree');
    // // Update filetree.
    // let index = _.findKey(filetree, action.payload);
    // return state.updateIn();
  }
};

const fileReducer = (state = initialState, action) => {
  const fn = fileActions[action.type];
  return (fn ? fn(state, action.payload) : state);
};

module.exports = fileReducer;
