'use strict';

const React = require('react');

const FileTreeItem = require('./file-tree-item.jsx');

let FileTreeDirectory = React.createClass({
  render: function() {
    let directories = this.props.data.directories.map((directory) => {
      return (
        <FileTreeDirectory data={directory.data} />
      )
    });

    let files = this.props.data.files.map((file) => {
      return (
        <FileTreeItem data={file} />
      );
    });

    return (
      <li className="directory tree-list-item">
        <span data-path={this.props.path}>{this.props.name}</span>
        <ol className="tree-view-directory tree-view">
          { directories }
          { files }
        </ol>
      </li>
    );
  }
});

module.exports = FileTreeDirectory;
