'use strict';

const path = require('path');
const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const fileActions = require('./file-actions');

class TabViewItem extends React.Component {
  render() {
    return (
      <li className={`tab-view-item ${this.props.active ? 'active' : 'inactive'}`} data-path={this.props.path}> <span onClick={this.props.setActive}>{path.parse(this.props.path).base}</span><span className="close-button" onClick={this.props.closeFile}>{` \u{2A2F} `}</span></li>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const openFiles = utils.getDeep(store, 'openFiles');
  const newProps = _.find(openFiles, {path: ownProps.path});
  return {path: newProps.path, active: newProps.active};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setActive: () => {
    dispatch(fileActions.setActive(ownProps.path));
  },

  closeFile: () => {
    if (ownProps.active) {
      dispatch(fileActions.setNextActive(ownProps.path));
    }
    dispatch(fileActions.closeFile(ownProps.path));
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(TabViewItem);
