'use strict';

const React = require('react');

let WorkspacePanel = React.createClass({
  render: function() {
    let children = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
      text: 'text'
    }));

    return (
      <div className="workspacePanel">
        { children }
      </div>
    );
  }
});

module.exports = WorkspacePanel;
