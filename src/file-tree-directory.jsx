'use strict';

const path = require('path');
const React = require('react');

const FileTreeItem = require('./file-tree-item.jsx');

let FileTreeDirectory = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      expanded: false,
      contents: {
        dirs: [],
        files: []
      }
    };
  },

  componentWillMount: function() {

  },

  handleOnClick: function() {
    // If this is the first time the directory has been clicked on, load the
    // contents of the directory and place them in memory. This avoids
    // unnecessary compute time loading the tree when the tree is first loaded.
    if (!this.state.loaded) {
      this.loadContents();

      this.setState({
        loaded: true,
        expanded: true
      });

    }
    // If the contents of the directory are already loaded, however, just
    // toggle the tree to display or hide.
    else {
      this.toggleExpanded();
    }
  },

  loadContents: function() {
    // Get the directory structure.
    this.props.getDirectoryContents(this.props.directory, (res) => {
      // Set the state of the tree.
      this.setState({
        contents: res
      });
    });
  },

  toggleExpanded: function() {
    this.setState({
      expanded: !this.state.expanded
    });
  },

  render: function() {
    let directories = this.state.contents.dirs.map((directory) => {
      return (
        <FileTreeDirectory directory={directory} getDirectoryContents={this.props.getDirectoryContents} />
      )
    });

    let files = this.state.contents.files.map((file) => {
      return (
        <FileTreeItem file={file} />
      );
    });

    return (
      <li className="directory tree-list-item">
        <span className={`directory-name tree-list-header`} data-path={this.props.directory} onClick={this.handleOnClick}>{ path.parse(this.props.directory).base }</span>
        <ol className={`tree-view-directory tree-view ${this.state.expanded ? 'expanded' : 'collapsed'}`}>
          { directories }
          { files }
        </ol>
      </li>
    );
  }
});

module.exports = FileTreeDirectory;
