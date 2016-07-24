'use strict';
const path = require('path');

const React = require('react');
const {connect} = require('react-redux');

const fileActions = require('./file-actions');

class NetworkEditorLayer extends React.Component {
  render() {
    return (
      <div className="layer">layer</div>
    );
  }
}

module.exports = NetworkEditorLayer;
