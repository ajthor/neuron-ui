'use strict';

const React = require('react');
const { connect } = require('react-redux');

const WorkspacePanel = require('./workspace-panel.jsx');
const WorkspacePane = require('./workspace-pane.jsx');
const FileTree = require('./file-tree.jsx');
const TabView = require('./tab-view.jsx');
const Editor = require('./editor.jsx');
const StatusBar = require('./status-bar.jsx');

// Pane: Scrollable single component.
// Panel: Container for panes. Used to group related content.
let Workspace = React.createClass({
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

const mapStateToProps = function(store) {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

module.exports = connect(mapStateToProps)(Workspace);
