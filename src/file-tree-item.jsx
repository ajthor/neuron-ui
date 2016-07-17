'use strict';

const React = require('react');

let FileTreeItem = React.createClass({
  render: function() {
    return (
      <li className="tree-view-file" data-path={this.props.data.path}>{this.props.data.name}</li>
    );
  }
});

module.exports = FileTreeItem;
