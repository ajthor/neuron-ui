'use strict';

const React = require('react');

const Input = require('./input.jsx');

let Editor = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    };
  },

  // handleKeyUp: function(e) {
  //   e.preventDefault();
  //   if (e.key == 'Enter') {
  //     let text = this.state.text;
  //     this.props.onSubmit({text: text});
  //
  //     this.setState({text: ''});
  //   }
  // },
  //
  // handleTextChange: function(e) {
  //   this.setState({text: e.target.value});
  // },

  render: function() {
    return (
      <Input onSubmit={ this.props.onSubmit }/>
    );
  }
});

module.exports = Editor;
