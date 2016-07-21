'use strict';

const fs = require('fs');
const _ = require('lodash');
const utils = require('./utils');

const Promise = require('bluebird');

const React = require('react');
const {connect} = require('react-redux');

const fileActions = require('./file-actions');

const FileTreeDirectory = require('./file-tree-directory.jsx');
const FileTreeItem = require('./file-tree-item.jsx');

Promise.promisifyAll(fs);

//
// File Tree Component
//
// Designed to hold the top-level project directories. We will add these using
// a menu item later, but this component merely renders the project
// directories' contents.
class FileTree extends React.Component {
  //
  // Get directory tree.
  //
  // getDirectoryContents: function(directory, cb) {
  //
  //   let list = fs.readdirAsync(directory).map((file) => {
  //       return path.resolve(directory, file);
  //     });
  //
  //   let files = list.filter((file) => {
  //     return fs.statAsync(file)
  //       .then((stat) => {
  //         return stat.isFile();
  //       });
  //     });
  //
  //   let dirs = list.filter((file) => {
  //       return fs.statAsync(file)
  //         .then(stat => {
  //           return stat.isDirectory();
  //         });
  //       });
  //
  //   return Promise.join(files, dirs, (files, dirs) => {
  //     return { files: files, dirs: dirs};
  //   })
  //     .then(cb);
  //
  // },

  render() {
    const directories = _.map(this.props.projectDirectories, dir => {
      const subdirs = _.map(dir.items.directories, subdir => {
        return (
          <FileTreeDirectory {...subdir} />
        );
      });

      const files = _.map(dir.items.files, file => {
        return (
          <FileTreeItem {...file} />
        );
      });

      return (
        <li className="tree-view-directory tree-list-item">
          <span className={`directory-name tree-list-header`} data-path={dir.path}>{dir.base}</span>
          <ol className={`tree-view-directory tree-view ${dir.expanded ? 'expanded' : 'collapsed'}`}>
            {subdirs}
            {files}
          </ol>
        </li>
      );
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
}

const mapStateToProps = store => {
  return store.fileReducer.filetree;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleExpand: fileActions.toggleExpand(ownProps.base)
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(FileTree);
