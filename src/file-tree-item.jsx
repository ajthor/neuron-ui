'use strict';
const _ = require('lodash');
const utils = require('./utils');

const React = require('react');
const {connect} = require('react-redux');

class FileTreeItem extends React.Component {
  render() {
    return (
      <li className={`tree-view-file ${this.props.open ? 'open' : ''}`} data-path={this.props.path}>{this.props.base}</li>
    );
  }
}

const mapStateToProps = function (store, ownProps) {
  // const newState = _.find(store.fileReducer.filetree, item => {
  //   return item.path === ownProps.path;
  // });
  // return newState;
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FileTreeItem);
