'use strict';

const path = require('path');
const _ = require('lodash');

const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const FileActions = require('./file-actions');

class FileTreeItem extends React.Component {
  render() {
    return (
      <li className={`tree-view-file tree-list-item`} onClick={this.props.openFile}>
        <span className="name icon-file" data-path={this.props.path}>{path.parse(this.props.path).base}</span>
      </li>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  // const openFiles = utils.getDeep(store, 'openFiles');
  // const activeFile = _.find(openFiles, {active: true});
  // let active;
  // if (ownProps.path === activeFile.path) {
  //   active = true;
  // }
  return {
    // active
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  openFile: () => {
    dispatch(FileActions.openFile(ownProps.path));
    dispatch(FileActions.setActive(ownProps.path));
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(FileTreeItem);
