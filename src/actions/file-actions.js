const action = require('./actionTypes');

//
// Action definitions.
//
const actions = {
  getDirectoryContents: (directory) => ({
    type: action.GET_DIRECTORY_CONTENTS,
    directory: directory
  }),

  openFile: (file) => ({
    type: action.OPEN_FILE,
    file: file
  })



};

module.exports = actions;
