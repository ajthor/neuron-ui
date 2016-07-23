'use strict';
const path = require('path');

const React = require('react');
const {connect} = require('react-redux');

const fileActions = require('./file-actions');

class FileTreeItem extends React.Component {
  render() {
    return (
      <li className={`tree-view-file tree-list-item`} onClick={this.props.openFile}>
        <span className="name" data-path={this.props.path}>{path.parse(this.props.path).base}</span>
      </li>
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
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(FileTreeItem);
