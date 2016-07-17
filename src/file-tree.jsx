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
      directories: ["./"],
      contents: {
        dirs: [],
        files: []
      }
    };
  },

  //
  // Get directory tree.
  //
  getDirectoryContents: function(directory, cb) {
    let result = {
      dirs: [],
      files: []
    };

    fs.readdir(directory, (err, list) => {
      // Iterate over all directory contents to figure out if the contents are
      // directories or files.
      list.forEach((file) => {
        file = path.resolve(directory, file);
        fs.stat(file, (err, stats) => {
          if (!stats) return cb(err, null);

          if (stats.isDirectory()) result.dirs.push(file);
          else result.files.push(file);

          return cb(null, result);
        });
      });

      // Done reading directory.
      // return cb(err, result);
    });
  },

  componentWillMount: function() {
    // Get the directory structure.
    this.state.directories.forEach((dir) => {
      this.getDirectoryContents(dir, (err, res) => {
        // Set the state of the tree.
        this.setState({
          contents: res
        });
      });
    });
  },

  handleOnClick: function() {
    console.log('click');
  },

  render: function() {

    let directories = this.state.directories.map((directory) => {

      let subdirs = this.state.contents.dirs.map((subdir) => {
        return (
          <FileTreeDirectory directory={subdir} onClick={this.getDirectoryContents} />
        )
      });

      let files = this.state.contents.files.map((file) => {
        return (
          <FileTreeItem file={file} />
        )
      });

      return (
        <li className="tree-view-directory tree-list-item">
          <span className="directory-name tree-list-header" data-path={directory} onClick={this.handleOnClick}>{ path.parse(directory).base }</span>
          <ol className="tree-view-directory tree-view">
            { subdirs }
            { files }
          </ol>
        </li>
      )
    });

    return (
      <file-tree>
        <div className="scrollable">
          <ol className="tree-view tree-list">
            { directories }
          </ol>
        </div>
      </file-tree>
    );
  }
});

module.exports = FileTree;
