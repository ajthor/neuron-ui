'use strict';

const path = require('path');
const React = require('react');

let FileTreeItem = React.createClass({
  render: function() {
    return (
      <li className="tree-view-file" data-path={this.props.file}>{path.parse(this.props.file).base}</li>
    );
  }
});

module.exports = FileTreeItem;
