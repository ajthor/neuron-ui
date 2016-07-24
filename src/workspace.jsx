'use strict';

const React = require('react');

// Import the React components we will use in our application. These components
// represent the high-level components which we will display. Each one can be
// thought of as a miniature application on its own within the context of
// the page.
const WorkspacePanel = require('./workspace-panel.jsx');
const WorkspacePane = require('./workspace-pane.jsx');
const FileTree = require('./file-tree.jsx');
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
//       - Top panel.
//         - Tabs
//       - Middle panel.
//         - Splicer
//         - Editor
//         - BlockDiagram
//     - Bottom panel.
//       - StatusBar
class Workspace extends React.Component {
  render() {
    return (
      <workspace className="workspace">
        <WorkspacePanel classStyle="header">

        </WorkspacePanel>
        <WorkspacePanel classStyle="horizontal">
          <WorkspacePanel classStyle="left">
            <FileTree />
          </WorkspacePanel>
          <WorkspacePanel classStyle="vertical">
            <WorkspacePanel classStyle="top">

            </WorkspacePanel>
            <WorkspacePanel classStyle="middle">
              <WorkspacePane />
            </WorkspacePanel>
            <WorkspacePanel classStyle="bottom">

            </WorkspacePanel>
          </WorkspacePanel>
        </WorkspacePanel>
        <WorkspacePanel classStyle="footer">
          <StatusBar />
        </WorkspacePanel>
      </workspace>
    );
  }
}

module.exports = Workspace;
