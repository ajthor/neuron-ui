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
      <li className={`tree-view-file ${this.props.open ? 'open' : ''}`} data-path={this.props.path}>{this.props.base}</li>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FileTreeItem);
