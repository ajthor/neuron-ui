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

  loadDirectory: directory => ({
    type: 'LOAD_DIRECTORY',
    payload: directory
  }),

  openDirectory: directory => ({
    type: 'OPEN_DIRECTORY',
    payload: directory
  }),

  loadFile: file => ({
    type: 'LOAD_FILE',
    payload: file
  }),

  openFile: file => ({
    type: 'OPEN_FILE',
    payload: file
  })

};

module.exports = actions;
