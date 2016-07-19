'use strict';

const path = require('path');
const React = require('react');
const {connect} = require('react-redux');

let FileTreeItem = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      open: false
    };
  },

  handleOnClick: function() {

  },

  loadContents: function() {

  },

  render: function() {
    return (
      <li className="tree-view-file" data-path={this.props.file}>{path.parse(this.props.file).base}</li>
    );
  }
});

const mapStateToProps = function(state, ownProps) {
  return {
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  return {
    openFile:
  };
);

module.exports = connect(mapStateToProps, mapDispatchToProps)(FileTreeItem);
