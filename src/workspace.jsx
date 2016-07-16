'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const io = require('socket.io-client');

const Editor = require('./editor.jsx');

let Workspace = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
		this.socket = io('http://localhost:4195');
    this.socket.on('connect', () => {
      this.socket.emit('message', 'CONNECTED. BEEP BOOP.');
    });

	},

  handleSubmit: function(msg) {
    this.socket.emit('message', msg.text);
    this.setState({});
  },

  render: function() {
    return (
      <div className="content">
        <div className="workspace">
          <Editor onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Workspace />,
  document.getElementById('content')
);
