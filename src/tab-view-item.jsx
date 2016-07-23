'use strict';

const path = require('path');
const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const fileActions = require('./file-actions');

class TabViewItem extends React.Component {
  render() {
    return (
      <li className={`tab-view-item ${this.props.active ? 'active' : 'inactive'}`} data-path={this.props.path} onClick={this.props.setActive}>{path.parse(this.props.path).base}{`-- ${this.props.active ? 'active' : 'inactive'}`}</li>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const openFiles = utils.getDeep(store, 'openFiles');
  const newProps = _.find(openFiles, ['path', ownProps.path]);
  return Object.assign({}, {
    active: newProps.active,
    path: newProps.path
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setActive: () => {
    dispatch(fileActions.setActive(ownProps.path));
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(TabViewItem);
