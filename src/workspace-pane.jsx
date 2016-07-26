'use strict';
//
// Workspace Pane
//
const path = require('path');
const _ = require('lodash');
const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const FileActions = require('./file-actions');

const TextEditor = require('./text-editor.jsx');
const NetworkEditor = require('./network-editor.jsx');

class WorkspacePane extends React.Component {
  render() {
    const tabs = _.map(this.props.openFiles, file => {
      return (
        <li className={`tab-view-item ${file.active ? 'active' : 'inactive'}`} key={file.key} data-path={file.path}>
          <span onClick={() => this.props.setActive(file)}>{path.parse(file.path).base}</span>
          <span className="close-button" onClick={() => this.props.closeFile(file)}>{`\u{2A2F}`}</span>
        </li>
      );
    });

    const editors = _.map(this.props.openFiles, file => {
      const extension = path.parse(file.path).ext;
      if (extension === '.nw') {
        return (
          <NetworkEditor key={file.key} {...file} />
        );
      }
      return (
        <TextEditor key={file.key} {...file} />
      );
    });

    const activeFile = _.find(this.props.openFiles, {active: true});

    return (
      <workspace-pane class={`${this.props.classStyle || ''}`} active={activeFile ? activeFile.path : ''}>
        <ul className="tab-view">
          {tabs}
        </ul>
        <div className="editors">
          {editors}
        </div>
      </workspace-pane>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const openFiles = utils.getDeep(store, 'openFiles');
  return {
    openFiles
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setActive: file => {
    dispatch(FileActions.setActive(file.path));
  },

  closeFile: file => {
    if (file.active) {
      dispatch(FileActions.setNextActive(file.path));
    }
    dispatch(FileActions.closeFile(file.path));
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(WorkspacePane);
