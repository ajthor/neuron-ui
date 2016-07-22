'use strict';
const path = require('path');
const _ = require('lodash');
const utils = require('./utils');

const React = require('react');
const {connect} = require('react-redux');

const fileActions = require('./file-actions');

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
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(FileTreeItem);
