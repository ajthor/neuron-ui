'use strict';
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const Promise = require('bluebird');

const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const fileActions = require('./file-actions');

Promise.promisifyAll(fs);

class FileTreeItem extends React.Component {
  render() {
    return (
      <li className={`tree-view-file tree-list-item`} data-path={this.props.path} onClick={this.props.openFile}>{path.parse(this.props.path).base}</li>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  openFile: () => {
    dispatch(fileActions.openFile(ownProps.path));
    dispatch(fileActions.setActive(ownProps.path));

    const contents = fs.readFileAsync(ownProps.path, 'utf8');
    Promise.resolve(contents)
      .then(contents => {
        dispatch(fileActions.loadFileContents(ownProps.path, contents));
      });
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(FileTreeItem);
