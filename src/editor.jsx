'use strict';

const React = require('react');

let Editor = React.createClass({
  getInitialState: function() {
    return {
      text: 'HELLO, ROBOTS'
    };
  },

  handleSubmit: function(e) {
    let text = this.state.text;
    this.props.onSubmit({text: text});

    this.setState({text: ''});
  },

  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },

  render: function() {
    return (
      <form className="editor" onSubmit={ this.handleSubmit }>
        <textarea type="text" value={ this.state.text } onChange={ this.handleTextChange } required></textarea>
        <input type="submit" value="Post" />
      </form>
    );
  }
});

module.exports = Editor;
