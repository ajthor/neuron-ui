'use strict';
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const Promise = require('bluebird');

const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const Input = require('./input.jsx');

Promise.promisifyAll(fs);

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      contents: ['']
    };
  }

  // handleKeyUp: function(e) {
  //   e.preventDefault();
  //   if (e.key == 'Enter') {
  //     let text = this.state.text;
  //     this.props.onSubmit({text: text});
  //
  //     this.setState({text: ''});
  //   }
  // },

  splitFileContents(contents) {
    return contents.split(/\r?\n/);
  }

  loadFileContents() {
    const contents = fs.readFileAsync(this.props.path, 'utf8');
    return Promise.resolve(contents)
      .then(contents => this.splitFileContents(contents))
      .then(contents => {
        this.setState({
          loaded: true,
          contents
        });
      });
  }

  componentWillMount() {
    this.loadFileContents();
  }

  componentDidUpdate(oldProps, oldState) {
    if (oldProps.path !== this.props.path) {
      this.loadFileContents();
    }
  }

  formatContents() {
    // this.contents = this.props.contents;
  }

  render() {
    const lines = _.map(this.state.contents, (line, index) => {
      return (
        <div className="line" key={index}>{line}</div>
      );
    });

    return (
      <text-editor class={`text-editor${this.props.active ? ' active' : ' hidden'}`} data-path={this.props.path}>
        <div className="editor-contents scrollable">
          {lines}
        </div>
      </text-editor>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const openFiles = utils.getDeep(store, 'openFiles');
  const newProps = _.find(openFiles, {path: ownProps.path});
  return newProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

// module.exports = connect(mapStateToProps, mapDispatchToProps)(TextEditor);
module.exports = TextEditor;
