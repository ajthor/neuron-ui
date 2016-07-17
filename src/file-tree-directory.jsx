'use strict';

const path = require('path');
const React = require('react');

const FileTreeItem = require('./file-tree-item.jsx');

let FileTreeDirectory = React.createClass({
  getInitialState: function() {
    return {
      contents: {
        dirs: [],
        files: []
      }
    };
  },

  handleOnClick: function() {
    this.props.onClick(this.props.directory, (err, res) => {
      // Set the state of the tree.
      this.setState({
        contents: res
      });
    });
  },

  render: function() {
    let directories = this.state.contents.dirs.map((directory) => {
      return (
        <FileTreeDirectory directory={directory} onClick={this.props.onClick} />
      )
    });

    let files = this.state.contents.files.map((file) => {
      return (
        <FileTreeItem file={file} />
      );
    });

    return (
      <li className="directory tree-list-item">
        <span className="directory-name tree-list-header" data-path={this.props.directory} onClick={this.handleOnClick}>{ path.parse(this.props.directory).base }</span>
        <ol className="tree-view-directory tree-view">
          { directories }
          { files }
        </ol>
      </li>
    );
  }
});

module.exports = FileTreeDirectory;
