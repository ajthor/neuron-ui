'use strict';

let App = React.createClass({
  componentDidMount: () => {
		this.socket = io.connect('http://localhost:4195');
	},

  submitBuildScript: (script) => {
    return this.socket.emit('message', script);
  },

  render: () => {
    return (
      <div class="content">
        <div class="main">
          <FileTree />
          <Editor />
          <BuildStatus />
        </div>
        <StatusBar />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.body
);
