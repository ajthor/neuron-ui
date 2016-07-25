'use strict';
const React = require('react');

class FeedThrough extends React.Component {
  render() {
    return (
      <div className="neuron" data-neuron-type={this.props.type}>
        <span className="block">{'\u2211'}</span>
        <span className="block">{'\u0192'}</span>
      </div>
    );
  }
}

class MultiFeedThrough extends React.Component {
  render() {
    return (
      <div className="neuron" data-neuron-type={this.props.type}>
        <span className="block">{'\u2295'}</span>
        <span className="block">{'\u0192'}</span>
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
