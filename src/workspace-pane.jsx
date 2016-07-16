'use strict';

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
