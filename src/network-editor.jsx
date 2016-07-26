'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const Promise = require('bluebird');

const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const NeuronBlocks = require('./network-editor-blocks.jsx');

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

  componentDidUpdate(oldProps) {
    if (oldProps.path !== this.props.path) {
      this.loadFileContents();
    }
  }

  render() {
    let blockLayers = [];
    if (this.state.contents.layers) {
      blockLayers = _.map(this.state.contents.layers, (layer, index) => {
        const neurons = _.map(layer.neurons, neuron => {
          return React.createElement(NeuronBlocks[neuron.type], neuron);
        });

        return (
          <div className="layer" data-layer={index + 1}>
            <div className="layer-header header"><span className="name">{`Layer ${index + 1}`}</span></div>
            {neurons}
          </div>
        );
      });
    }

    return (
      <network-editor class={`network-editor${this.props.active ? ' active' : ' hidden'}`} data-path={this.props.path}>
        <div className="editor-container">
          <div className="editor-contents">
            <div className="ga-splicer">
              001101010100010101010111100011000110000000111101010100100011001101010100010101010111100011000110000000111101010100100011
            </div>
            <div className="schematic">
              Something
            </div>
            <div className="block-diagram">
              <div className="layer">
                <div className="layer-header header"><span className="name">Input</span></div>
                <div className="neuron">

                </div>
              </div>
              {blockLayers}
              <div className="layer">
                <div className="layer-header header"><span className="name">Output</span></div>
                <div className="neuron">

                </div>
              </div>
            </div>
          </div>
        </div>
      </network-editor>
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
