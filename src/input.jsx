'use strict';

const React = require('react');

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      const text = this.state.text;
      this.props.onSubmit({text});

      this.setState({text: ''});
    }
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  render() {
    return (
      <input className="input" type="text"
        value={ this.state.text }
        onKeyUp={ this.handleKeyUp }
        onChange={ this.handleTextChange }
      />
    );
  }
}

module.exports = Input;
