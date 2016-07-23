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

  loadFile: file => ({
    type: 'LOAD_FILE',
    payload: file
  }),

  openFile: file => ({
    type: 'OPEN_FILE',
    payload: file
  }),

  setActive: file => ({
    type: 'SET_ACTIVE',
    payload: file
  })

};

module.exports = actions;
