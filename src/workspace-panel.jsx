'use strict';
//
// Workspace Panel
//
// The workspace panel element is just a container for other react components.
// As such, it is a permanent part of the page's schema and should not depend
// on the state of the application whatsoever. The sole job of panels is to
// organize code within the application and apply layout styles to the
// components within or to have a (usually flexbox) style that it uses.
// As such, we are not going to connect the panels to Redux. 
const React = require('react');

let WorkspacePanel = React.createClass({
  render: function() {
    let children = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
      text: 'text'
    }));

    return (
      <workspace-panel class={`${this.props.classStyles}`}>
        { children }
      </workspace-panel>
    );
  }
});

module.exports = WorkspacePanel;
