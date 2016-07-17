'use strict';

const React = require('react');

let Input = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    };
  },

  handleKeyUp: function(e) {
    e.preventDefault();
    if (e.key == 'Enter') {
      let text = this.state.text;
      this.props.onSubmit({text: text});

      this.setState({text: ''});
    }
  },

  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },

  render: function() {
    return (
      <input className="input" type="text"
        value={ this.state.text }
        onKeyUp={ this.handleKeyUp }
        onChange={ this.handleTextChange }
      />
    );
  }
});

module.exports = Input;
