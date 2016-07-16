'use strict';

const io = require('socket.io');

let Workspace = React.createClass({
  getInitialState: () => {
    return {socket: null};
  },
  componentDidMount: () => {
		this.socket = io('http://localhost:4195');
    socket.on('connect', function () {
      socket.send('message', 'hi');

    });
	},

  handleSubmit: (msg) => {
    return this.socket.emit('message', msg);
  },

  render: () => {
    return (
      <div class="content">
        <div class="main">
          <FileTree />
          <Editor onSubmit={this.handleSubmit} />
          <BuildStatus />
        </div>
        <StatusBar />
      </div>
    );
  }
});

ReactDOM.render(
  <Workspace />,
  document.body
);
