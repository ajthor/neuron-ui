'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const React = require('react');
const async = require('async');
const Promise = require('bluebird');

const FileTreeDirectory = require('./file-tree-directory.jsx');
const FileTreeItem = require('./file-tree-item.jsx');

Promise.promisifyAll(fs);

let FileTree = React.createClass({
  getInitialState: function() {
    return {
      text: `Hello, world! I am a FileTree. Treeees!
      I love trees. They are so cuddly.
      Why do we cut them down?
      Can't we all just get along?`,
      directories: ["./"],
      expanded: true,
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

    let list = fs.readdirAsync(directory).map((file) => {
        return path.resolve(directory, file);
      });

    let files = list.filter((file) => {
      return fs.statAsync(file)
        .then((stat) => {
          return stat.isFile();
        });
      });

    let dirs = list.filter((file) => {
        return fs.statAsync(file)
          .then((stat) => {
            return stat.isDirectory();
          });
        });

    return Promise.join(files, dirs, (files, dirs) => {
        return { files: files, dirs: dirs };
      })
      .then(cb);

  },

  componentWillMount: function() {
    // Get the directory structure.
    // Promise.each(this.state.directories, (dir) => {
    //     return dir;
    //   })
    //   .then((dir) => {
    //     return this.getDirectoryContents(dir, (res) => {
    //       this.setState({contents: res});
    //     });
    //   });
    this.state.directories.forEach((dir) => {
      this.getDirectoryContents(dir, (res) => {
        this.setState({
          contents: res
        });
      });
    });
  },

  handleOnClick: function() {
    this.setState({
      expanded: !this.state.expanded
    });
  },

  render: function() {

    let directories = this.state.directories.map((directory) => {

      let subdirs = this.state.contents.dirs.map((subdir) => {
        return (
          <FileTreeDirectory directory={subdir} getDirectoryContents={this.getDirectoryContents} />
        )
      });

      let files = this.state.contents.files.map((file) => {
        return (
          <FileTreeItem file={file} />
        )
      });

      return (
        <li className="tree-view-directory tree-list-item">
          <span className={`directory-name tree-list-header`} data-path={directory} onClick={this.handleOnClick}>{ path.parse(directory).base }</span>
          <ol className={`tree-view-directory tree-view ${this.state.expanded ? 'expanded' : 'collapsed'}`}>
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
