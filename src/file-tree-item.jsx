'use strict';

const React = require('react');

let FileTreeItem = React.createClass({
  getInitialState: function() {
    return {
      type: 'file',
      filePath: './dummy.js',
      fileName: 'dummy.js'
    };
  },

  componentDidMount: function() {
    // Set state.
  },

  render: function() {
    return (
      <li class={this.props.type} data-file-path={this.state.filePath}>{this.state.fileName}</li>
    );
  }
});

module.exports = FileTreeItem;
