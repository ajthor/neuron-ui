'use strict';
//
// Workspace Pane
//
const _ = require('lodash');
const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const TabView = require('./tab-view.jsx');
const TextEditor = require('./text-editor.jsx');

let WorkspacePane = React.createClass({
  render: function() {
    const editors = _.map(this.props.openFiles, file => {
      return (
        <TextEditor {...file} />
      );
    });

    const activeFile = _.find(this.props.openFiles, {'active': true});

    return (
      <workspace-pane class={`${this.props.classStyle || ''}`} active={activeFile ? activeFile.path : ''}>
        <TabView />
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

});

module.exports = connect(mapStateToProps, mapDispatchToProps)(WorkspacePane);
