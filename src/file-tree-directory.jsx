'use strict';
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const Promise = require('bluebird');
const React = require('react');

const utils = require('./utils');

const FileTreeItem = require('./file-tree-item.jsx');

Promise.promisifyAll(fs);

class FileTreeDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      loaded: false,
      items: {}
    };

    // this.loadDirectoryContents = this.loadDirectoryContents.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  //
  // Get directory tree. Dynamic loading of directory contents.
  //
  loadDirectoryContents() {
    const dir = this.props.path;
    const list = fs.readdirAsync(dir).map(item => {
      return path.resolve(dir, item);
    });

    const directories = list.filter(item => {
      return fs.statAsync(item)
          .then(stat => {
            return stat.isDirectory();
          });
    });

    const files = list.filter(item => {
      return fs.statAsync(item)
        .then(stat => {
          return stat.isFile();
        });
    });

    return Promise.join(directories, files, (directories, files) => {
      return {directories, files};
    })
    .then(obj => {
      this.setState({
        loaded: true,
        expanded: true,
        items: obj
      });
    });
  }

  toggleExpand() {
    if (this.state.loaded) {
      this.setState({
        expanded: !this.state.expanded
      });

      return;
    }

    this.loadDirectoryContents();
  }

  render() {
    const directories = _.map(this.state.items.directories, directory => {
      return (
        <FileTreeDirectory path={directory} />
      );
    });

    const files = _.map(this.state.items.files, file => {
      return (
        <FileTreeItem path={file} />
      );
    });

    return (
      <li className="directory tree-list-item">
        <span className={`directory-name tree-list-header`} data-path={this.props.path} onClick={this.toggleExpand}>{path.parse(this.props.path).base}</span>
        <ol className={`tree-view-directory tree-view ${this.state.expanded ? 'expanded' : 'collapsed'}`}>
          {directories}
          {files}
        </ol>
      </li>
    );
  }
}

module.exports = FileTreeDirectory;
