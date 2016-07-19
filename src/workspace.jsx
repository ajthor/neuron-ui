'use strict';

const React = require('react');
const io = require('socket.io-client');

const WorkspacePanel = require('./workspace-panel.jsx');
const WorkspacePane = require('./workspace-pane.jsx');
const FileTree = require('./file-tree.jsx');
const TabView = require('./tab-view.jsx');
const Editor = require('./editor.jsx');
const StatusBar = require('./status-bar.jsx');

// Pane: Scrollable single component.
// Panel: Container for panes. Used to group related content.
let Workspace = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentWillMount: function() {
		this.socket = io('http://localhost:4195');
    this.socket.on('connect', () => {
      this.socket.emit('message', 'CONNECTED. BEEP BOOP.');
    });

	},

  handleSubmit: function(msg) {
    this.socket.emit('message', msg.text);
  },

  render: function() {
    //  Main panel.
    //    Workspace panel.
    //      Left panel.
    //        Left pane.
    //          FileTree
    //      Middle panel.
    //        Top pane.
    //          Tabs
    //        Middle pane.
    //          GASplicer
    //          Editor
    //          BlockDiagram
    //      Bottom panel.
    //        StatusBar
    return (
      <workspace className="workspace">
        <WorkspacePanel classStyles="horizontal">
          <WorkspacePanel classStyles="left">
            <WorkspacePane>
              <FileTree />
            </WorkspacePane>
          </WorkspacePanel>
          <WorkspacePanel classStyles="vertical">
            <WorkspacePanel classStyles="top">
              <TabView />
            </WorkspacePanel>
            <WorkspacePanel classStyles="middle">
              <WorkspacePane>
                <Editor onSubmit={this.handleSubmit} />
              </WorkspacePane>
            </WorkspacePanel>
          </WorkspacePanel>
        </WorkspacePanel>
        <WorkspacePanel classStyles="bottom">
          <StatusBar />
        </WorkspacePanel>
      </workspace>
    );
  }
});

module.exports = Workspace;
