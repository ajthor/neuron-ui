'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const io = require('socket.io-client');

const WorkspacePanel = require('./workspace-panel.jsx');
// const WorkspacePane = require('./workspace-pane.jsx');
// const FileTree = require('./file-tree.jsx');
const Editor = require('./editor.jsx');
// const StatusBar = require('./status-bar.jsx');

// Pane: Scrollable single component.
// Panel: Container for panes. Used to group related content.
let Workspace = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
		this.socket = io('http://localhost:4195');
    this.socket.on('connect', () => {
      this.socket.emit('message', 'CONNECTED. BEEP BOOP.');
    });

	},

  handleSubmit: function(msg) {
    this.socket.emit('message', msg.text);
    this.setState({});
  },

  render: function() {
    return (
      <div className="workspace">
        <WorkspacePanel>
          <Editor handleSubmit={this.handleSubmit} />
        </WorkspacePanel>
      </div>
    );
  }
});

ReactDOM.render(
  <Workspace />,
  document.getElementById('content')
);
