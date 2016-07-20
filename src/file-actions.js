//
// File action creators.
//
const actions = {
  getDirectoryContents: (directory) => ({
    type: 'GET_DIRECTORY_CONTENTS',
    directory: directory
  }),

  openFile: (file) => ({
    type: 'OPEN_FILE',
    file: file
  })



};

module.exports = actions;
