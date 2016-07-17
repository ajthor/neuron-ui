'use strict';

const fs = require('fs');
const path = require('path');
const React = require('react');

const FileTreeDirectory = require('./file-tree-directory.jsx');
const FileTreeItem = require('./file-tree-item.jsx');

let FileTree = React.createClass({
  getInitialState: function() {
    return {
      text: `Hello, world! I am a FileTree. Treeees!
      I love trees. They are so cuddly.
      Why do we cut them down?
      Can't we all just get along?`,
      directories: [
        {
          name: "./",
          path: "./",
          data: {
            directories: [],
            files: []
          }
        }
      ]
    };
  },

  //
  // Get directory tree.
  //
  getDirectoryStructure: function(directory) {
    // Read the contents of each directory.
    // From Node's documentation.
    // ┌─────────────────────┬────────────┐
    // │          dir        │    base    │
    // ├──────┬              ├──────┬─────┤
    // │ root │              │ name │ ext │
    // "  /    home/user/dir / file  .txt "
    // └──────┴──────────────┴──────┴─────┘
    fs.readdir(directory.path, (err, list) => {
      // For each item, determine if the item is a directory. If it is, run
      // this function recursively. If it isn't, add the file to the list of
      // files in the data element.
      list.forEach((file) => {
        file = path.resolve(directory.path, file);
        fs.stat(file, (err, res) => {
          if (!res) return;
          let item = {
            name: path.parse(file).base,
            path: file,
            data: {
              directories: [],
              files: []
            }
          };
          // Check the stats!
          if (res.isDirectory()) {
            this.getDirectoryStructure(item);
            directory.data.directories.push(item);
          }
          else if (res.isFile()) {
            directory.data.files.push(item);
          }
        });
      });
    });
  },

  componentWillMount: function() {
    let directories = this.state.directories;
    // Get the directory structure.
    directories.forEach((dir) => this.getDirectoryStructure(dir));
    // Set the state of the tree.
    this.setState({
      directories: directories
    });
  },

  render: function() {

    let topDirectories = this.state.directories.map((topDirectory) => {

      let directories = topDirectory.data.directories.map((directory) => {
        return (
          <FileTreeDirectory data={directory.data} />
        )
      });

      let files = topDirectory.data.files.map((file) => {
        return (
          <FileTreeItem data={file} />
        )
      });

      return (
        <li className="tree-view-directory tree-list-item">
          <span className="directory-name tree-list-header" data-path={topDirectory.path}>{ topDirectory.name }</span>
          <ol className="tree-view-directory tree-view">
            { directories }
            { files }
          </ol>
        </li>
      )
    });

    return (
      <file-tree>
        <div className="scrollable">
          <ol className="tree-view tree-list">
            { topDirectories }
          </ol>
        </div>
      </file-tree>
    );
  }
});

module.exports = FileTree;
