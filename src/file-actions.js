const fs = require('fs');
const Promise = require('bluebird');

Promise.promisifyAll(fs);
//
// File action creators.
//
const actions = {
  loadProjectDirectory: directory => ({
    type: 'LOAD_PROJECT_DIRECTORY',
    payload: directory
  }),

  openProjectDirectory: directory => ({
    type: 'OPEN_PROJECT_DIRECTORY',
    payload: directory
  }),

  openFile: path => ({
    type: 'OPEN_FILE',
    payload: path
  }),

  closeFile: path => ({
    type: 'CLOSE_FILE',
    payload: path
  }),

  setActive: path => ({
    type: 'SET_ACTIVE',
    payload: path
  }),

  setNextActive: path => ({
    type: 'SET_NEXT_ACTIVE',
    payload: path
  })

};

module.exports = actions;
