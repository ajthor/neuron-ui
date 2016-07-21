'use strict';
const _ = require('lodash');
const utils = require('./utils');

const React = require('react');
const {connect} = require('react-redux');

const FileTreeItem = require('./file-tree-item.jsx');

class FileTreeDirectory extends React.Component {
  render() {
    const directories = _.map(this.props.items.directories, directory => {
      return (
        <FileTreeDirectory directory={directory} />
      );
    });

    const files = _.map(this.props.items.files, file => {
      return (
        <FileTreeItem file={file} />
      );
    });

    return (
      <li className="directory tree-list-item">
        <span className={`directory-name tree-list-header`} data-path={this.props.path}>{this.props.base}</span>
        <ol className={`tree-view-directory tree-view ${this.props.expanded ? 'expanded' : 'collapsed'}`}>
          { directories }
          { files }
        </ol>
      </li>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  // const newState = _.find(store.fileReducer.filetree, item => {
  //   return item.path === ownProps.path;
  // });
  // return newState;
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

module.exports = connect(mapStateToProps, mapDispatchToProps)(FileTreeDirectory);
