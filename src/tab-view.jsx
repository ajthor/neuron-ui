'use strict';

const _ = require('lodash');
const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

const TabViewItem = require('./tab-view-item.jsx');

class TabView extends React.Component {
  render() {
    const tabs = _.map(this.props.openFiles, file => {
      return (
        <TabViewItem {...file} />
      );
    });

    return (
      <tab-list>
        <ol className="tab-view">
          {tabs}
        </ol>
      </tab-list>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const openFiles = utils.getDeep(store, 'openFiles');
  return {
    openFiles
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

module.exports = connect(mapStateToProps)(TabView);
