'use strict';

const React = require('react');

class FeedThrough extends React.Component {
  render() {
    return (
      <div className="neuron" data-neuron-type={this.props.type}>
        <div className="block-column">
          <span className="block bordered">{'\u2211'}</span>
          <span className="block-node bias-node"></span>
        </div>
        <div className="block-column">
          <span className="block bordered">{'\u0192'}</span>
        </div>
      </div>
    );
  }
}

class MultiFeedThrough extends React.Component {
  render() {
    return (
      <div className="neuron" data-neuron-type={this.props.type}>
        <span className="block bordered">W</span>
        <span className="block bordered">{'\u2297'}</span>
        <span className="block bordered">{'\u0192'}</span>
      </div>
    );
  }
}

class Recurrent extends React.Component {
  render() {
    return (
      <div className="neuron" data-neuron-type={this.props.type}>
        {'recurrent'}
      </div>
    );
  }
}

const Neurons = {
  'feed-through': FeedThrough,
  'multi-feed-through': MultiFeedThrough,
  'recurrent': Recurrent
};

module.exports = Neurons;
