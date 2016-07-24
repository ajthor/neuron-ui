'use strict';
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const Promise = require('bluebird');

const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const NetworkEditorLayer = require('./network-editor-layer.jsx');

Promise.promisifyAll(fs);

class NetworkEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      contents: {}
    };
  }

  parseFileContents(contents) {
    return JSON.parse(contents);
  }

  loadFileContents() {
    const contents = fs.readFileAsync(this.props.path, this.props.encoding);
    return Promise.resolve(contents)
      .then(contents => this.parseFileContents(contents))
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

  render() {
    let layers = [];
    if (this.state.contents.layers) {
      layers = _.map(this.state.contents.layers, (layer, index) => {
        return (
          <NetworkEditorLayer key={index} {...layer} {...this.state.contents.meta} />
        );
      });
    }

    return (
      <text-editor class={`text-editor${this.props.active ? ' active' : ' hidden'}`} data-path={this.props.path}>
        <div className="editor-container">
          <div className="editor-gutter">
            <div className="line-numbers">

            </div>
          </div>
          <div className="editor-contents">
            <div className="layers">
              {layers}
              {"\u2211"}
            </div>
          </div>
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

// module.exports = connect(mapStateToProps, mapDispatchToProps)(NetworkEditor);
module.exports = NetworkEditor;
