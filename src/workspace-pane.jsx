'use strict';
//
// Workspace Pane
//
// Similar to panels, panes have no state of their own. They are simply
// containers for groups of related components in the application. In our case,
// panes will hold the components and handle simple styles, such as making a
// pane resizable, or collapsible, etc.
// We won't be connecting panes to the state tree either.
const React = require('react');

let WorkspacePane = React.createClass({
  render: function() {
    let children = React.Children.map(this.props.children, (child) => React.cloneElement(child, {
      text: 'text'
    }));

    let classStyle = () => {
      if(!this.props.classStyles) {
        return '';
      }
      return this.props.classStyles;
    };

    return (
      <workspace-pane class={`${this.classStyle}`}>
        { children }
      </workspace-pane>
    );
  }
});

module.exports = WorkspacePane;
