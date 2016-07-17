'use strict';

const React = require('react');

let StatusBar = React.createClass({
  render: () => {
    return (
      <div className="statusBar">
        Hello, world! I am a StatusBar.
      </div>
    );
  }
});

module.exports = StatusBar;
