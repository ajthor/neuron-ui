'use strict';

const React = require('react');
const { connect } = require('react-redux');

// Import the React components we will use in our application. These components
// represent the high-level components which we will display. Each one can be
// thought of as a miniature application on its own within the context of
// the page.
const WorkspacePanel = require('./workspace-panel.jsx');
const WorkspacePane = require('./workspace-pane.jsx');
const FileTree = require('./file-tree.jsx');
const TabView = require('./tab-view.jsx');
const Editor = require('./editor.jsx');
const StatusBar = require('./status-bar.jsx');

//
// Workspace
//
// As the entry-point and overarching container for our application, the
// workspace container is only meant to hold the overall layout of our
// application.
// Following SOC rules, we are going to leave it disconnected from the
// application's state tree.

// Pane: Scrollable single component.
// Panel: Container for panes. Used to group related content.

// Our application's overall layout:
// - Main panel.
//   - Workspace panel.
//     - Left panel.
//       - Left pane.
//         - FileTree
//     - Middle panel.
//       - Top pane.
//         - Tabs
//       - Middle pane.
//         - Splicer
//         - Editor
//         - BlockDiagram
//     - Bottom panel.
//       - StatusBar
class Workspace extends React.Component {
  render() {
    return (
      <workspace class="workspace">
        <WorkspacePanel classStyles="horizontal">
          <WorkspacePanel classStyles="left resizable">
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
                <Editor />
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
}

module.exports = Workspace;
