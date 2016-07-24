'use strict';

const React = require('react');
const {connect} = require('react-redux');

const utils = require('./utils');

class StatusBar extends React.Component {
  render() {
    return (
      <status-bar class="status-bar">
        <div className="status-bar-left">
          <span className="file-name">{this.props.activeFile ? this.props.activeFile.path : ''}</span>
        </div>
        <div className="status-bar-right"></div>
      </status-bar>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const openFiles = utils.getDeep(store, 'openFiles');
  const activeFile = _.find(openFiles, {'active': true});
  return {
    activeFile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

module.exports = connect(mapStateToProps, mapDispatchToProps)(StatusBar);
