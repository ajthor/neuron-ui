'use strict';

let Editor = React.createClass({
  getInitialState: () => {
    return {text: ''};
  },

  handleSubmit: e => {
    e.preventDefault();

    let text = this.refs.text.getDOMNode().value;
    let script = {script: text}
    this.props.onSubmit(script, () => {

    });
  },

  render: () => {
    return (
      <form className="editor" onSubmit={this.handleSubmit}>
        <textarea name="text" ref="text" required></textarea>
        <input type="submit" value="Post" />
      </form>
    );
  }
});
