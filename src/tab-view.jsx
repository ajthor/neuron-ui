'use strict';

const _ = require('lodash');
const React = require('react');

const TabItem = require('./tab-item.jsx');

let TabView = React.createClass({
  getInitialState: function() {
    return {
      files: [],
      activeFile: ''
    };
  },

  handleOnClick: function() {
    React.Children.forEach((tabItem) => {
      tabItem.setState({active: false});
    });
  },

  render: function() {
    let tabs = this.state.files.map((file) => {
      let key = _.uniqueId('tab-item-');
      return (
        <TabItem key={key} file={file} onClick={this.handleOnClick} />
      )
    });

    return (
      <tab-list className="tabView">
        <ol>
          { tabs }
        </ol>
      </tab-list>
    );
  }
});

module.exports = TabView;
