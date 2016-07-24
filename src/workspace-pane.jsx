'use strict';
//
// Workspace Pane
//
const _ = require('lodash');
const path = require('path');
const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const fileActions = require('./file-actions');

const TextEditor = require('./text-editor.jsx');

let WorkspacePane = React.createClass({
  render: function() {
    const tabs = _.map(this.props.openFiles, file => {
      return (
        <li className={`tab-view-item ${file.active ? 'active' : 'inactive'}`} key={file.key} data-path={file.path}>
          <span onClick={() => this.props.setActive(file)}>{path.parse(file.path).base}</span>
          <span className="close-button" onClick={() => this.props.closeFile(file)}>{`\u{2A2F}`}</span>
        </li>
      );
    });

    const editors = _.map(this.props.openFiles, file => {
      return (
        <TextEditor key={file.key} {...file} />
      );
    });

    const activeFile = _.find(this.props.openFiles, {'active': true});

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
});

const mapStateToProps = (store, ownProps) => {
  const openFiles = utils.getDeep(store, 'openFiles');
  return {
    openFiles
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setActive: (file) => {
    dispatch(fileActions.setActive(file.path));
  },

  closeFile: (file) => {
    if (file.active) {
      dispatch(fileActions.setNextActive(file.path));
    }
    dispatch(fileActions.closeFile(file.path));
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(WorkspacePane);
