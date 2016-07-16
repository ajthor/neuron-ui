'use strict';

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
  },

  render: function() {
    return (
      <div className="content">
        <div className="main">
          <Editor onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Workspace />,
  document.body
);
