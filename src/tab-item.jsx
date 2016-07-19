'use strict';

const path = require('path');
const React = require('react');

let TabItem = React.createClass({
  getInitialState: function() {
    return {
      active: false
    };
  },

  handleOnClick: function() {
    this.setState({
      active: true
    });
  },

  render: function() {
    return (
      <li className={`tab-view-item ${this.state.active ? 'active' : 'inactive'}`} data-path={this.props.file} onClick={this.handleOnClick}>{path.parse(this.props.file).base}</li>
    );
  }
});

module.exports = TabItem;
